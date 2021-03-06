function selectTable(index) {
	var $param_obj = $('.setting-panel .param-container');
	var param_dom = $param_obj[0];
	$param_obj.html('');
	var table = ifs_table['table'];
	if (index >= 0 && index < table.length) {
		var org_x = window.org_x_default;
		var org_y = window.org_y_default;
		if ('org' in table[index]) {
			org_x = table[index]['org']['x'];
			org_y = table[index]['org']['y'];
		}
		$('#org-x')[0].value = org_x;
		$('#org-y')[0].value = org_y;

		var len = window.len_default;
		if ('len' in table[index]) {
			len = table[index]['len'];
		}
		$('#len')[0].value = len;

		var param = table[index]['param'];
		if (param.length > 0) {
			$param_obj.append('<hr class="param-hr"></hr>');
			for (var i = 0; i < param.length; ++i) {
				var html = '<div class="param">';

				html = html + '<div class="line"><div class="a ratio">a = ' + param[i]['a'] + 
					', </div><div class="b ratio">b = ' + param[i]['b'] + 
					', </div><div class="e ratio">e = ' + param[i]['e'] + '</div> </div>';
		
				html = html + '<div class="line"><div class="c ratio">c = ' + param[i]['c'] + 
					', </div><div class="d ratio">d = ' + param[i]['d'] + 
					', </div><div class="f ratio">f = ' + param[i]['f'] + '</div></div>'

				html = html + '<div class="line"><div class="p ratio">p = ' + param[i]['p'] + '</div></div>';

				html += '</div>';
				html += '<hr class="param-hr"></hr>'
				$param_obj.append(html);
			}
		}
	}
}

function initData() {
	var table = ifs_table['table'];
	if (table.length > 0) {
		var $select_obj = $('.setting-panel .table');
		var select_dom = $select_obj[0];
		var html;
		for (var i = 0; i < table.length; ++i) {
			html = html + '<option value="' + table[i]['name'] + '">' + table[i]['name'] + '</option>';
		}
		$select_obj.append(html);
		$select_obj.change(function() {
			selectTable(select_dom.selectedIndex);
			clearCanvas();
			paintIfs(ifs_table['table'][$('.setting-panel .table')[0].selectedIndex]['param'], window.count_default);
		});

		selectTable(select_dom.selectedIndex);
		clearCanvas();
		paintIfs(ifs_table['table'][$('.setting-panel .table')[0].selectedIndex]['param'], window.count_default);
	}
}

function clearCanvas() {
	window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

$(document).ready(function() {

	window.org_x_default = 0;
	window.org_y_default = 600;
	window.len_default = 100;
	window.count_default = 100000;
	window.animate_step_default = 1000;
	window.animate_count = 0;

	window.canvas = $('#paint-canvas')[0];
	window.context = window.canvas.getContext('2d');
	
	initData();

	$('#paint').click(function() {
		clearCanvas();
		var draw_count = window.count_default;
		paintIfs(ifs_table['table'][$('.setting-panel .table')[0].selectedIndex]['param'], draw_count);
	});

	$("#clear").click(function() {
		clearCanvas();
	});

	$('#animate').click(function() {
		clearCanvas();
		$('#animate').attr('disabled', 'disabled');
		$('#paint').attr('disabled', 'disabled');
		window.animate_count = 0;
		window.timer = setInterval(function() {
			if (window.animate_count < window.count_default) {
				paintIfs(ifs_table['table'][$('.setting-panel .table')[0].selectedIndex]['param'], window.animate_step_default);
				window.animate_count += window.animate_step_default;	
			} else {
				clearInterval(window.timer);
				$('#animate').removeAttr('disabled');
				$('#paint').removeAttr('disabled');
			}
		}, 100);
	});
});