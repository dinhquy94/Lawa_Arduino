const MAINTABLE = "sm_devices"; 
const db= require("../database/db"); 
var r = db.r; 
var d = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
warning_info   = rdbCrud({ r: d, table: MAINTABLE }); // >> Create the rethinkdb-crud Object 
 
module.exports.getDevices = function(deviceid, room_id, callback){
	//callback("result", 0);

	warning_info.read({ filter: { 
    mathietbi: deviceid,
    room_id: room_id
  }})
         .then(function(result){
          console.log(result);
           callback(result);
         })
         .catch(function(err){
           callback(null);
         });
}
module.exports.updateDevicesState = function(data){
  r.table("sm_devices").filter(
    {
      mathietbi: data.deviceid,
      port: data.port
    }
    ).update(
    {
      state: data.state,
      value: data.value
    }).run(); 
}
