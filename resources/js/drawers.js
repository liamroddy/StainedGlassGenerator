var mouseMode = false;
var curveMode = true;

var renderSpeed = 0.001;

// linedrawer and sinedrawer share a lot of code. we should have a parent class. look into inheritance for js
// could be handled with a composition model either maybe
export class LineDrawer {
	constructor() {
		this.x = width/2;
		this.y = height/2;

		this.xAngle = 0;
		this.xAngleChange = 50;
		this.yAngle = 0;
		this.yAngleChange = 50;

		this.drawingScale = height/4;

		this.line = new Line(height*0.01, 0);
		
		this.firstUpdate = true;	
	}
	
	addPoint(x, y) {
		this.x = x;
		this.y = y;
		
		// fill is a fix for the glitchy effect caused by having  trail lengths not neatly divisble by skipAmount for the first few seconds of a new pattern
//		if (this.firstUpdate == true)
//		{
//			// just fill up the entire points array of the trail witht the starting point upon creation
//			for (var i=0; i < this.line.maxLength; i++)
//			{
//				this.line.addPoint(this.x, this.y);
//			}
//			this.firstUpdate = false;
//		}
//		else
//		{
			this.line.addPoint(this.x, this.y);
		//}
		
		this.line.update();
	}
}

export class DoubleLineDrawer {
	constructor() {
		this.x = width/2;
		this.y = height/2;

		this.xAngle = 0;
		this.xAngleChange = 50;
		this.yAngle = 0;
		this.yAngleChange = 50;

		this.drawingScale = height/4;

		this.outerLine = new Line(height*0.01, 0);
		this.innerLine = new Line(height*0.008, 0);
		
		this.outerLine.strokeCap = SQUARE;
		this.innerLine.strokeCap = PROJECT;
		
		this.firstUpdate = true;	
	}
	
	addPoint(x, y) {
		this.x = x;
		this.y = y;
		
//		strokeCap(SQUARE);
		this.outerLine.addPoint(this.x, this.y);
//		strokeCap(PROJECT);
		this.innerLine.addPoint(this.x, this.y);
		
		this.outerLine.update();
		this.innerLine.update();
	}
}

export class SineDrawer {
	constructor() {
		this.centreX = width/2;
		this.centreY = height/2;
		
		this.currentX = this.centreX;
		this.currentY = this.centreY;

		this.xAngle = 0;
		this.xAngleChange = 50;
		this.yAngle = 0;
		this.yAngleChange = 50;

		this.drawingScale = height/4;

		this.line = new Line(height*0.01, 0);
		
		this.firstUpdate = true;	
	}

	update() {
		if (mouseMode)
		{
			this.xAngle += mouseX/60  * renderSpeed;
			this.yAngle += mouseY/60  * renderSpeed;
		}
		else
		{
			this.xAngle += this.xAngleChange * renderSpeed;
			this.yAngle += this.yAngleChange * renderSpeed;
		}

		this.currentX = Math.sin(this.xAngle) * this.drawingScale;
		this.currentY = Math.sin(this.yAngle) * this.drawingScale; 

		// fill is a fix for the glitchy effect caused by having  trail lengths not neatly divisble by skipAmount for the first few seconds of a new pattern
		if (this.firstUpdate == true)
		{
			// just fill up the entire points array of the trail witht the starting point upon creation
			for (var i=0; i < this.line.maxLength; i++)
			{
				this.line.addPoint(this.centreX + this.currentX, this.centreY + this.currentY);
			}
			this.firstUpdate = false;
		}
		else
		{
			this.line.addPoint(this.centreX + this.currentX, this.centreY + this.currentY);
		}
		
		this.line.update();
	}
}

class Line
{
	constructor(lineThickness, colour)
	{
		this.lineThickness = lineThickness;
		this.maxLength = 50;
		this.colour = colour;
        this.fillColour = null
		
		this.skipAmount = 8; // the more points we skip the higher our performance
		// too highly and the constantly chnaging verts cause shimmering for faster moving sines (see golden ratio example)
		// also causes a 'skipping' effect for the first few seconds, as trailLength becomes neatly divisble by skipAmount, drawing last point, and then not drawing the last point for skipAmount'th frames (that should be easy enough fix) 
		
		this.strokeCap = ROUND;

		this.circleTrail = [];
	}

	addPoint(xx, yy)
	{
		let circlePosition = createVector(xx, yy);
		this.circleTrail.push(circlePosition);
	}


	update() {
		var trailLength = this.circleTrail.length - 1;

		stroke(this.colour, 1);//255*i/trailLength); // fade not working in js :/
		strokeWeight(this.lineThickness);
		strokeCap(this.strokeCap);
		if (this.fillColour == null)
            noFill();
        else
            fill(this.fillColour)
        
        beginShape();
        
        
        
        curveVertex(this.circleTrail[trailLength].x, this.circleTrail[trailLength].y);

		for (var i = 0;  i <= trailLength; i+=this.skipAmount)//(var i = trailLength-this.skipAmount; i >0; i-=this.skipAmount)
		{		  
			let currentTrail = this.circleTrail[i].copy();

            curveVertex(currentTrail.x, currentTrail.y);
		}
		
		//curveVertex(this.circleTrail[0].x, this.circleTrail[0].y);
		
		endShape();

		if (trailLength >= this.maxLength)
		{
			this.circleTrail.shift();
		}
	}
}

export function randomHSB()
{
	colorMode(HSB, 100);
	return color(random(0, 100), random(40, 60), random(50, 80), 100);
}