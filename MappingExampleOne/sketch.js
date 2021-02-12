/**************************************************
mappingExample

by: JoshuaWilderOakley

overview:

a simple example of the mapping function in p5.js in black and white

----------------------------------------------------

notes:

in the upper left quadrant the background is (255) and the ellipse is (0)
in the lower left quadrant the background is (255) and the ellipse is (255)
in the upper right quadrant the background is (0) and the ellipse is (0)
in the lower right quadrant the background is (0) and the ellipse is (255)



***************************************************/


// Setup code goes here
function setup() {
  createCanvas(1920, 1080);  //setting for responsive page 
 }

// Draw code goes here
function draw() {
   //syntax for mapping:
   // map(value, start1, stop1, start2, stop2);
  x = map(mouseX, 0, 1920, 0, 255);  
  y = map(mouseY, 0, 1080, 255, 0);  

  background(x);
  
  drawEllipses (); // calling on the drawEllipses function
}

function drawEllipses (){  //drawEllipses are kept outside the draw function

  fill(y);
  noStroke();
  ellipse(mouseX, mouseY, 100, 100);
}
