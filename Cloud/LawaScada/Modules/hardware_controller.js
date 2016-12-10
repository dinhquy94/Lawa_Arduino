var mqtt    = require('mqtt'); 
var client  = mqtt.connect('mqtt://localhost:1883',
{
	username: 'client1',
	password: 'passwd1'
});
client.on('connect', function () { 
	console.log("Connected to server !");

});
module.exports.ControlDevice = function(deviceid, command) {  
	client.publish('device/command/'+ deviceid, JSON.stringify(command) );
}
module.exports.changeSercureMode = function(deviceid, command) {  
	client.publish('security/mode/'+ deviceid, JSON.stringify(command) );
}
 
