import {get, post, del} from './crud';

export const getRandomQuestion = (tag) => {
  return get('/question/random?tag=' + tag);
}

export const getQuestionById = (id) => {
  return get('/questions/find/:id');
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

export const deleteAnswer = (answerId) => {
  return del('/question/answer/delete/' + answerId);
}

export const getAnswers = (questionId) => {
  return get('/question/answers/' + questionId);
}

export const rateAnswer = (answerId, rating) => {
  return post('/question/answer/rate/' + answerId, {rating});
}

export const rateQuestion = (questionId, rating) => {
  return post('/question/rate/' + questionId, {rating});
}
