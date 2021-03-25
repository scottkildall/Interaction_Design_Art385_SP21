/***********************************************************************************
  Seconds Display

  Uses the p5.timer.js class to show elapsed seconds on the screen

------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// uninitialized object
var simpleTimer;
var elapsedSeconds = 0;

var debugScreen;
var showDebugScreen = false;

var ghost;

function preload() {
  ghost = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
}
// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  debugScreen = new DebugScreen();
  simpleTimer = new Timer(1000);
  simpleTimer.start();

  //animation(ghost, 300, 150);

  // create a sprite and add the 3 animations
  ghost = createSprite(400, 150, 50, 100);

  //label, first frame, last frame
  //the addAnimation method returns the added animation
  //that can be store in a temporary variable to change parameters
  var myAnimation = ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');



  textAlign(CENTER);
  textSize(96);
 }


// Draw code goes here
function draw() {
  background(128);

  checkMovement();

  
  //draw the sprite
  drawSprites();
  

  if(showDebugScreen ) {
    debugScreen.draw();
  }
}

function checkMovement() {
  if(keyIsDown(RIGHT_ARROW))
    ghost.velocity.x = 1;
  else if(keyIsDown(LEFT_ARROW))
    ghost.velocity.x = -1;
  else
    ghost.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    ghost.velocity.y = 1;
  else if(keyIsDown(UP_ARROW))
    ghost.velocity.y = -1;
  else
    ghost.velocity.y = 0;
}
// Looks for elapsed time
function updateTimer() {
  if( simpleTimer.expired() ) {
  	elapsedSeconds++;
  	simpleTimer.start();
  }
}

function mouseReleased() {
  debugScreen.print("mouseReleased at x: " + mouseX + " y: " + mouseY + " millis = " + millis() );
}
function keyPressed() {
  if( key === ' ') {
    showDebugScreen = !showDebugScreen;
  }
}

