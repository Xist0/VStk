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

const users = [
    {
        id_user: '1',
        user_role: 'Manager',
        user_telegramm_id: '@1',
        authorizationCode: '1', // Предполагаемый код доступа пользователя
        user_name: 'ISam',
        user_surname: 'Kiti',
    },
    {
        id_user: '2',
        user_role: 'Salesman',
        user_telegramm_id:'@2',
        authorizationCode: '2',
        user_name: 'Keni',
        user_surname: 'Opin',
    },
    {
        id_user: '3',
        user_role: 'Courier',
        user_telegramm_id:'@3',
        authorizationCode: '3',
        user_name: 'Fin',
        user_surname: 'Geris',
    },
    {
        id_user: '4',
        user_role: 'Baker',
        user_telegramm_id:'@4',
        authorizationCode: '4',
        user_name: 'Coock',
        user_surname: 'Migraf',
    },
    
];

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
        console.log(`Старый код удален - Сгенерирован новый код (${accessCode})`);
    }, 50000);
});

// Проверка кода доступа и айди телеграмм
app.post('/authorize', (req, res) => {
    const { authorizationCode, telegrammId } = req.body;

    // Поиск пользователя по коду и айди телеграмм
    const user = users.find(
        (u) => u.user_telegramm_id.toLowerCase() === telegrammId.toLowerCase() && u.authorizationCode === authorizationCode
    );

    if (user) {
        res.status(200).send('Authorized');
    } else {
        res.status(401).send('Unauthorized');
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
