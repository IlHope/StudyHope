import React from 'react';                          // Основная библиотека для создания компонентов React
import ReactDOM from 'react-dom/client';            // Используется для рендеринга React-компонентов в DOM
import { BrowserRouter } from 'react-router-dom';   // Компонент маршрутизации для поддержки маршрутов в приложении
import App from './App';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Создание корневого элемента для рендеринга. document.getElementById('root') возвращает элемент DOM с id root, в который будут рендериться компоненты React
// Обертывание всего в <React.StrictMode> помогает выявлять потенциальные проблемы в приложении, такие как устаревшие API или нарушения правил React
// Предоставляет возможность использовать маршрутизацию в приложении
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
