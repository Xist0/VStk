import React, { useState } from 'react';
import axios from 'axios';

function AuthLink() {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

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

    return (
        <div className="components">
            <h1> Аунтификация</h1>
            <div >
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
