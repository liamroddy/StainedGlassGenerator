import { randomHSB, LineDrawer, DoubleLineDrawer } from "./drawers.js"

//let w = 1000
//let h = 1000

let spiros = new Array();

export function setupSpiroCanvas(w, h) {
    smooth();
	
	createCanvas(w, h);
	background(25);
}

export class SpiroGraph {
	constructor() {
        // object variables
        this.numSines = 10; // how many of these things can we do at once?
        this.sines; // an array to hold all the current angles
        this.sineLines;

        this.isPaused = false;
        this.traceMode = true;
        this.doubleLineMode = false;
        this.colourMode = false;

        this.x = 0;
        this.y = 0;

        this.initialSineScale = 100;
        this.subSineScale = 0.7;
        this.initialSineAngleChange = .005;
        this.subSineAngleChange = .5;

        this.drawingSpeed = 1; // real render speed would be initialSineAngleChange
        this.maxRotations = 0
        this.renderCutoff = 2;

        this.lineThickness = 1;
		
		this.angle = 0;
		
		this.colour = color(255, 255, 255, 3);
        
    }
	
	setup()
	{
		// setup
        this.sines = new Array(this.numSines);
        this.sineLines = new Array(this.numSines);

        for (let i = 0; i<this.sines.length; i++) {
            this.sines[i] = this.angle;

//            if (doubleLineMode)
//            {
//                sineLines[i] = new DoubleLineDrawer();
//
//                sineLines[i].outerLine.colour = color(5);// randomHSB();
//                sineLines[i].outerLine.lineThickness = 8;   
//                sineLines[i].outerLine.curveTightness = 20;
//                sineLines[i].outerLine.maxLength = 100;
//                sineLines[i].outerLine.skipAmount = 1;
//
//
//                sineLines[i].innerLine.colour = randomHSB();
//                sineLines[i].innerLine.lineThickness = 4;   
//                sineLines[i].innerLine.curveTightness = 20;			
//                sineLines[i].innerLine.maxLength = 100; 	
//                sineLines[i].innerLine.skipAmount = 1;
//            }
//            else
//            {
                this.sineLines[i] = new LineDrawer();

//                if (colourMode)
//                {
//                    colorMode(HSB, numSines, 100, 100, 100)
//                    sineLines[i].line.colour = color(i, 60, 100, 3)
//
//                    //sineLines[i].line.fillColour = color(i, 60, 50, 50)
//                }
//                else
//                {
                    colorMode(RGB)
			
					//test code, DELETE
					this.sineLines[i].line.colour = this.colour
			
					//this.sineLines[i].line.colour = ((i%2) ? color(255, 255, 255, 1) : color(0, 0, 0, 1) ) 
			
//					let r = random()
//					
//					if (r < 0.5)
//						this.sineLines[i].line.colour = color(255, 255, 255, 3);
//					else
//						this.sineLines[i].line.colour = color(0, 0, 0, 3);
					
//					if (r < 0.3333)
//						this.sineLines[i].line.colour = color(255, 0, 0, 3);
//					else if (r< 0.66666)
//						this.sineLines[i].line.colour = color(0, 255, 0, 3);
//					else
//						this.sineLines[i].line.colour = color(0, 0, 255, 3);
			
                    //this.sineLines[i].line.colour = color(255, 255, 255, 3);
			
                    this.sineLines[i].line.skipAmount = 4;
                //}

                this.sineLines[i].line.lineThickness = this.lineThickness;   
                //sineLines[i].line.curveTightness = 20;			
                this.sineLines[i].line.maxLength = 50;
                //sineLines[i].line.skipAmount = 32;
            //}		
        }
	}
    
    update(x, y, scale, drawingSpeed)
    {
        if (x == -1)
            x = this.x
        if (y == -1)
            y = this.y
        if (scale == -1)
            scale = this.scale
        if (drawingSpeed == -1)
            drawingSpeed = this.drawingSpeed
        
        // initial setup
        let currentSineScale = this.initialSineScale;
        let currentSineAngleChange = this.initialSineAngleChange;
        //initialSineScale *= 1.0001; // can produce cool effect, especially combined with colour mode. could try changing scale with sine wave either
        let currentCentreX = x//mouseX
        let currentCentreY = y //mouseY
        
        if (this.traceMode)
        {
//            if (doubleLineMode)
//            {
//                //background(5); // clear background for double lines
//            }
        }
        else
        {
//            if (!this.isPaused)
//            {
//                background(5);
//            }
			background(5);
            noFill();
            stroke(255);
        }

        let overallDrawingScale = scale;

        for (var r=0; r < drawingSpeed; r++)
            {
                if (!this.isPaused && ( (this.sines[1] < (2 * Math.PI * this.maxRotations) ) || this.maxRotations == 0 || this.traceMode == false ) )
                {
                    //for (var i=sines.length-1; i > -1; i--)
                    for (var i=1; i < this.sines.length; i++)
                    {
                        
						
						this.sines[i] += currentSineAngleChange * drawingSpeed;// * renderSpeed;  // ot really renderspeed here, but has an interesting effect
                        let sineX = currentCentreX + ( /* Math.PI * */ Math.sin(this.sines[i]) * currentSineScale * overallDrawingScale);
                        let sineY = currentCentreY + ( /* Math.PI * */ Math.cos(this.sines[i]) * currentSineScale * overallDrawingScale );

                        if (this.traceMode)
                        {
                            if (i >= this.renderCutoff)
                            {
                                this.sineLines[i].addPoint(sineX, sineY);	
                                // this guy gets hit no bother the moment we click, but drawing starts ~1sec later. What gives?
                                // not a transparency build up issue
                                // something to do with sineLines? (ie LineDrawer)
                                // issue is skip amount in Line. Skips the first8 by default but changing it to 1 fucks other things up
                                // get Line to draw once first no matter what
                            }
                        }
                        else
                        {
                            ellipse(currentCentreX, currentCentreY, currentSineScale*2, currentSineScale*2);
                        }		

						currentCentreX = sineX;
                        currentCentreY = sineY;

                        currentSineScale = (this.initialSineScale * this.subSineScale * (1/(i)))//*= this.subSineScale; // = initialSineScale / (i);
                        currentSineAngleChange *= this.subSineAngleChange//= i * this.subSineAngleChange// * Math.PI//this.initialSineAngleChange + (i * this.subSineAngleChange) // *= subSineAngleChange;
                    }
                }   
            }
    }
    
}

/// SLIDERS

/// initial set up
//window.onload = function() {
//	renderCutoffSlider.setAttribute("max", numSines-1);
//	
//	numSinesSlider.setAttribute("value", numSines);
//	sizeRatioSlider.setAttribute("value", subSineScale);
//	rotationRatioSlider.setAttribute("value", subSineAngleChange);
//	maxRotationSlider.setAttribute("value", maxRotations);
//	renderCutoffSlider.setAttribute("value", renderCutoff);
//	
//	numSinesSlider.oninput(); // this will setup spiro, doubling start up time!
//	sizeRatioSlider.oninput();
//	rotationRatioSlider.oninput();
//	maxRotationSlider.oninput()
//	renderCutoffSlider.oninput();
//}
//
//// on inputs
//
//numSinesSlider.oninput = function() {
//	numSinesText.innerHTML = "Number of sines: " + this.value;
//	numSines = parseInt(this.value);
//	
//	renderCutoffSlider.setAttribute("max", numSines-1);
//	renderCutoffSlider.oninput();
//	
//	setupSpiro(); // restart
//}
//
//sizeRatioSlider.oninput = function() {
//	sizeRatioText.innerHTML = "Size ratio: " + this.value;
//	subSineScale = this.value;
//	
//	setupSpiro(); // restart
//}
//
//rotationRatioSlider.oninput = function() {
//	rotationRatioText.innerHTML = "Rotation ratio: " + this.value;
//	subSineAngleChange = this.value;
//	
//	setupSpiro(); // restart
//}
//
//maxRotationSlider.oninput = function() {
//	maxRotationText.innerHTML = "Max rotations: " + this.value;
//	maxRotations = this.value;
//	
//	setupSpiro(); // restart
//}
//
//renderCutoffSlider.oninput = function() {
//	renderCutoffText.innerHTML = "Render cut-off: " + this.value;
//	renderCutoff = this.value;
//	
//	setupSpiro(); // restart
//}
//
//// buttons and checkboxes
//
//colourCheckbox.onclick = function() {
//	colourMode = !colourMode;
//	setupSpiro(); // restart
//}
//
//pauseButton.onclick = function() {
//	isPaused = !isPaused;
//	pauseButton.innerHTML = isPaused ? "Resume" : "Pause"; 
//}
//
//traceModeButton.onclick = function() {
//	background(5);
//	
//	traceMode = !traceMode;
//	traceModeButton.innerHTML = traceMode ? "Circle mode" : "Trace mode"; 
//	
//	setupSpiro(); // restart
//}
//
//clearButton.onclick = function() {
//	background(5);
//	
//	setupSpiro(); // restart
//}
