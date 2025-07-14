import React, { useState } from 'react';                // Хук для управления состоянием компонентов
import { useNavigate } from 'react-router-dom';         // Хук для навигации между страницами
import api from '../api/api';
import '../css/LoginForm.css';

function LoginForm(){
    const [username, setUsername] = useState('');       // Инициализация состояния для хранения username
    const [password, setPassword] = useState('');       // Инициализация состояния для хранения пароля

    const navigate = useNavigate();                     // Функция для навигации на другую страницу

    const checkToken = () => {                          // Проверяет наличие `accessToken` в локальном хранилище и перенаправляет на страницу профиля, если токен присутствует
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/profile');
        }
    }

    // Обработчик формы, который отправляет запрос на сервер с именем пользователя и паролем
    // Сохраняет токены в локальное хранилище и вызывает функцию `checkToken` для навигации на страницу профиля в случае успешной аутентификации
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('token/',
            {
                username,
                password
            });

            const data = response.data;

            if (response.status === 200){
                console.log('Успешная авторизация:', data);
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                console.log('Токен сохранен в локальном хранилище')
                checkToken();
            }
            else {
                console.error('Ошибка авторизации:', data);
            }
        }
        catch (error) {
            console.error('Ошибка авторизации:', error.response?.data || error.message);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Вход</h1>
            <div className="login-form-group">
                <label htmlfor="username">Имя пользователя:</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="login-form-group">
                <label htmlfor="password">Пароль:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Войти</button>
        </form>
    );
}

export default LoginForm;