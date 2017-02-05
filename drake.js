var points = [];

$(document).ready(function() {
	var canvas = document.getElementById('canvas');
	init();
	canvas.addEventListener("click", function(e) {
		generateNextPoints();
		draw(canvas);
	});
	draw(canvas);
});

function init() {
	points[0] = { "x" : canvas.width / 3, "y" : canvas.height / 3 };
	points[1] = { "x" : 2 * canvas.width / 3, "y" : canvas.height / 3 };
	points[2] = { "x" : 2 * canvas.width / 3, "y" : 2 * canvas.height / 3 };
}

function draw(canvas) {
	var ctx = clearCanvas(canvas);
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);
	
	for (var i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
		//alert(point.x +", "+ point.y);
	}
	
	ctx.stroke();
}

function clearCanvas(canvas) {
  var ctx = canvas.getContext('2d');  
  ctx.beginPath();    
  ctx.save();         

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
  return ctx;
}

function generateNextPoints() {
	var newPoints = [];
	var newI = 0;
	for (var i = 0; i < points.length - 1; i++) {
		newPoints[newI++] = points[i];
		newPoints[newI++] = getMiddlePoint(points[i], points[i+1], i%2 == 0);
	}
	newPoints[newI++] = points[points.length-1];
	points = newPoints;
}

function getMiddlePoint(pointA, pointB, left) {
	newPoint = {};
	if(pointA.x === pointB.x) { //vertical
		var half = Math.abs(pointA.y - pointB.y) / 2;
		newPoint.y = (pointA.y + pointB.y) / 2;
		if((pointA.y < pointB.y && left) || (pointA.y > pointB.y && !left)) {
			newPoint.x = pointA.x + half;
		} else {
			newPoint.x = pointA.x - half;
		}
	} else if(pointA.y === pointB.y) { //horizontal
		newPoint.x = (pointA.x + pointB.x) / 2;
		var half = Math.abs(pointA.x - pointB.x) / 2;
		if((pointA.x < pointB.x && left) || (pointA.x > pointB.x && !left)) {
			newPoint.y = pointA.y - half;
		} else {
			newPoint.y = pointA.y + half;
		}
	} else { //diagonal
		if((pointA.x < pointB.x && pointA.y > pointB.y) || (pointA.x > pointB.x && pointA.y < pointB.y)) {
			newPoint.x = left ? pointA.x : pointB.x;
			newPoint.y = left ? pointB.y : pointA.y;
		} else {
			newPoint.x = left ? pointB.x : pointA.x;
			newPoint.y = left ? pointA.y : pointB.y;
		}
	}
	return newPoint;
}