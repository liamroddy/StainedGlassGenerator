import{SpiroGraph}from"./spirograph.js";let w=1e3,h=1e3;function setupCanvas(t,e){smooth(),createCanvas(t,e),background("ivory")}export class GeneticAlgorithm{constructor(){setupCanvas(w,h),this.likedList=new Array,this.generationList=this.generatePatterns(null),this.currentChild=0,this.N=6;for(let t=0;t<this.N;t++)this.generationList[t]=new SpiroGraph}updatePattern(){this.generationList[this.currentChild].update(w/2,h/2,1.2,1)}likePattern(){this.likedList.push(this.generationList[this.currentChild]),this.gotoNextChild()}gotoNextChild(){if(this.currentChild++,this.currentChild>=this.N){for(this.currentChild=0;this.likedList.length>this.N;)this.likedList.shift();this.generationList=this.generatePatterns()}this.displayCurrentChild()}generatePatterns(){let t=new Array,e=new Array,i=new Array;for(let t=0;t<this.N-this.likedList.length;t++)i[t]=new SpiroGraph;return t=this.likedList.concat(i),e=this.createNewGeneration(t)}displayCurrentChild(){setupCanvas(w,h),blendMode(BLEND),background("ivory"),this.generationList[this.currentChild].setup()}createNewGeneration(t){let e=new Array;for(let i=0;i<this.N;i++){let r,n=()=>{},s=new SpiroGraph,h=.1,a=t[i];r=i==this.N-1?t[0]:t[i+1],n=(()=>Math.random()<h?s:Math.random()<.5?a:r);let o=new SpiroGraph;o.colourOffset=n().colourOffset,o.blendModerOffset=n().blendModerOffset,o.subSineAngleChange=n().subSineAngleChange,o.numSines=n().numSines,o.initialSineScale=n().initialSineScale,o.maxRotations=n().maxRotations,o.subSineScale=n().subSineScale,o.colour=n().colour,e.push(o)}return e}}