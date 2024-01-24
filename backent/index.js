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

function generateAccessCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

app.get('/getAccessCode', (req, res) => {
  res.json({ accessCode });
});


app.get('/generateNewAccessCode', (req, res) => {
  accessCode = generateAccessCode();
  console.log(`Сгенерирован новый код - ${accessCode}`);
  res.json({ accessCode });

  // Установка таймера для удаления кода
  setTimeout(() => {
    accessCode = generateAccessCode();
    console.log(`Старый код удален - Сгенерирован новый код  (${accessCode})`);
  }, 50000);
});

// Проверка кода доступа
app.post('/authorize', (req, res) => {
  const { authorizationCode } = req.body;

  if (authorizationCode === accessCode.toString()) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized' });
  }
});

// Проксирование запросов фронта к API бэкенда
const apiProxy = createProxyMiddleware('/api', {
  target: `https://${ip.address()}:${port}`,
  changeOrigin: true,
});
app.use(apiProxy);

const options = {
  key: fs.readFileSync('./CRMServe-private.key'),
  cert: fs.readFileSync('./CRMServe.crt'),
};

const server = https.createServer(options, app);

server.listen(port, () => {
  const serverAddress = `https://${ip.address()}:${port}`;
  console.log(`Server is running on ${serverAddress}`);
});
