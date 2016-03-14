var MegaPi = require("megapi").MegaPi;
var bot = new MegaPi(onStart);
var childProcess = require('child_process');

function onStart(){

  bot.encoderMotorRun(3,0);
  bot.encoderMotorMove(0,0);
  bot.dcMotorRun(4,0);
  //childProcess.exec('ffmpeg -s 640x480 -f video4linux2 -i /dev/video0 -f mpeg1video -b 800k -r 30 ./demo.mpeg');
}

var express = require('express');
var app = express();

app.get('/arm', function (req, res) {
     var query = req.query;
     if(query.arm1){
       targetArm1 = query.arm1;
      }
     if(query.arm2){
       targetArm2 = query.arm2;
      }
     res.send('ok');
  }
);
app.get('/armup', function (req, res) {
  bot.encoderMotorRun(3,30);
  setTimeout(function(){bot.encoderMotorRun(3,0);},600);
  res.send('ok');
});
app.get('/armdown', function (req, res) {
  bot.encoderMotorRun(3,-10);
  setTimeout(function(){bot.encoderMotorRun(3,0);},600);
  res.send('ok');
});
app.get('/armopen', function (req, res) {
  bot.dcMotorRun(4,-40);
  setTimeout(function(){bot.dcMotorRun(4,0);},600);
  res.send('ok');
});
app.get('/armclose', function (req, res) {
  bot.dcMotorRun(4,40);
  setTimeout(function(){bot.dcMotorRun(4,0);},600);
  res.send('ok');
});
app.get('/move', function (req, res) {
     var query = req.query;
     if(query.speed1&&query.speed2){
       bot.encoderMotorMove(query.speed1,query.speed2);
      }
     res.send('ok');
  }
);
app.use(express.static('public'));
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('arm robot app listening at http://%s:%s', host, port);
});