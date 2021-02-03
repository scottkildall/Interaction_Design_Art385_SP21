//-- SimpleShapes by Scott Kildall
//-- Sample P5.js Sketch for drawing things!


// Global Variables
var ellipseXPos = 0;
var ellipseYPos = 300;
var ellipseDist = 40;

// Setup code goes here
function setup() {
  createCanvas(1000, 800);
  print("Starting up Simple Shapes");
  rectMode(CENTER);
  ellipseMode(CENTER);

  print("Width = " + width);
  print("Height = " + height);

  // set ellipse X pos
  ellipseXPos = width/2 - 250;
 }

// Draw code goes here
function draw() {
  let i = 5;
  // do stuff with i

  background(34,50,204);

  // Circle
  fill(0,102,255);
  circle(width/2,height/2,20);
  
  drawEllipses();
  drawRects();
}

function drawEllipses() {
  // Ellipse #1
  fill(0,255,0);
  ellipse(ellipseXPos,ellipseYPos,200,80);

  // Ellipse
  fill(0,255,0);
  ellipse(ellipseXPos,ellipseYPos+ellipseDist,200,80);
}

function drawRects() {
 // Center Rectangle
  fill(255,0,0);
  stroke(220);
  strokeWeight(3);
  rect( width/2,height/2,200,100);

  // Tall Rect
  fill(126,50,20);
  stroke(27);
  strokeWeight(2);
  rect( 100,height/2,40,400);
 }