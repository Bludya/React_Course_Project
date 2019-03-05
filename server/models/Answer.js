const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
  text: {type: String, required: true, minLength: 1},
  ups: [{type: Schema.Types.ObjectId, ref:'User'}],
  downs: [{type: Schema.Types.ObjectId, ref:'User'}],
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Answer = model('Answer', answerSchema);
module.exports = Answer;
