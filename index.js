var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', function(req, res, next) {
  res.send('WORKING BACKEND');
});

app.get('/api/getList', function(req,res) {
  var list = ["item1", "item2", "item3"];
  console.log('Sent list of items');
  res.json(list);
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


var server = app.listen(5000, function () {
  console.log("app running on port.", server.address().port);
});


module.exports = app;