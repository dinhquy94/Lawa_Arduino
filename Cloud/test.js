 var testmodel = require("./models/sm_sensors"); 
testmodel.getHistoryFireSensorValue("TB1234",function(data){
	 console.log(data);
	 
});
 