var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var rp = require("request-promise-native");
var request = require("request");


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

app.get('/api/getRanking', async function(req,res) {

  async function processData() {
    var options={
      uri: `http://54.163.3.27:5000/getScores`,
      method: 'GET'
    }
    let response = await rp(options);
    //console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData()
  res.json( done );

});

app.get('/api/getReward', async function(req,res) {

  const amount = req.query.amount
  const uid = req.query.uid
  async function processData(amount, uid) {
    var options={
      uri: `http://54.163.3.27:5000/getReward?uid=${uid}&amount=${amount}`,
      method: 'GET'
    }
    let response = await rp(options);
    //console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData(amount, uid)
  res.json( done );

});

app.get('/api/getHint', async function(req,res) {
  const amount = req.query.amount
  const uid = req.query.uid
  async function processData(amount, uid) {
    var options={
      uri: `http://54.163.3.27:5000/getHint?uid=${uid}&amount=${amount}`,
      method: 'GET'
    }
    let response = await rp(options);
    //console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData(amount, uid)
  res.json( done );

});

app.get('/api/', async function(req,res) {
  //cantidad = req.query.cantidad
  async function processData() {
    var options={
      uri: `http://54.163.3.27:5000/getScores`,
      method: 'GET'
    }
    let response = await rp(options);
    //console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData()
  res.json( done );

});


app.get('/api/getBalance', async function(req,res) {
  //cantidad = req.query.cantidad
  let uid = req.query.uid;
  async function processData(uid) {
    var options={
      uri: `http://54.163.3.27:5000/getBalance?uid=${uid}`,
      method: 'GET'
    }
    let response = await rp(options);
    //console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData(uid)
  res.json( done );

});

app.get('/api/createAccount', async function(req,res) {
  //cantidad = req.query.cantidad
  let uid = req.query.uid;
  let username = req.query.username;

  async function processData(uid,username) {
    var options={
      uri: `http://3.87.208.133:5000/createAccount?uid=${uid}&username=${username}`,
      method: 'GET'
    }
    let response = await rp(options);
    console.log(JSON.parse("[" + response + "]"));
    return response;
  }
  var done = await processData(uid, username)
  res.json( done );

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
