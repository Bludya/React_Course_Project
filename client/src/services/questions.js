import {get, post, del} from './crud';

export const getRandomQuestion = (tag) => {
  return get('/question/random?tag=' + tag);
}

export const postAnswer = (text, questionId) => {
  return post('/question/answer/' + questionId, {text});
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
