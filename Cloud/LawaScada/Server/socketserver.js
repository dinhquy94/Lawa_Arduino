require('../Logs/rewrite_log');
var io = require('socket.io').listen(8888);  
module.exports.startSocketServer = function(){
	console.log("["+ new Date() + "] "+ "Starting socket IO on port 8888");
	io.sockets.on('connection', function (socket) { 
    socket.on('unsubscribe', function(ID) {  
        console.log('leaving id', ID);
        socket.leave(ID); 
    }); 
    socket.on('changeSercureMode', function(data) {  
    }); 
});
} 