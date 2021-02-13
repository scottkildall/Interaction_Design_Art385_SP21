/***********************************************************************************
  PointArrays
  by Scott Kildall
  
  Make an two arrays of random points on the screen so we can draw polka dots
  This is a more intuitive example than 2D arrays, in my opinion.

  createArray() will generate the array of random points

  Also, you can press the SPACE bar to regenerate the array

  ***********************************************************************************/

// Declare an empty array
var xPoints = [];
var yPoints = [];

var numPoints = 25;
var minX, maxX, minY, maxY;
var dotDiameter = 20;

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // set minumum maximum to edge of screen
  minX = dotDiameter;
  maxX = width - dotDiameter;
  minY = dotDiameter;
  maxY = height - dotDiameter;

  // drawing parameters
  ellipseMode(CENTER);
  noStroke();

  // generate a random array of dots
  createPointsArray();
 }

// For Loop to draw circles
function draw() {
  background(0,100,210);

  fill(0,220,120);
  for( let i = 0 ; i < xPoints.length; i++ ) {
    circle( xPoints[i], yPoints[i],  dotDiameter );
  }
}

// add random X and random Y points
function createPointsArray() {
  for( let i = 0; i < numPoints; i++ ) {
    xPoints[i] = random( minX, maxX );
    yPoints[i] = random( minY, maxY );
  }
}

// regenerate array with spacebar
function keyTyped() {
  if( key === ' ') {
    createPointsArray();
  }
}