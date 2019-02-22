const {findByName, deleteByName, add} = require('../controllers/tagController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.get('/find/:name', auth.isAdmin, findByName);

router.post('/add', auth.isAdmin, add);

router.delete('/delete/:name', auth.isAdmin, deleteByName);

module.exports = router;
