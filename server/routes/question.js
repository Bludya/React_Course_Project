const {
  postQuestion,
  editQuestion,
  postAnswer,
  getOneById,
  getRandomQuestion,
  getAllUnapproved,
  getByTag,
  getByText,
  getQuestionsByUser,
  getAnswersByQuestion,
  getAnswersByUser,
  deleteAnswer,
  rateAnswer,
  rateQuestion,
} = require('../controllers/questionController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.get('/find/:id', getOneById);
router.get('/random', getRandomQuestion);
router.get('/unapproved', auth.isAuthed, getAllUnapproved);
router.get('/tag/:tag', auth.isAuthed, getByTag);
router.get('/text/:text', auth.isAuthed, getByText);
router.get('/questions/user', auth.isAuthed, getQuestionsByUser);
router.get('/answers/user', auth.isAuthed, getAnswersByUser);
router.get('/answers/:id', getAnswersByQuestion);

router.post('/add', postQuestion);
router.post('/answer/:id', postAnswer);
router.post('/answer/rate/:id', auth.isAuthed, rateAnswer);
router.post('/rate/:id', auth.isAuthed, rateQuestion);

router.delete('/answer/delete/:id', auth.isAdmin, deleteAnswer);

router.put('/edit/:id', auth.isAuthed, editQuestion);

module.exports = router;
