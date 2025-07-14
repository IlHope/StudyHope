import React from 'react';
import { Link } from 'react-router-dom';            // Используется для навигации между страницами.
import Courses from "./Courses";
import '../css/MainPage.css';

function MainPage() {
    let token = false;                              // Объявляем переменную token и устанавливаем ее значение false

    token = localStorage.getItem('accessToken');    // Извлекаем accessToken из локального хранилища (localStorage) и присваиваем его переменной token

    return (
        <div>
            <div className="main-img-container">
                <img src={`${process.env.REACT_APP_BACKEND_URL}/static/img/MainImg.jpg`} alt="Main Image" className="main-img" />
                <h1 className="main-img-text">Добро пожаловать</h1>
                {!token && (
                    <Link to={`register/`} className="main-img-text-register">
                        <p>Регистрация</p>
                    </Link>
                )}
            </div>
            <div className="main-description">
                <p><span className="main-description-name">StudyHope</span> <br/> Интерактивный онлайн-ресурс, предназначенный для <span className="main-description-students">студентов</span>. Сайт предоставляет возможности для изучения материалов и <span className="main-description-testing">прохождения тестирования</span> по различным дисциплинам.</p>
            </div>
            <Courses />
        </div>
    )
}

export default MainPage