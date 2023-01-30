const express = require('express');
const { RegisterNewUser } = require('../controller/AuthController');
const app = express();

const Router = express.Router();

Router.post('/users/register', RegisterNewUser);

module.exports = Router;
