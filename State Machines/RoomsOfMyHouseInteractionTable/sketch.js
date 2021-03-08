/***********************************************************************************
  Rooms of a House Sample
  by Joshua Wilder Oakley
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
  * draw_blank_Room(s) are set to be the functions.
  * the keys 'l, k, d, r, b, o' will change the drawFunction variable
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

// rounded corner variable
var crnr = 8;

//'corner of room' line variables
var xOne = 235;
var yOne = 0;
var xTwo = 235;
var yTwo = 400;
var strk = 2;

//image variables
var livingRoomAssets = [];
var kitchenAssets = [];
var diningRoomAssets = [];
var bedroomAssets = [];
var bathroomAssets = [];
var officeAssets = [];
var dogAssets = [];

//furniture placement variables

var couchX = 92;
var couchY = 305;
var lampX = 12;
var lampY = -114;
//room color array
var roomColors = [];

//navigation instruction bar variables
var xNav = 500;
var yNav = 11;
var hNav = 40;
var wNav = 240;
var navFill = 255;

var navTextXPos = (xNav + (740 - xNav)/2);
var navTextYPos = (yNav + (hNav/2) + 9);
var navTextSize = 26;
var strings = ['use keys to nav'];

//bounding box navigation key  variables
var bnd = 40;
var xKyBnd = 749;  //postion 1 on bounding box
var yKyBnd = 11;  //postion 1 on bounding box
var bndSpcr = 51; //spacer between keys

//navigation key placement variables
var xKeyPlace = (xKyBnd + (789 - xKyBnd)/2);
var yKeyPlace = (yKyBnd + (bnd/2) + 7);

//navigation key array
var navKey = [];

//tile floor placement variables
var tileFloorX = 0;
var tileFloorY = 381;

//room title bounding box variables
var xStartOne = 604;
var yStartOne = 543;
var xEndOne = 185;
var yEndOne = 40;
var titleFill = 0;

//room title variables
var textXPos = (xStartOne + (789 - xStartOne)/2);
var textYPos = (yStartOne + (yEndOne/2) + 9);

// Interaction Table
var interactionTable;

//preload images in array
function preload() {
  //dog
  dogAssets[0] = loadImage('assets/dog.png');
  dogAssets[1] = loadImage('assets/hangingDog.png');

  //livingroom images
  livingRoomAssets[0] = loadImage('assets/livingFloor.png');
  livingRoomAssets[1] = loadImage('assets/couch.png');
  livingRoomAssets[2] = loadImage('assets/arcoLamp.png');

 //kitchen images
  kitchenAssets[0] = loadImage('assets/kitchenFloor.png');
  kitchenAssets[1] = loadImage('assets/stove.png');
  kitchenAssets[2] = loadImage('assets/fire.png');
  
  //dining room images
  diningRoomAssets[0] = loadImage('assets/diningFloor.png');
  diningRoomAssets[1] = loadImage('assets/leftChair.png');
  diningRoomAssets[2] = loadImage('assets/rightChair.png');
  diningRoomAssets[3] = loadImage('assets/tulipTable.png');
  
  //bedroom images
  bedroomAssets[0] = loadImage('assets/bedFloor.png');
  bedroomAssets[1] = loadImage('assets/bed.png');
  bedroomAssets[2] = loadImage('assets/bedroomLight.png');


  //bathroom images
  bathroomAssets[0] = loadImage('assets/bathFloor.png');
  bathroomAssets[1] = loadImage('assets/bathroom.png');
  bathroomAssets[2] = loadImage('assets/mirror.png');

  //office images
  officeAssets[0] = loadImage('assets/officeFloor.png');
  officeAssets[1] = loadImage('assets/deskSolo.png');
  officeAssets[2] = loadImage('assets/officeChair.png');
  officeAssets[3] = loadImage('assets/officeLight.png');

  // load the table as a table object, fo all other setup functions later
  interactionTable = loadTable('data/interactionTable.csv', 'csv', 'header');
}

// Center drawing, drawFunction will be one for default
function setup() {
  createCanvas(800, 800);
  textAlign(CENTER);
  textSize(28);
  noStroke();

  //seting the room color array
  roomColors[0] = color(210, 100, 38); //living room color
  roomColors[1] = color(251, 196, 219); //kitchen color
  roomColors[2] = color(20, 201, 150); //dining room color
  roomColors[3] = color(138, 147, 111); //bedroom color
  roomColors[4] = color(150, 201, 201); //bathroom color
  roomColors[5] = color(100, 98, 98); //office  color

  //setting the navigation key array
  navKey[0] = ('[l]');
  navKey[1] = ('[k]');
  navKey[2] = ('[d]');
  navKey[3] = ('[r]');
  navKey[4] = ('[b]');
  navKey[5] = ('[o]');

  // set to one for startup
  drawFunction = drawLivingRoom;

  // Print interaction table info to the JavaScript console in the setup() function
  // This should be the same info as you have in your table
  print("Interaction Table information");
  print(interactionTable.getRowCount() + ' total rows in table');
  print(interactionTable.getColumnCount() + ' total columns in table');
}

//calls your state machine function
function draw() {
  drawFunction();
}

//========= TEMPLATE: modify these functions, INSIDE the function blocks only =========

//draws images from livingRoomAssets array
drawLivingRoom = function() {
   background(roomColors[0]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop(); 

   //images in array
   image(livingRoomAssets[0], tileFloorX, tileFloorY);  //tiled floor png
   image(livingRoomAssets[1], couchX, couchY);  //couch
   image(livingRoomAssets[2], lampX, lampY);  //lamp
   image(dogAssets[0], 442, 361);  //dog
   
   //text bounding box
   fill(roomColors[0]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

  //  //room title
   fill(titleFill);
   text('[l]iving room', textXPos, textYPos); 

  //  //nav keys
  //  //bounding position one
   fill(roomColors[1]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

  //  //key text position one
   fill(titleFill);
   text(navKey[1], xKeyPlace, yKeyPlace);
  
  // //bounding position two
   fill(roomColors[3]);
   rect(xKyBnd, yKyBnd + bndSpcr, bnd, bnd, crnr);

  //  //key text position two
   fill(titleFill);
   text(navKey[2], xKeyPlace, yKeyPlace + bndSpcr);  

  //  //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr); 

  //  //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos);
}

//draws images from kitchenAssets array
drawKitchen = function() {
  background(roomColors[1]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop();   

   //images in array
   image(kitchenAssets[0], tileFloorX, tileFloorY);  //tiled floor png
   image(dogAssets[1], 450, 100); //scred dog 
   image(kitchenAssets[1], 135, 117);  //stove
   image(kitchenAssets[2], 55, 45);  //fire
   
   //text bounding box
   fill(roomColors[1]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

   //room title
   fill(titleFill);
   text('[k]itchen', textXPos, textYPos);

   //nav keys
   //bounding position one
   fill(roomColors[0]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

   //key text position one
   fill(titleFill);
   text(navKey[0], xKeyPlace, yKeyPlace); 
  
  //bounding position two
   fill(roomColors[2]);
   rect(xKyBnd, yKyBnd + bndSpcr, bnd, bnd, crnr);

   //key text position two
   fill(titleFill);
   text(navKey[2], xKeyPlace, yKeyPlace + bndSpcr);

   //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr);

   //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos); 
}

//draws images from diningRoomAssets array
drawDiningRoom = function() {
 background(roomColors[2]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop();   

   //images in array
   image(diningRoomAssets[0], tileFloorX, tileFloorY);  //tiled floor png
   image(diningRoomAssets[1], 102, 288);  //left chair
   image(diningRoomAssets[2], 412, 290);  //right chair
   image(diningRoomAssets[3], 161, 312);  //tulip table
   image(dogAssets[0], 23, 575); //dog
   
   //text bounding box
   fill(roomColors[2]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

   //room title
   fill(titleFill);
   text('[d]ining room', textXPos, textYPos);

   //nav keys
   //bounding position one
   fill(roomColors[0]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

   //key text position one
   fill(titleFill);
   text(navKey[0], xKeyPlace, yKeyPlace); 
  
   //bounding position two
   fill(roomColors[1]);
   rect(xKyBnd, yKyBnd + bndSpcr, bnd, bnd, crnr);

   //key text position two
   fill(titleFill);
   text(navKey[1], xKeyPlace, yKeyPlace + bndSpcr);

   //bounding position three
   fill(roomColors[3]);
   rect(xKyBnd, yKyBnd + (bndSpcr * 2), bnd, bnd, crnr); 

   //key text position three
   fill(titleFill);
   text(navKey[3], xKeyPlace, yKeyPlace + (bndSpcr * 2));
  
   //bounding position four
   fill(roomColors[5]);
   rect(xKyBnd, yKyBnd + (bndSpcr * 3), bnd, bnd, crnr);

   //key text position four
   fill(titleFill);
   text(navKey[5], xKeyPlace, yKeyPlace + (bndSpcr * 3)); 

   //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr);

   //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos); 
}

//draws images at index 6,7 from the array
drawBedroom = function() {
 background(roomColors[3]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop();   

   //images in array
   image(bedroomAssets[0], tileFloorX, tileFloorY);  //tiled floor png
   image(bedroomAssets[1], 25, 244);  //bed
   image(bedroomAssets[2], 105, 0);  //light
   image(dogAssets[0], 313, 438); //dog
  
   //text bounding box
   fill(roomColors[3]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

   //room title
   fill(titleFill);
   text('bed[r]oom', textXPos, textYPos);

   //nav keys
   //bounding position one
   fill(roomColors[2]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

   //key text position two
   fill(titleFill);
   text(navKey[2], xKeyPlace, yKeyPlace); 
  
   //bounding position two
   fill(roomColors[4]);
   rect(xKyBnd, yKyBnd + bndSpcr, bnd, bnd, crnr);

   //key text position two
   fill(titleFill);
   text(navKey[4], xKeyPlace, yKeyPlace + bndSpcr); 

   //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr);

   //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos);
}

//draws images at index 8,9, 10 from the array
drawBathroom = function() {
   background(roomColors[4]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop();   

   //images in array
   image(bathroomAssets[0], tileFloorX, tileFloorY);   //tiled floor png
   image(bathroomAssets[1], 99, 218);  //vanity
   image(bathroomAssets[2], 146, 10);  //mirror
   image(dogAssets[0], 195, 482);  //dog
  
   //text bounding box
   fill(roomColors[4]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

   //room title
   fill(titleFill);
   text('[b]athroom', textXPos, textYPos);

   //nav keys
   //bounding position one
   fill(roomColors[3]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

   //key text position one
   fill(titleFill);
   text(navKey[3], xKeyPlace, yKeyPlace);

   //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr);

   //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos);  
}

//draws images from the office array
drawOffice = function() {
   background(roomColors[5]);

   //perspective line
   push();
   stroke(strk);
   line(xOne, yOne, xTwo, yTwo); 
   pop();   

   //images in array
   image(officeAssets[0], tileFloorX, tileFloorY);  //tiled floor png
   image(officeAssets[1], 100, 400);  //desk
   image(officeAssets[2], 186, 367);  //chair
   image(officeAssets[3], 348, 0);  //light
   image(dogAssets[0], 236, 381); //dog
  
   //text bounding box
   fill(roomColors[5]);
   rect(xStartOne, yStartOne, xEndOne, yEndOne, crnr);

   //room title
   fill(titleFill);
   text('[o]ffice', textXPos, textYPos);

  //nav keys
   //bounding position one
   fill(roomColors[2]);
   rect(xKyBnd, yKyBnd, bnd, bnd, crnr);

   //key text position one
   fill(titleFill);
   text(navKey[1], xKeyPlace, yKeyPlace);  

   //navigation instruction bar
   fill(navFill);
   rect(xNav, yNav, wNav, hNav, crnr);

   //nav instruction text
   fill(titleFill);
   noStroke();
   textSize(navTextSize);
   text(strings[0], navTextXPos, navTextYPos);
}

//========= TEMPLATE: add or change interface functions, as you like =========

// Change the drawFunction variable based on your interaction
function keyPressed() {
  // go through each row, look for a match to the current state
  for (let i = 0; i < interactionTable.getRowCount(); i++) {

    // the .name property of a function will convert function to string for comparison
    if(interactionTable.getString(i, 'CurrentState') == drawFunction.name ) {
        // now, look for a match with the key typed, converting it to a string
        if( interactionTable.getString(i, 'KeyTyped') === String(key) ) {
            // if a match, set the drawFunction to the next state, eval() converts
            // string to function
            drawFunction = eval(interactionTable.getString(i, 'NextState'));
            print("found");
        }
    }
  }

   // living room [l]
  // if( drawFunction === drawLivingRoom ) {
  //   if( key === 'k' ) {
  //     drawFunction = drawKitchen;
  //   }
  //   if( key === 'd' ) {
  //     drawFunction = drawDiningRoom;
  //   }
  // } 

  // Kitchen [k] 
  // if( drawFunction === drawKitchen ) {
  //   if( key === 'd' ) {
  //     drawFunction = drawDiningRoom;
  //   }
  //   else if( key === 'l' ) {
  //     drawFunction = drawLivingRoom;
  //   }
  // }

  //   // Dining Room [d]
  // else if( drawFunction === drawDiningRoom ) {
  //     if( key === 'k' ) {
  //     drawFunction = drawKitchen;
  //   }
  //     if( key === 'r' ) {
  //     drawFunction = drawBedroom;
  //   }
  //     if( key === 'o' ) {
  //     drawFunction = drawOffice;
  //   }
  //     else if( key === 'l' ) {
  //     drawFunction = drawLivingRoom;
  //   }
  // }

      // Bedroom [r]
  // else if( drawFunction === drawBedroom ) {
  //   if( key === 'b' ) {
  //     drawFunction = drawBathroom;
  //   }
  //     else if( key === 'd' ) {
  //     drawFunction = drawDiningRoom;
  //   }
  // }

    // Bathroom [b]
  // else if( drawFunction === drawBathroom ) {
  //   if( key === 'r') {
  //     drawFunction = drawBedroom;
  //   }
  // }

  // Office [o]
  // else if( drawFunction === drawOffice ) {
  //   if( key === 'd' ) {
  //     drawFunction = drawDiningRoom;
  //   }
  // }
}