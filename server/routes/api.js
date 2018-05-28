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

router.post('/saveNewUser', (req, res, next) => {
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

router.post('/forgotpassword', (req, res, next) => {
  console.log('router.post resetPassword');
  if (req.body.email !== undefined) {
    console.log('req.body.email=', req.body.email);
    const emailAddress = req.body.email;
    User.findOne({ email: emailAddress })
      .then((user) => {
        console.log('!!!->then findOne user=', user);
        if (!user) {
          res.status(400);
          return res.json({ message: 'User with such email does not exist' });
        }
        const token = user.generateResetJWT();
        console.log('generateResetJWT token=', token);
        User.findByIdAndUpdate(user._id, { $set: { esetToken: token } }, { new: false }) // eslint-disable-line
          .then((savedUser) => {
            console.log('user.update savedUser=', savedUser);
            console.log('!!!->then savedUser=', savedUser);
            const data = {
              to: savedUser.email,
              from: serverConfig.email,
              template: 'forgot-password-email',
              subject: 'Password help has arrived!',
              context: {
                url: `${serverConfig.domen}/reset_password?token=${token}`,
                name: savedUser.username,
              },
            };
            console.log('!!!data=', data);
            smtpTransport.sendMail(data, (error, info) => {
              console.log('!!!smtpTransport.sendMail err=', error);
              console.log('!!!smtpTransport.sendMail info=', info);
              if (!error) {
                console.log('!!!res=', res);
                console.log('!!!res.status(200)');
                return res.status(200).json({ message: 'Kindly check your email for further instructions' });
              }
              return next(error);
            });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    return res.status(400).json({ message: 'Email address is missing.' });
  }
});

router.post('/resetpassword', (req, res) => {
  console.log('router.post resetPassword');
  return res.status(200).send(true);
});

module.exports = router;
