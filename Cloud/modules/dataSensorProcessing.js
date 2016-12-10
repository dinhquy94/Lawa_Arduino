
const MAINTABLE = "scada_sensor_value";
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
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
sensorvalue   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object  
module.exports.getSensorTimingValue = function(mathietbi, callback){
  var laserdetectvalue = 1000;
	//callback("result", 0);
     // var current_time = Math.floor(new Date() / 1000);
      var current_time =    1477642537;
	sensorvalue.read({
      filter: r.row('thoidiem').le(current_time )
              .and
              ( r.row('thoidiem').ge(current_time -  60*5) ) 
              .and
              (r.row("mathietbi").eq(mathietbi)),
      orderBy: r.desc("thoidiem")
    }) 
   .then(function(result){
      var data = result;
      var result_schema = {
        vipham: 0,
        lasersensor: {
          laser1: 0,
          laser2: 0,
          laser3: 0,
          laser4: 0
        },
        mucnuoc: 0,
        thoidiem: 0,
        thongbao: 0
      } 
      if(result.length != 0){
        result_schema.mucnuoc = result[0].cambienmucnuoc; 
        result_schema.thoidiem = result[0].thoidiem;
      }else{
        thongbao = 1; 
      }
      for(var i = 0; i < result.length; i++){ 
            if(result[i].cambienlaser[0].cambien1 < laserdetectvalue || result[i].cambienlaser[0].cambien2 < laserdetectvalue || result[i].cambienlaser[0].cambien3 < laserdetectvalue || result[i].cambienlaser[0].cambien4 < laserdetectvalue ){
                result_schema.vipham = 1;
              if(result[i].cambienlaser[0].cambien1 < laserdetectvalue){
                result_schema.lasersensor.laser1 = 1;
              }
               if(result[i].cambienlaser[0].cambien2 < laserdetectvalue){
                result_schema.lasersensor.laser2 = 1;
              }
               if(result[i].cambienlaser[0].cambien3 < laserdetectvalue){
                result_schema.lasersensor.laser3 = 1;
              }
               if(result[i].cambienlaser[0].cambien4 < laserdetectvalue){
                result_schema.lasersensor.laser4 = 1;
              }
            }
      }
      //console.log(result_schema);
      callback(result_schema);
   })
   .catch(function(err){
     callback(null);
     console.log(err);
   });
}
