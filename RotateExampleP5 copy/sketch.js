/*
  Rotate Example
  by Scott Kildall
  
  Rotation example using P5
*/

var r = 0

function setup() {
  createCanvas(750, 750);
  ellipseMode(CENTER);
}

function draw() {
  background(0);

  // draw an red at center
  fill(255,0,0);

  // move to origin and perform the translation
  translate(width/2, height/2);
  r = r + .01
  rotate(r)

  // move to original spot
  translate(-width/2, -height/2);

  // do actual drawing
  ellipse( width/2, height/2, 200, 60);
}