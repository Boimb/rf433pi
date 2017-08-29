var Promise = require('bluebird');
var rpi433 = require('rpi-433');


var retry = 2;

// wait time between signals in ms
var waitTimeBetweenSignals = 500;

rfSniffer = rpi433.sniffer({
      pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13) 
      debounceDelay: 500          //Wait 500ms before reading another code 
    }),
    rfEmitter = rpi433.emitter({
      pin: 0,                     //Send through GPIO 0 (or Physical PIN 11) 
      pulseLength: 310            //Send the code with a 350 pulse length 
    });
module.exports = function exec(params){
     var code = parseInt(params.deviceType.identifier) + parseInt(params.state.value);
      var j = 0;
    var interval = setInterval(function(){ 
			rfEmitter.sendCode(code, {pin: 0})
          .then(function(stdout) {
    console.log('Code sent: ', stdout);
  }, function(error) {
    console.log('Code was not sent, reason: ', error);
  });
  j = j +1}, waitTimeBetweenSignals);
  if(j = retry){
  clearInterval(interval)
}
};
