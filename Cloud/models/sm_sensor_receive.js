const db= require("../database/db"); 
var r = db.r; 
module.exports.insertNew = function(data,callback) { 
	var current_time = Math.floor(new Date() / 1000);
	 r.table("sm_sensors").insert( {
	 	"mathietbi":  data.device_id ,
		"port":  data.port  ,
		"sensor_value": data.value ,
		"thoidiem": current_time,
		"xuly": 0 
	}).run(); 
} 




