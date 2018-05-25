const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('user');

const config = require('../secret');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

// локальная стратегия
passport.use(
  'loginUsers',
  new LocalStrategy((username, password, done) => {
    console.log('!!!LocalStrategy');
    console.log('username = ', username);
    console.log('password = ', password);
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
