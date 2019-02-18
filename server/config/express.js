const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const rootFolder = path.normalize(path.join(__dirname, '/../'));

module.exports = app => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
            res.locals.isAdmin = req.user.roles.indexOf('Admin') > -1;
        }
        next();
    });

    app.set('view engine', '.hbs');

    // This makes the content in the "public" folder accessible for every user.
    app.use(express.static(path.join(rootFolder, 'static')));
};
