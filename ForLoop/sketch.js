
/******************************************************

	ForLoop by Scott Kildall

	Shows basic for...loop construction

	(1) draw rectangles in a single row on the screen
	   using a single for loop

	   LIKE HANGING PICTURES ON YOUR WALL

	(2) a nested for...loop to draw multiple rows

******************************************************/

// GLOBAL VARAIBLES
var numColumns = 6;		// number of "pictures" per row
var numRows = 4;
var pictureWidth = 60;
var pictureHeight = 30;
var textOffset = 20;


// Setup code goes here
function setup() {
  createCanvas(1000, 800);
  rectMode(CENTER);

  textAlign(CENTER);
  textSize(24);
 }


// Draw code goes here
function draw() {
  background(128);

  let xDist = width/(numColumns+1);		// distance between each picture
  let yDist = height/(numRows+1);

  // draw columns first 
  for( let i = 0; i < numColumns; i++ ) {	
  	// draw the rows
  	for( let j = 0; j < numRows; j++ ) {
	  	drawPicture( xDist * (i+1), yDist * (j+1));

	  	// White text for i
	  	fill(255);
	  	text(i, xDist * (i+1), yDist * (j+1) +  pictureHeight/2 + textOffset );
  	
	  	// Green text for j
	  	fill(0,255,0);
	  	text(j, xDist * (i+1), yDist * (j+1) +  pictureHeight/2 + textOffset * 2);
  	}
  }
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}


function drawPicture(x,y) {
   fill(255,0,0);
   rect(x,y,pictureWidth,pictureHeight);
}