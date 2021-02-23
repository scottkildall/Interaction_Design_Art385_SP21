
/***********************************************************************************
  TextButtons
  by Scott Kildall
  
  Creates an array of text buttons
  Problem of response-determination and unique callbacks, solved by look at
    the this variable, which is still active

***********************************************************************************/


// Array of buttons, initialize in setup
var textButtons = [];

function setup() {
  createCanvas(600,400);

  textButtons[0] = makeTextButton("Start", 100, 100);
  textButtons[1] = makeTextButton("Room 1", 100, 140);
  textButtons[2] = makeTextButton("Room 2", 100, 180);
}

// Just draw the button
function draw() {
  background(128);
  
  for( let i = 0; i < textButtons.length; i++ ) {
    textButtons[i].draw();
  }
}

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

  // Clickable callback functions, defined below
  tb.onPress = textButtonPressed;
  // catButton.onHover = catButtonHover;
  // catButton.onOutside = catButtonOnOutside;

  return tb;
}

// Meow alert box when pressed (mouse down)
textButtonPressed = function () {
  alert(this.text);
}




 