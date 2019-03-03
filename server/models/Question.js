const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
  text: { type: String, required: true, unique: true, minLength: 3 },
  approved:{type: String, default: false},
  ups: {type: Number, min: 0, default: 0},
  downs: {type: Number, min: 0, default: 0},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Question = model('Question', questionSchema);
module.exports = Question;
