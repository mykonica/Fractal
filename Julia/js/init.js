function clearCanvas() {
	window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
}

function selectTable(index) {
	var $param_obj = $('.setting-panel .param-container');
	var param_dom = $param_obj[0];
	$param_obj.html('');
	var table = julia_table['table'];

	$('#org-x')[0].value = table[index]['x'];
	$('#org-y')[0].value = table[index]['y'];
}

function initData() {
	var table = julia_table['table'];
	if (table.length > 0) {
		var $select_obj = $('.setting-panel .table');
		var select_dom = $select_obj[0];
		var html;
		for (var i = 0; i < table.length; ++i) {
			var c = table[i]['x'] + ", " + table[i]['y'];

			html = html + '<option value="' + c + '">' + c + '</option>';
		}

		$select_obj.append(html);
		$select_obj.change(function() {
			selectTable(select_dom.selectedIndex);
			clearCanvas();
			var x = julia_table['table'][select_dom.selectedIndex]['x'];
			var y = julia_table['table'][select_dom.selectedIndex]['y'];
			paintJulia(x, y);
		});

		selectTable(select_dom.selectedIndex);
		clearCanvas();
		
		select_dom.selectedIndex = 0;
		var x = julia_table['table'][select_dom.selectedIndex]['x'];
		var y = julia_table['table'][select_dom.selectedIndex]['y'];
		paintJulia(x, y);
	}
}


$(document).ready(function() {
	window.canvas = $('#paint-canvas')[0];
	window.context = window.canvas.getContext('2d');
	initData();

	$('#paint').click(function() {
		clearCanvas();
		var x = parseFloat($('#org-x')[0].value);
		var y = parseFloat($('#org-y')[0].value);
		console.log(x);
		console.log(y);
		paintJulia(x, y);
	});
});