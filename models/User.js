const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = function (plainPassword) {
  return bcrypt.hash(plainPassword, Number(process.env.BCRYPT_SALT_ROUNDS));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
