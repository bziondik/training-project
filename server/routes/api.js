const express = require('express');
const mongoose = require('mongoose');

const passport = require('../config-passport');
const saveNewUser = require('../controllers/saveNewUser');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');

const router = express.Router();
const User = mongoose.model('user');

router.post('/saveNewUser', saveNewUser);

router.post('/login', passport.authenticateLogin, (req, res) => {
  console.log('router.post login');
  console.log('req.body =', req.body);
  return res.status(200).send(req.user.toAuthJSON());
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.status(200).send({ success: true });
});

router.post('/authFromToken', passport.authenticateJWT, (req, res) => {
  console.log('router.post authFromToken');
  return res.status(200).send(req.user.toAuthJSON());
});

router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);

router.get('/users', passport.authenticateJWT, passport.mustBeAdmin, (req, res, next) => {
  console.log('router.get users');
  User.find({})
    .then((users) => {
      const usersToFront = users.map(user => user.toJSON());
      return res.status(200).json(usersToFront);
    })
    .catch(next);
});

module.exports = router;
