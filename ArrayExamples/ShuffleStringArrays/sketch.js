/***********************************************************************************
  StringArrays
  by Scott Kildall
  
  Shows simple string arrays

  Displays the first 3 verses of Maya Angelou's "I Rise" pem
  ***********************************************************************************/

// Declare an empty array
var strings = ['Bones', 'Psych', 'Big Bang Theory', 'Mad Men', 'Breaking Bad', 'Modern Family', 'Game of Thrones', 'Dexter'];

// generate an array of random strings from the master set
var smallStrings = [];

// number of small strings to display or use
var numSmallStrings = 3;   

var midX
var startY;
var lineHeight = 24;


// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // use global variables instead of typing width/2 and height/2 each time
  midX = width/2;
  startY = 60;
  
  textAlign(CENTER);
  textSize(24);
  
  // at startup, copy master array into another one, set length to master array length
  smallStrings = strings;
  numSmallStrings = strings.length;
 }


// Draw code goes here
function draw() {
  background(0);

  fill(255);
  for( let i = 0 ; i < numSmallStrings; i++ ) {
  		text( smallStrings[i], midX, startY + (i * lineHeight) )
  }
}

// load hard-coded strings, but imagine that this could be from a file
// or database 
function keyPressed() {
	if( key === ' ') {
    // Now, copy the master array, shuffle it and set to num to display to be 3
    smallStrings = shuffle(strings);
    numSmallStrings = 3;
  }
}