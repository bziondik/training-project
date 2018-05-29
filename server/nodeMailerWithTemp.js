const secret = require('../secret');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const smtpTransport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.MAILER_EMAIL_ID || secret.sender,
    pass: process.env.MAILER_PASSWORD || secret.password,
  },
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve(__dirname, 'templates'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

module.exports = smtpTransport;
