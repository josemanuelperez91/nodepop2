const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

userSchema.statics.hashPassword = function (plainPassword) {
  return bcrypt.hash(plainPassword, Number(process.env.BCRYPT_SALT_ROUNDS));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
