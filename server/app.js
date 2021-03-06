const path = require('path');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const serverConfig = require('./config');
const secret = require('../secret');

const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

mongoose.Promise = global.Promise;
mongoose.connect(secret.database);
require('./models/user');
require('./models/calculators');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.set('port', process.env.PORT || serverConfig.port);

// sanitize input
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
});

// secure HTTP Headers
app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname.replace(serverConfig.serverRoute, ''), serverConfig.publicRoute)));

require('./config-passport');

// app.use(passport.initialize());

app.use('/api', apiRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
  console.log(' error=', err);
  next();
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
