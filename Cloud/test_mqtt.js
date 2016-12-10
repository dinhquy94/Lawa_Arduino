"use strict";
var mqtt    = require('mqtt');
var handle_message = require("./message/handle_message");
const db= require("./database/db");
var client  = mqtt.connect('mqtt://192.168.1.5:1883',
{
	username: 'client1',
	password: 'passwd1'
}
);  
  
client.on('connect', function () { 
   client.publish('sensors/value', 'Hello mqtt');
}); 
 