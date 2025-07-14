import React, { useState } from 'react';        // useState позволяет добавлять состояние в функциональные компоненты
import { useParams } from 'react-router-dom';   // useParams хук позволяет получить параметры URL
import api from '../api/api';
import '../css/AddCourseToUserCabinet.css';

function AddCourseToUserCabinet() {
    const { id } = useParams();                             // Извлекаем параметр id из URL. Это будет идентификатор курса, который мы хотим добавить в личный кабинет
    const [courseAdded, setCourseAdded] = useState(false);  // Создаем состояние courseAdded, чтобы отслеживать, был ли курс добавлен. setCourseAdded — функция для обновления значения состояния courseAdded

    const addCourseToUserCabinet = () => {                  // Функция используется для отправки запроса на сервер, чтобы добавить курс в личный кабинет пользователя
        api.post(`courses/${id}/add_to_user/`)              // Отправляем POST-запрос на сервер по указанному URL, используя идентификатор курса
            .then(response => {                             // Обработка успешно добавленного курса и возможных ошибок
                console.log('Курс успешно добавлен');
                setCourseAdded(true);
            })
            .catch(error => {
                console.log('Ошибка при добавлении курса в личный кабинет', error);
            });
    };

    // Условный рендеринг. Если курс добавлен (courseAdded равно true), отображаем сообщение об успешном добавлении курса
    // Иначе, отображаем кнопку для добавления курса
    return (
        <div className="div-add-course">
            {courseAdded ? (
                <p className="p-add-course">Курс успешно добавлен в личный кабинет</p>
            ) : (
                <button  className="button-add-course" onClick={addCourseToUserCabinet}>Добавить курс</button>
            )}
        </div>
    );
}

export default AddCourseToUserCabinet;