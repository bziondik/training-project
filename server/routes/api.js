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
router.get('/test', (req, res) => {
  console.log('router.get test');
  return res.status(200).json({ test: true });
});

router.post('/saveNewUser', (req, res, next) => {
  console.log('!!!->in route /saveNewUser req=', req);
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
            return res.status(200).json(savedUser);
          });
        })
        .catch(next);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  console.log('router.post login');
  passport.authenticate('loginUsers', (err, user) => {
    console.log('passport.authenticate');
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(400);
      return res.json({ message: 'Укажите правильный логин и пароль!' });
    }
    console.log('req.body =', req.body);
    if (req.body.remember) {
      SetCookie(res, user.access_token);
    }
    req.login(user, (errLogin) => {
      if (errLogin) {
        return next(errLogin);
      }
      console.log('login user =', user);
      return res.status(200).send(user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/authFromToken', (req, res, next) => {
  User.findOne({ access_token: req.body.access_token })
    .then((user) => {
      if (!user) {
        res.status(400);
        return res.json({ message: 'Пользователя с таким токеном не существует!' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(user);
      });
    })
    .catch(next);
});

module.exports = router;
