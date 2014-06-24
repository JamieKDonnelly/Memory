<!doctype html>
<html class="no-js" lang="en">
<head>
	<title>Memory</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<script src="dist/modernizr.min.js"></script>

	<!-- CSS -->
	<link rel="stylesheet" href="dist/app.min.css" />

</head>
<body class="start">
	
	<!-- Main content -->
	<div class="row startPage">
		<div class="small-8 small-centered columns startContent">
			<div class="startPageLogo">
				<?php include("images/mainLogo.svg"); ?>
			</div>
			<h3>How good is yours?</h3>
			<a class="button nextLevelButton playNowButton">Play now</a>
		</div>
	</div>

	<!-- Level Info -->
	<div class="levelInfo">		
		<a>	
			<div class="levelNumber">
				<p>Level: <span></span></p>
			</div>		
			<div class="flipCounter">
				<p class="flipCounterText">Moves: <span>0</span></p>
			</div>
		</a>		
	</div>

	<div class="bottomBar">		
		<p><a href="http://www.jamiekdonnelly.co.uk">www.jamiekdonnelly.co.uk</a></p>		
	</div>

	<div class="loadingDiv">
		<div class="loader">
			<?php include("images/loader.svg"); ?>
		</div>
	</div>
		
	<section class="gridWrapper">
	</section>
		
		
	<!-- Modals -->
	<div id="levelCompleteModal" class="reveal-modal large" data-reveal>

		<div class="row">		
			<div id="nextModal" class="small-12 medium-12 medium-centered large-8 large-centered columns">
				<div class="row">
					<div class="small-12 columns">
						<div class="levelNumber">
							<h1 class="">Level <span></span></h1>
						</div>				
						<p class="finalScore">Completed in <span> </span>  moves!</p>
					</div>
				</div>	
				<div class="row">	
					<div class="levelCompleteButtons nextLevel small-12 medium-6 medium-centered columns">
							<a href="#" class="button nextLevelButton">Next level</a>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div id="finalModal" class="small-12 medium-12 medium-centered large-8 large-centered columns">
				<div class="row">
					<h1>Final scores:</h1>
					<ul class="levelCompleteButtons small-block-grid-1 medium-block-grid-2">
						<li>
							<ul class="scoreList">
							</ul>
							<p class="total">Total = <span></span></p>					
						</li>
						<li>
							<a href="#" class="button resetGame">Restart Game</a>					
						</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
		
	<!-- Scripts -->
	<script src="dist/jquery.min.js"></script>
	<script src="dist/fastclick.min.js"></script> 
	<script src="foundation/js/foundation/foundation.js"></script>
	<script src="foundation/js/foundation/foundation.reveal.js"></script> 
	<script src="dist/app.min.js"></script>
	<script>
	  $(document).foundation({
		reveal : {
			close_on_background_click: false
			}
	  });
	</script>
	<script src="//localhost:35729/livereload.js"></script>

	</body>
</html>