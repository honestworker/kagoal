const express = require('express');
const router = express.Router();
const passport = require('passport');

const TeamController = require('../controllers/team.controller.js');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.getTeamsByUser(req.user.id, res);
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.createTeam(req.user.id, req.body, res);
});

router.get('/tree', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.getTeamsAsTree(req.user.id, res);
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.getTeam(req.params.id, res);
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.updateTeam(req.params.id, req.body, res);
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.deleteTeam(req.params.id, res);
});

router.get('/:id/tree', passport.authenticate('jwt', { session: false }), (req, res) => {
  TeamController.getTeamsAsTreeById(req.params.id, res);
});


module.exports = router;