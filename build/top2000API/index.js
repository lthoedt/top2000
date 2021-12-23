require('dotenv').config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const route_rest = require('./routes/rest');
const cors = require('cors')

const expressApp = express();
const httpServer = http.createServer();

expressApp.use(cors({ origin: true, credentials: true }))
expressApp.options('*', cors({ origin: true, credentials: true }))

expressApp.use(bodyParser.json())

expressApp.use("/api/v1/", route_rest);

httpServer.on('request', expressApp);

if (require.main === module) {
    httpServer.listen(3001, () => {
        console.log("top2000 api is running!");
    });
} else {
    httpServer.listen();
}
module.exports = httpServer