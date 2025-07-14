import React, { useState, useEffect } from 'react';     // Используются для побочных эффектов и управления состоянием соответственно
import { useParams } from 'react-router-dom';           // Позволяет получить параметры из маршрута
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';
import TestResult from './TestResult';
import '../css/CourseTesting.css';

function CourseTesting() {
    const [tests, setTests] = useState([]);             // Инициализация состояния для хранения тестов
    const [answers, setAnswers] = useState({});         // Инициализация состояния для хранения ответов
    const [score, setScore] = useState(null);           // Инициализация состояния для хранения результата
    const { courseId } = useParams();                   // Получение параметра courseId из маршрута

    const token = localStorage.getItem('accessToken');  // Получение токена из локального хранилища
    const decodeToken = jwtDecode(token);               // Декодирование токена
    const studentId = decodeToken.user_id;              // Извлечение user_id из декодированного токена

    useEffect(() => {                                                               // Запрос к API для получения тестов по курсу
        api.get(`courses/${courseId}/testings/`)
            .then(response => {
                setTests(response.data);                                            // Установка полученных данных в состояние
            })
            .catch(error => console.log('Ошибка при получении данных', error));
    }, [courseId]);                                                                 // Выполнение эффекта при изменении courseId

    const handleSubmit = () => {
        const payload = {
            student_id: studentId,
            test_id: courseId,
            answers: answers
        };
        console.log('Payload:', payload);
        api.post(`submit_answers/`, payload)                                        // Запрос к API для отправки ответов
            .then(response => {
                setScore(response.data.score);                                      // Установка полученного результата в состояние
            })
            .catch(error => console.log('Ошибка при отправке ответов', error));
    };

    if (score !== null) {                                                           // Отображение результата теста, если он есть
        return <TestResult score={score} />
    }

    return (
        <div className="test-page">
            {tests?.map(test => (
                <div key={test.id}>
                    <h2>{test.testing_name}</h2>
                    {test.question?.map(question => (
                        <div key={question.id} className="question-content">
                            <h3>{question.question_text}</h3>
                            {question.question_type === 'MC' ? (
                                <div className="options-container">
                                    {question.option?.map(option => (
                                        <label key={option.id}>
                                            <input type="radio" name={question.id} value={option.id}
                                                onChange={e => setAnswers({...answers, [question.id]: e.target.value})} />
                                            {option.option_text}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <textarea value={answers[question.id] || ''}
                                    onChange={e => setAnswers({...answers, [question.id]: e.target.value})}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <div className="submit-button-container">
                <button className="submit-button" onClick={() => handleSubmit()}>Завершить тест</button>
            </div>
        </div>
    );
}

export default CourseTesting;