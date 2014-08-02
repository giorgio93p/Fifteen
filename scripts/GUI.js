"use strict";
var GUI = {
	move: function(tileNumber, position){
		var tile = document.getElementById('tile-' + tileNumber);
		var coord = Utilities.oneToPair(position)
		tile.style.left = coord.x*100/Settings.n + '%';
		tile.style.top = coord.y*100/Settings.n + '%';
	},
	
	changeMoves: function(moves){
		document.getElementById('moveCount').innerHTML = moves;
	},
	
	win: function(){
		document.getElementById('result').innerHTML = 'WIN';
		this.move(Settings.n*Settings.n-1,Settings.n*Settings.n-1);
	},
	
	init: function(){
		var container = document.getElementById('board');
		for(var i=0; i<Settings.n*Settings.n; i++){
			var element = document.createElement('span');
			element.id = 'tile-' + i;
			element.setAttribute('data-tile',i);
			element.classList.add('slide-square');
			element.innerHTML = i+1;
			element.style.width = 100/Settings.n-3 + '%'; //3 if for margin
			element.style.height = element.style.width;
            container.appendChild(element);
            this.move(i,i);
		}
		element.classList.add('empty');
	}
}
