const {register, logout, login} = require('../controllers/user-controller');
const auth = require('../midles/auth');
const router = require('express').Router();

router.post('/register', auth.isAnonymous, register);
router.post('/logout', auth.isAuthed, logout);
router.post('/login', auth.isAnonymous, login);

module.exports = router;
