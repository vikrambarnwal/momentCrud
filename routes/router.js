const express = require('express');

const userController = require('./controller/user');
const momentController = require('./controller/moment');

const newrouter = express.Router();

module.exports = () => {

    userController(newrouter);
    momentController(newrouter);

    return newrouter;
};
