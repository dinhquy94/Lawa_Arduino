var mongodb = require('./Mongodb');
var main_table = "scada_location";  
//THis function get all data from scada_location
module.exports.getAllDevices = function(callback) {  
	mongodb.connect(function(db){ 
	db.collection(main_table).find().toArray(function(err, items) {
		if(err) console.log(err + " location_device.js - getAllDevices()");  
		callback(items); 
	}); 
    db.close();
}); 
}