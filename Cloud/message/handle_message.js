"use strict";  
var preparedata = require("../modules/prepare_data");
var sm_sensor_receive = require("../models/sm_sensor_receive"); 
var sm_devices = require("../models/sm_devices");
var scada_sensor_value = require("../models/scada_sensor_value");
var scada_device_warning = require("../models/scada_device_warning");
 String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
module.exports.handle = function(topic, data,callback){
	if(topic.startsWith("sensors/value")) {
		var giatrinhan = JSON.parse(data);
		var mathietbi = giatrinhan.device_id;
		// console.log(giatrinhan);
		var sensors = giatrinhan.sensors;
		 for(var i = 0; i< sensors.length; i++ ){
		 	/*
		 	"mathietbi":  data.device_id ,
			"port":  data.port  ,
			"sensor_value": data.value ,
			"thoidiem": current_time,
			"xuly": 0 */
		 	var preparedata = {
		 		device_id: mathietbi,
		 		value: sensors[i].value,
		 		port: sensors[i].port
			 	} 
			 	sm_sensor_receive.insertNew(preparedata);
			 }



			 /*

			 r.table("sm_devices").filter(
			    {
			      mathietbi: data.deviceid,
			      port: data.port
			    }
			    ).update(
			    {
			      state: data.state,
			      value: data.value
			    }
			 ).run();  
*/
		 	}
		/*var sensorObj = [{
			cambienlaser: [{
				cambien1: giatrinhan.cambienlaser[0],
				cambien2: giatrinhan.cambienlaser[1],
				cambien3: giatrinhan.cambienlaser[2],
				cambien4: giatrinhan.cambienlaser[3]
			}],
			cambienmucnuoc: giatrinhan.cambienmucnuoc,
			mathietbi: giatrinhan.mathietbi ,
			thoidiem: Math.floor(new Date() / 1000)
		}];
		scada_sensor_value.addNewValue(sensorObj, function(message, result){
			//console.log(message);
		}); 
		*/
	 
	if(topic.startsWith("warning/info/")) { 
		 var giatriluu = JSON.parse(data); 
		 // console.log(giatriluu);
		 scada_device_warning.addNewValue(giatriluu, function(message, result){
			//console.log(message);
		}); 
	}
 	if(topic.startsWith("device/state/")) { 
	 var giatri_thietbi  = JSON.parse(data); 
	 var mathietbi = giatri_thietbi.device_id;
	  //console.log(giatri_thietbi);
	  var devices = giatri_thietbi.devices;
	for(var i = 0; i< devices.length; i++ ){
		//console.log(devices[i].value);
		var state;
		if(devices[i].value == 0){
			state = false;
		}else{
			state = true;
		}
	  var dulieu_thaydoi = {
	  	deviceid: mathietbi,
		port: devices[i].port,
		state: state ,
		value: devices[i].value
	  }
	  //console.log(dulieu_thaydoi);
	  sm_devices.updateDevicesState(dulieu_thaydoi);
	}
	  
	}
};