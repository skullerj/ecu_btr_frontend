var express = require('express');
var app = express();
var api = require('request');
var dbUrl = process.env.MONGODB_URI||'mongodb://localhost:27017/bottles';
var db = require('./db');
var schedule=require('node-schedule');
app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));
var schedule = require('node-schedule');


//database collection controllers
var record = require('./controllers/record');


// Use connect method to connect to the server
db.connect(dbUrl, function(err) {
  if(err)console.log(err);
  console.log("Connected successfully to server");

  // views is directory for all template files
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.get('/', function(request, response) {
    response.render('pages/index');
  });
  app.get('/rewards',function(req,res){
    var id = req.query.id;
    record.get(id,(err,result)=>{
      if(err)return res.send(err);
      res.render('pages/rewards',{data:result});
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });



});
