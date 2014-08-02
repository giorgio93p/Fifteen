"use strict";
var Utilities = {
	pairToOne: function(x, y){
		return Settings.n*y + x;
	},
	
	oneToPair: function(num){
		var x = num % Settings.n;
		var y = (num - x) / Settings.n;
		return new Coord(x,y);
	},
	
	//integer division x/y
	div: function(x,y){return (x-(x%y))/y},
	
	permutationSign: function(permutation){
		var visited = new Array(permutation.length);
		for(var i in visited) visited[i] = false;
		var evenCycles = 0;
		for(i=0; i<visited.length; i++) if(!visited[i]){
			visited[i] = true;
			var temp = i;
			var cycleLength = 0;
			do{
				temp = permutation[temp];
				visited[temp] = true;
				cycleLength++;
			}while(temp !== i);
			if(cycleLength%2==0) evenCycles++;
		}
		return evenCycles%2==0 ? 1 : -1;
	},
	
	taxicabDistance: function(pos1,pos2){
		var coord1 = Utilities.oneToPair(pos1);
		var coord2 = Utilities.oneToPair(pos2);
		return Math.abs(coord2.y-coord1.y) + Math.abs(coord2.x-coord1.x);
	},

	//Get a random combination of integers from a (inclusive) to b (exclusive)
	//(b - a > sizeOfCombination)
	getCombinationNonRepeatedElements: function(a, b, sizeOfCombination){
		var n = b - a;
		var positions = new Array(sizeOfCombination);
		var combArray = new Array(sizeOfCombination);
		for(var i = 0; i < n; i++){
			positions[i] = a + i;
		}
		
		for(var i = 0; i < sizeOfCombination; i++){
			var index = Math.floor(Math.random() * positions.length);
			combArray[i] = positions[index];
			positions.splice(index, 1);
		}
		return combArray;
	}
}


function Timer(id){
	this.node = document.getElementById(id);
	this.seconds=0;
	this.isOn = false;
	this.ticking = null;
	
	this.pause = function(){
		clearInterval(this.ticking);
		this.isOn=false;
	};

	this.toString = function(){
		var s = this.seconds % 60;
		var m = Utilities.div(this.seconds,60);
		var result = '';
		if (m <= 9) result += '0';
		result += m + ':';
		if (s <= 9) result += '0';
		result += s;
		return result;
	};
	
	this.start = function(){
		var self = this;
		this.isOn=true;
		this.node.innerHTML=this.toString();
		this.ticking=setInterval(function(){self.seconds++;self.node.innerHTML=self.toString();},1000);
	};
	
	this.reset = function(){
		this.seconds=0;
	};
	
	this.secondsElapsed = function(){
		return seconds;
	};
}

var GameStates = {playing:0,stopped:1}
