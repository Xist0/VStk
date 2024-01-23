const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let accessCode = generateAccessCode(); // Изначальный шестизначный код доступа

// Генератор шестизначного кода доступа
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Обработчик получения текущего кода доступа
app.get('/getAccessCode', (req, res) => {
  res.json({ accessCode });
});

// Обработчик генерации нового кода доступа
app.get('/generateNewAccessCode', (req, res) => {
  accessCode = generateAccessCode();
  res.json({ accessCode });
});

// Обработчик проверки кода при авторизации
app.post('/authorize', (req, res) => {
  const { verificationCode } = req.body;

  // Проверяем, совпадает ли введенный код с текущим кодом доступа
  if (verificationCode === accessCode.toString()) {
    res.sendStatus(200);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Сертификат безопасности
const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt'),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
