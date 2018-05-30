const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = async function saveNewUser(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log('!!!->then findOne user=', user);
    if (user) {
      res.status(400);
      return res.json({ message: 'User with such login already exists' });
    }
    console.log('!!!->newUser req.body=', req.body);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: false,
    });
    newUser.setPassword(req.body.password);
    const savedUser = await newUser.save();
    return res.status(200).json(savedUser.toAuthJSON());
  } catch (error) {
    return next(error);
  }
};
