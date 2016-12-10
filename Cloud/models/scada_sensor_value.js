const MAINTABLE = "scada_sensor_value";
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
modelSensorValue   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object 
module.exports.addNewValue = function(valueObject,callback){
	modelSensorValue.create({
            item: valueObject,
            validate: function(item) { 
             if (isNaN(item.cambienmucnuoc) ||  isNaN(item.cambienlaser[0].cambien1)||  isNaN(item.cambienlaser[0].cambien2)||  isNaN(item.cambienlaser[0].cambien3)||  isNaN(item.cambienlaser[0].cambien4))
                throw 'Du lieu dau vao khong dung'
            }
	})
	.then(function(result){ 
		callback(result, 0);
	})
	.catch(function(err){
	 	callback(err, 1);
	});
}
