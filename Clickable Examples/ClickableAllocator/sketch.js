
/***********************************************************************************
  SimplePNGButton
  by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of a PNG button using the Clickable class

***********************************************************************************/


// an array of clickable objects
var clickablesManager;
var clickablesArray;


function preload(){
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
}

function setup() {
  createCanvas(1280,720);

  clickablesArray = clickablesManager.setup();
}

// Just draw the button
function draw() {
  background(128);
  clickablesManager.draw();
}

/*
function makeCatButton() {

  // Create the clickable object
  catButton = new Clickable();
  
  // set the image to be this PNG
  catButton.setImage(catImage);
  catButton.id = 400;
  catButton.name = "cat";

  // This should set the color to be off OR background transparent
  //catButton.color = "#00000000";

  // This would give it a white background
  catButton.color = "#FFFFFF";

  // set width + height to image size
  catButton.width = catImage.width;
  catButton.height = catImage.height;

  // set to middle of screen, since we are drawing from the corners, we need to make an
  // additional calculation here
  catButton.locate( width/2 - catButton.width/2 , height/2 - catButton.height/2 );

  // Clickable callback functions, defined below
  catButton.onPress = catButtonPressed;
  catButton.onHover = catButtonHover;
  catButton.onOutside = catButtonOnOutside;
}

// Meow alert box when pressed (mouse down)
catButtonPressed = function () {
  alert(this.name);
}

// tint when mouse is over
catButtonHover = function () {
  this.tint = "#FF4411";
  this.noTint = false;
}

// return to normal when it is outside
catButtonOnOutside = function () {
  this.noTint = true;
}
*/

 