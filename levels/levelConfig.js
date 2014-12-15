///////////
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

	$('body').attr('id', '');

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
