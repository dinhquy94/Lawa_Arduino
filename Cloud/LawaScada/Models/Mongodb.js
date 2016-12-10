require('../Logs/rewrite_log');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/scada'; 
module.exports.connect = function(callback) { 
	MongoClient.connect(url, function(err, db) {
	  if(err) {console.log("Can't Connect to mongodb (mongodb.js - connect())"); }
	  assert.equal(null, err);  
	  callback(db);
	});
} 
process.on('uncaughtException', (err) => {
  //db.close();
  Errlog(`Caught exception: ${err}`);
});