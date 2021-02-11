/******************************************************

  DebugMode
  by Scott Kildall

  Toggles a debug mode with the space bar
  
******************************************************/
// Global
var gDebugMode = false;

// Setup code goes here
function setup() {
  createCanvas( windowWidth, windowHeight );

  ellipseMode(CENTER);
  
  textSize(24);
  textAlign(LEFT);
 }


// Draw code goes here
function draw() {
  background(0);

  drawEllipse();
  
  // comment out the drawDebugInfo()for deployment verion 
  if( gDebugMode == true ) {
  	drawDebugInfo();
  }
}

function drawEllipse() {
  // draw an ellipse
  fill(240,120,0);
  ellipse(width/2, height/2, 200,100);

}

// draws x and y coordinates at bottom of screen
function drawDebugInfo() {
	fill(255);
  text("X: " + mouseX + "   Y: " + mouseY, 20, height - 20);
}

// keyTyped gets triggered whenever key is down
function keyTyped() {
  if (key === ' ') {
    gDebugMode = !gDebugMode;
  }
 }

