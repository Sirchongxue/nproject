var express = require('express');
var app = new express();
// use template
var admin = require('./routes/admin.js') 
var index = require('./routes/index.js') 
 

//set session information :save userinfor
var session = require('express-session');
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
  		maxAge:1000*60*30
   },
   rolling :true
}));


//ejs
app.set('view engine','ejs');
//public 
app.use(express.static('public'));
app.use('/upload',express.static('upload'));
 

app.use('/',index);
app.use('/admin',admin); 

app.listen(3003,'127.0.0.1');