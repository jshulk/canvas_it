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
	},
	shapes = setupShapes();

function Shape(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.reverseX = false;
	this.reverseY = false;
}

function setupShapes(){
	var shapes = [];
	for( var i = 0; i < 10; i++ ){
		var x = Math.random() * 250;
		var y = Math.random() * 250;
		var width = height = Math.random() * 30;
		shapes.push(new Shape(x, y, width, height));

	}
	return shapes;
}


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
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		for( var i = 0, len = shapes.length;  i < len; i++ ){

			var shape = shapes[i];

			if (!shape.reverseX) {
			        shape.x += 2;
			} else {
			        shape.x -= 2;
			}

			// if (!shape.reverseY) {
			//         shape.y += 2;
			// } else {
			//         shape.y -= 2;
			// }


			ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

			if (shape.x < 0) {
			        shape.reverseX = false;
			} else if (shape.x + shape.width > canvasWidth) {
			        shape.reverseX = true;
			}

			// if (shape.y < 0) {
			//         shape.reverseY = false;
			// } else if (shape.y + shape.height > canvasHeight) {
			//         shape.reverseY = true;
			// }

						
			
		}

		requestAnimationFrame(animate);
	}
}



setupEventListeners(startAnimation, stopAnimation);



})();