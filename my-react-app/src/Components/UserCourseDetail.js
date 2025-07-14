import React, { useEffect, useState } from 'react';         // Используются для побочных эффектов и управления состоянием соответственно
import { useParams, useNavigate } from 'react-router-dom';  // Позволяет получить параметры из маршрута и предоставляет навигацию
import api from '../api/api';
import '../css/UserCourseDetail.css';

function UserCourseDetail() {
    const [course, setCourse] = useState({});               // Инициализация состояния для хранения курсов
    const [counter, setCounter] = useState(0);              // Инициализация состояния для хранения счетчика
    const [condition, setCondition] = useState(false);      // Инициализация состояния для хранения состояния

    const { id } = useParams();                             // Получение параметра id из маршрута
    const navigate = useNavigate();                         // Функция для навигации на другую страницу

    useEffect(() => {                                       // Запрос к API для получения курсов конкретного пользователя
        api.get(`courses/${id}/`)
            .then(response => {
                setCourse(response.data);                   // Установка полученных данных в состояние
            })
            .catch(error => console.error('Ошибка при выборе опредеенного курса', error));
    }, [id]);

    // Функция для перенаправления пользователя к тесту
    const handleGoToTest = () => {
        navigate(`testing/`);
    }

    return (
        <div>
            {condition ? (
                <div className="course-page">
                    <h2>{course.course_name}</h2>
                    {course.chapter && course.chapter.length > 0 && (
                        <div>
                            <h3>{course.chapter[counter].chapter_name}</h3>
                            {course.chapter[counter].content.map((content, index) => (
                                <p key={index} className="chapter-content">{content.content_text}</p>
                            ))}
                            <div className="navigation-buttons">
                                {counter === 0 &&
                                    <button onClick={() => setCondition(false)}>Содержание</button>
                                }
                                {counter !== 0 &&
                                    <button className="navigation-buttons-previous"
                                        onClick={() => setCounter(counter - 1)}>Предыдущая глава</button>
                                }
                                {course.chapter && counter !== (course.chapter.length - 1) &&
                                    <button className="navigation-buttons-next"
                                        onClick={() => setCounter(counter + 1)}>Следующая глава</button>
                                }
                                {course.chapter && counter === (course.chapter.length - 1) &&
                                    <button onClick={handleGoToTest}>Перейти к тестированию</button>
                                }
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="content-page">
                    <h1>Содержание</h1>
                    {course.chapter?.map((chapter, index) => (
                        <div key={index} className="chapter-item">
                            <p onClick={() => {
                                setCounter(index); setCondition(true)
                            }}>{chapter.chapter_name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserCourseDetail;

