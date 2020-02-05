const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const https = require('https');
const path = require('path')
const fs = require('fs');

const app = express();
const databaseConnection = require('./database').databaseConnection;

//Loading Settings for dev or prod mode
if (process.env.NODE_ENV == 'prod') dotenv.config({ path: 'configs/.env' });
else dotenv.config({ path: 'configs/.dev.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setting up DB connections
databaseConnection();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_token');
    res.setHeader('set-cookie', [
        'same-site-cookie=bar; SameSite=Lax',
        'cross-site-cookie=foo; SameSite=None; Secure',
    ]);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const routes = require('./route')(app);

if (process.env.NODE_ENV == 'prod') {
    const options = {
        key: fs.readFileSync(process.env.SSL_PATH + 'privkey.pem'),
        cert: fs.readFileSync(process.env.SSL_PATH + 'cert.pem'),
        ca: [fs.readFileSync(process.env.SSL_PATH + 'chain.pem'), fs.readFileSync(process.env.SSL_PATH + 'fullchain.pem')]
    }
    let httpsServer = https.createServer(options, app);
    httpsServer.listen(process.env.HTTPS_PORT, () => {
        console.log(`Application runing in ${process.env.NODE_ENV} on port ${process.env.HTTPS_PORT}`)
    });
}
else {
    let httpServer = http.createServer(app);
    httpServer.listen(process.env.PORT, () => {
        console.log(`Application runing in ${process.env.NODE_ENV || 'dev'} on port ${process.env.PORT}`)
    });
}

