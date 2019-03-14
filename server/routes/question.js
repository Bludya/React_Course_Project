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
  approveQuestion,
  hideAnswer,
  showAnswer
} = require('../controllers/questionController');
const auth = require('../midles/auth');
const router = require('express').Router();

router.get('/find/:id', getOneById);
router.get('/random', getRandomQuestion);
router.get('/unapproved', auth.isAdmin, getAllUnapproved);
router.get('/tag/:tag', auth.isAuthed, getByTag);
router.get('/text/:text', auth.isAuthed, getByText);
router.get('/questions/user', auth.isAuthed, getQuestionsByUser);
router.get('/answers/user', auth.isAuthed, getAnswersByUser);
router.get('/answers/:id', getAnswersByQuestion);

router.post('/add', postQuestion);
router.post('/answer/:id', postAnswer);

router.delete('/answers/delete/:id', auth.isAdmin, deleteAnswer);

router.put('/edit/:id', auth.isAuthed, editQuestion);
router.put('/approve/:id', auth.isAdmin, approveQuestion);
router.put('/answers/rate/:id', auth.isAuthed, rateAnswer);
router.put('/rate/:id', auth.isAuthed, rateQuestion);

module.exports = router;
