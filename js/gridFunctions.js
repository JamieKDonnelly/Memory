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
