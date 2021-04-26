/*******************************************************************************************************************
//
//  p5.2DAdventure
//  for P5.js
//
//  Written by Scott Kildall
//
//  Very Much in Progress
*********************************************************************************************************************/

class AdventureManager {
    // Clickable layout table is an OPTIONAL parameter
    constructor(statesFilename, interactionFilename, clickableLayoutFilename = null) {
        this.backgroundColor = color("#000000");
        this.currentState = 0;
        this.currentStateName = "";
        this.hasValidStates = false;
        this.states = [];
        this.statesTable = loadTable(statesFilename, 'csv', 'header');
        this.interactionTable = loadTable(interactionFilename, 'csv', 'header');
        this.savedPlayerSpritePosition = createVector(width/2, height/2);
        this.changedStateCallback = null;

        if( clickableLayoutFilename === null ) {
            this.clickableTable = null;
        }
        else {
            this.clickableTable = loadTable(clickableLayoutFilename, 'csv', 'header');
        }

        this.playerSprite = null;
        this.clickableArray = null;
    }

    // expects as .csv file with the format as outlined in the readme file
    setup() {
        let validStateCount = 0;
        // For each row, allocate a clickable object
        for( let i = 0; i < this.statesTable.getRowCount(); i++ ) {
            let className = this.statesTable.getString(i, 'ClassName');
            
            // if we have an image, we will call setImage() to load that image into that p5.clickable
            if( className === "" ) {
                print("empty className field in line #" + i + " of states file");
                return false;    
            }
           
            // this is the allocator itself
            this.states[validStateCount] = eval("new " + className);
            
            // store name of the state in the PNGRoom
            this.states[validStateCount].setName(this.statesTable.getString(i, 'StateName'));

            // All classes (for now) have a PNGFilename, could add a blank room
            this.states[validStateCount].setup( this.statesTable.getString(i, 'PNGFilename'),
                                                this.statesTable.getString(i, 'CollisionFilename'));
           
            this.states[validStateCount].preload();

            validStateCount++;
        }
    
        if( validStateCount > 0 ) {
            this.hasValidStates = true;
            this.currentStateName = this.statesTable.getString(0, 'StateName');
            this.changeState(this.currentStateName,true);
        }
        else {
            this.hasValidStates = false;
        }

        return this.hasValidStates;
    }

    // accessor for the state name
    getStateName() {
        return this.currentStateName;
    }

    // from the p5.play class
    setPlayerSprite(s) {
        this.playerSprite = s;
    }

    // clickable manager for turning visibility on/off for buttons based on their states
    setClickableManager(cm) {
        this.clickableArray = cm.getClickableArray();
    }

    // call on every draw loop from the p5 sketch
    draw() {
        if( !this.hasValidStates ) {
            background(128);
        }
        else {
            this.checkPlayerSprite();

            // this will reset the player position, if we go outside of a collision rect
            if( this.states[this.currentState].checkForCollision(this.playerSprite) === true ) {
                // set to last good position
                 if( this.playerSprite !== null ) {
                    this.playerSprite.position.x = this.savedPlayerSpritePosition.x;
                    this.playerSprite.position.y = this.savedPlayerSpritePosition.y;
                }
            }
            else {
                if( this.playerSprite !== null ) {
                    // save the last poisition for checkCollision in the future
                    this.savedPlayerSpritePosition.x = this.playerSprite.position.x;
                    this.savedPlayerSpritePosition.y = this.playerSprite.position.y;
                }
            }

            background(this.backgroundColor);
            this.states[this.currentState].draw();
        }
    }

    // move to interation table!
    keyPressed(keyChar) {
       // go through each row, look for a match to the current state
      for (let i = 0; i < this.interactionTable.getRowCount(); i++) {

        // the .name property of a function will convert function to string for comparison
        if(this.currentStateName === this.interactionTable.getString(i, 'CurrentState') ) {
            // now, look for a match with the key typed, converting it to a string
            if( this.interactionTable.getString(i, 'KeyTyped') === String(keyChar) ) {
                // if a match, set the drawFunction to the next state, eval() converts
                // string to function
                this.changeState(this.interactionTable.getString(i, 'NextState') );
                break;
            }
        }
      }
    }

    // Right now, just support for mouse released, but in future will have
    // other events like mouse pressed or moved, etc.
    mouseReleased() {
        this.mouseEvent("mouseReleased");
    }

    // a clickable was pressed, look for it in the interaction table
    clickablePressed(clickableName) {
        // this will be = the clickable pressed
         // go through each row, look for a match to the current state
      for (let i = 0; i < this.interactionTable.getRowCount(); i++) {

        // the .name property of a function will convert function to string for comparison
        if(this.currentStateName === this.interactionTable.getString(i, 'CurrentState') ) {
            // now, look for a match with the key typed, converting it to a string
            if( this.interactionTable.getString(i, 'ClickableName') === clickableName ) {
                // if a match, set the drawFunction to the next state, eval() converts
                // string to function
                this.changeState(this.interactionTable.getString(i, 'NextState') );
                break;
            }
        }
      }
    }

 //-- PRIVATE FUNCTIONS: don't call these --//   

    // Called essentially as a private function for mouseReleased(), mousePressed(), etc to
    // process the mouseEvent column interaction table
    mouseEvent(mouseStr) {
       // go through each row, look for a match to the current state
      for (let i = 0; i < this.interactionTable.getRowCount(); i++) {
        // the .name property of a function will convert function to string for comparison
        if(this.currentStateName === this.interactionTable.getString(i, 'CurrentState') ) {
            // now, look for a match with the key typed, converting it to a string
            if( this.interactionTable.getString(i, 'MouseEvent') === mouseStr ) {
                // if a match, set the drawFunction to the next state, eval() converts
                // string to function
                this.changeState(this.interactionTable.getString(i, 'NextState') );
                break;
            }
        }
      }
    }
    
    setChangedStateCallback(callbackFunction) {
        this.changedStateCallback = callbackFunction;
    }

    // OPTIMIZATION: load all the state/interaction tables etc into an array with just
    // those state entries for faster navigation
    // newState is a STRING;
    // 2nd param is a flag to bypass the comparison to currentStateNum, usually used at startup
    changeState(newStateStr, bypassComparison = false) {
        let newStateNum = this.getStateNumFromString(newStateStr);
        this.changeStateByNum(newStateNum, bypassComparison);
    }

    // default is by string
    changeStateByNum(newStateNum, bypassComparison = false) {
        print( "passed new state num = " + newStateNum);
        
        // if( this.currentState === newStateNum ) {
        //     print( "same state num, no change")
        //     return;
        // }
        
        if( newStateNum === -1 ) {
            print("invalid statenum, exiting");
            return;
        }

        // activate callback hander
        if( this.changedStateCallback !== null ) {
            this.changedStateCallback(this.currentStateName, this.getStateStrFromNum(newStateNum));
        }
        
        if( bypassComparison === false && this.currentState === newStateNum ) {
            return;
        }

        this.states[this.currentState].unload();
        this.states[newStateNum].load();
        this.currentState = newStateNum;

        // store new state name from states table
        this.currentStateName = this.getStateStrFromNum(newStateNum);

         print("Going to state: " + this.currentStateName);

        if( this.clickableArray !== null && this.clickableTable !== null ) {
            this.changeButtonsVisibilityFromState(this.currentStateName);
        }
    }

    getNumStates() {
        return this.statesTable.getRowCount();
    }

    getCurrentStateNum() {
        return this.currentState;
    }

    getStateNumFromString(stateStr) {
        for (let i = 0; i < this.statesTable.getRowCount(); i++) {
            if( stateStr === this.statesTable.getString(i, 'StateName') ) {
                return i;
            }
        }

        // error!!
        print( "Can't find stateStr, " + stateStr);
        return -1;
    }

    getStateStrFromNum(stateNum) {
        return this.statesTable.getString(stateNum, 'StateName');
    }

    // returns class name of current state
    getClassName() {
        return this.statesTable.getString(this.currentState, 'ClassName');
    }

    checkPlayerSprite() {
        if( this.playerSprite === null ) {
            return;
        }
        let direction = this.checkSpriteBounds();
        
        // empty string returned if we are in the room still
        if( direction !== "") {
            let stateChanged = false;

            // go through each row, look for a match to the current state
            for (let i = 0; i < this.interactionTable.getRowCount(); i++) {
                 // the .name property of a function will convert function to string for comparison
                if(this.currentStateName === this.interactionTable.getString(i, 'CurrentState') ) {
                    // now, look for a match with the direction, converting it to a string
                    if( direction === this.interactionTable.getString(i, 'MapDirection') ) {
                        // if a match, set the drawFunction to the next state, eval() converts
                        // string to function
                        this.changeState(this.interactionTable.getString(i, 'NextState') );
                        stateChanged = true; 

                        this.adjustSpriteForRoom();
                        break;
                    }
                }
            }
            
            // state never changed, so we stick at edge
            if( !stateChanged ) {
                this.constrainSpriteBounds();
            }
        }
    }

    // return direction we are out of bounds to match interaction map
    checkSpriteBounds() {
        if( this.playerSprite == null ) {
            return "";
        }

        if( this.playerSprite.position.x < -1 ) {
            return "W";
        }
        else if( this.playerSprite.position.x > width ) {
            return "E";
        }
        else if( this.playerSprite.position.y < -1 ) {
            return "N";
        }
        else if( this.playerSprite.position.y > height ) {
            return "S";
        }

        return "";
    }

    adjustSpriteForRoom() {
        if( this.playerSprite === null ) {
            return;
        }

        if( this.playerSprite.position.x < -1 ) {
            this.playerSprite.position.x = width;
        }
        else if( this.playerSprite.position.x > width ) {
            this.playerSprite.position.x = 0;
        }
        else if( this.playerSprite.position.y < -1 ) {
            this.playerSprite.position.y = height;
        }
        else if( this.playerSprite.position.y > height ) {
            this.playerSprite.position.y = 0;
        }
    }

    // no room, constrain to edges
    constrainSpriteBounds() {
        if( this.playerSprite === null ) {
            return;
        }

        if(this.playerSprite.position.x < -1 ) {
            this.playerSprite.position.x = 0;
        }
        else if(this.playerSprite.position.x > width+1 ) {
            this.playerSprite.position.x = width;
        }
        else if(this.playerSprite.position.y < -1 ) {
            this.playerSprite.position.y = 0;
        }
        else if(this.playerSprite.position.y > height ) {
            this.playerSprite.position.y = height;
        }
    }

    // returns the "short" filename (no precesing directory for the current state)
    getPNGFilename() {
        let longFilename = this.statesTable.getString(this.currentState, 'PNGFilename');
        return longFilename.substring(longFilename.lastIndexOf('/')+1);
    }

    // logic here is this (1) look at the clickables table to find the state name
    // (2) look for a match in the clickables array, (3) turn visibility on/off accordingly
    // EVERY clickable either has ONE state that corresponds to it or NO states
    changeButtonsVisibilityFromState(newStateName) {
        // this is the array where the button is VISIBLE for that state
        // OPTIMIZATION: store this in setup somethwere
        let clickableStateArray = this.clickableTable.getColumn('State');
        for( let i = 0; i < clickableStateArray.length; i++ ) {
            // if there is no column called 'State' then the array is a proper
            // length, but each entry is undefined, just continue then
            if( clickableStateArray[i] === undefined ) {
                continue;
            }

            // if an empty string, then we are not binding this button to a state
            if( clickableStateArray[i] ===  "" ) {

            }

            // Otherwise, we are binding, so turn button on/off accordingly
            if( clickableStateArray[i] === newStateName ) {
                this.clickableArray[i].visible = true;
                //print("set to visible");
            }
            else {
                this.clickableArray[i].visible = false;   
               // print("set to hide");
            }
        }
    }
}

// this will be used with the loadTable() callback for the collision table
// class variables are not available for callbacks
// need a global variable with a ridiculous name to avoid name conflicts
// save the this data
var PNGRoomPushedThisArray = [];

function PNGRoomFindTheThis() {
    for( let i = 0; i < PNGRoomPushedThisArray.length; i++ ) {
        // do stuff
        if( PNGRoomPushedThisArray[i].collisionTableLoaded === false ) {
            return PNGRoomPushedThisArray[i];
        }
    }

    // test return
    return null;
}

function PNGCollisionTableLoaded() {
    print("PNGCollisionTableLoaded() callback");
    let pThis = PNGRoomFindTheThis();
    if(pThis === null ) {
        print("Couldn't find the This");
    }
    else {
        print("pThis.stateName = " + pThis.stateName );
    }

     if( pThis.collisionTable !== null) { 
        print("Collision table row count = " + pThis.collisionTable.getRowCount());
        for( let i = 0; i < pThis.collisionTable.getRowCount(); i++ ) {
            pThis.collisionSX[i] = pThis.collisionTable.getString(i, 'sx');
            pThis.collisionSY[i] = pThis.collisionTable.getString(i, 'sy');
            pThis.collisionEX[i] = pThis.collisionTable.getString(i, 'ex');
            pThis.collisionEY[i] = pThis.collisionTable.getString(i, 'ey');
        }

        pThis.collisionTableLoaded = true;
    }
    else {
        print("No collision table loaded");
    }
}

class PNGRoom {
    constructor() {
        // Image stuff
        this.imagePath = null;
        this.image = null;

        // collision stuff
        this.collisionTable = null;
        this.collisionSX = [];
        this.collisionSY = [];
        this.collisionEX = [];
        this.collisionEY = [];
    
        // flag for first-time load for collision table proper loading
        this.loaded = false;
        this.stateName = "";
        this.collisionTableLoaded = false;
    }

    setName(s) {
        this.stateName = s;
    }

    // filepath to PNG is 1st variable
    // file to collision CSV is 2nd variable (may be empty string)
    setup(_imagePath, _collisionPath = "") {
        print( "PNGRoom.setup(): imagePath =" + _imagePath);

        this.imagePath = _imagePath;

        // use for callbacks
        // PNGRoomPushedNameList.push(this.stateName);
        // PNGRoomPushedThis.push(this);

        if( _collisionPath !== "" ) {
           // PNGRoomPushedThis = this;
           
           PNGRoomPushedThisArray.push(this);
            this.collisionTable = loadTable(_collisionPath, 'csv', 'header', PNGCollisionTableLoaded);
            print("PNGRoom.setup(): loading collisionTable: " + _collisionPath);
        }
    }
    
    // empty, sublcasses can override
    preload() {
       
    }




    load() {
        this.image = loadImage(this.imagePath);
        // this loads the collision table, we use the flag b/c loadTable needs
        // time to load the data and won't work properly for a few cycles
        // if( this.loaded === false ) {
        //     // load the collisions
            
        //     this.loaded = true; 
        // }

        if( this.collisionTable !== null) { 
            print( "load() for: " + this.stateName );
            print("Collision table row count = " + this.collisionTable.getRowCount());
        }

    }

    unload() {
        this.image = null;
    }

    draw() {
        if( this.image === null ) {
            background(64);
            return;
        }

        push();
        imageMode(CENTER);
        image(this.image,width/2,height/2);

        //imageMode(CORNER);
        //fill(255,0,0);
        // draw rects to see...

        pop(); 
    }

    // Go through our array and ook to see if we are in bounds anywhere
    checkForCollision(ps) {
        if( ps !== null ) {  
            for(let i = 0; i < this.collisionSX.length; i++ ) {
                if( ps.position.x >= this.collisionSX[i] &&  ps.position.x <= this.collisionEX[i] ) {
                    if( ps.position.y >= this.collisionSY[i] &&  ps.position.y <= this.collisionEY[i] ) {
                        //print("collsion at shape " + i);
                        return true;
                    }
                }
            }
        }

        return false; 
    }

    
    // output to DebugScreen or console window, if we have no debug object
    output(s) {
        print(s);
    }
}




