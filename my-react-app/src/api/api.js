import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Создание экземпляр axios с базовым URL и заголовками по умолчанию для всех запросов
const api = axios.create({                      // axios.create() создает новый экземпляр axios с настроенными параметрами конфигурации
    baseURL: 'http://192.168.1.105:8000/api/',      // baseURL — это базовый URL, который будет использоваться в качестве отправной точки для всех запросов, выполненных с помощью этого экземпляра axios
    headers: {                                  // headers — это заголовки, которые будут отправляться с каждым запросом, выполненным с помощью этого экземпляра.
        'Content-Type': 'application/json',     // Тело запроса будет отправлено в формате JSON и сервер ожидает данные в этом формате
    }											// Было localhost
});

// Проверка валидности refresh-токена
function refreshTokenValid(token) {
    if (!token) return false;                   // Проверка, существует ли переданный токен. Это проверка для предотвращения дальнейшей обработки, если токена нет
    try {                                       // Декодирование токена внутри блока try
        const decoded = jwtDecode(token);       // jwtDecode - это функция, которая декодирует JWT и возвращает его полезную нагрузку (payload) в виде обычного JavaScript-объекта
        const currentTime = Date.now() / 1000;  // Получаем текущее время в формате Unix-штампа, но делим его на 1000, чтобы перевести время из миллисекунд в секунды, поскольку метка времени в токенах JWT обычно выражается в секундах
        return decoded.exp > currentTime;       // Токены JWT имеют поле exp (expiration) в своей полезной нагрузке, которое указывает время истечения токена в формате Unix-штампа (в секундах)
    }                                           // Сравниваем это время с текущим временем. Если время истечения больше текущего времени, токен еще действителен, и функция возвращает true. В противном случае возвращается false
    catch (error) {                             // Если во время декодирования токена происходит ошибка (например, если токен поврежден или ненастоящий), будет выброшено исключение
        return false;
    }
}

// Эта функция обновляет токен доступа с помощью токена обновления
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');                          // Получение рефреш токена из localStorage

    if (!refreshTokenValid(refreshToken)) {                                             // Проверка валидности рефреш токена
        console.error('Рефреш токен истек или невалиден');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    try {                                                                               // Попытка обновить токен доступа внутри блока `try`
        const response = await api.post('/token/refresh/', { refresh: refreshToken });  // Функция отправляет асинхронный POST-запрос на серверный эндпоинт `/token/refresh/` с телом запроса, содержащим рефреш токен
        const data = response.data;                                                     // Сервер отвечает объектом с новыми токенами, который сохраняется в переменной `data`
        localStorage.setItem('accessToken', data.access);                               // Токен доступа из ответа сохраняется в `localStorage`
        if (data.refresh) {                                                             // Если сервер также присылает обновленный рефреш токен, он сохраняется в `localStorage`
            localStorage.setItem('refreshToken', data.refresh);
        }
        api.defaults.headers['Authorization'] = `Bearer ${data.access}`;                // Устанавливаем новый токен доступа в заголовок `Authorization` по умолчанию для последующих HTTP-запросов через `api`
        return data.access;
    }
    catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
    }
};

// Перехватчики запросов и ответов
// Этот перехватчик добавляет accessToken в заголовок Authorization для каждого запроса, если токен существует в localStorage
api.interceptors.request.use(async (config) => {                    // api.interceptors.request.use — используется для добавления функции перехватчика к запросам, отправляемым через api. Метод use принимает два аргумента: 1. Функция, которая обрабатывает конфигурацию запроса перед его отправкой. 2. Функция для обработки ошибок при формировании запроса.
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {                                              // Если токен доступа существует (то есть он не null), он добавляется в заголовок Authorization текущего конфигурационного объекта config, который представляет исходящий запрос
        config.headers['Authorization'] = `Bearer ${accessToken}`;  // Заголовок будет содержать токен в формате Bearer токен, который обычно используется для передачу токена в HTTP-заголовках
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Этот перехватчик обрабатывает ошибки ответа
api.interceptors.response.use(response => response, async (error) => {          // Используется для добавления перехватчика к ответам запросов, отправляемых через объект `api`. Первый аргумент: `response => response` - это простая callback-функция, которая просто возвращает ответ без изменений. Второй аргумент: `async (error) => { ... }` - Асинхронная функция, которая используется для обработки ошибок
    const originalRequest = error.config;                                       // Создаем переменную `originalRequest`, которая содержит конфигурацию исходного запроса, приведшего к ошибке. Эта конфигурация будет использоваться для повторной отправки запроса
    if (error.response.status === 401 && !originalRequest._retry) {             // Проверка, является ли статус ошибки 401 (Unauthorized). Это указывает на то, что доступ запрещен, вероятно, из-за истечения срока действия токена доступа. Проверяем также, был ли запрос уже повторен (`!originalRequest._retry`) - это предотвращает бесконечный цикл повторов в случае, если обновленный токен тоже недействителен или запрос по-прежнему неавторизован
        originalRequest._retry = true;                                          // Устанавливаем флаг `_retry` в `true` для того, чтобы указать, что запрос уже был повторен один раз
        const newAccessToken = await refreshAccessToken();                      // Асинхронно вызываем функцию `refreshAccessToken()`, чтобы получить новый токен доступа
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;  // Обновляем заголовок Authorization в исходной конфигурации запроса, подставляя в него новый токен доступа
        return api(originalRequest);                                            // Повторно отправляем оригинальный запрос с обновленным заголовком Authorization. Возвращаем результат вызова `api`, который является промисом. Это позволяет логике, вызвавшей первоначальный запрос, дождаться результата повторного запроса
    }
    return Promise.reject(error);                                               // Если условие на статус ошибки (401) не выполнено или если запрос уже был повторен, отклоняем промис с той же ошибкой
});

export default api;