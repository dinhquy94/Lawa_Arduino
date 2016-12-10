"use strict";
/*requiring rethinkdb node modules */
 
/*
module.exports.onConnect = function(callback){
	rethinkdb.connect( {host: 'localhost', port: 28015}, function(err, connection) {
		if (err) throw err;
		callback(rethinkdb,connection);
	});
};
 */
module.exports = {
	r : require('rethinkdbdash')({
	port: 28015,
	host: 'localhost',
	db: 'smarthome'
})
}