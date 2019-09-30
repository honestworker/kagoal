const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('../controllers/user.controller.js');

router.post('/register', function(req, res) {
  UserController.createTeamManager(req.body, res);
});

router.post('/invite', function(req, res) {
  UserController.inviteMember(req.body, res);
});

router.post('/login', (req, res) => {
  UserController.login(req.body, res);
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;