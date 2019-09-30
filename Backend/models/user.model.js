const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  full_name: {
    type: String
  },
  password: {
    type: String
  },
  verify_token: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  usage: {
    type: String,
  },
  describe: {
    type: String,
  },
  collaborate: {
    type: String,
  },
  manage: {
    type: String,
  },
  team: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;

const UserSM = mongoose.model('User', UserSchema);
module.exports = UserSM;