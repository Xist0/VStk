const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// Разрешение CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Обработчик проверки кода при авторизации
app.post('/authorize', (req, res) => {
  const { verificationCode } = req.body;

  // Проверяем, совпадает ли введенный код с ожидаемым
  if (verificationCode === 'Test123') {
    // Код правильный, возвращаем успешный статус
    res.sendStatus(200);
  } else {
    // Код неверный, возвращаем статус "Unauthorized"
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Сертификат безопасности
const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt'),
};

// Исправленная строка создания HTTPS-сервера
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
