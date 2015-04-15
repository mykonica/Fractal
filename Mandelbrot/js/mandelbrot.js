function randomColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function buildColorArray(size) {
	var colors = new Array();
	for (var i = 0; i < size; i++) {
		colors[i] = randomColor();
	}

	return colors;
}

function mandelbrotStep(re, im, steps) {
	var x = 0.0;
	var y = 0.0;
	var nx = 0.0;
	var ny = 0.0;

	for (var i = 0; i < steps; i++) {
		nx = x * x - y * y + re;
		ny = 2 * x * y + im;

		if (nx * nx + ny * ny > 4) {
			return i;
		}

		x = nx;
		y = ny;
	}

	return steps;
}



function paintMandelbrot(context, width, height, steps, colored, axis) {
	context.save();

	var re = 0.0;
	var im = 0.0;
	var scale_factor = 4.0 / height;

	context.fillStyle = '#000000';

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			re = i * scale_factor - 2.0;
			im = j * scale_factor - 2.0;

			var step = mandelbrotStep(re, im, steps);
			if (colored) {
				if (step == steps) {
					context.fillStyle = '#000000';
				} else {
					context.fillStyle = window.colors[step];
				}
				window.context.fillRect(i, j, 1, 1);	
			} else {
				if (step == steps) {
					context.fillRect(i, j, 1, 1);			
				}				
			}
		}
	}

 	if (axis) {
 		context.strokeStyle = '#FF0000';
 		context.moveTo(0, height / 2);
 		context.lineTo(width, height / 2);
 		context.moveTo(width / 2, 0);
 		context.lineTo(width / 2, height);
 		context.stroke();
 	}

	context.restore();
}