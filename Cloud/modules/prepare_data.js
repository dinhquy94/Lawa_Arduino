"use strict";
//data input has a few special chracter
//this module will replace and export Json object
module.exports.parseData = function(string_input, callback) {
	var input_value = string_input.toString().replaceAll("|", "\\\"");
  	var result  = "";
  	try { 
  	 result = JSON.parse(JSON.parse(input_value.toString()));   
  	 callback(null, result);
  	} catch (err) {
		  callback("string_input can not parse to JSON object", null);
	}
};
module.exports.toRethinkDbObject = function(objectJson, callback ) {
 	var ObjectResult = {
  	 	time_update: Math.floor(new Date() / 1000),
  	 	data: objectJson
  	}
  	callback(ObjectResult);
 };