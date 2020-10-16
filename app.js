var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');

var Router = require('./routes/router');
const auth = require('./middlewears/auth');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload());

app.use(bodyParser.json({
  limit: "100mb",
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString();
  },
  parameterLimit: 50000
}));

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  limit: "100mb",
  extended: true,
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString();
  },
  parameterLimit: 50000
}));


app.use(express.static(path.join(__dirname, 'public/webapp/dist/webapp/')));

app.use('/', auth, Router());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.msg = err.msg;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  return res.status(500).send({
    status: 500,
    msg: err.msg,
    data: null,
    error: res.locals.error
  });

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;