import React from 'react';
import api from '../api/api';
import '../css/LogoutForm.css';

function LogoutForm() {
    const logout = async() => {                                         // Объявление функции logout, которая будет вызываться при клике на кнопку "Выход"
        const refreshToken = localStorage.getItem('refreshToken');      // Извлекаем refreshToken из локального хранилища (localStorage)

        try {                                                           // Отправляем POST-запрос к API для разлогина пользователя, передавая refreshToken в теле запроса
            await api.post('users/logout/', { refresh: refreshToken });
        }
        catch (error) {
            console.error('Ошибка при попытке разлогинить пользователя:', error);
        }

        // Очистка локальных токенов и перенаправление
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        api.defaults.headers['Authorization'] = '';
        window.location.href = '/login';
    };

    return (
        <p><button className="logout-form" onClick={logout}>Выход</button></p>
    );
};

export default LogoutForm;