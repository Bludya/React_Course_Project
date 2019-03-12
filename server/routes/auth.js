const {register, logout, login, getAllUsers, banUser, makeAdmin} = require('../controllers/userController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.get('/get-users', auth.isAdmin, getAllUsers);

router.post('/register', auth.isAnonymous, register);
router.post('/login', auth.isAnonymous, login);

router.put('/ban/:id', auth.isAdmin, banUser);
router.put('/make-admin/:id', auth.isAdmin, makeAdmin);

module.exports = router;
