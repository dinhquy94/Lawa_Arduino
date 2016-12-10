var mongodb = require('./Mongodb');
var main_table = "scada_data";  
//THis function get all data from scada_location
module.exports.updateData = function(data) {  
	mongodb.connect(function(db){ 
			try {
				var dataInsert = {
					"device_id" :  data.device_id,		
					"data" : {
						"dungluongpin": data.dungluongpin,
						"mucnuoc" : data.mucnuoc,
						"time" : data.time,
						"cambien_laser": {
				      		cb_laser1: data.cambien_laser.laser1,
				      		cb_laser2: data.cambien_laser.laser2,
				      		cb_laser3: data.cambien_laser.laser3,
				      		cb_laser4: data.cambien_laser.laser4
			      		}
					},
					flag: 0
				};
			   db.collection(main_table).insert(dataInsert);
			  db.close();
			} catch (e) {
			   Errlog(e + "\n At scadat_data.js addNewEvent()");
			}
	});
}