import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthLink() {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const [accessCode, setAccessCode] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {

            generateNewAccessCode();
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

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
    const generateNewAccessCode = async () => {
        try {
            const response = await axios.get('https://localhost:3000/generateNewAccessCode');
            setAccessCode(response.data.accessCode);
        } catch (error) {
            console.error('Error generating new access code:', error);
        }
    };

    return (
        <div className="components">
            <h1> Аунтификация</h1>
            <div>
                <label>Код доступа:</label>
                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>
            <div>
                <button onClick={authorize}>Ввести</button>
            </div>
            <div>
                <p>Новый код: {accessCode}</p>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
export default AuthLink;