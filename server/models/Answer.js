const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
  text: {type: String, required: true, minLength: 1},
  ups: {type: Number, min: 0, default: 0},
  downs: {type: Number, min: 0, default: 0},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Answer = model('Answer', answerSchema);
module.exports = Answer;
