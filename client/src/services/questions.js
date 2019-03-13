import {get, post, put, del} from './crud';
const {safe_tags} = require('./defensiveFunctions');

export const getRandomQuestion = (tag) => {
  tag = safe_tags(tag);
  return get('/question/random?tag=' + tag);
}

export const getQuestionById = (id) => {
  id=safe_tags(id);
  return get('/question/find/:id');
}

export const getUnapprovedQuestions = () => {
  return get('/question/unapproved');
}

export const approveQuestionService = (id) => {
  id = safe_tags(id);
  return put('/question/approve/' + id);
}

export const postAnswer = (text, questionId) => {
  questionId = safe_tags(questionId);
  return post('/question/answer/' + questionId, {text});
}

export const postQuestion = (tags, text) => {
  tags = safe_tags(tags);
  text = safe_tags(text);
  return post('/question/add', {text, tags});
}

export const getQuestionsByUser = () => {
  return get('/question/questions/user');
}

export const getAnswersByUser = () => {
  return get('/question/answers/user');
}

export const getHiddenAnswers = () => {
  return get('/question/answers/hidden')
}

export const hiseAnswerService = (id) => {
  id = safe_tags(id);
  return get('/question/answers/hide/' + id);
}

export const deleteAnswer = (answerId) => {
  answerId = safe_tags(answerId);
  return del('/question/answers/delete/' + answerId);
}

export const getAnswers = (questionId) => {
  questionId = safe_tags(questionId);
  return get('/question/answers/' + questionId);
}

export const rateAnswer = (answerId, rating) => {
  answerId = safe_tags(answerId);
  rating = safe_tags(rating);
  return put('/question/answers/rate/' + answerId, {rating});
}

export const rateQuestion = (questionId, rating) => {
  questionId = safe_tags(questionId);
  rating = safe_tags(rating);
  return put('/question/rate/' + questionId, {rating});
}
