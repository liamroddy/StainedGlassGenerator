import { getCurrentPattern, setupPatterns, runPattern, updatePattern, changePattern } from "./patterns.js"

var devMode = false;
var clearBackground = false;

export var drawerArray = [];
var ui = null;

var canvasW = 700;
var canvasH = 700;

var keyWasPressedLastFrame = true;

export function setClearBackground(bool)
{
    clearBackground = bool;
}

//function setup() {
window.setup = function ()
{
	background(5);
	createCanvas(canvasW, canvasH);
	frameRate(60);

	ui = new UI();
	
	setupPatterns();
	runPattern();
}

//function draw() {
window.draw = function () {
	checkKeys();

//	if (clearBackground)
//	{
//		background('white');
//	}
//	
	updatePattern();

	for (var i = 0; i < drawerArray.length; i++) {
		drawerArray[i].update();
	}

	ui.update();
}

class UI {
	constructor()
	{
		this.x = 10;		
		this.lineHeight = 15;	
		this.y = this.lineHeight *2;
	}

	update()
	{
		if (devMode)
		{
			this.show(getCurrentPattern());
			
			//this.show("Mouse mode: " + mouseMode);
			this.show("mouseX: " + mouseX);
			this.show("mouseY: " + mouseY);
			//this.show("Curve mode: " + curveMode);
			this.show("Frame rate: " + getFrameRate().toFixed(2));

			this.y = this.lineHeight *2; // reset for next draw
		}
	}

	show(s)
	{
		noStroke();

		fill(0, 25);
		rect(this.x, this.y-this.lineHeight, 150, this.lineHeight);
		fill(255);
		textSize(12);

		text(s, this.x, this.y);

		this.y += this.lineHeight;
	}
}





export function clearSketch()
{
	drawerArray = []
}

export function addToSketch(obj)
{
	drawerArray.push(obj);
}


function checkKeys()
{
	// reimplementing support for below keyPressed() function, as using ES6 modules breaks it
	
	if (keyIsPressed && !keyWasPressedLastFrame)
	{
		keyPressed();
	}
	
	// prep for next frame
	if (keyIsPressed)
	{
		keyWasPressedLastFrame = true;
	}
	else
	{
		keyWasPressedLastFrame = false;
	}
}

/// INPUT
function keyPressed()
{
	var change = 0.01;

	switch (key)
	{
		
		// Change pattern
		case ("ArrowLeft") :
			changePattern(-1);
			break;
		case("ArrowRight") :
			changePattern(1);
			break;
				
			
		////MOUSE MODE
		case ('m') :
			mouseMode = !mouseMode;
			break;

		/// SAVE SINE DETAILS
		case ('k') :
			saveSineDetails();
			break;

		////CURVE/LINE MODE
		case ('c') :
			curveMode = !curveMode;
			break;

		////DEV MODE
		case ('d') :
			devMode = !devMode;
			break;

		//// SCREENSHOT
		case ('p') :
			saveFrame();
			break;
	}
	
	return false;
}