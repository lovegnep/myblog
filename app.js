var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');
var _ = require('lodash');
var busboy = require('connect-busboy');
var bytes = require('bytes');
var statics = require('./statistics');
var app = express();

var RateLimit = require('express-rate-limit');

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new RateLimit({
    windowMs: 1*60*1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);

function gettime(d){
    //if(typeof d !== Date)
        //return '';
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}
app.locals.gettime=gettime;
//app.locals.markdown = markdown;
// view engine setup
// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
//app.engine("html",require("ejs").__express);
app.locals._layoutFile = 'layout.html';
_.extend(app.locals, {
    config: config,
});
_.extend(app.locals, require('./render_helper'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon2.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.session_secret));
//app.use(express.static('/home/static'));
app.use(session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
}));
app.use(busboy({
    limits: {
        fileSize: bytes(config.file_limit)
    }
}));
app.use('/',function (req,res,next) {
   if(req.signedCookies[config.auth_cookie_name] && req.signedCookies[config.auth_cookie_name] === config.auth_cookie_val) {
       req.session.user='admin';
       res.locals.user='admin';
   }
   next();
});
/*views count statistics*/
app.use('/',statics());

app.use('/', index);
app.use(express.static('/home/static'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
