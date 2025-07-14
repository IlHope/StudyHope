import React from 'react';
import { render, screen } from '@testing-library/react';
import TestResult from '../Components/TestResult';

describe('TestResult', () => {
    it('Отображение результата теста с правильной оценкой', () => {
        const score = 9;
        render(<TestResult score={score} />);

        // Проверка, что заголовок отображается
        const heading = screen.getByText('Результаты тестирования');
        expect(heading).toBeInTheDocument();

        // Проверка, что текст с очками отображается правильно
        const scoreText = screen.getByText(`Вы набрали ${score} очков`);
        expect(scoreText).toBeInTheDocument();
    });
});