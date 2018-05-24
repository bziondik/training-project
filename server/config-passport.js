const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const User = require('mongoose').model('user');
const uuidv4 = require('uuid/v4');

const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

passport.serializeUser((user, done) => {
  console.log('serializeUser: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser: ', id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
        if (!isValidPassword(user, password)) {
          return done(null, false);
        }
        const token = uuidv4();
        const userSave = user;
        userSave.access_token = token;
        user.save()
          .then((userSaved) => {
            done(null, userSaved);
          })
          .catch(err => done(err, false));
      })
      .catch((err) => {
        console.log('!!!User.findOne catch');
        done(err);
      });
  }),
);

module.exports = passport;
