import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthLink() {
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');

    // Генерация нового кода доступа
    const generateNewAccessCode = async () => {
        try {
            const response = await axios.get('https://localhost:3000/generateNewAccessCode');
            setGeneratedCode(response.data.accessCode);
        } catch (error) {
            console.error('Error generating new access code:', error);
        }
    };

    // Проверка кода при авторизации
    const authorize = async () => {
        try {
            const response = await axios.post('https://localhost:3000/authorize', { verificationCode }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                window.location.href = '/auth';
            } else {
                setError('Unauthorized');
            }
        } catch (error) {
            setError('Не верный код доступа');
            console.error('Authorization error:', error);
        }
    };

    useEffect(() => {
        generateNewAccessCode(); // Вызов при загрузке компонента для отображения первоначального кода
    }, []);

    return (
        <div className="components">
            <h1> Аунтификация</h1>
            <div>
                <p>Новый код: {generatedCode}</p>
            </div>
            <div>
                <label>Код доступа:</label>
                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>
            <div>
                <button onClick={authorize}>Ввести</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AuthLink;
