
window.JULIA_STEPS = 50;

function randomColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function juliaSteps(x0, y0, xc, yc) {
	var x = 0.0;
	var y = 0.0;

	var i = 0;
	for (i = 0; i < window.JULIA_STEPS; i++) {
		x = x0 * x0 - y0 * y0 + xc;
		y = 2 * x0 * y0 + yc;

		if (x * x + y * y > 4) {
			return i;
		}

		x0 = x;
		y0 = y;
	}

	return i;
}

function paintJulia(xc, yc) {
	window.context.save();

	var width = window.canvas.width;
	var height = window.canvas.height;
	
	
	var imZ = -1.5;
	var stepRe = 3 / (width - 1);
	var stepIm = 3 / (height - 1);

	window.context.fillStyle = '#000000';

	for (var i = 0; i < width; i++) {
		var reZ = -1.5;
		for (var j = 0; j < height; j++) {
			if (juliaSteps(reZ, imZ, xc, yc) == window.JULIA_STEPS) {
				window.context.fillRect(i, j, 1, 1);				
			}

			reZ += stepRe;
		}

		imZ += stepIm;
	}

	window.context.restore();
}