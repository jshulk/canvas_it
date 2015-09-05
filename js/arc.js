var canvas = document.getElementById("myCanvas"),
	ctx = canvas.getContext("2d");

/* Draw Circle */
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI*2, false);
// ctx.closePath();
// ctx.fill();

/* Quadratic Curve */
// ctx.lineWidth = 8;
// ctx.beginPath();
// ctx.moveTo(50, 150);
// ctx.quadraticCurveTo(250, 50, 450, 150 );
// ctx.stroke();

/* Bezier curve */
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(50, 150);
ctx.bezierCurveTo(150, 50, 350, 250, 450, 150);
ctx.stroke();