# Clickable Examples
#### by Scott Kildall
www.kildall.com


## Overview
These are some samples for the p5.clickable library (https://github.com/Lartu/p5.clickable)

## Things I have noticed
(1) For the Clickable class, it will always draw and do mouseX and mouseY calculations from the upper-left corner, so you need to make sure that you are in imageMode(CORNER) and rectMode(CORNER), otherwise it won't interact correctly

(2) If you want background transparent PNGs, set the .color field of the clickable object to be "#00000000"


## Examples

(1) SimplePNGButton: Displays a single PNG button with a cat image, alert to show it was clicked. Uses the onHover and onOutside functions to tint the image

(2) TextButtons: array of text buttons with labels.

