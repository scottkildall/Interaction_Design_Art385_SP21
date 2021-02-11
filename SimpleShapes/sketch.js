/***********************************************************************************
  SimpleShapes
  by Scott Kildall

  Sketch for drawing some very simple shapes

***********************************************************************************/

// Global Variables
var ellipseXPos = 0;
var ellipseYPos = 300;
var ellipseDist = 40;

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);
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
  background(34,50,204);

  drawCircle();
  drawEllipses();
  drawRects();
}

function drawCircle() {
  fill(0,102,255);
  circle(width/2,height/2,20);
}

function drawEllipses() {
  // Ellipse #1
  fill(0,255,0);
  ellipse(ellipseXPos,ellipseYPos,200,80);

  // Ellipse #2
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