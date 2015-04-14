function clearCanvas() {
	window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

$(document).ready(function() {
	window.MANDELBROT_STEPS = 50;
	window.canvas = $('#paint-canvas')[0];
	window.context = window.canvas.getContext('2d');

	paintMandelbrot($('#paint-canvas').attr("width"), $('#paint-canvas').attr("height"));
});