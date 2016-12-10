const MAINTABLE = "sm_rooms"; 
var r = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
warning_info   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object 
 
module.exports.getRooms = function(deviceid,callback){
	//callback("result", 0);

	warning_info.read({ filter: { device_id: deviceid}})
         .then(function(result){
          console.log(result);
           callback(result);
         })
         .catch(function(err){
           callback(null);
         });
}

