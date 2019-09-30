const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  board: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  members: [
    {
      member: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: String
    }
  ],
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Board',
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

const Team = mongoose.model('teams', TeamSchema);
module.exports = Team;

const TeamSM = mongoose.model('Team', TeamSchema);
module.exports = TeamSM;