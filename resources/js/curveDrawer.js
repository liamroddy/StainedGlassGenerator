export class CurveDrawer {
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
		if (this.firstUpdate == true)
		{
			// just fill up the entire points array of the trail witht the starting point upon creation
			for (var i=0; i < this.line.maxLength; i++)
			{
				this.line.addPoint(this.x, this.y);
			}
			this.firstUpdate = false;
		}
		else
		{
			this.line.addPoint(this.x, this.y);
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
		// too highly and the constantly chnaging verts cause shimmering for faster moving sines
		// also causes a 'skipping' effect for the first few seconds, as trailLength becomes neatly divisble by skipAmount, drawing last point, and then not drawing the last point for skipAmount'th frames (that should be easy enough fix) 
		
		this.strokeCap = ROUND;

		this.pointPath = [];
	}

	addPoint(xx, yy)
	{
		let pointPosition = createVector(xx, yy);
		this.pointPath.push(pointPosition);
	}


	update() {
		var trailLength = this.pointPath.length - 1;

		stroke(this.colour);
		strokeWeight(this.lineThickness);
		strokeCap(this.strokeCap);
		if (this.fillColour == null)
            noFill();
        else
            fill(this.fillColour)
        
        beginShape();
      
        curveVertex(this.pointPath[trailLength].x, this.pointPath[trailLength].y);

		for (var i = 0;  i <= trailLength; i+=this.skipAmount)// TODO: choose: (var i = trailLength-this.skipAmount; i >0; i-=this.skipAmount)
		{		  
			let currentTrail = this.pointPath[i].copy();

            curveVertex(currentTrail.x, currentTrail.y);
		}
		
		endShape();

		if (trailLength >= this.maxLength)
		{
			this.pointPath.shift();
		}
	}
}
