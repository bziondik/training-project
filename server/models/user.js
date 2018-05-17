const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Укажите login'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Укажите email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Укажите пароль'],
  },
});

mongoose.model('user', userSchema);
