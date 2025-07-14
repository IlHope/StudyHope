import React, { useState } from 'react';                // Используются для побочных эффектов и управления состоянием соответственно
import { useNavigate } from 'react-router-dom';         // Хук используется для программной навигации
import api from '../api/api';
import '../css/RegistrationForm.css';

function RegistrationForm() {
    const [formData, setFormData] = useState({          // Используется для управления состоянием данных формы
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();                     // Создаёт функцию, позволяющую программно перемещаться между страницами

    // Эта функция обновляет состояние `formData` всякий раз, когда пользователь вводит данные в любом из полей формы
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value             // `e.target.name` используется для того, чтобы динамически обновить соответствующее поле в состоянии `formData`
        });
    }

    // `handleSubmit` вызывается при отправке формы
    const handleSubmit = async (e) => {
        e.preventDefault();                             // `e.preventDefault()` предотвращает перезагрузку страницы
        try {                                           // Выполняется HTTP POST запрос к `users/register/` с данными формы в формате JSON
            const response = await api.post('users/register/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {              // В случае успешной регистрации (статус 201) пользователь уведомляется и перенаправляется на страницу входа (`/login`)
                alert('Регистрация прошла успешно');
                navigate('/login');
            }
            else {
                alert('Ошибка при регистрации');
            }
        }
        catch (error) {
            alert('Ошибка при регистрации: ' + error.message);
        }
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Имя" />
            <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Фамилия" />
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Имя пользователя" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Почта" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Пароль" />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default RegistrationForm