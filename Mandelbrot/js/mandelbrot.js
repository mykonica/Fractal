function randomColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function ismandelbrot(re, im) {
	var x = 0.0;
	var y = 0.0;
	var nx = 0.0;
	var ny = 0.0;

	for (var i = 0; i < window.MANDELBROT_STEPS; i++) {
		nx = x * x - y * y + re;
		ny = 2 * x * y + im;

		if (nx * nx + ny * ny > 4) {
			return false;
		}

		x = nx;
		y = ny;
	}

	return true;
}

function paintMandelbrot(width, height) {
	window.context.save();

	var re = 0.0;
	var im = 0.0;
	var scale_factor = 2.0 / height;

	window.context.fillStyle = '#000000';

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			re = i * scale_factor - 2.0;
			im = j * scale_factor - 1.0;

			if (ismandelbrot(re, im)) {
				window.context.fillRect(i, j, 1, 1);			
			}
		}
	}

	window.context.restore();
}