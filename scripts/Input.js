"use strict";
var Input = {
	init: function(){
		var squares = document.getElementsByClassName('slide-square');
		for(var i=0;i<squares.length; i++)squares[i].addEventListener('click',function(e) {
			if(Engine.gameState !== GameStates.playing) return;
			Engine.moveTile(parseInt(e.target.getAttribute('data-tile'),10));
		},false);
		
		document.getElementById('pause').onclick = function(){Engine.pause()};
		
		document.getElementById('restart').onclick = function(){Engine.pause();Engine.start()};
	}
}
