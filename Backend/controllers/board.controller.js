const Board = require('../models/board.model.js');
const Team = require('../models/team.model.js');
const Template = require('../models/template.model.js');

const getColumnColor = (template, order) => {
  if (template.columns.length) {
    return template.columns[order % template.columns.length].color;
  }
  return '#009688';
}

const reverseBoardItemComment = (board) => {
  const board_data = board;
  if (board_data.columns.length) {
    for (let column_indx = 0; column_indx < board_data.columns.length; column_indx++) {
      if (board_data.columns[column_indx].items.length) {
        for (let item_indx = 0; item_indx < board_data.columns[column_indx].items.length; item_indx++) {
          if (board_data.columns[column_indx].items[item_indx].comments.length) {
            board_data.columns[column_indx].items[item_indx].comments.reverse();
          }
        }
        board_data.columns[column_indx].items.reverse();
      }
    }
  }
  board_data.columns.sort(function(a, b) { return a.order - b.order } );
  return board_data;
}

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

exports.getBoard  = (team_id, board_id, res) => {
  Board.findOne({"_id": board_id})
    .then(board => {
      if (board) {
        if (board.team == team_id) {
          res.send(reverseBoardItemComment(board));
        }
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.createBoard = (user_id, data, res) => {
  if (typeof data.name === 'undefined' || 
      typeof data.hide_cards === 'undefined' || 
      typeof data.disable_votes === 'undefined' || 
      typeof data.hide_vote_count === 'undefined' || 
      typeof data.show_card_author === 'undefined' || 
      typeof data.template === 'undefined') {
    res.status(401).send({
      message: 'Name field requrired'
    });
  }
  const board_data = {
    name: data.name,
    votes: data.votes,
    template: data.template,
    columns: [],
    hide_cards: data.hide_cards,
    disable_votes: data.disable_votes,
    hide_vote_count: data.hide_vote_count,
    show_card_author: data.show_card_author,
  }
  Template.findOne({_id: data.template})
    .then(template => {
      if (template) {
        template.columns.map((loop_column, indx) => {
          board_data.columns.push({
            name: loop_column.name,
            color: loop_column.color,
            order: indx,
            items: [],
          })
        });
        Team.findOne({user: user_id, path: ''})
          .then(team => {
            if (team) {
              board_data.team = team._id;
              const new_board = new Board(board_data);
              new_board.save()
                .then(saved_board => {
                  team.boards.push(saved_board._id);                  
                  team.save();
                  res.send(reverseBoardItemComment(saved_board));
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
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.cloneBoard = (id, res) => {
  Board.findOne({'_id': id})
    .then(board => {
      if (board) {
        Team.findOne({'_id': board.team})
          .then(team => {
            if (team) {
              const board_data = {
                name: board.name + "(copy)",
                votes: board.votes,
                template: board.template,
                columns: [],
                hide_cards: board.hide_cards,
                disable_votes: board.disable_votes,
                hide_vote_count: board.hide_vote_count,
                show_card_author: board.show_card_author,
                team: board.team,
              }
              // Template.findOne({'_id': board.template})
              //   .then(template => {
              //     if (template) {
              //       template.columns.map((loop_column, indx) => {
              //         board_data.columns.push({
              //           name: loop_column.name,
              //           color: loop_column.color,
              //           order: indx,
              //           items: [],
              //         })
              //       });
              //     }
              //   }).catch(err => {
              //     res.status(500).send({
              //       message: err.message
              //     });
              //   });
              board.columns.map((loop_column, indx) => {
                board_data.columns.push({
                  name: loop_column.name,
                  color: loop_column.color,
                  order: indx,
                  items: [],
                })
              });
              const new_board = new Board(board_data);
              new_board.save()
                .then(saved_board => {
                  team.boards.push(saved_board._id);
                  team.save();
                  res.send(reverseBoardItemComment(saved_board));
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
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.createBoardColumn = (id, data, res) => {
  Board.findOne({'_id': id})
    .populate('template')
    .then(board => {
      if (board) {
        const new_order = board.columns.length;
        board.columns.push({
          name: data.name,
          color: getColumnColor(board.template, new_order),
          order: new_order,
          items: []
        });
        board.save()
          .then(saved_board => {
            res.send(reverseBoardItemComment(saved_board));
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
}

exports.deleteBoard = (user_id, id, res) => {
  Board.findOne({"_id": id})
    .then(board => {
      if (board) {
        Team.findOne({"user": user_id, "path": ""})
          .then(team => {
            if (team.boards.length) {
              for (let board_indx = 0; board_indx < team.boards.length; board_indx++) {
                if (team.boards[board_indx] == id) {
                  team.boards.splice(board_indx, 1);
                }
              }
            }
            team.save();
            board.remove();
            res.send("OK");
          }).catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      } else {
        res.status(402).send({
          message: "Can not delete the root team"
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.updateBoard = (id, data, res) => {
  Board.findOne({'_id': id})
    .then(board => {
      if (board) {
        if (data['action'] == 'field') {
          for (var prop in data) {
            if ( data.hasOwnProperty(prop) ) {
              if (prop in board) {
                board[prop] = data[prop];
              }
            } 
          }
        } else {
          if (data['action'] == 'reset_all_votes') {
            if (board.columns.length) {
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                if (board.columns[column_indx].items.length) {
                  for (let item_indx = 0; item_indx < board.columns[column_indx].items.length; item_indx++) {
                    board.columns[column_indx].items[item_indx].votes = 0;
                  }
                }
              }
            }
          } else if (data['action'] == 'reset_all_cards') {
            if (board.columns.length) {
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                board.columns[column_indx].items = [];
              }
            }
          } else if (data['action'] == 'exchange_column') {
            let start_id = 0;
            let end_id = 0;
            let start_order = 0;
            let end_order = 0;
            if (board.columns.length) {
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                if (board.columns[column_indx]._id == data['start_id']) {
                  start_id = column_indx;
                  start_order = board.columns[column_indx].order;
                } else if (board.columns[column_indx]._id == data['end_id']) {
                  end_id = column_indx;
                  end_order = board.columns[column_indx].order;
                }
              }
            }
            board.columns[start_id].order = end_order;
            board.columns[end_id].order = start_order;
          } else if (data['action'] == 'column_title') {
            if (board.columns.length) {
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                if (board.columns[column_indx]._id == data['column']) {
                  board.columns[column_indx].name = data['name'];
                }
              } 
            }
          } else if (data['action'] == 'delete_column') {
            if (board.columns.length) {
              let del_id = 0;
              let del_order = 0;
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                if (board.columns[column_indx]._id == data['column']) {
                  del_id = column_indx;
                  del_order = board.columns[column_indx].order ;
                }
              }
              board.columns.splice(del_id, 1);
              for (let column_indx = 0; column_indx < board.columns.length; column_indx++) {
                if (board.columns[column_indx].order > del_order) {
                  board.columns[column_indx].order = board.columns[column_indx].order - 1;
                }
              }
            }
          }
        }

        board.save()
          .then(saved_board => {
            res.send(reverseBoardItemComment(saved_board));
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

exports.updateBoardItem = (id, data, res) => {
  Board.findOne({'_id': id})
    .then(board => {
      if (board) {
        const item_id = data['item'];
        const column_id = data['column'];
        board.columns.map((loop_column, column_indx) => {
          if (loop_column._id == column_id) {
            if (data['action'] === 'content') {
              const content = data['content'];
              if (item_id) {
                loop_column.items.map((loop_item, item_indx) => {
                  if (loop_item._id == item_id) {
                    board.columns[column_indx].items[item_indx].content = content;
                  }
                });
              } else {
                board.columns[column_indx].items.push({
                  content: content
                });
              }
            } else {
              loop_column.items.map((loop_item, item_indx) => {
                if (loop_item._id == item_id) {
                  if (data['action'] === 'vote') {
                    board.columns[column_indx].items[item_indx].votes = board.columns[column_indx].items[item_indx].votes + 1;
                  } else if (data['action'] === 'unvote') {
                    if (board.columns[column_indx].items[item_indx].votes) {
                      board.columns[column_indx].items[item_indx].votes = board.columns[column_indx].items[item_indx].votes - 1;
                    }
                  } else if (data['action'] === 'add_comment') {
                    board.columns[column_indx].items[item_indx].comments.push({comment: data['comment']});
                  } else if (data['action'] === 'del_comment') {
                    loop_item.comments.map((loop_comment, comment_indx) => {
                      if (loop_comment._id == data['comment']) {
                        board.columns[column_indx].items[item_indx].comments.splice(comment_indx, 1);
                      }
                    });
                  }
                }
              });
            }
          }
        });
        
        board.save()
          .then(saved_board => {
            res.send(reverseBoardItemComment(saved_board));
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

exports.deleteBoardItem = (bid, cid, iid, res) => {
  Board.findOne({'_id': bid})
    .then(board => {
      if (board) {
        board.columns.map((loop_column, column_indx) => {
          if (loop_column._id == cid) {
            loop_column.items.map((loop_item, item_indx) => {
              if (loop_item._id == iid) {
                board.columns[column_indx].items.splice(item_indx, 1);
              }
            });
          }
        });
        
        board.save()
          .then(saved_board => {
            res.send(reverseBoardItemComment(saved_board));
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