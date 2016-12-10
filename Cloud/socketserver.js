"use strict";
const db= require("./database/db"); 
const processdata= require("./modules/dataSensorProcessing"); 
const devicewarning= require("./models/scada_device_warning"); 
const rooms= require("./models/sm_rooms"); 
const devices= require("./models/sm_devices"); 
const sensor= require("./models/sm_sensors_fire"); 
const sensor_motion = require("./models/sm_sensors_motion"); 
var io = require('socket.io').listen(3700);
var login = require('./modules/login'); 
var handleHardware = require('./handleHardware');
module.exports.startSocketServer = function(){
	console.log("starting socket IO on port 3700");
	io.sockets.on('connection', function (socket) { 
    socket.on('unsubscribe', function(ID) {  
        console.log('leaving id', ID);
        socket.leave(ID); 
    });
    socket.on('Logindata', function(data) {  
    	if(data.username != null && data.password != null ){   
    		socket.join(data.username); 
    		login.Login(data.username, data.password, function(token_key){
    		io.sockets.in(data.username).emit('login_result', token_key);
  		  	}); 
    	}else{
    		socket.join(data.username); 
    		io.sockets.in(data.username).emit('login_result', "null");
    	}
    });
    socket.on('isLogin', function(data) {   
		socket.join(data.token_key); 
		login.isLogin(data.token_key, function(isLogin){
			io.sockets.in(data.token_key).emit('isloginresult', isLogin);
		}); 
    });
    socket.on('requestCurrentState', function(data) {  
		socket.join(data.token_key); 
		login.getMaThietBibyToken( data.token_key, function(deviceid){
			processdata.getSensorTimingValue(deviceid, function(result_schema){
			io.sockets.in(data.token_key).emit('respondCurrentState', result_schema);
		});
		});
		 
    });

    socket.on('getRooms', function(data) {  
        socket.join(data.token_key); 
        login.getMaThietBibyToken( data.token_key, function(deviceid){
            rooms.getRooms(deviceid, function(result_schema){
            io.sockets.in(data.token_key).emit('returnRooms', result_schema);
        });
        });
         
    });
    socket.on('getDevices', function(data) {  
        socket.join(data.token_key); 
        login.getMaThietBibyToken( data.token_key, function(deviceid){
                    devices.getDevices(deviceid, data.room_id , function(result_schema){
                    io.sockets.in(data.token_key).emit('returnDevices', result_schema);
            });
        });
    });
    socket.on('getFireSensor', function(data) {  
        socket.join(data.token_key); 
         
        login.getMaThietBibyToken( data.token_key, function(deviceid){
            console.log(deviceid);
                    sensor.getHistoryFireSensorValue(deviceid, function(result_schema){
                    io.sockets.in(data.token_key).emit('returnFireSensor', result_schema);
            });
        });
    });
    
    socket.on('getCurrentFireSensor', function(data) {  
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){
        console.log(deviceid);
                sensor.getCurrentFireSensor(deviceid, function(result_schema){
                io.sockets.in(data.token_key).emit('returnCurrentFireSensor', result_schema);
        });
    });
    });
    socket.on('getHistoryFireSensor', function(data) {  
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){
        console.log(deviceid);
                sensor.getFireValue(deviceid, function(result_schema){
                io.sockets.in(data.token_key).emit('returnHistoryFireSensor', result_schema);
        });
    });
    });
    socket.on('getCurrentMotionSensor', function(data) {  
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){
        console.log(deviceid);
                sensor_motion.getCurrentMotionSensor(deviceid, function(result_schema){
                io.sockets.in(data.token_key).emit('returnCurrentMotionSensor', result_schema);
        });
    });
    });
    socket.on('getMotionSensor', function(data) {  
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){
        console.log(deviceid);
                sensor_motion.getMotionValue(deviceid, function(result_schema){
                io.sockets.in(data.token_key).emit('returnMotionSensor', result_schema);
        });
    });
    }); 
    socket.on('getHistoryMotionSensor', function(data) {  
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){ 
                sensor_motion.getHistoryMotionSensorValue(deviceid, function(result_schema){
                    console.log(result_schema);
                io.sockets.in(data.token_key).emit('returnHistoryMotionSensor', result_schema);
        });
    });
    });

    //Most Important
    socket.on('controlDevice', function(data) { 
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){  
        var command = {
            type: "change",
            port: data.port,
            value: data.value
        };
        handleHardware.ControlDevice(deviceid, command);

    });
    });
    socket.on('changeSercureMode', function(data) { 
    socket.join(data.token_key); 
    login.getMaThietBibyToken( data.token_key, function(deviceid){ 
         
        var command = {
            type: "security",
            chedo: data.chedo
        };
        handleHardware.changeSercureMode(deviceid, command);

    });
    });

});
}
