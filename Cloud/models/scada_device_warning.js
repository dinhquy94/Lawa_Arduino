const MAINTABLE = "scada_device_warning";
//Schema of MAINTABLE
/*
[{
	cambienlaser: [{
		cambien1: number,
		cambien2: number,
		cambien3: number,
		cambien4: number
	}],
	cambienmucnuoc: number,
	mathietbi: string,
	thoidiem: timestamp
}]
*/
var r = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
warning_info   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object 
module.exports.addNewValue = function(valueObject,callback){   
		warning_info.update({
             set: { 
             	noidungled: valueObject.noidungled,
             	mathietbi: valueObject.mathietbi,
             	thongtincanhbao: valueObject.thongtincanhbao
             },
             filter: { mathietbi: valueObject.mathietbi }
          })
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          }); 
}
module.exports.getWarningValue = function(deviceid,callback){
	//callback("result", 0);
	warning_info.read({ filter: { mathietbi: deviceid}})
         .then(function(result){
           callback(result);
         })
         .catch(function(err){
           callback(null);
         });
}