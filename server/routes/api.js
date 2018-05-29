const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('user');

const serverConfig = require('../config');
const smtpTransport = require('../nodeMailerWithTemp');

const router = express.Router();

/* eslint-disable consistent-return */
// function checkPermissions(req, res, next) {
//   console.log('checkPermissions', req.path);
//   console.log('req.session.cookie', req.session.cookie);
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     console.error('401 Вы не авторизованы!');
//     res.status(401);
//     return res.json({ error: 'Вы не авторизованы!' });
//   }
// }

router.post('/saveNewUser', async (req, res, next) => {
  console.log('!!!->in route /saveNewUser');
  User.findOne({ username: req.body.username })
    .then((user) => {
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
      newUser
        .save()
        .then(savedUser => res.status(200).json(savedUser.toAuthJSON()))
        .catch(next);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  console.log('router.post login');
  passport.authenticate('loginUsers', { session: false }, (err, user) => {
    console.log('passport.authenticate err, user=', err, user);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400);
      return res.json({ message: 'Please enter correct login and password!' });
    }
    console.log('req.body =', req.body);
    return res.status(200).send(user.toAuthJSON());
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.status(200).send({
    success: true,
  });
});

router.post('/authFromToken', (req, res, next) => {
  console.log('router.post authFromToken');
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('passport.authenticate err, user=', err, user);
    if (err) {
      return res.status(401).send({
        success: false,
        error: err,
      });
    }
    if (!user) {
      return res.status(401).send({
        success: false,
      });
    }
    return res.status(200).send(user.toAuthJSON());
  })(req, res, next);
});

router.post('/forgotpassword', async (req, res, next) => {
  console.log('router.post forgotpassword');
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
      next(error);
    }
  } else {
    return res.status(400).json({ message: 'Email address is missing.' });
  }
});

router.post('/resetpassword', async (req, res, next) => {
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
});

module.exports = router;
