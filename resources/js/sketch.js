//import { setClearBackground } from "./sketch.js"
import { SpiroGraph } from "./spirograph.js"

let w = 700 // TODO: changeable?
let h = 700

let geneticSystem

function setupCanvas(w, h)
{
	smooth();
	createCanvas(w, h);
	background('ivory');
}

class GeneticSystem
{	
	constructor()
    {
		setupCanvas(w, h);
		

		this.likedList = new Array()
		this.generationList = this.generatePatterns(null)
		this.currentChild = 0
		this.N = 6
		
		for (let i=0; i < this.N; i++)
		{
			this.generationList[i] = new SpiroGraph();
		}
    }


	updateSpiro()
	{
		
		this.generationList[this.currentChild].update(((w/(2))), ((h/(2))), 1.2, 1)
	}

	likeSpiro() {
		this.likedList.push( this.generationList[this.currentChild] )
	}
		

	gotoNextChild() {
		
		
		this.currentChild++

		if (this.currentChild >= this.N)
		{
			this.currentChild = 0
			this.generationList = this.generatePatterns()	
		}

		this.displayCurrentChild()
	}

	generatePatterns() {
		let parentList = new Array()
		let childList = new Array()
		
		let randomParentList = new Array()

		for (let i=0; i < (this.N - this.likedList.length); i++)
		{
			randomParentList[i] = new SpiroGraph();
		}

		parentList =  this.likedList.concat(randomParentList)

		// generate children
		childList = this.breedChildren(parentList)

		return childList
	}

	displayCurrentChild() {
		setupCanvas(w, h);

		// clear screen
		blendMode(BLEND)
		background("ivory")

		this.generationList[this.currentChild].setup();
	}


	breedChildren(parentList) {
		let childList = new Array()
			
		for (let n=0; n < this.N; n++)
		{
			let chooseParent = () =>  {}
			
			let mutant = new SpiroGraph();
			let mutationProbability = 0.1

			let parent1 = parentList[n]; // nope. how do?
			let parent2
			if (n == this.N-1)
				parent2 = parentList[0]; // if at end of list loop back around
			else
				parent2 = parentList[n+1];
			
			chooseParent = () =>  {
				// optional percentage argument?
				//return (Math.random() > 0.5 ? parent1 : parent2)
				if (Math.random() < mutationProbability)
				{
					return mutant;
				}			

				return (Math.random() < 0.5 ? parent1 : parent2)
			}

			// inherit from two parents (or inherit random mutation!)
			// cloned features
			let child = new SpiroGraph();

			//child.intOffset = chooseParent().intOffset // COLOUR OFFSET & BLEND MODE< NOT INT
			child.subSineAngleChange = chooseParent().subSineAngleChange
			child.numSines = chooseParent().numSines
			child.initialSineScale = chooseParent().initialSineScale
			child.maxRotations = chooseParent().maxRotations
			child.subSineScale = chooseParent().subSineScale
			child.color = chooseParent().colour;
			
			// features that should be same for all
			// TODO: ?????????
			child.lineThickness = 1;
			child.renderCutoff = chooseParent().renderCutoff 

			childList.push(child)
		}
			
		return childList
	}

    
}

// CORE SKETCH SETUP AND LOOP

window.setup = function ()
{
	frameRate(60);
	
	geneticSystem = new GeneticSystem()
    //setClearBackground(true);

}

window.draw = function () {
	geneticSystem.updateSpiro()
}


// UI button onClicks

like.onclick = function()
{
	geneticSystem.likeSpiro()
	geneticSystem.gotoNextChild()
}

dislike.onclick = function()
{
	geneticSystem.gotoNextChild()
}

download.onclick = function()
{
	saveCanvas("Stained glass pattern")
}

