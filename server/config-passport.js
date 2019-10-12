const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('user');

const config = require('../secret');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

// local strategy
passport.use(
  'loginUsers',
  new LocalStrategy((username, password, done) => {
    console.log('!!!LocalStrategy');
    console.log('username = ', username);
    console.log('password = ', password);
    console.log('done = ', !!done);
    User.findOne({ username })
      .then((user) => { // eslint-disable-line
        console.log('!!!User.findOne then user=', user);
        if (!user) {
          return done(
            null,
            false,
          );
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        console.log('!!!LocalStrategy User.findOne catch err=', err);
        done(err);
      });
  }),
);

const strategy = new JwtStrategy(
  {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (jwtPayload, done) => {
    console.log('JwtStrategy jwtPayload=', jwtPayload);
    User.findById(jwtPayload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        console.log('!!!Strategy User.find catch err=', err);
        done(err);
      });
  },
);

passport.use(strategy);

module.exports = {
  initialize: () => passport.initialize(),
  authenticateLogin: (req, res, next) => passport.authenticate(
    'loginUsers',
    { session: false },
    (err, user, info) => {
      console.log('authenticate info', info);
      if (err) {
        console.log('authenticate arr', err);
        return res.status(401).send({
          success: false,
          error: err,
        });
      }
      if (!user) {
        res.status(400);
        return res.json({ message: 'Please enter correct login and password!' });
      }
      // Forward user information to the next middleware
      req.user = user;
      return next();
    },
  )(req, res, next),
  authenticateJWT: (req, res, next) => passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      console.log('authenticate info', info);
      if (err) {
        console.log('authenticate arr', err);
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
      // Forward user information to the next middleware
      req.user = user;
      return next();
    },
  )(req, res, next),
  mustBeAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    }
    return res.status(403).send({
      message: 'Access forbidden - only for administrators.',
    });
  },
};
