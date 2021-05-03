import { SpiroGraph } from "./spirograph.js"

let w = 1000
let h = 1000

function setupCanvas(w, h)
{
	smooth();
	createCanvas(w, h);
	background('ivory');
}

export class GeneticAlgorithm
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

	updatePattern()
	{		
		this.generationList[this.currentChild].update(((w/(2))), ((h/(2))), 1.2, 1)
	}

	likePattern() {
		this.likedList.push( this.generationList[this.currentChild] )
		this.gotoNextChild()
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
		childList = this.createNewGeneration(parentList)

		return childList
	}

	displayCurrentChild() {
		setupCanvas(w, h);

		// clear screen
		blendMode(BLEND)
		background("ivory")

		this.generationList[this.currentChild].setup();
	}


	createNewGeneration(parentList) {
		let childList = new Array()
			
		for (let n=0; n < this.N; n++)
		{
			let chooseParent = () =>  {}
			
			let mutant = new SpiroGraph();
			let mutationProbability = 0.1

			let parent1 = parentList[n]
			let parent2
			if (n == this.N-1)
				parent2 = parentList[0]; // if at end of list loop back around
			else
				parent2 = parentList[n+1];
			
			chooseParent = () =>  {
				// returns either parent 1 or 2, or a mutant
				if (Math.random() < mutationProbability)
				{
					return mutant;
				}			

				return (Math.random() < 0.5 ? parent1 : parent2)
			}

			// inherit from two parents (or inherit random mutation!)
			let child = new SpiroGraph();

            child.colourOffset = chooseParent().colourOffset;
            child.blendModerOffset = chooseParent().blendModerOffset;

			child.subSineAngleChange = chooseParent().subSineAngleChange
			child.numSines = chooseParent().numSines
			child.initialSineScale = chooseParent().initialSineScale
			child.maxRotations = chooseParent().maxRotations
			child.subSineScale = chooseParent().subSineScale
			child.colour = chooseParent().colour;

			childList.push(child)
		}
			
		return childList
	}

    
}