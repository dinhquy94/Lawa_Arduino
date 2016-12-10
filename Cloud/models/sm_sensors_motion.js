const db= require("../database/db"); 
var r = db.r;
module.exports.getHistoryMotionSensorValue = function(device_id,callback) { 
	r.table("sm_sensors").innerJoin(
		  r.table("sm_device_mapping"),
		  function(sensor, map ){
		     return sensor("port").eq(map("port_id"))
		  }
		 ).zip().innerJoin(
		  r.table("sm_rooms"),
		  function (sensor , room) {
		    return sensor("room_id").eq(room("id"));
		}).zip().filter({
			sensor_type: 'motionsensor',
			device_id: device_id,
			xuly: 1
		}).filter(r.row("sensor_value").gt(0)).orderBy(r.desc('room_id')).orderBy(r.desc('room_id')).run()
			.then(function(response){
				var data = response;
				var current_id = "";
				var output = Array();
				data.sort(function(a, b){
			    var a1= a.thoidiem, b1= b.thoidiem;
			    if(a1== b1) return 0;
			    return a1> b1? 1: -1;
				});
				 for(var i = 0; i < data.length; i++){	 	
				 	if(current_id != data[i].room_id ){
				 		output.push(data[i]);
						current_id = data[i].room_id;
				 	}	 	
				 } 
				callback(output);
			})
			.error(function(err){
				callback(null);
			}); 
} 
module.exports.getMotionValue = function(device_id,callback) {  
		r.table("sm_sensors").innerJoin(
		  r.table("sm_device_mapping"),
		  function (sensor, map) { 
		    return sensor("port").eq(map("port_id"));
		}).zip().innerJoin(
		  r.table("sm_rooms"),
		  function (sensor , room) {
		    return sensor("room_id").eq(room("id"));
		}).zip().filter({
			sensor_type: 'motionsensor',
			device_id: device_id,
			xuly: 0
		}).filter(r.row("sensor_value").gt(0)).run()
			.then(function(response){ 
				callback(response);
			})
			.error(function(err){
				callback(null);

			}); 
}
module.exports.getCurrentMotionSensor = function(device_id,callback) { 
	r.table("sm_sensors").innerJoin(
		  r.table("sm_device_mapping"),
		  function (sensor, map) { 
		    return sensor("port").eq(map("port_id"));
		}).zip().innerJoin(
		  r.table("sm_rooms"),
		  function (sensor , room) {
		    return sensor("room_id").eq(room("id"));
		}).zip().filter({
			sensor_type: 'motionsensor',
			device_id: device_id,
			xuly: 0
		}).filter(r.row("sensor_value").gt(0)).run()
			.then(function(response){ 
				if(response.length > 0){
					callback(true);
				}else{
					callback(false)
				}
			})
			.error(function(err){
				callback(null);
			}); 
} 



