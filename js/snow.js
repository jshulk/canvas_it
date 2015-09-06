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
		asteroids = setupAsteriods();

	function Asteriod(x, y, radius, vx, vy, ax, ay){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vx = vx;
		this.vy = vy;
		this.ax = ax;
		this.ay = ay;
	}

	function setupAsteriods(){
		var asteriods = [];
		for( var i = 0; i < 10; i++ ){
			var x = 20 + ( Math.random() * (canvasWidth - 40) );
			var y = 20 + ( Math.random() * (canvasHeight - 40) );
			var radius = 5 + Math.random() * 10;
			var vx = Math.random() * 4 - 2;
			var vy = Math.random() * 4 - 2;
			var ax = Math.random() * 0.2 - 0.1;
			var ay = Math.random() * 0.2 - 0.1;
			asteriods.push(new Asteriod(x, y, radius, vx, vy, ax, ay));
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
			for( var i = 0, len = asteroids.length; i < len; i++ ){
				var asteroid = asteroids[i];
				asteroid.x += asteroid.vx;
				asteroid.y += asteroid.vy;

				if( Math.abs(asteroid.vx) < 10 ){
					asteroid.vx += asteroid.ax;	
				}

				if ( Math.abs(asteroid.vy) < 10 ){
					asteroid.vy += asteroid.ay;	
				}
				

				if( Math.abs(asteroid.vx) > 0.1 ){
					asteroid.vx *= 0.9;
				} else  {
					asteroid.vx = 0;
				}

				if( Math.abs(asteroid.vy) > 0.1 ){
					asteroid.vy *= 0.9;
				} else  {
					asteroid.vy = 0;
				}

				

				if( asteroid.x - asteroid.radius < 0 ) {
					asteroid.x = asteroid.radius;
					asteroid.vx *= -1;
					asteroid.ax *= -1;
				} else if( asteroid.x + asteroid.radius > canvasWidth ){
					asteroid.x = canvasWidth - asteroid.radius;
					asteroid.vx *= -1;
					asteroid.ax *= -1;
				}

				if( asteroid.y - asteroid.radius < 0 ) {
					asteroid.y = asteroid.radius;
					asteroid.vy *= -1;
					asteroid.ay *= -1;
				} else if( asteroid.y + asteroid.radius > canvasHeight ){
					asteroid.y = canvasHeight - asteroid.radius;
					asteroid.vy *= -1;
					asteroid.ay *= -1;
				}

				ctx.beginPath();
				ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2, false);
				ctx.closePath();
				ctx.fill();
			}

			requestAnimationFrame(animate);

		}
	}

	setupResizeListener(resizeCanvas);
	setupClickListeners();


})();