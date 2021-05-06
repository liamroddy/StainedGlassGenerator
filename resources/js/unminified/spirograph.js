import { CurveDrawer } from "./curveDrawer.js"

export class SpiroGraph {
	constructor() {
        // object variables
        this.colourOffset = Math.floor(Math.random() * 3) // determines if red, green or blue gets drawn first
        this.blendModeOffset  = randomInteger(0, 3) // determines what order the blend modes are used in
        this.tightness = randomInteger(-3, 3) // how curvy/sharp the pattern's curves are
        this.colourOffset = randomInteger(0, 2)	
        this.blendModeOffset = randomInteger(0, 1)
        this.subSineAngleChange = randomInteger(4, 6) * randomSign() 
        this.initialSineAngleChange = 0.04
        this.initialSineAngle = 0
        this.numSines = randomInteger(5, 6)
        this.renderCutoff = 0
        this.initialSineScale = (width/(2))/(3.5)
        this.lineThickness = 1;
        this.maxRotations = 1.1
        this.subSineScale = randomReal(0.5, 0.9)

        this.colour = color(0, 0, 0, 3); // line colour
        this.sines; // an array to hold all the current angles
        this.sineLines;

        this.setup();
    }
	
	setup()
	{
		// setup
        this.sines = new Array(this.numSines);
        this.sineLines = new Array(this.numSines);

        for (let i = 0; i<this.sines.length; i++) {
            this.sines[i] = 0; // intitial angle/period for each sine
            
            this.sineLines[i] = new CurveDrawer();
            this.sineLines[i].line.colour = this.colour
            this.sineLines[i].line.skipAmount = 8;
            this.sineLines[i].line.lineThickness = this.lineThickness; 		
            this.sineLines[i].line.maxLength = 100;	// max number of points per curve
        }

        curveTightness( this.tightness )
	}
    
    update(x, y, scale, drawingSpeed)
    {
        if (scale == -1)
            scale = this.scale
        if (drawingSpeed == -1)
            drawingSpeed = this.drawingSpeed
        
        // initial setup
        let currentSineScale = this.initialSineScale;
        let currentSineAngleChange = this.initialSineAngleChange;   

        let overallDrawingScale = scale;

        if ( (this.sines[1] < (2 * Math.PI * this.maxRotations) ) || this.maxRotations == 0  )
        {
            for (var i=1; i < this.sines.length; i++)
            {						
                this.sines[i] += currentSineAngleChange * drawingSpeed;
                let sineX = x + ( Math.sin(this.sines[i]) * currentSineScale * overallDrawingScale);
                let sineY = y + ( Math.cos(this.sines[i]) * currentSineScale * overallDrawingScale );
              

                let layerAlpha // different blend modes work better at different opacity levels                
                
                if ((this.blendModeOffset + i) % 3 == 0)
                    {
                        layerAlpha = 2
                        blendMode( MULTIPLY )
                    }
                else if ((this.blendModeOffset + i) % 3 == 1)
                    {
                        layerAlpha = 3
                        blendMode( ADD )
                    }
                else if ((this.blendModeOffset + i) % 3 == 2)
                    {
                        layerAlpha = 2
                        blendMode( BLEND )
                    }

                let val = 255
            
                if ((this.colourOffset + i) % 3 == 0)
                    {
                        this.sineLines[i].line.fillColour = color(val, 0, 0, layerAlpha)
                    }
                else if ((this.colourOffset + i) % 3 == 1)
                    {
                        this.sineLines[i].line.fillColour = color(0, val, 0, layerAlpha)
                    }
                else if ((this.colourOffset + i) % 3 == 2)
                    {
                        this.sineLines[i].line.fillColour = color(0, 0, val, layerAlpha)
                    }
                
                if (i >= this.renderCutoff)
                {
                    for (var renders=0; renders < 5; renders++)
                    {
                        this.sineLines[i].addPoint(sineX, sineY);	
                    }
                }	

                x = sineX;
                y = sineY;

                currentSineScale = (this.initialSineScale * this.subSineScale * (1/(i)))
                currentSineAngleChange *= this.subSineAngleChange
            }
        }          
    }
}

// Randomisation helper functions:

function randomInteger(min, max)
{
	let me = min + Math.floor(Math.random() * (max - min + 1))
	return me 
}

function randomReal(min, max)
{
	let me = map(Math.random(), 0, 1, min, max)
	return me 
}

function randomSign()
{
	return (Math.random() > 0.5 ? 1 : -1 ) 
}