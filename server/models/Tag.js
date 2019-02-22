const {Schema, model} = require('mongoose');

const tagSchema = new Schema({
  name: {type: String, required: true, minLength: 3}
})

const Tag = model('Tag', tagSchema);
module.exports = Tag;
