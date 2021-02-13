/***********************************************************************************
	ImageArrays
	by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Loads 5 images into an array
  Cycles display between each image to create a sense of animation

***********************************************************************************/

// Array of images
var images = [];
var currentImageIndex = 0;    // which array index we will use

// load all 5 images into an array
function preload() {
  images[0] = loadImage('assets/one.png');
  images[1] = loadImage('assets/two.png');
  images[2] = loadImage('assets/three.png');
  images[3] = loadImage('assets/four.png');
  images[4] = loadImage('assets/five.png');
}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(2);

  // Center our drawing objects
  imageMode(CENTER);
}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background(192);

  drawImage();
}

// draw the image at the current index
function drawImage() {
  image(images[currentImageIndex],width/2, height/2);

  // increment index so we can see next image on next draw()
  currentImageIndex++;

  // if we hit the end of the array, go bac to beginning
  if( currentImageIndex === images.length ) {
    currentImageIndex = 0;
  }
}
