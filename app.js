var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
// require route 

const shopifyRouter = require('./routes/shopify');
const staFavoriteRouter = require('./routes/statistic-favorite');
const statByCusRouter = require('./routes/stat-by-cus');

// chạy api:
var connection = require('./connection');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//  khởi tạo shopify router
app.use('/shopify',shopifyRouter);
app.use('/statistic-favorite',staFavoriteRouter);
app.use('/stat-by-cus',statByCusRouter);

connection.init();
apiRouter.configure(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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