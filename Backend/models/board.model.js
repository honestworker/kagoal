const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 6
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  templates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Template',
    }
  ],
  hide_cards: {
    type: Boolean,
    default: false
  },
  disable_votes: {
    type: Boolean,
    default: false
  },
  hide_vote_count: {
    type: Boolean,
    default: false
  },
  show_card_author: {
    type: Boolean,
    default: false
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

const Board = mongoose.model('boards', BoardSchema);

module.exports = Board;