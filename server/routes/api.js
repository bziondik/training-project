const express = require('express');
const mongoose = require('mongoose');

const passport = require('../config-passport');
const saveNewUser = require('../controllers/saveNewUser');
const forgotPassword = require('../controllers/forgotPassword');
const resetPassword = require('../controllers/resetPassword');
const deleteUser = require('../controllers/deleteUser');
const updateUser = require('../controllers/updateUser');
const createUser = require('../controllers/createUser');

const router = express.Router();
const User = mongoose.model('user');

router.post('/saveNewUser', saveNewUser);

router.post('/login', passport.authenticateLogin, async (req, res) => {
  console.log('router.post login');
  console.log('req.body =', req.body);
  console.log('req.user =', req.user);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
  return res.status(200).json(req.user.toAuthJSON());
});

router.post('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({ success: true });
});

router.post('/authFromToken', passport.authenticateJWT, (req, res) => {
  console.log('router.post authFromToken');
  return res.status(200).json(req.user.toAuthJSON());
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

router.get('/users/:id', passport.authenticateJWT, passport.mustBeAdmin, (req, res, next) => {
  console.log('router.get id', req.params.id);
  User.findById(req.params.id)
    .then(user => res.status(200).json(user.toJSON()))
    .catch(next);
});
router.post('/users', passport.authenticateJWT, passport.mustBeAdmin, createUser);
router.delete('/users/:id', passport.authenticateJWT, passport.mustBeAdmin, deleteUser);
router.put('/users/:id', passport.authenticateJWT, passport.mustBeAdmin, updateUser);

module.exports = router;
