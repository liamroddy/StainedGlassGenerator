import { addToSketch, clearSketch, setClearBackground, drawerArray } from "./sketch.js"
import { SineDrawer, randomHSB } from "./drawers.js"
import { setupSpiroCanvas, SpiroGraph } from "./spirograph.js"
import { setupSpiroDrawer, updateSpiroDrawer, setColour } from "./spiroDrawer.js"

let currentPattern = 0
let patternArray = []

export function setupPatterns()
{
	
	
	/* Patterns should also modify
		Whether background should be cleared (default true)
		Point skip value (default 8?)
		
		Golden ration will modify both
		Short path, slower progression, don't clear BG, skip fewer points
	*/
	
	let spiroDrawer = new Pattern("spiroDrawer");
	let spiro;
	spiroDrawer.setup = function()
	{	
		setupSpiroCanvas(1000, 1000);
		
		setupSpiroDrawer();
		//spiro = new SpiroDrawer();
		
	}
	spiroDrawer.render = function()
	{	
		//spiro.update(mouseX, mouseY, 1, 1)
		updateSpiroDrawer();
		setClearBackground(false);
		
	}
	
	let multiSpiro = new Pattern("multiSpiro");
    let spiros = new Array();
    let w = 1000;
    let h = 1000;
    let hcount = 5;
    let vcount = 5;
    let tcount = hcount * vcount;
	multiSpiro.setup = function()
	{	
		setupSpiroCanvas(w, h);
        
        for (let i=0; i < tcount; i++)
            {
                spiros[i] = new SpiroGraph();
				spiros[i].subSineAngleChange = (i+1)//Math.sqrt(i+1)//0.001618//-0.001//map(i, 0, tcount, 0.01, 0.02);
				//spiros[i].initialSineAngleChange = -0.01;//map(i, 0, tcount, 0.5, 2);
				spiros[i].numSines = 3
				spiros[i].renderCutoff = 2
				spiros[i].initialSineScale = (w/(2*hcount))/3///( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
				//spiros[i].colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
				spiros[i].lineThickness = 1;
				spiros[i].maxRotations = 10//(i+1)*10;
				spiros[i].subSineScale = 0.7//1/(i+1)//0.7;
				
				spiros[i].setup();
            }

	}
	multiSpiro.render = function()
	{	
    
        //let len = hco
		let i=0;
		
		
		for (let y=0; y < vcount; y++)
            {
			for (let x=0; x < hcount; x++)
				{
					spiros[i].update(((w/(hcount+1))*(x+1)), ((h/(vcount+1))*(y+1)), 1, 1)//map(i, 0, vcount, 0.5, 2))//map(i, 0, (hcount*vcount), 0.01, 0.02));//spiros[h*w] = new SpiroGraph();
					i++;
				}
		}

        setClearBackground(false);
	}
	
	let primeSprios = new Pattern("multiSpiro");
	primeSprios.setup = function()
	{	
		setupSpiroCanvas(w, h);
        
        for (let i=0; i < tcount; i++)
            {
                spiros[i] = new SpiroGraph();
				spiros[i].subSineAngleChange = /*(i+1)*/Math.sqrt(i+1)//0.001618//-0.001//map(i, 0, tcount, 0.01, 0.02);
				//spiros[i].initialSineAngleChange = -0.01;//map(i, 0, tcount, 0.5, 2);
				spiros[i].numSines = 3
				spiros[i].renderCutoff = 2
				spiros[i].initialSineScale = (w/(2*hcount))/3///( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
				//spiros[i].colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
				spiros[i].lineThickness = 1;
				spiros[i].maxRotations = 10//(i+1)*10;
				spiros[i].subSineScale = 0.7//1/(i+1)//0.7;
				
				spiros[i].setup();
            }

	}
	primeSprios.render = function()
	{	
    
        //let len = hco
		let i=0;
		
		
		for (let y=0; y < vcount; y++)
            {
			for (let x=0; x < hcount; x++)
				{
					spiros[i].update(((w/(hcount+1))*(x+1)), ((h/(vcount+1))*(y+1)), 1, 1)//map(i, 0, vcount, 0.5, 2))//map(i, 0, (hcount*vcount), 0.01, 0.02));//spiros[h*w] = new SpiroGraph();
					i++;
				}
		}

        setClearBackground(false);
	}
	
	let bigSpiro = new Pattern("bigSpiro");
	bigSpiro.setup = function()
	{	
		spiros = new Array();
		w = 3000;
		h = 3000;
		hcount = 2;
		vcount = 2;
		tcount = hcount * vcount
		
		setupSpiroCanvas(w, h);
        
        for (let i=0; i < tcount; i++)
            {
                spiros[i] = new SpiroGraph();
				spiros[i].subSineAngleChange = 5//Math.sqrt(i+1)//0.001618//-0.001//map(i, 0, tcount, 0.01, 0.02);
				//spiros[i].initialSineAngleChange = -0.01;//map(i, 0, tcount, 0.5, 2);
				spiros[i].numSines = 5
				spiros[i].renderCutoff = 0
				spiros[i].initialSineScale = (w/(2*hcount))/2//( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
				//spiros[i].colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
				spiros[i].lineThickness = 2;
				spiros[i].maxRotations = 3;
				spiros[i].subSineScale = 0.7//1/(i+1)//0.7;
				
				spiros[i].setup();
            }

	}
	bigSpiro.render = function()
	{	
    
        //let len = hco
		let i=0;
		
		
		for (let y=0; y < vcount; y++)
            {
			for (let x=0; x < hcount; x++)
				{
					spiros[i].update(((w/(hcount+1))*(x+1)), ((h/(vcount+1))*(y+1)), 1, 1)//map(i, 0, vcount, 0.5, 2))//map(i, 0, (hcount*vcount), 0.01, 0.02));//spiros[h*w] = new SpiroGraph();
					i++;
				}
		}

        setClearBackground(false);
	}
	
	
	let manySpiro = new Pattern("manySpiro");
	manySpiro.setup = function()
	{	
		spiros = new Array();
		w = 1000;
		h = 4000;
		hcount = 5;
		vcount = 20;
		tcount = hcount * vcount
		
		setupSpiroCanvas(w, h);
        
        for (let i=0; i < tcount; i++)
            {
                spiros[i] = new SpiroGraph();
				spiros[i].subSineAngleChange = 100*(i+1)//Math.sqrt(i+1)//0.001618//-0.001//map(i, 0, tcount, 0.01, 0.02);
				//spiros[i].initialSineAngleChange = -0.01;//map(i, 0, tcount, 0.5, 2);
				spiros[i].numSines = 3
				spiros[i].renderCutoff = 2
				spiros[i].initialSineScale = (w/(2*hcount))/3///( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
				//spiros[i].colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
				spiros[i].lineThickness = 1;
				spiros[i].maxRotations = 1;
				spiros[i].subSineScale = 0.7//1/(i+1)//0.7;
				
				spiros[i].setup();
            }

	}
	manySpiro.render = function()
	{	
    
        //let len = hco
		let i=0;
		
		
		for (let y=0; y < vcount; y++)
            {
			for (let x=0; x < hcount; x++)
				{
					spiros[i].update(((w/(hcount+1))*(x+1)), ((h/(vcount+1))*(y+1)), 1, 1)//map(i, 0, vcount, 0.5, 2))//map(i, 0, (hcount*vcount), 0.01, 0.02));//spiros[h*w] = new SpiroGraph();
					i++;
				}
		}

        setClearBackground(false);
	}
	
	let complexSpiros = new Pattern("complexSpiros");
	complexSpiros.setup = function()
	{	
		spiros = new Array();
		w = 3000;
		h = 1000;
		hcount = 5;
		vcount = 1;
		tcount = hcount * vcount
		
		setupSpiroCanvas(w, h);
        
        for (let i=0; i < tcount; i++)
            {
                spiros[i] = new SpiroGraph();
				spiros[i].subSineAngleChange = (i+5)//Math.sqrt(i+1)//0.001618//-0.001//map(i, 0, tcount, 0.01, 0.02);
				//spiros[i].initialSineAngleChange = -0.01;//map(i, 0, tcount, 0.5, 2);
				spiros[i].numSines = 5
				spiros[i].renderCutoff = 0
				spiros[i].initialSineScale = (w/(2*hcount))/3///( w > h ? (h/(vcount+1)*vcount/10) : (w/(hcount+1)*hcount/10));
				//spiros[i].colour = ((i%2) ? color(0, 0, 255, 1) : color(255, 0, 0, 1) ) 
				spiros[i].lineThickness = 1;
				spiros[i].maxRotations = 3;
				spiros[i].subSineScale = 0.7//1/(i+1)//0.7;
				
				spiros[i].setup();
            }

	}
	complexSpiros.render = function()
	{	
    
        //let len = hco
		let i=0;
		
		
		for (let y=0; y < vcount; y++)
            {
			for (let x=0; x < hcount; x++)
				{
					spiros[i].update(((w/(hcount+1))*(x+1)), ((h/(vcount+1))*(y+1)), 1, 1)//map(i, 0, vcount, 0.5, 2))//map(i, 0, (hcount*vcount), 0.01, 0.02));//spiros[h*w] = new SpiroGraph();
					i++;
				}
		}

        setClearBackground(false);
	}
	
//    let autoSpiro = new Pattern("autoSpiro");
//	autoSpiro.setup = function()
//	{	
//		setupAutoSpiro(); 
//	}
//	autoSpiro.render = function()
//	{	
//		updateAutoSpiro();
//        setClearBackground(false);
//	}
//	
//	

	
	
	// a simple pattern, but with every angle offset
    let creeper = new Pattern("Creeper");
	creeper.setup = function()
	{	
		for(var i=1; i < 52; i++)
			{
				let s = new SineDrawer();
				addToSketch(s);
				
				s.xAngle = i*.05; // initial angle offset relative to i

				s.xAngleChange = 50;
				s.yAngleChange = 25;
				
				s.drawingScale = (height)*(i*0.008);
				
				s.line.maxLength = 100;
				s.line.lineThickness = height*0.01;
				s.line.colour = randomHSB();
			}
	}
	
	// a simple pattern, but with every angle offset
    let creeperRender = new Pattern("creeperRender");
	creeperRender.setup = function()
	{	
		for(var i=1; i < 52; i++)
			{
				let s = new SineDrawer();
				addToSketch(s);
				
				s.xAngle = i*.05; // initial angle offset relative to i

				s.xAngleChange = 50;
				s.yAngleChange = 25;
				
				s.drawingScale = (height)*(i*0.008);
				
				s.line.maxLength = 100;
				s.line.lineThickness = height*0.02;
				s.line.colour = randomHSB();
			}
	}
	creeperRender.render = function()
	{
//		for (var i = 0; i < drawerArray.length; i++)  // should pat6terns hold drawerarray instead of sketch? Or maybe drawers either?
//			{
//				let s = drawerArray[i];
//				
//				var xDistFromCentre = (s.currentX);
//				var yDistFromCentre = (s.currentY);
//				var totalDistanceFromCentre = Math.sqrt( xDistFromCentre*xDistFromCentre, yDistFromCentre*yDistFromCentre)
//				
//				s.xAngleChange += xDistFromCentre * 0.002;
//				s.yAngleChange += yDistFromCentre * 0.002;
//				
//				//s.line.lineThickness = ((totalDistanceFromCentre)*0.2);
//				
//				//s.yAngleChange = sin(s.x)*200;
//			}
		let firstDrawer = drawerArray[0];
				
				var xDistFromCentre = (firstDrawer.currentX);
				var yDistFromCentre = (firstDrawer.currentY);
				var totalDistanceFromCentre = Math.sqrt( xDistFromCentre*xDistFromCentre, yDistFromCentre*yDistFromCentre)
		
		for (var i = 0; i < drawerArray.length; i++)  // should pat6terns hold drawerarray instead of sketch? Or maybe drawers either?
			{
				let s = drawerArray[i];
				
				s.xAngleChange += xDistFromCentre * 0.2;
				s.yAngleChange += yDistFromCentre * 0.2;
				
				//s.line.lineThickness = ((totalDistanceFromCentre)*0.2);
				
				//s.yAngleChange = sin(s.x)*200;
			}
	}
	
	// a simple pattern, but with every angle offset
    let ocean = new Pattern("Creeper");
	ocean.setup = function()
	{	
		for(var i=1; i < 52; i++)
			{
				let s = new SineDrawer();
				addToSketch(s);
				
				s.xAngle = i*.05; // initial angle offset relative to i

				s.xAngleChange = 50;
				s.yAngleChange = s.xAngleChange * -1.5;
				
				s.drawingScale = (height)*(i*0.008);
				
				s.line.maxLength = 100;
				s.line.lineThickness = height*0.01;
				s.line.colour = randomHSB();
			}
	}
	
	// a simple pattern, but with every angle offset
    let randumb = new Pattern("randumb");
	randumb.setup = function()
	{	
		
		let _xAngle = random(.6, .2);
		let _yAngle = random(.6, .2);
		
		
		let _xAngleChange = random(2,5);
		let _yAngleChange = -2*_xAngleChange;
		
		
		for(var i=1; i < 52; i++)
			{
				let s = new SineDrawer();
				addToSketch(s); // maybe should have a fucntion to add to a larger 'super pattern', not just overall sketch
				
				s.xAngle = (i)* _xAngle;
				s.yAngle = (i)*_yAngle;

				s.xAngleChange = _xAngleChange;
				s.yAngleChange = _yAngleChange;
				
				s.drawingScale = (height)*(1/4);
				
				s.line.lineThickness = height*0.01;
				s.line.colour = randomHSB();
			}
	}
    
    // a simple slow moving wave with off set angle changes
    let waves = new Pattern("Slow waves");
	waves.setup = function()
	{	
		for(var i=1; i < 52; i++)
			{
				let s = new SineDrawer();
				addToSketch(s);
				
				s.xAngle = i*.05; // initial angle offset relative to i

				s.xAngleChange = 25 * (i*0.005);
				s.yAngleChange = 66 * (i*0.005);
				
				s.drawingScale = (height)*(i*0.008);

				s.line.lineThickness = height*0.01;
				s.line.colour = randomHSB();

			}
	}
    
    // a cool honey-comby kind of patterns
    let goldenRatio = new Pattern("Golden Ratio");
	goldenRatio.setup = function()
	{	
		for(var i=1; i < 30; i++)
			{

				let s = new SineDrawer();
				addToSketch(s);
				
                s.xAngle = PI/4; 
                s.yAngle = PI/4;
				s.xAngleChange = 50;
				s.yAngleChange = 50 * (((1 / 2) + ( Math.sqrt(5) / 2)));
				
				s.drawingScale = (height)*(i*0.013);
                
                s.line.maxLength = 300;
				s.line.colour = randomHSB();
				s.line.lineThickness = height*0.018;
			}
	}
	
	// a simple pattern, but with every angle offset
    let xmastree = new Pattern("Christmas tree");
	xmastree.setup = function()
	{	
		for(var i=1; i < 25; i++)
			{
				let s = new SineDrawer();
				addToSketch(s);
				
				s.x = (width/4) + (i*10);
				s.y = (width/4) + (i*10);
                
                s.xAngle = i*.05; // initial angle offset relative to i

				s.xAngleChange = 50;
				s.yAngleChange = 25;
				s.drawingScale = (height)*(i*0.008);

				s.line.lineThickness = height*0.01;//*i;
				s.line.colour = randomHSB();
			}
	}
	
}

export function getCurrentPattern()
{
	return currentPattern + ": " + patternArray[currentPattern].name;
}

export function runPattern()
{
	patternArray[currentPattern].setup();
    setClearBackground(true);
}

export function updatePattern()
{
	patternArray[currentPattern].render();
}

export function changePattern(changeBy)
{
	currentPattern += changeBy;
	if (currentPattern > patternArray.length-1)
		{
			currentPattern = 0;
		}
	else if (currentPattern < 0)
		{
			currentPattern = patternArray.length-1;
		}
		
	clearSketch();
	runPattern();
}

class Pattern
{
	constructor(name)
    {
        patternArray.push(this);
		this.name = name;
    }
    
    setup()
	{
		// blank
	}
	
	render()
	{
		// blank 
		// run once per frame?
	}
}