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
  template: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
  },
  columns: [
    {
      name: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true,
        default: '#ffffff'
      },
      order: {
        type: Number,
        required: true
      },
      items: [
        {
          content: {
            type: String,
            required: true
          },
          votes: {
            type: Number,
            default: 0
          },
          comments: [
            {
              comment: {
                type: String,
                required: true
              }
            }
          ]
        }
      ]
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