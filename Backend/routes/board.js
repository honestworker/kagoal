const express = require('express');
const router = express.Router();
const passport = require('passport');

const BoardController = require('../controllers/board.controller.js');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.getAll(res);
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  BoardController.createBoard(req.user.id, req.body, res);
});

module.exports = router;