
/***********************************************************************************
  TextButtons
  by Scott Kildall
  
  Creates an array of text buttons
  Problem of response-determination and unique callbacks, solved by look at
    the this variable, which is still active

***********************************************************************************/

// Array of buttons, initialize in setup
var textButtons = [];

// The xpos of the buttons
var textButtonXPos = 40;

function setup() {
  createCanvas(windowWidth,windowHeight);

  // Create the array of text buttons, we are hard-coding the y-positions
  textButtons[0] = makeTextButton("Kitchen", textButtonXPos, 100);
  textButtons[1] = makeTextButton("Living Room", textButtonXPos, 140);
  textButtons[2] = makeTextButton("Dining Room", textButtonXPos, 180);
  textButtons[3] = makeTextButton("Bathroom", textButtonXPos, 220);

  drawFunction = drawKitchen;
}


// Call the draw function for each room and draw nav buttons on top of them
function draw() {
  drawFunction();
  drawButtons();

  // random will give 0-99.99999
  if( random(100) < .5 ) {
  	print("random event!");
  	drawFunction = drawBathroom;
  }
}

// just go through array and draw
function drawButtons() {
  for( let i = 0; i < textButtons.length; i++ ) {
    textButtons[i].draw();
  }
}

//==================== ALLOCATOR FUNCTIONS ===================//

// This is an allocator function - it creates a new object
function makeTextButton(label, x, y) {
  // tb is a local var Create the clickable object
  let tb  = new Clickable();
  
  // set the image to be this PNG
  tb.text = label;

  // set width + height to image size
  tb.width = 100;
  tb.height = 30

  // set to middle of screen, since we are drawing from the corners, we need to make an
  // additional calculation here
  tb.locate( x, y );

  // Clickable callback function for when it is pressed
  // On this example we use the SAME callback for all of the functions
  tb.onPress = textButtonPressed;
  tb.onHover = textButtonOnHover;
  tb.onOutside = textButtonOnOutside;

  return tb;
}

//==================== TEXT BUTTON CALLBACK FUNCTIONS ===================//

// button pressed event occured, we get the Name of the Room and go to it
textButtonPressed = function () {
  // get the text on the button and pass to gotoRoom function
  gotoRoom(this.text);
}

// Black background, white text
textButtonOnHover = function () {
  this.color = "#000000";
  this.textColor = "#FFFFFF";
}

// return to normal when it is outside
textButtonOnOutside = function () {
  this.color = "#FFFFFF";
  this.textColor = "#000000";
}

//==================== NAVIGATION FUNCTIONS ===================//

// goes to a new room and here we can change the state
function gotoRoom(roomName) {
  if( roomName === "Kitchen") {
    drawFunction = drawKitchen;
  }
  else if( roomName === "Living Room") {
    drawFunction = drawLivingRoom;
  }
  else if( roomName === "Dining Room") {
    drawFunction = drawDiningRoom;
  }
  else if( roomName === "Bathroom") {
    drawFunction = drawBathroom;
  }
}


//==================== STATE MACHINE DRAW CODE===================//

drawKitchen = function() {
   background(240,120,0);
   textSize(36);
   fill(255);
   text("Kitchen", width/2, height/2);
}

//-- drawOne() will draw the image at index 2 from the array
drawLivingRoom = function() {
   background(10,80,120);
   textSize(36);
   fill(255);
   text("Living Room", width/2, height/2);
}

//-- drawOne() will draw the image at index 2 from the array
drawDiningRoom = function() {
   background(150,80,40);
   textSize(36);
   fill(255);
   text("Dining Room", width/2, height/2);
}

//-- drawOne() will draw the image at index 3 from the array
drawBathroom = function() {
   background(10,120,134);
   textSize(36);
   fill(255);
   text("Bathroom", width/2, height/2);
}


 