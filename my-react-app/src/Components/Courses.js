import React, { useState, useEffect } from 'react';     // Используются для побочных эффектов и управления состоянием соответственно
import { Link } from 'react-router-dom';                // Используется для навигации между страницами.
import api from '../api/api';
import '../css/Courses.css';

function Courses() {
    const [courses, setCourses] = useState([]);                                                     // Создается состояние courses, которое изначально является пустым списком

    useEffect(() => {
        api.get('courses/')                                                                         // Запрос к API для получения списка курсов
            .then(response => {
                setCourses(response.data);                                                          // Установка полученных данных в состояние
            })
            .catch(error => console.error('Ошибка при выборе данных:', error));
    }, []);                                                                                         // Пустой массив зависимостей указывает на выполнение эффекта только при монтировании компонента

    return (
        <div className="course-container" id="courses">
            <h1>Курсы</h1>
            <div className="course-list">
                {courses.map(course => (
                    <Link to={`course/${course.id}/`} key={course.id} className="course-item">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${course.image_url}`}
                        alt={`Курс ${course.course_name}`} className="course-image" />
                        <div className="course-info">
                            <h3>{course.course_name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Courses;