var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});	

const User = mongoose.model('User', UserSchema);

module.exports = User;