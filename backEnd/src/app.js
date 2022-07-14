const express = require('express')
const app = express()
const cors = require('cors')
const dataBase = require('./database/config')
require('dotenv-safe').config();
dataBase.connect()
app.use(cors());
app.use(express.json());


module.exports = app;