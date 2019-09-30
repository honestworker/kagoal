const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.team_name = !isEmpty(data.team_name) ? data.team_name : '';

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if(!Validator.isLength(data.full_name, { min: 2, max: 30 })) {
    errors.full_name = 'Name must be between 2 to 30 chars';
  }

  if(!Validator.isLength(data.password, {min: 8, max: 30})) {
    errors.password = 'Password must have 8 chars';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if(Validator.isEmpty(data.team_name)) {
    errors.team_name = 'Team Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}