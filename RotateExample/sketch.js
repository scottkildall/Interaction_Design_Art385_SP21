/***********************************************************************************
  Rotate Example
  by Scott Kildall
  
  Rotating ellipse using translate and rotate functions
***********************************************************************************/


// Global rotation variable
var r = 0;         

// speed of rotation 
var speed = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
}

function draw() {
  background(0);

  rotateEllipse();  
}

function rotateEllipse() {
  // draw an red at center
  fill(255,0,0);

  // move to origin and perform the translation
  translate(width/2, height/2);
  r = r + speed;
  rotate(r)

  // move to original spot
  translate(-width/2, -height/2);

  // do actual drawing
  ellipse( width/2, height/2, 200, 60);
}