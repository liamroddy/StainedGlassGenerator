import { CurveDrawer } from "./curveDrawer.js"

export class SpiroGraph {
	constructor() {
        // object variables
        this.colourOffset = Math.floor(Math.random() * 3) // determines if red, green or blue gets drawn first
        this.blendModeOffset  = Math.floor(Math.random() * 3) // determines what order the three blend modes are used in
        this.tightness = randomInteger(-3, 3) // how curvy/sharp the pattern's curves are
        this.colourOffset = Math.floor(Math.random() * 3)	
        this.blendModeOffset = Math.floor(Math.random() * 2)
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
        this.angle = 0; // todo: used?

        this.setup();
    }
	
	setup()
	{
		// setup
        this.sines = new Array(this.numSines);
        this.sineLines = new Array(this.numSines);

        for (let i = 0; i<this.sines.length; i++) {
            this.sines[i] = this.angle;

                this.sineLines[i] = new CurveDrawer();

                    colorMode(RGB)
			
					this.sineLines[i].line.colour = this.colour
			
                    this.sineLines[i].line.skipAmount = 8;

                this.sineLines[i].line.lineThickness = this.lineThickness; 		
                this.sineLines[i].line.maxLength = 100;	
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
        
        
        // TODO: remove notes
        // FOR LIGHT ON DARK@
        // ADD SCREEN
        // LIGHTEST isn't very visually interesting for the colour fill, but could be cool for lines. Brings them properly to white
        // DODGE is weird, but kinda cool. makes lines take on colour, but doesn't properly show fill at all


        let overallDrawingScale = scale;

        if ( (this.sines[1] < (2 * Math.PI * this.maxRotations) ) || this.maxRotations == 0  ) // why this untrue for all after 0
        {
            for (var i=1; i < this.sines.length; i++)
            {						
                this.sines[i] += currentSineAngleChange * drawingSpeed;// * renderSpeed;  // ot really renderspeed here, but has an interesting effect
                let sineX = x + ( /* Math.PI * */ Math.sin(this.sines[i]) * currentSineScale * overallDrawingScale);
                let sineY = y + ( /* Math.PI * */ Math.cos(this.sines[i]) * currentSineScale * overallDrawingScale );
              

                let stainedGlassAlpha = 2; // set high for DIFFERENCE, 4+
                
                
                if ((this.blendModeOffset + i) % 2 == 0)
                    {
                        stainedGlassAlpha = 2 // mult works better lower opacity
                        blendMode( MULTIPLY ) // MULTIPLY HARD_LIGHT BLEND
                    }
                else if ((this.blendModeOffset + i) % 2 == 1)
                    {
                        stainedGlassAlpha = 3
                        blendMode( ADD ) // BLEND LIGHTEST
                    }
                    // TODO: decision here
                // else if ((this.blendModeOffset + i) % 3 == 2)
                //     {
                //         stainedGlassAlpha = 2
                //         blendMode( ADD ) // HARD_LIGHT BLEND ADD  SCREEN
                //     }
                
                
                let val = 255
            
                if ((this.colourOffset + i) % 3 == 0)
                    {
                        this.sineLines[i].line.fillColour = color(val, 0, 0, stainedGlassAlpha)
                    }
                else if ((this.colourOffset + i) % 3 == 1)
                    {
                        this.sineLines[i].line.fillColour = color(0, val, 0, stainedGlassAlpha)
                    }
                else if ((this.colourOffset + i) % 3 == 2)
                    {
                        this.sineLines[i].line.fillColour = color(0, 0, val, stainedGlassAlpha)
                    }

                    
                    

                        //blendMode( HARD_LIGHT ) // REMOVE //SUBTRACT //blendMode( DIFFERENCE ) // EXCLUSION DIFFERENCE HARD_LIGHT BLEND ADD
                    // MULTIPLY can kinda produce coolish stuff too, but trends dark and should be combined with other modes


                /*
                    
                BLEND: It blends the pixels using linear interpolation of the colors. It is the default blending mode.
                ADD: It produces the new color by adding the colors of both the pixels.
                DARKEST: It uses only the darker color of the two pixels.
                LIGHTEST: It uses only the lighter color of the two pixels.
                DIFFERENCE: It subtracts colors from the underlying image.
                EXCLUSION: It has a similar effect to the “difference” property with less intensity.
                MULTIPLY: It multiplies both the colors resulting in a darker image.
                SCREEN: It has the opposite effect to the “multiply” effect and uses inverse values of the colors.
                REPLACE: It entirely replaces the pixels of the first with the pixels of the other while ignoring the alpha values.
                REMOVE: It removes the pixels from the second color using its alpha strength.
                OVERLAY: It is a mix of the “multiply” and “screen” modes. It multiplies the light values and screens the dark values. It works only in the 2D renderer.
                HARD_LIGHT: It applies the “screen” effect when the gray value is above 50% and “multiply” when it is lower. It works only in the 2D renderer.
                SOFT_LIGHT: It is a mix of “darkest” and “lightest”. It works like the “overlay” mode with less intensity. It works only in the 2D renderer.
                DODGE: It lightens the light tones and increases the contrast, while ignoring the dark tones. It works only in the 2D renderer.
                BURN: It lightens the dark tones and increases the contrast, while ignoring the light tones. It works only in the 2D renderer.
                SUBTRACT: It applies the final color based on the remainder of the two pixels. It works only in the WEBGL renderer.

                    */
                
                if (i >= this.renderCutoff)
                {
                    for (var rr=0; rr < 5; rr++) // TODO: make a bit clearers what's happeneing here
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