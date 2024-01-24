const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const ip = require('ip');
const { createProxyMiddleware } = require('http-proxy-middleware');

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

// Генерация нового шестизначного кода доступа
function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Получение текущего кода доступа
app.get('/getAccessCode', (req, res) => {
  res.json({ accessCode });
});

// Генерация нового кода доступа и установка таймера для его удаления через 5 секунд
app.get('/generateNewAccessCode', (req, res) => {
  accessCode = generateAccessCode();
  res.json({ accessCode });

  // Установка таймера для удаления кода через 5 секунд
  setTimeout(() => {
    accessCode = generateAccessCode();
    console.log('Access code expired and regenerated.');
  }, 500000);
});

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

// Проксирование запросов фронта к API бэкенда
const apiProxy = createProxyMiddleware('/api', {
  target: `https://${ip.address()}:${port}`,
  changeOrigin: true,
});
app.use(apiProxy);

// Сертификат безопасности
const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt'),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  const serverAddress = `https://${ip.address()}:${port}`;
  console.log(`Server is running on ${serverAddress}`);
});
