const express = require('express');
const router = express.Router();
const passport = require('passport');

const BoardController = require('../controllers/board.controller.js');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.getAll(res);
});

router.get('/:tid/:bid', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.getBoard(req.params.tid, req.params.bid, res);
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.createBoard(req.user.id, req.body, res);
});

router.post('/clone/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.cloneBoard(req.params.id, res);
});

router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.updateBoard(req.params.id, req.body, res);
});

router.post('/columns/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.createBoardColumn(req.params.id, req.body, res);
});

router.post('/items/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.updateBoardItem(req.params.id, req.body, res);
});

router.delete('/items/:bid/:cid/:iid', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.deleteBoardItem(req.params.bid, req.params.cid, req.params.iid, res);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.deleteBoard(req.user.id, req.params.id, res);
});

module.exports = router;