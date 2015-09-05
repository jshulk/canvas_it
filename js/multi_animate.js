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
	this.radius = Math.random() * 30;
	this.angle = 0;
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
			// shape.x += Math.random() * 4 - 2;
			// shape.y += Math.random() * 4 - 2;
			shape.x = shape.x + (shape.radius * Math.cos(shape.angle * (Math.PI/180)));
			shape.y = shape.y + (shape.radius * Math.sin(shape.angle * (Math.PI/180)));
			ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
			shape.angle += 5;
			if( shape.angle > 360 ){
				shape.angle = 0;
			}
		}
		requestAnimationFrame(animate);
	}
}



setupEventListeners(startAnimation, stopAnimation);



})();