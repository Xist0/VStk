// Фронтенд (AuthLink.jsx)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthLink() {
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [error, setError] = useState('');
    
    // Проверяем, выполняется ли код в браузере
    const isBrowser = typeof window !== 'undefined';

    // Если код выполняется в браузере, используем относительный путь
    const serverAddress = isBrowser ? 'https://192.168.1.79:3000' : 'https://localhost:3000/api';

    const generateNewAccessCode = async () => {
      try {
        const response = await axios.get(`${serverAddress}/generateNewAccessCode`);
        setGeneratedCode(response.data.accessCode);
      } catch (error) {
        console.error('Error generating new access code:', error);
      }
    };
    
    const authorize = async () => {
      try {
        const response = await axios.post(
          `${serverAddress}/authorize`,
          { authorizationCode: verificationCode },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
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
    // Обновление кода доступа при загрузке компонента
    useEffect(() => {
        generateNewAccessCode();
    }, []);

    return (
        <div className="components">
            <h1> Аутентификация</h1>
            <div>
                <label>Код доступа:</label>
                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>
            <div>
                <button onClick={authorize}>Ввести</button>
            </div>
            <div>
                <p>Новый код доступа: {generatedCode}</p>
                <button onClick={generateNewAccessCode}>Обновить код доступа</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AuthLink;
