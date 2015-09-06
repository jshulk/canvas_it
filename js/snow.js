(function(){
	var canvasEl = document.getElementById("myCanvas"),
		ctx = canvasEl.getContext("2d"),
		canvasWidth = canvasEl.width,
		canvasHeight = canvasEl.height,
		startBtn = document.getElementById("start"),
		stopBtn = document.getElementById("stop"),
		animationState = {
			isAnimating: false
		},
		asteriods = setupAsteriods();

	function Asteriod(x, y, radius, vx, vy){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vx = vx;
		this.vy = vy;
	}

	function setupAsteriods(){
		var asteriods = [];
		for( var i = 0; i < 10; i++ ){
			var x = 20 + ( Math.random() * (canvasWidth - 40) );
			var y = 20 + ( Math.random() * (canvasHeight - 40) );
			var radius = 5 + Math.random() * 10;
			var vx = Math.random() * 4 - 2;
			var vy = Math.random() * 4 - 2;
			asteriods.push(new Asteriod(x, y, radius, vx, vy));
		}

		return asteriods;
	}

	function setupResizeListener(listener){
		window.addEventListener("resize", listener);
	}

	function setupClickListeners(){
		startBtn.addEventListener("click", startAnimation);
		stopBtn.addEventListener("click", stopAnimation);
	}

	function startAnimation(){
		if( !animationState.isAnimating ){
			animationState.isAnimating = true;
			requestAnimationFrame(animate);
		}
	}

	function stopAnimation(){
		if(animationState.isAnimating){
			animationState.isAnimating = false;
		}
	}

	function resizeCanvas(){
		canvasEl.setAttribute("width", window.innerWidth);
		canvasEl.setAttribute("height", window.innerHeight);
		canvasWidth = canvasEl.width;
		canvasHeight = canvasEl.height;
	}



	function animate(){
		if(animationState.isAnimating){
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			ctx.fillStyle = "rgb(255, 255, 255 )";
			for( var i = 0, len = asteriods.length; i < len; i++ ){
				var asteriod = asteriods[i];
				asteriod.x += asteriod.vx;
				asteriod.y += asteriod.vy;

				if( asteriod.x - asteriod.radius < 0 ) {
					asteriod.x = asteriod.radius;
					asteriod.vx *= -1;
				} else if( asteriod.x + asteriod.radius > canvasWidth ){
					asteriod.x = canvasWidth - asteriod.radius;
					asteriod.vx *= -1;
				}

				if( asteriod.y - asteriod.radius < 0 ) {
					asteriod.y = asteriod.radius;
					asteriod.vy *= -1;
				} else if( asteriod.y + asteriod.radius > canvasHeight ){
					asteriod.y = canvasHeight - asteriod.radius;
					asteriod.vy *= -1;
				}

				ctx.beginPath();
				ctx.arc(asteriod.x, asteriod.y, asteriod.radius, 0, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
			}

			requestAnimationFrame(animate);

		}
	}

	setupResizeListener(resizeCanvas);
	setupClickListeners();


})();