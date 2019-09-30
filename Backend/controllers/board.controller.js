const Board = require('../models/board.model.js');
const Team = require('../models/team.model.js');

exports.getAll = (res) => {
  Board.find()
    .then(boards => {
      res.send(boards);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.createBoard = (user_id, data, res) => {
  const board_data = {
    name: '',
    votes: 6,
    templates: [],
    hide_cards: false,
    disable_votes: false,
    hide_vote_count: false,
    show_card_author: false,
  }

  if (typeof data.name === 'undefined') {
    res.status(401).send({
      message: 'Name field requrired'
    });
  }
  board_data.name = data.name;
  if (typeof data.votes != 'undefined') {
    board_data.votes = data.votes;
  }
  if (typeof data.templates != 'undefined') {
    board_data.templates = data.templates;
  }
  if (typeof data.hide_cards != 'undefined') {
    board_data.hide_cards = data.hide_cards;
  }
  if (typeof data.disable_votes != 'undefined') {
    board_data.disable_votes = data.disable_votes;
  }
  if (typeof data.hide_vote_count != 'undefined') {
    board_data.hide_vote_count = data.hide_vote_count;
  }
  if (typeof data.show_card_author != 'undefined') {
    board_data.show_card_author = data.show_card_author;
  }

  Team.findOne({user: user_id, path: ''})
    .then(team => {
      if (team) {
        board_data.team = team._id;
        const new_board = new Board(board_data);
        new_board.save()
          .then(saved_board => {
            team.boards.push(saved_board);
            res.send(saved_board);
          }).catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};