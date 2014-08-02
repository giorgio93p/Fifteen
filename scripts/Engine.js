"use strict";
var Engine = {
	board: null,
	moves: 0,
	timeCounter: null,
	gameState: null,
	
	init: function(){
		this.timeCounter = new Timer('timeCount')
		this.board = new Board(Settings.n);
		GUI.init();
		Input.init();
	},

	start: function(){
		do var permutation = Utilities.getCombinationNonRepeatedElements(0, Settings.n*Settings.n, Settings.n*Settings.n);
		while(!this.solvable(permutation));
		this.board.applyPermutation(permutation);
		for(var i=0; i<permutation.length; i++) GUI.move(permutation[i],i);
		
		this.moves = 0;
		GUI.changeMoves(this.moves);
		this.gameState = GameStates.playing;
		this.timeCounter.reset();
		this.timeCounter.start();
	},
	
	solvable: function(permutation){
		var a = Utilities.permutationSign(permutation) < 0 ? 1 : 0;
		var b = Utilities.taxicabDistance(permutation.indexOf(Settings.n*Settings.n-1),Settings.n*Settings.n-1);
		return (a+b)%2 === 0;
	},
	
	pause: function(){
		this.gameState = GameStates.stopped;
		this.timeCounter.pause();
	},
	
	moveTile: function(tile){
		var moves = this.board.moveTileToEmpty(tile);
		for(var i in moves){
			this.moves++;
			GUI.move(moves[i].tile,moves[i].position);
		}
		GUI.changeMoves(this.moves);
		console.log(this.solvable(this.board.array));
		if(this.board.checkForWin()){
			this.win();
		}
	},
	
	win: function(){
		this.gameState = GameStates.stopped;
		this.timeCounter.pause();
		GUI.win();
	}
}
