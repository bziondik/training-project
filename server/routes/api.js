const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('user');

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
        return res.json({ message: 'Пользователь с таким логином уже существует' });
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
      return res.json({ message: 'Укажите правильный логин и пароль!' });
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

module.exports = router;
