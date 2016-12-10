"use strict";
var mqtt    = require('mqtt');
var handle_message = require("./message/handle_message");
var model_scada_location = require("./models/scada_location");
const db= require("./database/db");
const socketserver= require("./socketserver");
socketserver.startSocketServer();
var client  = mqtt.connect('mqtt://localhost:1883',
{
	username: 'client1',
	password: 'passwd1'
}
);  
 String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
client.on('connect', function () { 
  model_scada_location.getAll(function(result){
    for(var i = 0; i< result.length; i++){
        client.subscribe('sensors/value/' + result[i].deviceid , { qos: 2 }, function(err, granted) {
          if (err)
            console.log(err);
          else
            console.log("client connected : ", granted);
        });
        client.subscribe('warning/info/' + result[i].deviceid , { qos: 2 }, function(err, granted) {
          if (err)
            console.log(err);
          else
            console.log("client connected : ", granted);
        });
         client.subscribe('warning/led/' + result[i].deviceid , { qos: 2 }, function(err, granted) {
          if (err)
            console.log(err);
          else
            console.log("client connected : ", granted);
        });
        client.subscribe('system/warning/' + result[i].deviceid , { qos: 2 }, function(err, granted) {
          if (err)
            console.log(err);
          else
            console.log(" subcribed system/warning", granted);
        }); 
       
        
    }
  }); 
}); 
client.on('message', function (topic, message) { 
  console.log(message + topic);
  handle_message.handle(topic, message); 
  client.subscribe(topic , { qos: 2 }, function(err, granted) {
    if (err)
      console.log(err);
    else
      console.log("re-subcribed", granted);
  });
});
