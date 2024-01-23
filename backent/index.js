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

let accessCode = generateAccessCode();
let subscribers = [];

// Генерация нового шестизначного кода доступа
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000); // Генерация случайного числа от 100000 до 999999
}

// Подписка на изменение кода доступа
app.get('/subscribeAccessCode', (req, res) => {
  const newSubscriber = (newCode) => {
    res.json({ accessCode: newCode });
  };

  subscribers.push(newSubscriber);

  // Отправляем текущий код доступа вновь подписавшемуся клиенту
  newSubscriber(accessCode);
});

// Генерация нового кода доступа и уведомление подписчиков
function generateNewAccessCode() {
  accessCode = generateAccessCode();
  console.log('Access code regenerated:', accessCode);

  // Уведомляем всех подписчиков об изменении кода доступа
  subscribers.forEach(subscriber => subscriber(accessCode));
}

// Установка таймера для периодической генерации нового кода доступа
setInterval(generateNewAccessCode, 5000);

// Проверка кода доступа
app.post('/authorize', (req, res) => {
  const { authorizationCode } = req.body;

  // Проверяем, совпадает ли введенный код с текущим кодом доступа
  if (authorizationCode === accessCode.toString()) {
    // Если совпадает, возвращаем успешный результат
    res.json({ success: true });
  } else {
    // Если не совпадает, возвращаем ошибку
    res.status(401).json({ success: false, error: 'Unauthorized' });
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
