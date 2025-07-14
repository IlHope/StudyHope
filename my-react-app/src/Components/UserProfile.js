import React, { useState, useEffect } from 'react';     // Используются для побочных эффектов и управления состоянием соответственно
import { Link } from 'react-router-dom';                // Используется для навигации между страницами.
import { format, parseISO } from 'date-fns';
import api from '../api/api';
import LogoutForm from './LogoutForm';
import '../css/UserProfile.css';

function UserProfile() {
    const [user, setUser] = useState({                  // Инициализация состояния для хранения пользователя
        id: null,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        courses: []
    });
    const [results, setResults] = useState([]);         // Инициализация состояния для хранения результатов
    const [condition, setCondition] = useState("data"); // Инициализация состояния для хранения состояния

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {                                                      // Функция для получения данных профиля, курсов и результатов тестов
        try {
            const profileResponse = await api.get('users/profile/');
            const userId = profileResponse.data.id;
            setUser(profileResponse.data);
            const coursesResponse = await api.get(`users/${userId}/courses`);
            const courses = Array.isArray(coursesResponse.data) ? coursesResponse.data : [];
            setUser(prevState => ({ ...prevState, courses }));
            const resultsResponse = await api.get(`results/user-results/${userId}`);
            setResults(resultsResponse.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const handleUpdateProfile = (event) => {                                                    // Функция для обновления профиля
        event.preventDefault();
        api.put('users/profile/', user)
        .then(response => {
            alert('Профиль успешно обновлён!');
        })
        .catch(error => {
            console.error('Ошибка при обновлении профиля:', error);
        });
    };

    const handleChange = (event) => {                                                           // Функция для обновления состояния при изменении полей формы.
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRemoveCourse = (courseId) => {                                                  // Функция для удаления курса из профиля пользователя
        api.delete(`courses/${courseId}/remove_from_user`)
            .then(() => {
                const updateCourses = user.courses.filter(course => course.id !== courseId);
                setUser(prevState => ({
                    ...prevState,
                    courses: updateCourses
                }));
            })
            .catch(error => {
                console.error('Ошибка при удалении курса:', error);
            });
    }

    const dateTranslation = (dateTimeString) => {                                               // Функция для форматирования дат
        const date = parseISO(dateTimeString);
        const formattedDateTime = format(date, 'dd.MM.yyyy HH:mm:ss');
        return formattedDateTime;
    }

    return (
        <div className="profile-container">
            <h1>Личный кабинет</h1>

            <div className="profile-sections">
                <div className="profile-sections-name">
                    <h2 onClick={() => setCondition("data")}>Мои данные</h2>
                    <h2 onClick={() => setCondition("courses")}>Мои курсы</h2>
                    <h2 onClick={() => setCondition("results")}>Результаты тестов</h2>
                </div>

                <div>
                    {condition === "data" && (
                        <div className="profile-section-content">
                            <form className="profile-form-container" onSubmit={handleUpdateProfile}>
                                <div>
                                    <label>Имя:</label>
                                    <input name="first_name" value={user.first_name} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Фамилия:</label>
                                    <input name="last_name" value={user.last_name} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Никнейм</label>
                                    <input name="username" value={user.username} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label>Почта:</label>
                                    <input name="email" type="email" value={user.email} onChange={handleChange}/>
                                </div>
                                <button type="submit">Обновить профиль</button>
                            </form>
                            <LogoutForm />
                        </div>
                    )}

                    {condition === "courses" && (
                        <ul className="profile-course-list">
                            {user.courses?.map(course => (       //user.courses && user.courses.map(course =>
                                <div key={course.id}>
                                    <Link to={`course/${course.id}/`}>
                                        {course.course_name}
                                    </Link>
                                    <button onClick={() => handleRemoveCourse(course.id)}
                                        style={{ marginLeft: '10px'}}>Удалить курс</button>
                                </div>
                            ))}
                        </ul>
                    )}

                    {condition === "results" && (
                        <ul className="profile-results-list">
                            {results?.map(result => (
                                <li key={result.id}>
                                    <p>Тест: {result.test_name}</p>
                                    <p>Количество очков: {result.score}</p>
                                    <p>Дата прохождения: {dateTranslation(result.date_completion)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;