const {userCont} = require('../controllers/controllerList');
const auth = require('./auth');

module.exports = app => {
    app.get('/register', auth.isAnonymous, userCont.registerGet);
    app.post('/register', auth.isAnonymous, userCont.registerPost);
    app.post('/logout', auth.isAuthed, userCont.logout);
    app.get('/login', auth.isAnonymous, userCont.loginGet);
    app.post('/login', auth.isAnonymous, userCont.loginPost);
    app.get('/profile', auth.isAuthed, userCont.profileGet);

    app.all('*', (req, res) => {
        errorCont.error(req, res, 'not-found');
    });
};
