/*******************************************************************************************************************
//
//  Class: Timer
//
//  Written by Scott Kildall
//	for P5.js
//
//------------------------------------------------------------------------------------------------------------------
// - Very simple but incredibly useful timer class
// - Call start() whenever it expires to reset the time
// - Call expired() to check to see if timer is still active
//
//------------------------------------------------------------------------------------------------------------------
//   - Needs more testing
*********************************************************************************************************************/

class Timer {
  constructor( _duration ) {
    this.duration = _duration;
    this.startTime = millis();
  }
  
  start() { 
    this.startTime = millis();
  }
  
  setTimer(_duration) {
    this.duration = _duration;
  }
  
  expired() {
    return ((this.startTime + this.duration) < millis());
  }
  
  getRemainingTime() {
    if( this.expired() )
      return 0;
      
    return  (this.startTime + this.duration) - millis();
  }
  
  getPercentageRemaining() {
    if( this.expired()  )
     return 1.0;
      
    return this.getRemainingTime()/this.duration;
  }
  
   getPercentageElapsed() {
    if( this.expired() )
     return 0.0;
      
    return 1.0 - (this.getRemainingTime()/this.duration);
  }	 	
}
