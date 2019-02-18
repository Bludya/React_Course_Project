const {Schema, model} = require('mongoose');

const teamSchema = new Schema({
  name:{type: Schema.Types.String, required: true, unique: true},
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
})

const Team = model('Team', teamSchema);
module.exports = Team;
