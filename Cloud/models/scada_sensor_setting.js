
const MAINTABLE = "scada_sensor_setting";
//schema
/*
[{
  deviceid: "TB210494",
  settingname: "giatriphathiencambien",
  defindvalue: {
    detectvalue1: 100,
    detectvalue2: 100,
    detectvalue3: 100,
    detectvalue4: 100
  }    
}]
*/
var r = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'scada_system'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
modelsensorsetting   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object  
module.exports.getSettingValue = function(deviceid, setting_name,callback){
	//callback("result", 0);
	modelsensorsetting.read({ filter: { deviceid: deviceid, settingname: setting_name }})
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
}
