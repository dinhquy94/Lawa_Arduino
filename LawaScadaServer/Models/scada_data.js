var mongodb = require('./Mongodb');
var main_table = "scada_data";   
//THis function get all data from scada_location
module.exports.updateData = function(data) {  
	mongodb.connect(function(db){ 		
			try {				 
					var dataInsert = {
						"device_id" :  data.device_id,		
						"time" : data.time,
						"data" : {
							"dungluongpin": data.dungluongpin,
							"mucnuoc" : data.mucnuoc, 
							"cambien_laser": {
					      		cb_laser1: data.cambien_laser.laser1,
					      		cb_laser2: data.cambien_laser.laser2,
					      		cb_laser3: data.cambien_laser.laser3,
					      		cb_laser4: data.cambien_laser.laser4
				      		}
						}
					};
				    db.collection(main_table).insert(dataInsert);				 
			  		db.close();
			} catch (e) {
			   Errlog(e + "\n At scadat_data.js addNewEvent()");
			}
	});
}
module.exports.getCurrentState = function(device_id, callback) {  
	mongodb.connect(function(db){ 		
			try {				 
				db.collection(main_table).find({device_id: device_id}).sort({ time: -1 }).limit(1).toArray(function(err, items) {
				if(err) console.log(err + " scada_data.js - getCurrentState()");  				
				callback(items[0]); 		
				db.close();		
				}); 
			} catch (e) {
			   Errlog(e + "\n At scadat_data.js getCurrentState()");
			}
	});
}
 
this.getCurrentState("TB210494",function(items) {
	console.log(items);
});
