const mongoose = require('mongoose');

const User = mongoose.model('user');

const serverConfig = require('../config');
const smtpTransport = require('../nodeMailerWithTemp');

module.exports = async function resetPassword(req, res, next) {
  console.log('router.post resetPassword');
  try {
    if (req.body.password !== req.body.confirm) {
      res.status(400);
      return res.json({ message: 'Password and confirm password not equal!' });
    }
    const user = await User.findOne({ resetToken: req.body.resetToken });
    console.log('findOne user=', user);
    if (!user) {
      res.status(400);
      return res.json({ message: 'User with such token does not exist' });
    }
    user.setPassword(req.body.password);
    user.resetToken = '';
    const savedUser = await user.save();
    console.log('user.update savedUser=', savedUser);
    const data = {
      to: savedUser.email,
      from: serverConfig.from,
      template: 'reset-password-email',
      subject: 'You password successufy reset!',
      context: {
        name: savedUser.username,
      },
    };
    // const info = await
    smtpTransport.sendMail(data);
    console.log('!!!res.status(200)');
    res.status(200).json({ message: 'Password has been reseted' });
    return res.end();
  } catch (error) {
    console.log('resetpassword error=', error);
    next(error);
  }
  return res.status(200).send(true);
};
