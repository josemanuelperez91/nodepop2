var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(cookieParser());
const i18nConfig = require('./i18nConfig')('en', 'lang');
app.use(i18nConfig.init);
require('./lib/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    return res
      .status(422)
      .json({ error: err.array({ onlyFirstError: true })[0] });
  }
  // set locals, only providing error in development

  res.status(err.status || 500);

  if (err.status && err.status >= 500) console.error(err);

  if (req.originalUrl.indexOf('/api') === 0) {
    res.json({ success: false, error: err.message });
    return;
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

module.exports = app;
