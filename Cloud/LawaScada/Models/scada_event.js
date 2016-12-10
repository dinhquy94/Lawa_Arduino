var mongodb = require('./Mongodb');
var main_table = "scada_event";  
//THis function get all data from scada_location
module.exports.addNewEvent = function(data) {  
	mongodb.connect(function(db){ 
			var event = {
			    device_id: data.device_id,
			    type: "dataEvent",
			    EventName: data.EventName,
			    time: data.time,
			    data: data.data
		 	}
			db.collection(main_table).insert( event , function(err, result) {
				if (err) Errlog("scada_event.js - addNewEvent()");
			});
			db.close();
	});
}
