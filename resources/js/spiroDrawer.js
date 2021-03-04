import { setupSpiroCanvas, SpiroGraph } from "./spirograph.js"

let mousePressedLastFrame = false;

let maxArrayLen = 500;
let spiros = new Array();

let actionFrame = 5;
let frameCount = 0

let lastSpiroX = -9999;
let lastSpiroY = -9999;
let minimumDistanceBetweenSpiros = 50;

let colour;
let colourPicker;

let vertSymmetry = true;


export function setupSpiroDrawer() {
	//setupSpiro(); //change cutoff for drawing to nmice and low
	colour = color(255, 255, 255, 4);
	
	colourPicker = createColorPicker('#ffffff');
  	colourPicker.position(0, height + 5);
}

export function setColour(col)
{
	//colour = col; // colourPicker.color()
}

export function updateSpiroDrawer()
{
    if (mouseIsPressed)
	{
		
	colour = colourPicker.color();
	colour.levels[3] = 4
	colour._array[3] = 0.01
		
		
	//isPaused = false;
		mousePressedLastFrame = true; // for next frame

		
		if ((abs(mouseX - lastSpiroX) + abs(mouseY - lastSpiroY) > minimumDistanceBetweenSpiros))//(frameCount == 0)
		{
			frameCount = makeNewSpiros(mouseX, mouseY, frameCount);
			if (vertSymmetry)
				{
					frameCount = makeNewSpiros((width - mouseX), mouseY, frameCount);
				}

		}

			//drawSpiro(mouseX, mouseY, drawingScale, drawingSpeed)
		
		frameCount -= 1;

	}
	else
	{
		if (mousePressedLastFrame) // if just let go
		{
			//setupSineLines()
		}	
		mousePressedLastFrame = false; // for next frame
		
		frameCount = actionFrame;

		//isPaused = true;
	}
	
	for (let i=0; i<spiros.length; i++)
		{
			spiros[i].update(-1, -1, 1, 1);
		}
	
	if (spiros.length > maxArrayLen)
		spiros.shift();

}

function makeNewSpiros(x, y, frameCount)
{
	let mouseSpeed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY); // between 0 and 25
	//console.log(mouseSpeed)
	let drawingScale = map(mouseSpeed, 0, 25, 40, 70); //mouseSpeed;//(Math.log(mouseSpeed) * 0.2);
	//actionFrame = map(mouseSpeed, 0, 25, 3, 1);
		
	
	//overallDrawingScale = map(mouseSpeed, 0, 50, 1, 100);
	//drawingSpeed =  map(mouseSpeed, 0, 50, 1, 100);//0.1 + (Math.log(mouseSpeed) / 200);  // /200);
	let drawingSpeed = 50//mouseSpeed/2; // should we use?????
	//console.log("Scale: " + overallDrawingScale)

	let spiro = new SpiroGraph();
	//spiro.initialSineAngleChange = 0.25
	spiro.subSineAngleChange = 500
	//spiro.subSineAngleChange = initialSineAngleChange
	spiro.numSines = 3
	spiro.renderCutoff = 2
	//spiro.angle = Math.random() * Math.PI *2;
	spiro.initialSineScale = drawingScale// drawingScale///( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
	//spiro.colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
	spiro.lineThickness = 1;
	spiro.maxRotations = 1//map(mouseSpeed, 0, 25, 0.1, 1);;
	spiro.subSineScale = 0.7//1/(i+1)//0.7;
	spiro.x = x;
	spiro.y = y;	
	spiro.drawingSpeed = drawingSpeed;

	spiro.colour = colour//color(255, 255, 255, 4);

	spiro.setup();

	spiros.push(spiro);

	lastSpiroX = x;
	lastSpiroY = y;

	frameCount = actionFrame;
	
	return frameCount
}

	
