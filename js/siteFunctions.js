$(document).ready(function() {	

	$('body').addClass('start');

	orientationDetect();

	// Close modal and menu functions
	function closeModal(){
		$(this).foundation('reveal', 'close');
	}
	function closeMenu(){
		$('.off-canvas-wrap').removeClass('move-right');
	}

	// Set the variables 
	var cards = "";
	var delayTime = "";
	var gridSize = ""; 
	var maxWidth = "";
	var levelNumber = "";


	// Load the configuration for the level selector
	levelSelector();

	// Reset game
	$('.resetGame').click(function(){
		$('.loadingDiv').fadeIn('slow');
		level1();
		closeModal();	
		function loadDelay(){
			gridFunction();
			$('.loadingDiv').fadeOut('medium');
		}
		setTimeout(loadDelay, 2000);
	});

	// Next level button after each level
	$('.nextLevelButton').click( function (){
		$('.loadingDiv').fadeIn('slow');
		closeModal();
		function loadDelay(){
			gridFunction();
			$('.loadingDiv').fadeOut('slow');
		}
		setTimeout(loadDelay, 2000);
	});


});


$(window).load(function() {	

	// Show the grid only on window.load
	showGrid();

	theConsole();

});


// Show the grid
function showGrid(){
	$('.gridContainer').css({ width: '99%'});
}


// Shuffle function
function shuffle(){
	var array = $('.flipGrid').children().toArray();
	var i = array.length,	j, temp;

	while (--i){
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	$('.flipGrid').append(array);
}


// Reset function	
function reset(){
	$('.flipContent.matching').removeClass('matching'); 
	$('.flipCounterText span').html('0');
	function resetDelay(){
		shuffle();
		$('.off-canvas-wrap').removeClass('move-right');
	}
	setTimeout(resetDelay, 300);
}


// Determine the screen orientation 
function orientationDetect(){
	var winHeight = $(window).height();	
	var winWidth = $(window).width();	

	if(winWidth > winHeight){
		$('html').addClass('landscape').removeClass('portrait');
	} else{
		$('html').removeClass('landscape').addClass('portrait');
	}
	$(window).resize( function() {	
		var winHeight = $(window).height();	
		var winWidth = $(window).width();	
		if(winWidth > winHeight){
			$('html').addClass('landscape').removeClass('portrait');
		} else{
			$('html').removeClass('landscape').addClass('portrait');
		}
	});
}

function totalCalc(){
	var sum = 0;
	$('.levelScore').each(function(){
		sum += Number($(this).text());
	});
	$('.total span').html(sum);
}

function theConsole(){
	console.log('
	////////////
	-: MEMORY :-
	////////////

	// A responsive Javascript game, by Jamie K Donnelly
	// http://www.jamiekdonnelly.co.uk
	');
}

