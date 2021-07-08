import { GeneticAlgorithm } from "./geneticAlgorithm.js"
//import { checkKeys } from "./input.js"

let geneticAlgorithm

// CORE SKETCH SETUP AND LOOP
window.setup = function ()
{
	frameRate(60);	
	geneticAlgorithm = new GeneticAlgorithm();

	helpPopup();
}

window.draw = function () {
	geneticAlgorithm.updatePattern()

	checkKeys()
}


// UI button onClicks

like.onclick = function()
{
	geneticAlgorithm.likePattern()
}

dislike.onclick = function()
{
	geneticAlgorithm.gotoNextChild()
}

download.onclick = function()
{
	saveCanvas("Stained glass pattern")
}

help.onclick =  helpPopup;

function helpPopup()
{
	Swal.fire({
		title: 'Stained Glass Generator',
		html:
			'<p>An interactive art piece.' +
			'<br>Generates patterns inspired by the beautiful stained glass rose windows of <strong>Galway Cathedral</strong>' +
			'<br><br>Click <span class=\'fa fa-heart\'></span> if you like a pattern<br>Click <span class=\'fa fa-ban\'></span> if you don\'t' +
			'<br>The generator will learn your preferences and generate you more patterns that you might like' +
			'<br><br>Click the <span class=\'fa fa-arrow-to-bottom\'></span> to download a pattern.</p>' +
			'<br> Click the  <span class=\'fa fa-question-circle\'></span> for help.',
		confirmButtonText: 'Close'
		})
}

// KEYBOARD INPUT

var keyWasPressedLastFrame = true;

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
		case ('l') :
			geneticAlgorithm.likePattern()
			break;
		case ('d') :
			geneticAlgorithm.gotoNextChild()
			break;
		case ('s') :
			saveCanvas("Stained glass pattern")
			break;
		case ('h') :
			helpPopup();
			break;
	}
	
	return false;
}