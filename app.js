var express         = require('express');
var app             = express();
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var session         = require('express-session');
var config          = require("nconf");
var flash           = require('connect-flash');



var templateError = 'errors/error';

config.argv().env().file({ file: 'config.json' });



app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret_code' }));
app.use(flash());

// Passport

app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////ROUTES/////////////////////////////


app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/sign-up', require('./routes/signup'));
app.use('/logout', require('./routes/logout'));
app.use('/*', require('./routes/index'));

//////////////////////////////////////END ROUTES/////////////////////////



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render(templateError, {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(templateError, {
    message: err.message,
    error: {}
  });
});



module.exports = app;
