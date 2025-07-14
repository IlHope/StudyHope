import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Courses from '../Components/Courses';
import api from '../api/api';

jest.mock('../api/api');

describe('Courses component', () => {
    test('Отображение списка курсов, полученных из API', async () => {
        // Mock API response
        const courses = [
            {
                id: 1,
                course_name: 'Основы программирования',
                image_url: 'course1.jpg'
            },
            {
                id: 2,
                course_name: 'Веб-разработка',
                image_url: 'course2.jpg'
            }
        ];
        api.get.mockResolvedValue({ data: courses });

        render(
            <Router>
                <Courses />
            </Router>
        );

        // Проверяем, что заголовок отображается
        expect(screen.getByText(/Курсы/i)).toBeInTheDocument();

        // Ждем загрузки курсов и проверяем их отображение
        await waitFor(() => {
            expect(screen.getByText('Основы программирования')).toBeInTheDocument();
            expect(screen.getByText('Веб-разработка')).toBeInTheDocument();
        });

        // Проверяем, что изображения курсов корректно отображаются
        expect(screen.getByAltText('Курс Основы программирования')).toHaveAttribute('src', `${process.env.REACT_APP_BACKEND_URL}/course1.jpg`);
        expect(screen.getByAltText('Курс Веб-разработка')).toHaveAttribute('src', `${process.env.REACT_APP_BACKEND_URL}/course2.jpg`);
    });
});