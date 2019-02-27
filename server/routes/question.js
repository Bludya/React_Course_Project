const {postQuestion, editQuestion, postAnswer, getOneById, getRandomQuestion, getAllUnapproved, getByTag, getByText} = require('../controllers/questionController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.get('/find/:id', getOneById);
router.get('/random', getRandomQuestion);
router.get('/unapproved', auth.isAuthed, getAllUnapproved);
router.get('/tag/:tag', auth.isAuthed, getByTag);
router.get('/text/:text', auth.isAuthed, getByText);

router.post('/add', postQuestion);
router.post('/answer/:id', postAnswer);
router.put('/edit/:id', auth.isAuthed, editQuestion);

module.exports = router;
