const mongoose = require('mongoose');

const User = mongoose.model('user');
const Calculator = mongoose.model('calculator');

module.exports = async function deleteUser(req, res, next) {
  try {
    await Calculator.deleteMany({ author: req.params.userid });
    const delUser = await User.findByIdAndRemove(req.params.id);
    console.log('!!!->then findByIdAndRemove user=', delUser);
    const users = await User.find({});
    const usersToFront = users.map(user => user.toJSON());
    return res.status(200).json(usersToFront);
  } catch (error) {
    return next(error);
  }
};
