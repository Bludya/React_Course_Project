const {register, logout, login} = require('../controllers/userController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.post('/register', auth.isAnonymous, register);
router.post('/login', auth.isAnonymous, login);

module.exports = router;
