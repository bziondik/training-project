const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = async function createUser(req, res, next) {
  try {
    const userByName = await User.findOne({ username: req.body.username });
    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByName) {
      res.status(400);
      return res.json({ message: 'User with such username already exists' });
    }
    if (userByEmail) {
      res.status(400);
      return res.json({ message: 'User with such email already exists' });
    }
    console.log('!!!->newUser req.body=', req.body);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      isAdmin: false,
    });
    newUser.setPassword(req.body.password);
    await newUser.save();
    const users = await User.find({});
    const usersToFront = users.map(user => user.toJSON());
    return res.status(200).json(usersToFront);
  } catch (error) {
    return next(error);
  }
};
