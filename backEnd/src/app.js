const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv-safe').config();
const routes = require('../src/routes/routesAll')
const dataBase = require('./database/config')
dataBase.connect()
app.use(cors());
app.use(express.json());
app.use(routes)


module.exports = app;