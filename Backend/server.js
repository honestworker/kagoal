// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

const users = require('./routes/user');
const teams = require('./routes/team');
const boards = require('./routes/board');
const templates = require('./routes/template');

const TemplateController = require('./controllers/template.controller.js');

const cors = require('cors');
const server = express();

server.use(cors())

server.use(passport.initialize());
require('./passport')(passport);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/api/users', users);
server.use('/api/teams', teams);
server.use('/api/boards', boards);
server.use('/api/templates', templates);

server.listen(config.SERVER.port, () => {
  console.log(`Server is running on PORT ${config.SERVER.port}`);
});

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Database is connected'), TemplateController.createTemp() },
  err => { console.log('Can not connect to the database' + err)}
);