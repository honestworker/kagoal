const express = require('express');
const router = express.Router();
const passport = require('passport');

const TemplateController = require('../controllers/template.controller.js');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  TemplateController.getAll(res);
});

module.exports = router;