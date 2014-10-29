window.onload = function() {

    var socket = io.connect('http://192.168.1.24:3000');
    var x = y = z = 0;
    if (window.DeviceMotionEvent != undefined) {
        window.ondevicemotion = function(e) {
            x = e.acceleration.x;
        }

        setInterval(function(){
            socket.emit('send', { message: x });
        }, 25);
    } else {
        socket.emit('send', { message : " -- ERROR --"});
    }

}
