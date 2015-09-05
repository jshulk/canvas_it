(function(){
var startBtn = document.getElementById("start"),
	stopBtn = document.getElementById("stop"),
	canvasEl = document.getElementById("myCanvas"),
	ctx = canvasEl.getContext("2d"),
	canvasWidth = canvasEl.width,
	canvasHeight = canvasEl.height,
	animationState = {
		x: 0,
		isAnimating: false
	};

function setupEventListeners(startAnimation, stopAnimation){

	startBtn.addEventListener("click", startAnimation, false);
	stopBtn.addEventListener("click", stopAnimation, false)
}

function startAnimation(){
	if( !animationState.isAnimating ){
		animationState.isAnimating = true;
		requestAnimationFrame(animate);	
	}
	
}

function stopAnimation(){
	animationState.isAnimating = false;
	animationState.x = 0;
}


function animate(){
	if( animationState.isAnimating ){
		animationState.x += 1;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillRect(animationState.x, 50, 10, 10);
		requestAnimationFrame(animate);
	}
}

setupEventListeners(startAnimation, stopAnimation);



})();