/**************************************************
mappingExampleTwo

by: JoshuaWilderOakley

overview:

a simple example of the mapping function in p5.js in black and white

----------------------------------------------------

notes:

constrain both x and y so that the ellipse remains inside the box 
and is mapped to the larger blue ball.



***************************************************/


// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);   
 }

// Draw code goes here
function draw() {
  background(100, 100, 255);

  mappingBall();    //free floating blue ball that red balls are mapped to
  constrainedBallOne();   //left side red ball within rectangle
  constrainedBallTwo();   //right side red ball within rectangle
}

function mappingBall() {
  fill(0, 0, 255);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);
}

function constrainedBallOne() {    //left side rect and ball

  let xlo = 410;   //start x coordinate of rect + 1/2 red ball diameter
  let xhi = 690;   //end x coordinate of rect - 1/2 red ball diameter
  let ylo = 410;   //start y coordinate of rect + 1/2 red ball diameter
  let yhi = 640;   //end y coordinate of rect - 1/2 red ball diameter

  let mx = map(mouseX, 0, width, xlo, xhi, true);    //true is added at the end of the mapping
  let my = map(mouseY, 0, height, ylo, yhi, true);   //in order to enable the constrain

  //rectangle holding red ball
  fill(255);
  rect(400, 400, 300, 250);

  //red ball
  fill(255, 0, 0);
  noStroke();
  ellipse(mx, my, 20, 20);
}

function constrainedBallTwo() {    //right side rect and ball

  let xlo = 905;    //start x coordinate of rect + 1/2 red ball diameter
  let xhi = 970;    //end x coordinate of rect - 1/2 red ball diameter
  let ylo = 205;    //start y coordinate of rect + 1/2 red ball diameter
  let yhi = 695;    //end y coordinate of rect - 1/2 red ball diameter

  let mx = map(mouseX, 0, width, xlo, xhi, true);
  let my = map(mouseY, 0, height, ylo, yhi, true);

  //rectangle holding red ball
  fill(255);
  rect(900, 200, 75, 700);

  //red ball
  fill(255, 0, 0);
  noStroke();
  ellipse(mx, my, 10, 10);
}


