import { randomHSB, LineDrawer, DoubleLineDrawer } from "./drawers.js"

let spiros = new Array();
let preProcPixels = null//pixelState;

export function setupSpiroCanvas(w, h) {
    smooth();
	
	createCanvas(w, h);
	background(150);
}

export class SpiroGraph {
	constructor() {
        // object variables
		this.intOffset = Math.floor(Math.random() * 3) // colour offset determines if red, green or blue gets drawn first
		
        this.numSines = 10; // how many of these things can we do at once?
        this.sines; // an array to hold all the current angles
        this.sineLines;

        this.isPaused = false;
        this.traceMode = true;

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
        
        // colour or B&W
        this.colourMode = true   
    }
	
	setup()
	{
		// setup
        this.sines = new Array(this.numSines);
        this.sineLines = new Array(this.numSines);

        for (let i = 0; i<this.sines.length; i++) {
            this.sines[i] = this.angle;

                this.sineLines[i] = new LineDrawer();

                    colorMode(RGB)
			
					this.sineLines[i].line.colour = this.colour
			
                    this.sineLines[i].line.skipAmount = 4;

                this.sineLines[i].line.lineThickness = this.lineThickness; 		
                this.sineLines[i].line.maxLength = 50;	
        }
	}
    
    update(x, y, scale, drawingSpeed)
    {
        /*
		if (preProcPixels != null)
        {
            // do we have to loadPixels here?
            // or can we modify "pixels" directyl?
            //loadPixels()
            pixels = new Uint8ClampedArray(preProcPixels);//preProcPixels;
            updatePixels() // i don't want to do this but i think i have to
			
			//console.log("PRE:\t" + preProcPixels[0] + "\t" + preProcPixels[1] + "\t" + preProcPixels[2]);
        }
		*/
		
		
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
        }
        else
        {
			background(5);
            noFill();
            stroke(255);
        }
        
        
        // FOR LIGHT ON DARK@
        // ADD SCREEN
        // LIGHTEST isn't very visually interesting for the colour fill, but could be cool for lines. Brings them properly to white
        // DODGE is weird, but kinda cool. makes lines take on colour, but doesn't properly show fill at all

        
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

						
						// THIS MAKES NO SENSE!!
                        if (this.colourMode)
                        {
                            let stainedGlassAlpha = 4; // set high for DIFFERENCE, 4+
						
                            if ((this.intOffset + i) % 3 == 0)
                                {
                                    // how top choose blend mode 'randomly' ?
                                    blendMode( HARD_LIGHT ) // HARD_LIGHT BLEND
                                    this.sineLines[i].line.fillColour = color(255, 0, 0, stainedGlassAlpha)
                                }

                            else if ((this.intOffset + i) % 3 == 1)
                                {
                                    blendMode( LIGHTEST ) // HARD_LIGHT BLEND
                                    this.sineLines[i].line.fillColour = color(0, 255, 0, stainedGlassAlpha)
                                }

                            else if ((this.intOffset + i) % 3 == 2)
                                {
                                    blendMode( ADD ) // HARD_LIGHT BLEND
                                    this.sineLines[i].line.fillColour = color(0, 0, 255, stainedGlassAlpha)
                                }

                            blendMode( DIFFERENCE ) // EXCLUSION DIFFERENCE HARD_LIGHT BLEND ADD
                            // MULTIPLY can kinda produce coolish stuff too, but trends dark and should be combined with other modes
                        }
                        else
                        {
                            this.sineLines[i].line.fillColour = color(0, 0, 0, 2) //4 // Black with low alpha
                            blendMode( BLEND )
                        }
						
							
						
						//this.sineLines[i].line.fillColour = color(0, 255, 0, 1)
						
                        if (this.traceMode)
                        {
                            if (i >= this.renderCutoff)
                            {
								//this.sines[i].fillColour = color(255, 0, 0, 255)
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
		
		//fill(0);
		//textSize(100);
		//text(Math.random(), 100, 100)//"FUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\nFUCK YOU\n",
//			 -5, -5);
		// being overwritten. why?

		
		// keep rendering and display separate. how?
		/*

		
		
		draw in red and green
		grab those pixels
		save pixelstate
		pixelstate is now red and green
		turn pixels into full colour
		display those full colour pixels
		
		for next frame restore red and green from pixelstate
		draw in red and green etc
		
		
		
		
		psuedocode:
		
		if pixelstate is NOT null
			set onscreen pixels from pixel state
			
		DRAW
		
		loadpixels
		save pixel satte from pixels
		
		process pixels
		
		update pixels
		
		
		
		
		
		*/
        
        
        //

        
       // loadPixels();
        //so now pixels are B&W image
        
        // we've drawn in in B&W, so now save that state in preProc before modification
        //preProcPixels = new Uint8ClampedArray(pixels)//pixels;
        
		//console.log(pixels[0])
		//pixels[0] = 0; // this shouldn't be changed for next drawing round, but it is
		
       
        /// MODIFY!!!!!
        let d = pixelDensity();
        let imageSize = 4 * (width * d) * (height * d);
        for (let i = 0; i < imageSize; i += 4) {
            // based on level of R (or G or B, since it's B&W it doesn't matter)
            // based on this cast as HSB between
            //let h = RGBtoHSV(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
			
			
			/*
            let inputR = ((pixels[i])/255)
            // for white we need saturation at 0,to avoid black we need to keep value above 0
            let rgb = HSVtoRGB(inputR, 1-inputR, (inputR > 0.4 ? inputR : 0.4 ));  // HSVtoRGB(1, 0, 1);
            pixels[i + 0] = rgb.r
            pixels[i + 1] = rgb.g
            pixels[i + 2] = rgb.b
			
			NthTimer++;
			
			if (NthTimer > 5473)
				{

					console.log("OUTPUT\t" + rgb.r + "\t " + rgb.g + "\t" + rgb.b)
//                    if (Math.max(pixels[i], pixels[i+1], pixels[i+2]) > 255 ||  Math.min(pixels[i], pixels[i+1], pixels[i+2]) < 0)
//                        console.log("INPUT" + pixels[i] + "\t " + pixels[i+1] + "\t" + pixels[i+2])
//
//                    if (Math.max(rgb.r, rgb.g, rgb.b) > 255 ||  Math.min(rgb.r, rgb.g, rgb.b) < 0)
//                        console.log("OUTPUT" + rgb.r + "\t " + rgb.g + "\t" + rgb.b)
                    //console.log(rgb)
					NthTimer =0
				}
           */
        }
        /// END MODIFY!
		
        
		//console.log("POST:\t" + pixels[0] + "\t" + pixels[1] + "\t" + pixels[2]);
		
        //updatePixels();
		
		// WHY THE FUCK DOES THIS SPEED UP RENDERING!!!!???????????!!!!!!!!!!!
//		loadPixels();
//		pixels  = new Uint8ClampedArray(preProcPixels)//pixels;
//		updatePixels();
        
        
//	loadPixels();
//	
//	if (pixelState != null)
//		{
//			pixelState = pixels;
//		}
//	
//		
//	for (let i = 0; i < (4 * height * width); i+=4) {
//		if (pixels[i + 0] == 128 && pixels[i + 1] == 129 && pixels[i + 2] == 128)
//			{
//				pixels[i + 0] = 255;
//				pixels[i + 1] = 0;
//				pixels[i + 2] = 255;
//			}
//		
//		// add i + to all below
//		
//		if (pixels[i + 0] > 0) // if any red
//		{
//			pixels[i + 1] = pixels[i + 0];
//			pixels[i + 2] = pixels[i + 0];
//		}
//		else
//		{
//			if (pixels[i + 1] > 0)
//			{
//				// use pixels[4] alpha as value for HSV
//				
//				//temp test code:
//				pixels[i + 3] = 50
//				
//			}
//		}
//		
//		
//		//if pixels()
//			
//	}
//		
//	//pixelState = pixels;
//	updatePixels();
		
		
    }
    
}

// SIMPLIFY:
        function HSVtoRGB(h, s, v) {
            var r, g, b, i, f, p, q, t;
            if (arguments.length === 1) {
                s = h.s, v = h.v, h = h.h;
            }
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
            return {
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };
        }
