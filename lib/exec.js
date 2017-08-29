var Promise = require('bluebird');
var rpi433 = require('rpi-433');


var retry = 3;

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

var intervalId = null;
var varCounter = 0;

var varName = function(code,retry){
     if(varCounter <= retry) {
          varCounter++;
          /* your code goes here */
      console.log(code)
  			rfEmitter.sendCode(code, {pin: 0})
          .then(function(stdout) {
    console.log('Code sent: ', stdout)
  }, function(error) {
    console.log('Code was not sent, reason: ', error)
  })
     } else {
          clearInterval(intervalId);
     }
};
module.exports = function exec(params){
     var code = parseInt(params.deviceType.identifier) + parseInt(params.state.value);
        //var interval = setInterval(function(){
 // j = j + 1
// if (j === retry) {clearInterval(interval);
  // console.log(j)}}, waitTimeBetweenSignals);
     intervalId = setInterval(varName(code,retry), waitTimeBetweenSignals);
};

