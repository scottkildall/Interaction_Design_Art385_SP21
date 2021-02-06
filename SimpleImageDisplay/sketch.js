/*
	Simple image display example
	by Scott Kildall

	Displays an image, centered.

	* Use to show how to launch a localhost from terminal/command prompt
	* Shows preload() command
	* Shows use of subdirectories
	
*/

// Global variable that we will use in all the functions
var img; 

// preload() will execture before setup()
function preload() {
	print("SimpleImageDisplay: preload()");

  img = loadImage('assets/figure16.png'); // Load the image
}

// set image mode to center, so that it is center-drawn
function setup() {
	print("SimpleImageDisplay: setup()");
	print(img);

	createCanvas(800, 600);

	imageMode(CENTER);
}

// draw image in the center of the screen
function draw() {
	// draw the background
	background(128);
		
  	// Displays the image at center point - add param 3 and 4 fo width and height
  	image(img, width/2, height/2);
}
