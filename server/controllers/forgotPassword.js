const mongoose = require('mongoose');

const User = mongoose.model('user');

const serverConfig = require('../config');
const smtpTransport = require('../nodeMailerWithTemp');

module.exports = async function forgotPassword(req, res, next) {
  if (req.body.email !== undefined) {
    try {
      const emailAddress = req.body.email;
      const user = await User.findOne({ email: emailAddress });
      console.log('findOne user=', user);
      if (!user) {
        res.status(400);
        return res.json({ message: 'User with such email does not exist' });
      }
      const token = user.generateResetJWT();
      user.resetToken = token;
      const savedUser = await user.save();
      console.log('user.update savedUser=', savedUser);
      const data = {
        to: savedUser.email,
        from: serverConfig.from,
        template: 'forgot-password-email',
        subject: 'Password help has arrived!',
        context: {
          url: `${serverConfig.domen}/resetpassword?token=${savedUser.resetToken}`,
          name: savedUser.username,
        },
      };
      // const info = await
      smtpTransport.sendMail(data);
      console.log('!!!res.status(200)');
      res.status(200).json({ message: 'Check your email for further instructions' });
      return res.end();
    } catch (error) {
      console.log('forgotpassword error=', error);
      return next(error);
    }
  } else {
    return res.status(400).json({ message: 'Email address is missing.' });
  }
};
