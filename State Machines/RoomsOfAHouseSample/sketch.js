/***********************************************************************************
	Rooms of a House Sample
	by Scott Kildall

  Shows navigation structure using the keyboard between 4 rooms

  []
	Template:

	(1) Add your own PNG files in the assets folder. Make sure they match the names ***exactly*** of the existing PNGs.
	(2) Add custom drawing code to drawOne(), drawTwo(), drawThree(), drawFour(), drawFive()
	(3) You can add your own interfaces - keys, mouse events, etc in the Interfaces section

	Also start your localhost before running this, otherwise no PNGs will display

------------------------------------------------------------------------------------
	The way it works — you don't need to know this for the template use
	* array of images gets loaded at startup
	* drawFunction is a VARIABLE that points to a function varible name
	* drawOne(), drawTwo(), etc. are set to be functions.
	* the the keys 1-5 will change the drawFunction variable

------------------------------------------------------------------------------------
	Notes:
	- a more advanced state machine with use array-indexing for each of
		images the draw functions, but this is just for illustrative purposes

	- even more advanced will be to put the draw functions into an array, would
		be helpful for randomizing, go to the next function, etc

	- next step after that would be to put interfaces into an array that maps to
		the functions


***********************************************************************************/



// variable that is a function 
var drawFunction;

// offset from bottom of screen
var gTextOffset = 20;

//instructions array
var strings = [];
var midX
var startY;
var lineHeight = 24;


// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Center our drawing objects
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(24);

  // set to one for startup
  drawFunction = drawRedRoom;
}

// Very simple, sets the background color and calls your state machine function
function draw() {
  background(192);

  fill(0);
  

  // will call your state machine function
  drawFunction();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//-- drawOne() will draw the image at index 0 from the array
drawRedRoom = function() {
   //image(images[0],width/2, height/2);

   fill(75,0,130);
   text("Red Room", width/2, height - gTextOffset);
}

//-- drawTwo() will draw the image at index 1 from the array
drawKitchen = function() {
   //image(images[1],width/2, height/2);

   fill(240,120,0);
   text("Kitchen", width/2, height - gTextOffset);
}

//-- drawOne() will draw the image at index 2 from the array
drawOffice = function() {
   //image(images[2],width/2, height/2);

   fill(255,20,147);
   text("Office", width/2, height - gTextOffset);
}

//-- drawOne() will draw the image at index 3 from the array
drawBathroom = function() {
   //(images[3],width/2, height/2);

   fill(30,144,255);
   text("Bathroom", width/2, height - gTextOffset);
}


//-- Will draw the current instuctions on the screen
// function drawInstructions() {
//   text("Bathroom", width/2, height - gTextOffset);
// }


//========= TEMPLATE: add or change interface functions, as you like =========

// Change the drawFunction variable based on your interaction
function keyPressed() {
  // shows which was types
  //print(key);
  print(keyCode);

  // Kitchen [k] 
  if( drawFunction === drawKitchen ) {
    if( keyCode === LEFT_ARROW ) {
        drawFunction = drawBathroom;
    }

    if( key === 'b' ) {
      drawFunction = drawBathroom;
    }
    else if( key === 'r' ) {
      drawFunction = drawRedRoom;
    }
  }

  // Red room [r]
  else if( drawFunction === drawRedRoom ) {
    if( key === 'k' ) {
      drawFunction = drawKitchen;
    }
  }

  // Office [o]
  else if( drawFunction === drawOffice ) {
    if( key === 'b' ) {
      drawFunction = drawBathroom;
    }
  }

  // Bathroom [b]
  else if( drawFunction === drawBathroom ) {
    print("in bathroom");
    print(key);

    if( key === 'k') {
      drawFunction = drawKitchen;
    }

    if( key === 'o' ) {
      drawFunction = drawOffice;
    }
    
    
  }
}


