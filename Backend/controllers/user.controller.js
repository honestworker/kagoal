const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model.js');
const Team = require('../models/team.model.js');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const TeamController = require('../controllers/team.controller.js');
const EmailController = require('../controllers/email.controller.js');

exports.getAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.createUser = (email) => {  
  const user = new User({
    email: email,
  });

  return user;
};

exports.getUser = (id) => {
  return new Promise(function(resolve, reject) {
    User.findOne({"_id": id})
      .then(user => {
        resolve(user);
      }).catch(err => {
        reject(err.message);
      });
   });
}

exports.inviteMember = (req, res) => {
  User.findOne({
    email: req.email
  }).then(user => {
    Team.findOne({
      user: user._id
    }).then(team => {
      req.members.forEach(function(member){
        if (member.email) {
          const newUser = new User({
            email: member.email
          });
          let role = "User";
          if (member.admin) {
            role = "Admin";
            team.members.push({member: newUser._id, role: 'admin'});
          } else {
            team.members.push({member: newUser._id, role: 'user'});
          }
          newUser.save();
          EmailController.sendInviteEmail(member.email, req.email, role, team.name);
        }
      });
      team.save();
      this.login(req, res);
    });
  });
}

exports.createTeamManager = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.email
  }).then(user => {
    if(user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    } else {
      const newTeam = TeamController.createTeamWidhName(req.team_name);
      const newUser = new User({
        email: req.email,
        full_name: req.full_name,
        password: req.password,
        usage: req.usage ? req.usage : '',
        describe: req.describe ? req.describe : '',
        collaborate: req.collaborate ? req.collaborate : '',
        manage: req.manage ? req.manage : '',
        team: req.team ? req.team : ''
      });

      bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          console.error('There was an error', err);
        } else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
              console.error('There was an error', err);
            } else {
              newUser.password = hash;
              bcrypt.genSalt(100, (err, token) => {
                if(err) {
                  console.error('There was an error', err);
                } else {
                  newUser.verify_token = token;
                  newUser.org = newTeam._id;
                  newUser
                    .save()
                    .then(user => {
                      newTeam.user = user._id;
                      newTeam.save()
                        .then(team => {
                          EmailController.sendConfirmEmail(user.email, team.name, token);
                          res.json("Successfull Created User and Team");
                        });
                    });
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.email;
  const password = req.password;

  User.findOne({email})
    .then(user => {
      if(!user) {
        errors.email = 'Email not found'
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
            }
            jwt.sign(payload, 'secret', {
              expiresIn: 3600
            }, (err, token) => {
              if(err) {
                console.error('There is some error in token', err);
              } else {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            });
          } else {
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          }
        });
    });
}