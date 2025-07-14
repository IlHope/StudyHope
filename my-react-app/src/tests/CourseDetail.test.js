import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CourseDetail from '../Components/CourseDetail';
import api from '../api/api';
import fetchMock from 'jest-fetch-mock';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../api/api');

describe('CourseDetail', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('Корректное отображение информации о курсе', async () => {
        const mockCourseData = {
            course_name: 'Тестовый курс',
            course_description: 'Описание тестового курса',
        };

        useParams.mockReturnValue({ id: '1' });
        api.get.mockResolvedValue({ data: mockCourseData });

        render(
            <Router>
                <CourseDetail />
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText('Тестовый курс')).toBeInTheDocument();
            expect(screen.getByText('Описание тестового курса')).toBeInTheDocument();
        });
    });

    it('Корректное обрабатывание ошибки API', async () => {
        useParams.mockReturnValue({ id: '1' });
        api.get.mockRejectedValue(new Error('API ошибка'));

        render(
            <Router>
                <CourseDetail />
            </Router>
        );

        await waitFor(() => {
            expect(screen.queryByText('Тестовый курс')).not.toBeInTheDocument();
            expect(screen.queryByText('Описание тестового курса')).not.toBeInTheDocument();
        });
    });
});