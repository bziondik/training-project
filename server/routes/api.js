const express = require('express');
const passport = require('passport');
const bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');

const User = mongoose.model('user');


const router = express.Router();

const SetCookie = (res, data) => {
  res.cookie('access_token', data, {
    // TODO change maxAge
    httpOnly: false,
    expires: new Date(Date.now() + (2 * 604800000)),
    path: '/',
  });
};

const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

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
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.status(400);
        return res.json({ error: 'Пользователь с таким логином уже существует' });
      }
      const newUser = new User({
        username: req.body.username,
        password: createHash(req.body.password),
        email: req.body.email,
        access_token: uuidv4(),
      });
      newUser.save()
        .then((savedUser) => {
          req.logIn(savedUser, (err) => {
            if (err) {
              return next(err);
            }
            return res.json(savedUser);
          });
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400);
      return res.json({ error: 'Укажите правильный логин и пароль!' });
    }
    if (req.body.remembered) {
      SetCookie(res, user.access_token);
    }
    req.login(user, (errLogin) => {
      if (errLogin) {
        return next(errLogin);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.post('/authFromToken', (req, res, next) => {
  User.findOne({ access_token: req.body.access_token })
    .then((user) => {
      if (!user) {
        res.status(400);
        return res.json({ error: 'Пользователя с таким токеном не существует!' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    })
    .catch(next);
});

module.exports = router;
