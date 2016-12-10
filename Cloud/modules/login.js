const db= require("../database/db"); 
var r = db.r;
var login = false;
var crypto = require('crypto-js');
var encrypt_key = "21041994";
var r = require('rethinkdbdash')({
		servers :[{host: 'localhost', db: 'smarthome'}],
		buffer  : 5
});
var rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance 
tokenTable   = rdbCrud({ r: r, table: "token_key" }); // >> Create the rethinkdb-crud Object 
userTable   = rdbCrud({ r: r, table: "users" }); // >> Create the rethinkdb-crud Object 
 // Mã hóa 
/** var @username: String
*	var @password: String
*	callback(err, result: Boolean)
*/	

module.exports.Login = function(username, password, callback) { 
 
		r.table("users").filter({
	    	username: username,
	    	passwordvalue: password
		}).count().run().then(function(response) { 
				if(response == 0){
				  callback('null');
				}else{
					createToken(username, function(token_key){
						callback(token_key);
					})					
				}  
	}); 
 
}
 var generateToken = function(username, callback) { 
	var time = Math.floor(new Date() / 1000);
	var token_key = crypto.AES.encrypt( time + username, encrypt_key).toString();
	var expire_time = time + 30*60;
	callback(token_key, time, expire_time);
}
var createToken = function(username, callback){
	generateToken(username, function(token_key, time, expire_time){
		 var Token_key = {
		 	username: username,
		 	token_key: token_key,
		 	time: time,
		 	expire_time: expire_time,
		 }; 
			r.table('token_key').insert( Token_key ).run().then(function(response) {  
					 callback(token_key); 
			}); 
	});
} 
module.exports.isLogin = function(token_key, callback){
	var time = Math.floor(new Date() / 1000);
	tokenTable.read({ filter:
					    r.row("token_key").eq(token_key)
					    .and(r.row("expire_time").ge(time))
					})
	 .then(function(result){
	 	var data = result;
		if(data.length == 0){
			callback(null);
		}else{
			tokenTable.update({
				set: { expire_time: time + 30*60 },
				filter: { token_key: token_key  }
			})
			.then(function(result){
				callback(true);
			})
			.catch(function(err){
				callback(null);
			});
		} 
	 })
	 .catch(function(err){
	   console.log(err);
	 }); 
}
module.exports.getMaThietBibyToken = function(token_key, callback){
	var time = Math.floor(new Date() / 1000);
	tokenTable.read({ filter:
					    r.row("token_key").eq(token_key) 
					})
	 .then(function(result){
	 	var data = result; 
	 	if(result.length == 0){
	 		callback("null");
	 	}else{ 
	 		userTable.read({ filter:
					    r.row("username").eq(data[0].username) 
			})
			.then(function(userdata){ 
				callback(userdata[0].deviceid);
			});
	 	}
	 })
	 .catch(function(err){
	   console.log(err);
	 }); 
}