/***********************************************************************************
  StringArrays
  by Scott Kildall
  
  Shows simple string arrays

  Displays the first 3 verses of Maya Angelou's "I Rise" pem
  ***********************************************************************************/

// Declare an empty array
var strings = [];
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

  loadStringArray();
 }


// Draw code goes here
function draw() {
  background(0);

  fill(255);
  for( let i = 0 ; i < strings.length; i++ ) {
  		text( strings[i], midX, startY + (i * lineHeight) )
  }
}

// load hard-coded strings, but imagine that this could be from a file
// or database 
function loadStringArray() {
	strings[0] = "You may write me down in history";
	strings[1] = "With your bitter, twisted lies,";
	strings[2] = "You may trod me in the very dirt";
	strings[3] = "But still, like dust, I'll rise.";
	strings[4] = "";
	strings[5] = "Does my sassiness upset you?";
	strings[6] = "Why are you beset with gloom?";
	strings[7] = "’Cause I walk like I've got oil wells";
	strings[8] = "Pumping in my living room."
	strings[9] = "";
	strings[10] = "Just like moons and like suns,";
	strings[11] = "With the certainty of tides,";
	strings[12] = "Just like hopes springing high,";
	strings[13] = "Still I'll rise."
}