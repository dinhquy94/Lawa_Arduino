var hardware_controller    = require('./hardware_controller'); 
 

function blink() {
setTimeout(function () {
  	hardware_controller.ControlDevice("TB210494", {
	type: "change",
	value: 1,
	port: 11
}) ; 
}, 0); 
setTimeout(function () {
  	hardware_controller.ControlDevice("TB210494", {
	type: "change",
	value: 0,
	port: 11
}) ; 
}, 200); 
setTimeout(function () {
  	 blink();
}, 400); 
}
blink();
