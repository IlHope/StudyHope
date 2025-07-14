import React from 'react';
import '../css/TestResult.css';

function TestResult({ score }) {
    return (
        <div className="content-page">
            <div className="test-results">
                <h2>Результаты тестирования</h2>
                <p>Вы набрали {score} очков</p>
            </div>
        </div>
    );
}

export default TestResult;