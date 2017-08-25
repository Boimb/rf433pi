var Promise = require('bluebird');
var rpi433 = require('rpi-433'),
rfSniffer = rpi433.sniffer({
      pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13) 
      debounceDelay: 500          //Wait 500ms before reading another code 
    }),
    rfEmitter = rpi433.emitter({
      pin: 0,                     //Send through GPIO 0 (or Physical PIN 11) 
      pulseLength: 350            //Send the code with a 350 pulse length 
    });
module.exports = function exec(params){
     var offcode = 0;
     offcode = parseInt(params.deviceType.identifier);
     var oncode = offcode + 1;
     var code = 0;
      if(params.state.value === 1){
            code = oncode;
        } else {
            code = offcode;
        }  
rfEmitter.sendCode(code, {pin: 0})
  .then(function(stdout) {
    console.log('Code sent: ', stdout);
  }, function(error) {
    console.log('Code was not sent, reason: ', error);
  });
  };