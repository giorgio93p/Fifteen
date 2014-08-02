"use strict";
var Board = function(n) {
	this.width = n;
	this.array = new Array(n*n);
	for(var i=0; i<n*n; i++) this.array[i] = i;
	this.emptyCellPosition = n*n-1;
	
	this.checkForWin = function(){
		for(var i=0; i<this.array.length; i++) if(this.array[i] != i) return false;
		return true;
	};
	
	this.moveTileToEmpty = function(tile){
		var position = this.array.indexOf(tile);
		var coord = Utilities.oneToPair(position);
		var empty = this.array[this.emptyCellPosition];
		var emptyCoord = Utilities.oneToPair(this.emptyCellPosition);
		var moves = [];
		if(coord.x == emptyCoord.x){
			if(emptyCoord.y>coord.y) for(var i=emptyCoord.y-1; i>=coord.y; i--){
				var from = Utilities.pairToOne(coord.x,i);
				var to = Utilities.pairToOne(coord.x,i+1);
				moves.push({tile:this.array[from],position:to});
				this.array[to] = this.array[from];
			}else if(emptyCoord.y<coord.y) for(var i=emptyCoord.y; i<coord.y; i++){
				var from = Utilities.pairToOne(coord.x,i+1);
				var to = Utilities.pairToOne(coord.x,i);
				moves.push({tile:this.array[from],position:to});
				this.array[to] = this.array[from];
			}
			this.array[position] = empty;
			this.emptyCellPosition = position;
		}else if(coord.y == emptyCoord.y){
			if(emptyCoord.x>coord.x) for(var i=emptyCoord.x-1; i>=coord.x; i--){
				var from = Utilities.pairToOne(i,coord.y);
				var to = Utilities.pairToOne(i+1,coord.y);
				moves.push({tile:this.array[from],position:to});
				this.array[to] = this.array[from];
			}else if(emptyCoord.x<coord.x) for(var i=emptyCoord.x; i<coord.x; i++){
				var from = Utilities.pairToOne(i+1,coord.y);
				var to = Utilities.pairToOne(i,coord.y);
				moves.push({tile:this.array[from],position:to});
				this.array[to] = this.array[from];
			}
			this.array[position] = empty;
			this.emptyCellPosition = position;
		}
		return moves;
	};
	
	this.applyPermutation = function(permutation){
		this.array = permutation;
		this.emptyCellPosition = permutation.indexOf(this.width*this.width-1);
	};
	
	this.copy = function(){
		return new Board(this.width, Utilities.copyArray(this.array));
	};
	
	this.clear = function(){
		for(var i=0; i<n*n; i++) this.array[i] = i;
	};
}

/*
*	The position on the board, as an object
*/
function Coord(x,y){
	this.x = x;
	this.y = y;
	
	this.copy = function(){
		return new Coord(this.x, this.y);
	}
	
	this.equals = function(position){
		if(this.x == position.x && this.y == position.y) return true;
		return false;
	}
}
