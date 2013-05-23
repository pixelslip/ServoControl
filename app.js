var five = require("johnny-five")
  , express = require("express")
  , app = express()
  , board, servo, led
  , serie = "/dev/tty.usbmodemfa121"
  , port = 3000;


app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.use(express.static(__dirname + '/public'));
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function(socket){
  
  led.on();
  socket.emit('message', { message: 'welcome' });
  socket.on('send', function (data) {
   
    data.message /= 10;
    data.message = 90 + (90 * data.message);
    data.message = parseInt(data.message);

    if(data.message <= 0) {
      data.message = 0;
    } else if(data.message >= 180) {
      data.message = 180;
    }
    
    servo.move(data.message);
    io.sockets.emit('message', data);

  });
  socket.on('disconnect', function(){
    led.off();
  });

});

board = new five.Board({ port: serie });

board.on("ready", function() {

  led = new five.Led(2);
  servo = new five.Servo(9);

  led.off();
  servo.center();
});
