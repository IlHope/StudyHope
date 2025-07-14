import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../Components/MainPage';

describe('MainPage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('Отображение главной страницы и ссылки "Регистрация", когда токен отсутствует', () => {
        render(
            <Router>
                <MainPage />
            </Router>
        );

        const welcomeText = screen.getByText('Добро пожаловать');
        expect(welcomeText).toBeInTheDocument();

        const registrationLink = screen.getByText('Регистрация');
        expect(registrationLink).toBeInTheDocument();
    });

    it('Ссылка "Регистрация" не отображается при наличии токена', () => {
        localStorage.setItem('accessToken', 'some-random-token');

        render(
            <Router>
                <MainPage />
            </Router>
        );

        const welcomeText = screen.getByText('Добро пожаловать');
        expect(welcomeText).toBeInTheDocument();

        const registrationLink = screen.queryByText('Регистрация');
        expect(registrationLink).not.toBeInTheDocument();
    });

    it('Отображение описания сайта', () => {
        render(
            <Router>
                <MainPage />
            </Router>
        );

        const descriptionText = screen.getByText(/Интерактивный онлайн-ресурс/i);
        expect(descriptionText).toBeInTheDocument();
    });
});