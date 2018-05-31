const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = async function deleteUser(req, res, next) {
  try {
    const delUser = await User.findByIdAndRemove(req.params.id);
    console.log('!!!->then findByIdAndRemove user=', delUser);
    const users = await User.find({});
    const usersToFront = users.map(user => user.toJSON());
    return res.status(200).json(usersToFront);
  } catch (error) {
    return next(error);
  }
};
