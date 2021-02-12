## Simple State Machine
#### by Scott Kildall


### Overview
This is a template for a simple state machine that goes between five states and starts with a splash screen


### Modifying the Template

(1) Add your own PNG files in the assets folder. Make sure they match the names ***exactly*** of the existing PNGs.

(2) Add custom drawing code to drawSplash(), drawOne(), drawTwo(), drawThree(), drawFour(), drawFive()

(3) You can add your own interfaces - keys, mouse events, etc in the Interfaces section

(4) You can add new states with their own drawing functions.

Don't change anything else! 


### How it works
array of images gets loaded at startup

drawFunction is a VARIABLE that points to a function varible name

drawOne(), drawTwo(), etc. are set to be functions.

the the keys 1-5 and 's' key will change the drawFunction variable

starts with drawSplash and waits for a mousePressed event
