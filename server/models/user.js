const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../secret');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    unique: true,
  },
  hash: {
    type: String,
    required: [true, 'Укажите пароль'],
  },
  isAdmin: {
    type: Boolean,
  },
  resetToken: {
    type: Boolean,
  },
});

/* eslint-disable func-names */
userSchema.methods.setPassword = function (password) {
  this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + (30 * 24 * 60 * 60)); // exp 1 month

  return jwt.sign({
    id: this._id, // eslint-disable-line
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (1 * 60),
  }, config.secret);
};

userSchema.methods.generateResetJWT = function () {
  console.log('setResetJWT this=', this);
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + (30 * 24 * 60 * 60)); // exp 1 month

  return jwt.sign({
    id: this._id, // eslint-disable-line
    username: this.username,
    exp: Math.floor(Date.now() / 1000) + (1 * 60),
  }, config.secret);
};

userSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin,
    access_token: this.generateJWT(),
  };
};

mongoose.model('user', userSchema);
