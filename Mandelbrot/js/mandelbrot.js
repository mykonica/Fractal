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



function paintMandelbrot(context, view_rect, parameter_rect, steps, colored, axis) {
    context.save();

    var width = view_rect.xmax - view_rect.xmin;
    var height = view_rect.ymax - view_rect.ymin;
    var x_scale_factor = (parameter_rect.xmax - parameter_rect.xmin) / width;
    var y_scale_factor = (parameter_rect.ymax - parameter_rect.ymin) / height;

    context.fillStyle = '#000000';

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            var re = parameter_rect.xmin + i * x_scale_factor;
            var im = parameter_rect.ymin + j * y_scale_factor;

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
