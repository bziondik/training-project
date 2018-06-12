const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = async function updateUser(req, res, next) {
  try {
    const userCurrent = await User.findById(req.params.id);
    userCurrent.isAdmin = req.body.isAdmin;
    const savedUser = await userCurrent.save();
    console.log('!!!->then save savedUser=', savedUser);
    const users = await User.find({});
    const usersToFront = users.map(user => user.toJSON());
    return res.status(200).json(usersToFront);
  } catch (error) {
    return next(error);
  }
};
