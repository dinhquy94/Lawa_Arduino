const MAINTABLE = "sm_location";
//Schema of MAINTABLE
/*
[{
	 id: string,
	 locationname: string,
	 lattitude: string,
	 longtitude: string,
	 deviceid: string 
}]
*/
var r = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
modelLocation   = rdbCrud({ r: r, table: MAINTABLE }); // >> Create the rethinkdb-crud Object 
module.exports.addNewValue = function(valueObject,callback){
	modelLocation.create({
            item: valueObject,
            validate: function(item) { 
             if (isNull(item.deviceid) ||  isNull(item.locationname))
                throw "deviceid and locationname must be not null" ;
            }
	})
	.then(function(result){ 
		callback(result, 0);
	})
	.catch(function(err){
	 	callback(err, 1);
	});
}
module.exports.getAll = function(callback){
	//callback("result", 0);
	modelLocation.read()
	 .then(function(result){
	   callback(result, 0);
	 })
	 .catch(function(err){
	   callback(err, 1);
	 });
}
