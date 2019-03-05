const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
  text: { type: String, required: true, unique: true, minLength: 3 },
  approved:{type: String, default: false},
  ups: [{type: Schema.Types.ObjectId, ref:'User'}],
  downs: [{type: Schema.Types.ObjectId, ref:'User'}],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Question = model('Question', questionSchema);
module.exports = Question;
