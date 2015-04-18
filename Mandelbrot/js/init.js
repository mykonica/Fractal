function clearCanvas() {
    window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function getPointOnCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left,
        y: y - bbox.top
    };
}

function makeRect(start_point, end_point) {
    if (end_point.x < 0) {
        end_point.x = 0;
    }

    if (end_point.x > window.canvas.width) {
        end_point.x = window.canvas.width;
    }

    if (end_point.y < 0) {
        end_point.y = 0;
    }

    if (end_point.y > window.canvas.height) {
        end_point.y = window.canvas.height;
    }

    var view_rect = {
        xmin: window.start_point.x < end_point.x ? window.start_point.x : end_point.x,
        ymin: window.start_point.y < end_point.y ? window.start_point.y : end_point.y,
        xmax: window.start_point.x > end_point.x ? window.start_point.x : end_point.x,
        ymax: window.start_point.y > end_point.y ? window.start_point.y : end_point.y
    }

    return view_rect;
}

$(document).ready(function() {
    // $('#steps')[0].value = '50';

    window.canvas = $('#paint-canvas')[0];
    window.context = window.canvas.getContext('2d');
    window.mouse_down = false;
    window.mandelbrot_image = null;

    window.start_point = {
        x: 0,
        y: 0
    };

    canvas.onmousedown = function(e) {
        // alert(" " + e.clientY);

        var pt = getPointOnCanvas(window.canvas, e.clientX, e.clientY);
        window.mouse_down = true;
        window.start_point = pt;
        window.mandelbrot_image = window.context.getImageData(0, 0, window.canvas.width, window.canvas.height);
    }

    canvas.onmousemove = function(e) {
        if (window.mouse_down) {
            var pt = getPointOnCanvas(window.canvas, e.clientX, e.clientY);
            var view_rect = makeRect(window.start_point, pt);

            clearCanvas();
            window.context.putImageData(window.mandelbrot_image, 0, 0);

            window.context.strokeStyle = "#ff0000";
            window.context.lineWidth = 1;
            window.context.strokeRect(view_rect.xmin, view_rect.ymin,
                view_rect.xmax - view_rect.xmin, view_rect.ymax - view_rect.ymin);
        }
    }

    canvas.onmouseup = function(e) {
        window.mouse_down = false;
        var pt = getPointOnCanvas(window.canvas, e.clientX, e.clientY);
        var view_rect = makeRect(window.start_point, pt);

        if ((view_rect.xmax - view_rect.xmin < 20) || (view_rect.ymax - view_rect.ymin) < 20) {
            return;
        };

        var xmin = window.parameter_rect.xmin + view_rect.xmin / window.canvas.width * (window.parameter_rect.xmax - window.parameter_rect.xmin);
        var xmax = window.parameter_rect.xmin + view_rect.xmax / window.canvas.width * (window.parameter_rect.xmax - window.parameter_rect.xmin);
        var ymin = window.parameter_rect.ymin + view_rect.ymin / window.canvas.height * (window.parameter_rect.ymax - window.parameter_rect.ymin);
        var ymax = window.parameter_rect.ymin + view_rect.ymax / window.canvas.height * (window.parameter_rect.ymax - window.parameter_rect.ymin);

        var min_len = (xmax - xmin) < (ymax - ymin) ? (ymax - ymin) : (xmax - xmin);
        xmax = xmin + min_len;
        ymax = ymin + min_len;

        window.parameter_rect.xmin = xmin;
        window.parameter_rect.xmax = xmax;
        window.parameter_rect.ymin = ymin;
        window.parameter_rect.ymax = ymax;

        window.start_point = {
            x: 0,
            y: 0
        };

        clearCanvas();
        paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
        // window.context.putImageData(window.mandelbrot_image, 0, 0);
    }

    window.max_steps = parseInt($('#steps')[0].value);
    window.colors = buildColorArray(window.max_steps);
    window.parameter_rect = {
        xmin: -2.0,
        ymin: -2.0,
        xmax: 2.0,
        ymax: 2.0
    };
    window.view_rect = {
        xmin: 0,
        ymin: 0,
        xmax: window.canvas.width,
        ymax: window.canvas.height
    };

    $('#paint').click(function() {
        var curSteps = parseInt($('#steps')[0].value);
        if (curSteps != window.max_steps) {
            window.max_steps = curSteps;
            window.colors = buildColorArray(window.max_steps);
        }

        clearCanvas();
        paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
    });

    $('#use_color').click(function() {
        clearCanvas();
        paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
    });

    $('#show_axis').click(function() {
        clearCanvas();
        paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
    });

    $('#reset').click(function() {
        window.parameter_rect = {
            xmin: -2.0,
            ymin: -2.0,
            xmax: 2.0,
            ymax: 2.0
        };
        clearCanvas();

        paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
    });

    paintMandelbrot(window.context, window.view_rect, window.parameter_rect, window.max_steps, $('#use_color')[0].checked, $('#show_axis')[0].checked);
});
