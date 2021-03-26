
/***********************************************************************************
  ClickableAllocator
  by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of how to use allocation tables with the
  modified p5.clickable class. This uses a ClickableManager class to
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;

// indexes into the array (constants)
const redIndex = 0;
const greenIndex = 1;
const yellowIndex = 2;
const popIndex = 3;
const inflateIndex = 4;
const deflateIndex = 5;

// constants for the balloon
const startEllipseDiameter = 30;
const poppedEllipseDiameter = 0;
const deflateAmount = 10;
const inflateAmount = 5;
const maxDiameter = 200;
const minDeflateDiameter = 5;

// variables for the ballon
var ellipseDiameter = startEllipseDiameter;

// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path
function preload(){
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(1280,600);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // start with a red balloon
  newBalloon(redIndex);
}

// Just draw the button
function draw() {
  background(128);

  // draw "balloon"
  push();
  ellipseMode(CENTER);
  noStroke();
  fill(balloonColor);
  circle(width/2,height/2, ellipseDiameter);
  pop();

  // draw the p5.clickables
  clickablesManager.draw();
}

// change individual fields of the clickables
function setupClickables() {
  // set the pop, inflate and deflate to be false, we will change this after
  // first balloon gets pressed
  clickables[inflateIndex].visible = false;
  clickables[deflateIndex].visible = false; 
  clickables[popIndex].visible = false;

 
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// NEW BALLOON
  if( this.id === redIndex || this.id === greenIndex || this.id === yellowIndex ) {
    newBalloon(this.id);
  }

// POP THE BALLOON  
  else if( this.id === popIndex ) {
    popBalloon();
  }

// INFLATE OR DEFLATE
  else if( this.id === deflateIndex ) {
    ellipseDiameter -= deflateAmount;
    ellipseDiameter = max(minDeflateDiameter,ellipseDiameter);   // prevents < 0
  }
  else if( this.id === inflateIndex ) {
    ellipseDiameter += inflateAmount;
    if( ellipseDiameter > maxDiameter ) {
      popBalloon();
    }
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === inflateIndex || this.id === deflateIndex ) {
    this.color = "#FFFFFF";
  }
  else {
    this.color = "#AAAAAA";
  }

  this.noTint = true;
}

//--- BALLOON FUNCTIONS --

// when a new balloon is made, we show pop and inflate and deflate button,
// change fill color and reset ellipse diamter
function newBalloon(idNum) {
  clickables[inflateIndex].visible = true;
  clickables[deflateIndex].visible = true; 
  clickables[popIndex].visible = true;
  ellipseDiameter = startEllipseDiameter;

  if( idNum === redIndex) {
    balloonColor = color('#FF0000');
  }
  else if( idNum === greenIndex) {
    balloonColor = color('#00FF00');
  }
  else if( idNum === yellowIndex) {
    balloonColor = color('#FFFF00');
  }
}

// if we pop the balloon, then you can't re-pop or inflate or deflate
function popBalloon() {
  alert("pop!");
  ellipseDiameter = poppedEllipseDiameter;

  // balloon popped, hide these buttons
  clickables[inflateIndex].visible = false;
  clickables[deflateIndex].visible = false; 
  clickables[popIndex].visible = false;
}


