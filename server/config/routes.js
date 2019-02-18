const {homeCont, userCont, teamCont, projectCont, errorCont} = require('../controllers/controllerList');
const auth = require('./auth');

module.exports = app => {
    app.get('/', homeCont.index);
    app.get('/register', auth.isAnonymous, userCont.registerGet);
    app.post('/register', auth.isAnonymous, userCont.registerPost);
    app.post('/logout', auth.isAuthed, userCont.logout);
    app.get('/login', auth.isAnonymous, userCont.loginGet);
    app.post('/login', auth.isAnonymous, userCont.loginPost);
    app.get('/profile', auth.isAuthed, userCont.profileGet);

    app.get('/teams/create', auth.hasRole('Admin'), teamCont.createGet);
    app.post('/teams/create', auth.hasRole('Admin'), teamCont.createPost);
    app.get('/teams/manage', auth.isAuthed, teamCont.manageGet);
    app.post('/teams/manage', auth.hasRole('Admin'), teamCont.managePost);
    app.get('/teams/leave/:id', auth.isAuthed, teamCont.leaveTeamPost);

    app.get('/projects/create', auth.hasRole('Admin'), projectCont.createGet);
    app.post('/projects/create', auth.hasRole('Admin'), projectCont.createPost);
    app.get('/projects/manage', auth.isAuthed, projectCont.manageGet);
    app.post('/projects/manage', auth.hasRole('Admin'), projectCont.managePost);




    app.all('*', (req, res) => {
        errorCont.error(req, res, 'not-found');
    });
};
