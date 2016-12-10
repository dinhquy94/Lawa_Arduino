var mongodb = require('./Mongodb');
var main_table = "scada_device_state";  
//THis function get all data from scada_location
module.exports.updateData = function(data) {  
	mongodb.connect(function(db){ 
			try {
			   db.collection(main_table).updateOne(
			      { 
			      	"device_id" :  data.device_id,
			      	"type":"dataDevice"
			  	  },
			      { $set: { 
			      	 "devices": data.devices 
			      } 
			  }
			  );
			  db.close();
			} catch (e) {
			   Errlog(e + "\n At scadat_device_state.js updateData()");
			}
	});
}