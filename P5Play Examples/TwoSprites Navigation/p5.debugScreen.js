/*******************************************************************************************************************
//
//  Class: DebugScreen
//
//  Written by Scott Kildall
//	for P5.js
//
//------------------------------------------------------------------------------------------------------------------
//  Description: [to be added]
//
//------------------------------------------------------------------------------------------------------------------
//
//  Member Functions:
//  Accessors: 
//  * draw(): call at the end of your draw loop to see debug text on the screen
//  * write(): write a new line of text to the buffer for display. If auto-scroll
//    is off, you can select a specific line num
//  * clear(): will clear debug window
//  
//  Member Variables:
//  * lines [] = array of strings
//  * numLines = number of lines we will display, set with setLineCount()
//  * topDraw = true/false, whether we display from top of the screen or bottom
//  * lineHeight = change this?? Space between each line
//  * drawBackgroundRect = true/false, whether we will draw a semi-transparent
//      background rect behind the text
//  * setTextSize()/getTextSize() = change font size, lineHeight will also scale
//  * setTextColor() = change text color
//  * vOffseet = vertical position for text, offset from top or bottom (no accessor)
//  * hOffset = horizontal position from text (no accessor)
//  * rectOffset = offset from text for drawing (no accessor)
//  * currentLine = which line we are drawing to, so we can achieve a scrolling effect
*********************************************************************************************************************/

class DebugScreen {
  // Constrctor: set all member vars to defaults, string array to empty strings
  constructor() {
    this.lines = [];
    this.autoScroll = true;
    this.currentLineNum = 0;
    this.hOffset = 10;
    this.vOffset = 40;
    this.topDraw = true;
    this.textSize = 14 
    this.lineHeight = this.textSize;
    this.rectOffset = 10;
    this.setLineCount(8);
    this.drawBackgroundRect = true;
    this.fillColor = color(0,255,0);    // default to bright green

    // emopty strings for initial display
    for(let i = 0; i < this.numLines; i++ ) {
      this.lines[i] = "";
    }
  }
  
//--------- ACCESSORS -----------
  // number of lines in the buffer
  getNumLines() {
    return this.numLines;
  }

  // pass true to draw a background rect behind text, false to skip it
  setDrawBackgroundRect(onOrOff) {
    this.drawBackgroundRect = onOrOff;
  }

  // call to draw debug info from the top of the screen
  drawFromTop() {
    this.topDraw = true;
  }

  // call to draw debug info from the bottom of the screen
  drawFromBottom() {
    this.topDraw = false;
  }

  // change the # of lines in the debug buffer - set to 1 line to display
  // constantly-changing info
  setLineCount(newNumLines) {
    // must have at least one line
    if( newNumLines < 1 ) {
      return;
    }

    // if more lines, the we initialize the new lines to empty strings
    if( newNumLines > this.numLines ) {
      for(let i = this.numLines; i < newNumLines; i++ ) {
        this.lines[i] = "";
      }
    }

    // set to new number, make sure current line num doesn't overflow
    this.numLines = newNumLines; 
    if( this.currentLineNum >= this.numLines ) {
      this.currentLineNum = this.numLines-1
    }
  }

  setTextSize(newTextSize) {
    if( newTextSize < 6 ) {
      // too small
      return;
    }
    this.textSize = newTextSize;
    this.lineHeight = this.textSize;
  }

  getTextSize() {
    return this.textSize;
  }

  // use color() to form argument
  setTextColor(c) {
    this.fillColor = c;
  }

  // true or false, will also clear the buffer
  setAutoScroll(onOrOff) {
    if( this.autoScroll === onOrOff) {
      // exit if we are doing the same
      return;
    }

    this.autoScroll = onOrOff;
    if( this.autoScroll === false ) {
      // correct for drawing
      this.currentLineNum = 0;
    }

    this.clear();
  }

  // true or false
  getAutoScroll() {
    return this.autoScroll;
  }

//--------- draw() --> Draw Function -----------
  draw() {
    push();

    let lineNum = this.currentLineNum;

    // set drawY based on top or bottom drawing
    let drawY;
    if( this.topDraw ) {
      drawY = 25;
    }
    else {
      drawY = height - (this.vOffset + (this.numLines * this.lineHeight) );
    }

    // rect-drawing
    if( this.drawBackgroundRect ) {
      noStroke();
      fill(0,0,0,64);
      rectMode(CORNER);
      rect( this.hOffset-this.rectOffset, drawY-this.rectOffset*2, width, this.numLines*this.lineHeight + this.rectOffset*2);
    }
    
    // text-drawing settings
    fill(this.fillColor);
    textSize(this.textSize);
    textAlign(LEFT);

    // draw each line
    for( let i = 0; i < this.numLines; i++ ) {
      text( this.lines[lineNum], this.hOffset, drawY + (i * this.lineHeight) );
      lineNum++;
      if( lineNum === this.numLines ) {
        lineNum = 0;
      }
    }

    pop();
  }

//--------- print() --> Add string to text buffer  -----------
  // saves line to buffer, converts all values to strings
  // if autoScroll is FALSE, we can output to specific line numbers 
  print(s, lineNum = 0) {
    if( this.autoScroll === false ) {
      // correct for overflow
      if( lineNum >= this.numLines ) {
          lineNum = this.numLines - 1;
      }

      this.lines[lineNum] = String(s);
    }
    else {
      // we are auto-scrolling, write to current line num and incrrement
      this.lines[this.currentLineNum] = String(s);

      // increment current line num for scrolling, zero if past array
      this.currentLineNum++;
      if( this.currentLineNum === this.numLines ) {
        this.currentLineNum = 0;
      }
    } 
  } 

  // clear all lines from buffer
  clear() {
    for( let i = 0; i < this.numLines; i++ ) {
      this.lines[i] = "";
    }
  }
}
