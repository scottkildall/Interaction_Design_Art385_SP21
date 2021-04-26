//Determines if the mouse was pressed on the previous frame
var cl_mouseWasPressed = false;
//Last hovered button
var cl_lastHovered = null;
//Last pressed button
var cl_lastClicked = null;
//All created buttons
var cl_clickables = [];

//This function is what makes the magic happen and should be ran after
//each draw cycle.
p5.prototype.runGUI = function () {
	for (i = 0; i < cl_clickables.length; ++i) {
		if (cl_lastHovered != cl_clickables[i])
			cl_clickables[i].onOutside();
	}
	if (cl_lastHovered != null) {
		if (cl_lastClicked != cl_lastHovered) {
			cl_lastHovered.onHover();
		}
	}
	if (!cl_mouseWasPressed && cl_lastClicked != null) {
		cl_lastClicked.onPress();
	}
	if (cl_mouseWasPressed && !mouseIsPressed && cl_lastClicked != null) {
		if (cl_lastClicked == cl_lastHovered) {
			cl_lastClicked.onRelease();
		}
		cl_lastClicked = null;
	}
	cl_lastHovered = null;
	cl_mouseWasPressed = mouseIsPressed;
}

p5.prototype.registerMethod('post', p5.prototype.runGUI);

//This function is used to get the bounding size of a
//string of text for use in the 'textScaled' property
function getTextBounds(m, font, size) {
	let txt = document.createElement("span");
	document.body.appendChild(txt);

	txt.style.font = font;
	txt.style.fontSize = size + "px";
	txt.style.height = 'auto';
	txt.style.width = 'auto';
	txt.style.position = 'absolute';
	txt.style.whiteSpace = 'no-wrap';
	txt.innerHTML = m;

	let width = Math.ceil(txt.clientWidth);
	let height = Math.ceil(txt.clientHeight);
	document.body.removeChild(txt);
	return [width, height];
}

//Button Class
function Clickable() {
	this.id = 0;		// unique id number
	this.name = "";		// string name for the clickable 
	this.resizeImageFlag = false;	// flag for setting width and height to image after setImage since it is asynchronous
	this.x = 0;			//X position of the clickable
	this.y = 0;			//Y position of the clickable
	this.width = 100;		//Width of the clickable
	this.height = 50;		//Height of the clickable
	this.color = "#FFFFFF";		//Background color of the clickable
	this.cornerRadius = 10;		//Corner radius of the clickable
	this.strokeWeight = 2;		//Stroke width of the clickable
	this.stroke = "#000000";	//Border color of the clickable
	this.text = "Press Me";		//Text of the clickable
	this.textColor = "#000000";	//Color for the text shown
	this.textSize = 12;		//Size for the text shown
	this.textFont = "sans-serif";	//Font for the text shown
	this.textScaled = false;     //Scale the text with the size of the clickable
	
	// image options
	this.image = null; // image object from p5loadimage()
	this.tint = null; // tint image using color
	this.noTint = true; // default to disable tinting
	this.filter = null; // filter effect

	this.updateTextSize = function () {
		if (this.textScaled) {
			for (let i = this.height; i > 0; i--) {
				if (getTextBounds(this.text, this.textFont, i)[0] <= this.width && getTextBounds(this.text, this.textFont, i)[1] <= this.height) {
					console.log("textbounds: " + getTextBounds(this.text, this.font, i));
					console.log("boxsize: " + this.width + ", " + this.height);
					this.textSize = i / 2;
					break;
				}
			}
		}
	}
	this.updateTextSize();

	this.onHover = function () {
		//This function is ran when the clickable is hovered but not
		//pressed.
	}

	this.onOutside = function () {
		//This function is ran when the clickable is NOT hovered.
	}

	this.onPress = function () {
		//This fucking is ran when the clickable is pressed.
	}

	this.onRelease = function () {
		//This funcion is ran when the cursor was pressed and then
		//released inside the clickable. If it was pressed inside and
		//then released outside this won't work.
	}

	this.locate = function (x, y) {
		this.x = x;
		this.y = y;
	}

	this.resize = function (w, h) {
		this.width = w;
		this.height = h;
		this.updateTextSize();
	}

	// Added at async
	this.drawImage = function(){
		// exit if image not yet loaded
		if( this.image === null ) {
			return;
		}

		// resize if flag has been triggered & image != 1
		if( this.resizeImageFlag && this.image.width != 1 && this.image.height != 1) {
			this.resize(this.image.width, this.image.height);
			this.resizeImageFlag = false;
		}

		image(this.image, this.x, this.y, this.width, this.height);
		if(this.tint && !this.noTint){
			tint(this.tint)
		} else {
			noTint();
		}
		if(this.filter){
			filter(this.filter);
		}
	}

	// the image won't be resized yet to match the PNG, so we set a draw flag to do this
	this.setImage = function (img) {
		this.image = img;
		this.text = "";
		this.resizeImageFlag = true;
	}

	this.draw = function () {
		if( this.visible === false ) {
			return;
		}

		push();
		fill(this.color);
		stroke(this.stroke);
		strokeWeight(this.strokeWeight);
		rect(this.x, this.y, this.width, this.height, this.cornerRadius);
		fill(this.textColor);
		noStroke();
		if(this.image){
			this.drawImage();
		}
		textAlign(CENTER, CENTER);
		textSize(this.textSize);
		textFont(this.textFont);
		text(this.text, this.x + this.width / 2, this.y + this.height / 2);
		if (mouseX >= this.x && mouseY >= this.y
			&& mouseX < this.x + this.width && mouseY < this.y + this.height) {
			cl_lastHovered = this;
			if (mouseIsPressed && !cl_mouseWasPressed)
				cl_lastClicked = this;
		}
		pop();
	}

	cl_clickables.push(this);
}

// ClickableManager class 
// call constructor in the sketch.js preload() funciton
// call setup in the  sketch.js setup() function
class ClickableManager {
	// Constrctor: set all member vars to defaults, string array to empty strings
	constructor(allocatorFilename) {
		this.clickableArray = [];
		this.allocatorTable = loadTable(allocatorFilename, 'csv', 'header');
	}

	getClickableArray() {
		return this.clickableArray;
	}

	// expects as .csv file with the format as outlined in the readme file
	setup() {
		// this could be cleaner...
		// Make sure we have a 
		let hasWidth = this.hasColumnData('width');
		let hasHeight = this.hasColumnData('height');
		let hasColor = this.hasColumnData('color');

		// For each row, allocate a clickable object
		for( let i = 0; i < this.allocatorTable.getRowCount(); i++ ) {
			this.clickableArray[i] = new Clickable();
			
			// if we have an image, we will call setImage() to load that image into that p5.clickable
			if( this.allocatorTable.getString(i, 'PNGFilename') != "" ) {
				this.clickableArray[i].setImage(loadImage(this.allocatorTable.getString(i, 'PNGFilename'))); 
			}

			// supply the remaining fields from the .csv file
			// IF YOU GET AN ERROR, you probably have the incorrect headers information on the CSV file
			// especially check the case
			this.clickableArray[i].id = parseInt(this.allocatorTable.getString(i, 'ID'));
			this.clickableArray[i].name = this.allocatorTable.getString(i, 'Name');
			this.clickableArray[i].x = eval(this.allocatorTable.getString(i, 'x'));
			this.clickableArray[i].y = eval(this.allocatorTable.getString(i, 'y'));
			if( hasWidth ) {
				this.clickableArray[i].width = eval(this.allocatorTable.getString(i, 'width'));	
			}
			if( hasHeight ) {
				this.clickableArray[i].height = eval(this.allocatorTable.getString(i, 'height'));
			}
			if( hasColor ) {
				// expects hex value
				this.clickableArray[i].color = this.allocatorTable.getString(i, 'color');
			}

			this.clickableArray[i].text = this.allocatorTable.getString(i, 'Text')
			
		}
	
		return this.clickableArray;
	}

	// draw all clickables (visible now in the draw function)
	draw() {
		for( let i = 0; i < this.clickableArray.length; i++ ) {
			this.clickableArray[i].draw();
		}
	}

	// given a column name and cell, will get the String value associated with it
	getAttribute(rowNum,attStr) {
		// return empty string if we are out of bounds
		if( rowNum < 0 || rowNum >= this.allocatorTable.getRowCount()) {
			return "";
		}
		
		return this.allocatorTable.getString(rowNum, attStr);
	}

	//-- Internal --/
	// Weird way to check to see if the column actually has data or not, but it works...
	hasColumnData(headerStr) {
		let arr = this.allocatorTable.getColumn(headerStr);
		if( this.allocatorTable.getRowCount() === 0 || arr[0] === undefined) {
			print( "No " + headerStr + " parameter in clickables Layout");
			return false;
		}

		return true;
	}
 }
