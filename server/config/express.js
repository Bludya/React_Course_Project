const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('../routes/auth');
const cors = require('../midles/cors');
const tokenGeter = require('../midles/tokenGeter');

module.exports = (app, config) => {
    app.use(bodyParser.json());
    app.use(cors);
    app.use(tokenGeter);
    app.use('/auth', authRoutes);
};
