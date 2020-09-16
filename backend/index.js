const express=require('express') ;
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const passport = require('./app/services/passport')

const router = require('./router');

const app = express();

// Log
let accessLogStream = fs.createWriteStream(path.join('.', 'crud.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

// Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Servidor rodando na porta:', port);

module.exports = app;
