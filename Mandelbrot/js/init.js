function clearCanvas() {
	window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

$(document).ready(function() {
	// $('#steps')[0].value = '50';

	window.MANDELBROT_STEPS = parseInt($('#steps')[0].value);
	window.colors = buildColorArray(window.MANDELBROT_STEPS);

	window.canvas = $('#paint-canvas')[0];
	window.context = window.canvas.getContext('2d');
	$('#use_color')[0].checked = true;
	paintMandelbrot(window.context, window.canvas.width, window.canvas.height, parseInt($('#steps')[0].value), $('#use_color')[0].checked, ('#show_axis')[0].checked);


	$('#paint').click(function() {
		var curSteps = parseInt($('#steps')[0].value);
		if (curSteps != window.MANDELBROT_STEPS) {
			window.MANDELBROT_STEPS = curSteps;
			window.colors = buildColorArray(window.MANDELBROT_STEPS);
		}

		clearCanvas();
		paintMandelbrot(window.context, window.canvas.width, window.canvas.height, window.MANDELBROT_STEPS, $('#use_color')[0].checked, $('#show_axis')[0].checked);
	});

	$('#use_color').click(function() {
		clearCanvas();
		paintMandelbrot(window.context, window.canvas.width, window.canvas.height, window.MANDELBROT_STEPS, $('#use_color')[0].checked, $('#show_axis')[0].checked);
	});

	$('#show_axis').click(function() {
		clearCanvas();
		paintMandelbrot(window.context, window.canvas.width, window.canvas.height, window.MANDELBROT_STEPS, $('#use_color')[0].checked, $('#show_axis')[0].checked);
	});
});