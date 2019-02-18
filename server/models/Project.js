const {Schema, model} = require('mongoose');

const projectSchema = new Schema({
  name: {type: Schema.Types.String, required: true, unique: true},
  description: {type: Schema.Types.String, required: true, maxlength: 50},
  team: {type: Schema.Types.ObjectId, ref: 'Team'}
})

const Project = model('Project', projectSchema);
module.exports = Project;
