/***********************************************************************************
  HelloWorld
  by Scott Kildall
  
  Hello World in P5 HS
***********************************************************************************/

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(40);
  textAlign(CENTER);
 }


// Draw code goes here
function draw() {
  background(0);
  drawHelloWorld();
}

function drawHelloWorld() {
  fill(240,56,0);
  text("Hello, World", width/2, height/2);
}