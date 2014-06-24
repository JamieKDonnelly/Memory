function gridFunction(){

	// Clear the existing html
	$('.gridWrapper').empty();

	// Add markup for grid
	$('.gridWrapper').append('<div class="gridContainer"><div class="gridContentCover"></div><ul class="flipGrid"></ul></div>');

	// Set block grid size
	$('.flipGrid').addClass(gridSize);

	// Show the level number
	$('.levelNumber span').html(levelNumber);

	// Reset the flip counter on level change
	$('.flipCounterText span').html("0");

	// Build the grid from the arrays
	for(var i=0; i<2; i++){
		$.each(cards, function(i){
			var gridLi = $('<li/>')
				.appendTo('.flipGrid');	
				
			var flipContainer = $('<a/>')
				.addClass('flipContainer')
				.appendTo(gridLi);
				
			var flipContent = $('<div/>')				
				.addClass('flipContent')
				.addClass('card' + cards[i])
				.appendTo(flipContainer);	
				
			var containerRel = $('<div/>')
				.addClass('flipContainerRel')
				.appendTo(flipContent);
				
			var flipCard = $('<div/>')
				.addClass('flipCard')
				.appendTo(containerRel);
				
			var frontFace = $('<div/>')
				.addClass('front face')
				.appendTo(flipCard);		
				
			var backFace = $('<div/>')
				.addClass('back face')
				.appendTo(flipCard);		
		});
	}

	
	// Shuffle the unordered list
	shuffle();


	// Find number of possible cards to detect completed game
	var level = $('.flipGrid li').length;

	// Set the grid size on load 
	var docHeight = $(document).height();
	$('.gridContainer').css({'max-width' : docHeight * maxWidth});

	// Resize the grid wrapper on window resize 
	$(window).resize(function() {
		docHeight = $(document).height();
		$('.gridContainer').css({'max-width' : docHeight * maxWidth});	
	});

	
	// Load helper for vertical align
	$( '.gridWrapper' ).prepend( '<div class="gridHelper"></div>' );	

	
	// Find matching flip cards		
	$('.flipContent').click(function() {
	
		// Prevent matching cards from being clicked
		if($(this).is('.matching')){return false;}	
		$(this).addClass('active');	
		var flipped = $('.flipContent.active');	
		
		// Detect a match
		if(flipped.length === 2){
		
			// Count number of turns
			$('.flipCounterText span').html(function(i, val) { return val*1+1 });
			$('.gridContentCover').css({ display: 'block'});
			
			var class1 = (" " + $(".active:eq(0)").attr("class") + " ")
				.replace(" flip ", "")
				.replace(" active ", "")
				.replace(/^ +| +$/g, "");
			var class2 = (" " + $(".active:eq(1)").attr("class") + " ")
				.replace(" flip ", "")
				.replace(" active ", "")
				.replace(/^ +| +$/g, "");
			if (class1 === class2) {
				$(".active").addClass("animationOn").toggleClass("active matching");
				
				// Trigger matched animation
				$(".matching.animationOn .face.back").addClass("glow");
					function matchedAnimation(){
						$(".matching .face.back").removeClass("glow");
						$(".matching").removeClass("animationOn");
					}
					setTimeout(matchedAnimation, 500);				
			}
		
			// If not matching 	
			function notMatching(){	
				$('.gridContentCover').css({ display: 'none'});			
				flipped.removeClass('active'); 				
			}
			setTimeout(notMatching, delayTime);			    
		}
		
		
		// Detect the completion of all matches and alert
		var matchingCards = $('.flipContent.matching').length;	

		if(matchingCards === level){
			var finalScore = $('.flipCounterText span').html();
			$('.finalScore span').html(finalScore);
			$('#levelCompleteModal').foundation('reveal', 'open');
			$('.scoreList').append('<li> Level ' + levelNumber + ' = ' + '<span class="levelScore">' + finalScore + '</span>' + '</li>');
			totalCalc();
		}
	});

	showGrid();

}
;$(document).ready(function() {	

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

;///////////
// Level config Javascript
///////////


// This function is called in siteFunctions
function levelSelector(){

	// Sets body classes and loads functions for next level
	$('.nextLevelButton').click( function (){
		if($('body').hasClass('start')){
			level1();
		}
		if($('body').hasClass('level-1')){
			level2();
		}
		else if($('body').hasClass('level-2')){
			level3();
		}
		else if($('body').hasClass('level-3')){
			level4();
		}
		else if($('body').hasClass('level-4')){
			level5();
		}
		else if($('body').hasClass('level-5')){
			level6();
		}
	});
}


//
// LEVEL 1
//
function level1(){

	// Set the level number
	levelNumber = "1";

	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";
		cards[2] = "three";

	// Set delay time in ms
	delayTime = 500;

	// Set block grid size
	gridSize = ('small-block-grid-3');

	// Max width of container
	maxWidth = (1.1);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-1');
	}
	setTimeout(loadDelay2, 400);
	
}

//
// LEVEL 2
//
function level2(){

	// Set the level number
	levelNumber = "2";

	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";		
		cards[2] = "three";
		cards[3] = "four";	   

	// Set delay time in ms
	delayTime = 500;

	// Set block grid size
	gridSize = ('small-block-grid-4');

	// Max width of container
	maxWidth = (1.4);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-2');
	}
	setTimeout(loadDelay2, 400);
	
}

//
// LEVEL 3
//
function level3(){

	// Set the level number
	levelNumber = "3";
	
	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";		
		cards[2] = "three";
		cards[3] = "four";
		cards[4] = "five";

	// Set delay time in ms
	delayTime = 400;

	// Set block grid size
	gridSize = ('small-block-grid-5');

	// Max width of container
	maxWidth = (1.6);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-3');
	}
	setTimeout(loadDelay2, 400);
	
}

//
// LEVEL 4
//
function level4(){

	// Set the level number
	levelNumber = "4";
	
	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";		
		cards[2] = "three";
		cards[3] = "four";
		cards[4] = "five";
		cards[5] = "six";

	// Set delay time in ms
	delayTime = 400;

	// Set block grid size
	gridSize = ('small-block-grid-4');

	// Max width of container
	maxWidth = (1.1);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-4');
	}
	setTimeout(loadDelay2, 400);
	
}

//
// LEVEL 5
//
function level5(){

	// Set the level number
	levelNumber = "5";

	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";		
		cards[2] = "three";
		cards[3] = "four";
		cards[4] = "five";
		cards[5] = "six";
		cards[6] = "seven";
		cards[7] = "eight";
		cards[8] = "nine";

	// Set delay time in ms
	delayTime = 400;

	// Set block grid size
	gridSize = ('small-block-grid-6');

	// Max width of container
	maxWidth = (1.6);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-5');
	}
	setTimeout(loadDelay2, 400);
	
}

//
// LEVEL 6
//
function level6(){

	// Set the level number
	levelNumber = "6";
	
	// Build the cards
	cards = new Array();
		cards[0] = "one";			
		cards[1] = "two";		
		cards[2] = "three";
		cards[3] = "four";
		cards[4] = "five";
		cards[5] = "six";
		cards[6] = "seven";
		cards[7] = "eight";
		cards[8] = "nine";
		cards[9] = "ten";
		cards[10] = "eleven";
		cards[11] = "twelve";

	// Set delay time in ms
	delayTime = 400;

	// Set block grid size
	gridSize = ('small-block-grid-6');

	// Max width of container
	maxWidth = (1.4);

	// Set the body class
	function loadDelay2(){
		$('body').removeClass();
		$('body').addClass('level-6').attr('id', 'finalLevel');
	}
	setTimeout(loadDelay2, 400);
	
}
