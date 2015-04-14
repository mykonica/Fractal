function randomColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);

	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function paintIfs(param, count, paint_axes, paint_org) {
	window.context.save();
	//计算概率范围
	var p_range = new Array(param.length + 1);
	p_range[0] = 0.0;
	for (var i = 0; i < param.length; ++i) {
		p_range[i + 1] = p_range[i] + param[i]['p'];
	}
	
	var org_x = parseInt($('#org-x').val());
	var org_y = parseInt($('#org-y').val());
	var len = parseInt($('#len').val());

	window.context.translate(window.canvas.width / 2 + org_x, window.canvas.height - org_y);
	
	if (paint_axes) {
		window.context.strokeStyle = '#FF00FF';
		window.context.moveTo(-200, -2);
		window.context.lineTo(200, -2);
		window.context.moveTo(0, 0);
		window.context.lineTo(0, -800);
		window.context.stroke();
	}

	if (paint_org) {
		window.context.fillStyle = '#FF00FF';
		window.context.fillRect(-2, -2, 4, 4);
	}

	window.context.fillStyle = 'rgb(255, 0, 0)';
	var x = 0;//Math.round(Math.random() * 400);
	var y = 0;//Math.round(Math.random() * 400);

	for (var i = 0; i < count; ++i) {

		var E = Math.random();
		var select_param_index = 0;
		for (var index = 1; index < p_range.length; ++index) {
			if (E > p_range[index - 1] && E <= p_range[index]) {
				select_param_index = index - 1;
				break;
			}
		}

		var sel_param = param[select_param_index];
		var u = sel_param['a'] * x + sel_param['b'] * y + sel_param['e'];
		var v = sel_param['c'] * x + sel_param['d'] * y + sel_param['f'];

		x = u;
		y = v;

		window.context.fillRect(Math.round(x * len), -Math.round(y * len), 1, 1);
	}

	//window.context.translate(-window.canvas.width / 2 - org_x, -window.canvas.height + org_y);
	window.context.restore();
}