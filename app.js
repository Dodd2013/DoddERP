var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var errorHandler=require('./error');

var app = express();

 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('DoddERP'));
app.use(session({
     secret: 'MySecrets',
     name: 'DoddERP',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: {maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
}));


//  app.all('*',function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/session',require('./routes/session'));
app.use(express.static(path.join(__dirname, 'web')));

errorHandler(app);


module.exports = app;
