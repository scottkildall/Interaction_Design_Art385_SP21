
// Global
var gDebugMode = false;

// Setup code goes here
function setup() {
  createCanvas(1200, 600);

  ellipseMode(CENTER);
  
  textSize(24);
  textAlign(LEFT);
 }


// Draw code goes here
function draw() {
  background(0);

  // draw an ellipse
  fill(240,120,0);
  ellipse(width/2, height/2, 200,100);

 
  if( gDebugMode == true ) {
  	drawDebugInfo();
  }
}

function drawDebugInfo() {
	fill(255);
  	text("X: " + mouseX + "   Y: " + mouseY, 20, height - 20);
}

// keyTyped gets triggered 
function keyTyped() {
  if (key === ' ') {
    //gDebugMode = !gDebugMode;
  }
 }

