import React, { useEffect, useState } from 'react';     // Используются для побочных эффектов и управления состоянием соответственно
import { useParams } from 'react-router-dom';           // Позволяет получить параметры из маршрута
import api from '../api/api';
import AddCourseToUserCabinet from './AddCourseToUserCabinet';
import '../css/CourseDetail.css';

function CourseDetail() {
    const [course, setCourse] = useState({});           // Создается состояние course, которое изначально является пустым объектом
    const { id } = useParams();                         // Используется useParams для извлечения параметра id из URL

    useEffect(() => {                                   // useEffect срабатывает при изменении id
        api.get(`courses/${id}/`)                       // Выполняется запрос к API для получения данных о курсе
            .then(response => {                         // При успешном запросе состояние course обновляется данными из ответа
                setCourse(response.data);
            })
            .catch(error => {
                console.log('Ошибка при выборе опредеенного курса', error);
            });
        window.scrollTo(0, 0);                          // Прокручивает страницу вверх
    }, [id]);

    return (
        <div className="course-detail-wrapper">
            <h1 className="course-detail-title">{course.course_name}</h1>
            <div className="course-detail-container">
                <p className="course-detail-description">{course.course_description}</p>
                <AddCourseToUserCabinet />
            </div>
        </div>
    );
}

export default CourseDetail;