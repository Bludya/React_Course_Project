import {get, post, put, del} from './crud';

export const getRandomQuestion = (tag) => {
  return get('/question/random?tag=' + tag);
}

export const getQuestionById = (id) => {
  return get('/question/find/:id');
}

export const getUnapprovedQuestions = () => {
  return get('/question/unapproved');
}

export const approveQuestionService = (id) => {
  return put('/question/approve/' + id);
}

export const postAnswer = (text, questionId) => {
  return post('/question/answer/' + questionId, {text});
}

export const postQuestion = (tags, text) => {
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
  return get('/question/answers/hide/' + id);
}

export const deleteAnswer = (answerId) => {
  return del('/question/answers/delete/' + answerId);
}

export const getAnswers = (questionId) => {
  return get('/question/answers/' + questionId);
}

export const rateAnswer = (answerId, rating) => {
  return put('/question/answers/rate/' + answerId, {rating});
}

export const rateQuestion = (questionId, rating) => {
  return put('/question/rate/' + questionId, {rating});
}
