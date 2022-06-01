var $tb;

$(function() {
	jQuery.extend(jQuery.fn.dataTableExt.oSort, {
		"h-numsort-pre":  function (a) { return parseInt(a.split(" ")[0]) },
		"h-numsort-asc":  function (a, b) { return ((a < b) ? -1 : ((a > b) ? 1 : 0)) },
		"h-numsort-desc": function (a, b) { return ((a < b) ? 1 : ((a > b) ? -1 : 0)) }
	});
	$("#table-container, #table-container-d").css("display", "none");
});


var tb_data = [];

var analyze_data_process = function(ts) {
	let tv = ts.replace(/[|]/g, " ").split(" ");
	let vis = {};
	tv = tv.filter(function (s) {return s && s.trim()});
	for (let i in tv)
		if (name_list[tv[i]] || num_list[tv[i]])
			if (! vis[num_list[name_list[tv[i]]] || num_list[tv[i]]])
				vis[num_list[name_list[tv[i]]] || num_list[tv[i]]] = true;
	console.log(vis);
	return vis;
}
  
var data_process = function(f) {
	let data = {}; tb_data = [];
	for (let i = 1; i <= TOTN; i ++) data[i] = {"name": name_list["" + i], "times": 0, "con": []};
	
	console.log(data);
	$.each($("#container").children(), function(key, val) {
		let $t = $(val);
		let title = $t.children("h2").children("span").text();
		$.each($t.children(".no-big-list").children(), function(k, v) {
			let $v = $(v), vl = $v.children(".no-num").val();
			if (vl) {
				let tv = analyze_data_process(vl);
				for (let i in tv) {
					data[i].times ++;
					data[i].con.push(title + " - " + ($v.children(".no-content").val() ? $v.children(".no-content").val() : "未定义"));
				}
			}
		});
	});
	
	for (let i = 1; i <= TOTN; i ++) {
		let pd = data[i];
		if (f) {
			if (pd.name) tb_data.push(["" + i, pd.name, pd.times, (pd.con).join("<br>")]);
			else tb_data.push(["" + i, "", "", ""]);
		} else if (pd.times != 0) tb_data.push(["" + i, pd.name, pd.times, (pd.con).join("<br>")])
	}
	
	console.log(data);
}

var data_export = function(f) {
	data_process(f);
	
	$("#table-container").css("display", "block");
	
	try {$tb.destroy()} catch {}
	$tb = $('#tb-datatable').DataTable({
		"data": tb_data,
		"language": {
			"sLengthMenu": "每页显示 _MENU_ 条记录", "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "没有数据", "sInfoFiltered": "(从 _MAX_ 条数据中检索)", "search": "搜索",
			"paginate": { "sFirst": "首页", "sPrevious": "前一页", "sNext": "后一页", "sLast": "尾页" },
			"sZeroRecords": "没有检索到数据"
		},
		"columnDefs": [
			{"targets": [0], "sType": "h-numsort" },
			{"targets": [0], "className": "dt-hc1" }, {"targets": [1], "className": "dt-hc2" },
			{"targets": [2], "className": "dt-hc3" }, {"targets": [3], "className": "dt-hc4" }
		], "paging": false
	});
	$("#tb-datatable").css("width", "100%");
}

var data_cpy = function(f) {
	let cpydata = [];
	for (let i in tb_data) {
		let tl = [];
		if ($("#cpy-cb1").is(':checked')) tl.push(tb_data[i][0]); if ($("#cpy-cb2").is(':checked')) tl.push(tb_data[i][1]);
		if ($("#cpy-cb3").is(':checked')) tl.push(tb_data[i][2]); if ($("#cpy-cb4").is(':checked')) tl.push(tb_data[i][3]);
		cpydata.push(tl.join("\t").replace(/<br>/g, " | "));
	}
	cpydata = cpydata.join("\n");
	$("#tx-output").val(cpydata);
	navigator.clipboard.writeText(cpydata).then(function() {
		$("#bt-cpy").text("复制成功"), $("#bt-cpy").css("color", "#00b900");
		setTimeout(function() { $("#bt-cpy").text("复制"), $("#bt-cpy").css("color", "#000") }, "1000");
	}).catch(function() {
		$("#bt-cpy").text("复制失败"), $("#bt-cpy").css("color", "#f00");
		setTimeout(function() { $("#bt-cpy").text("复制"), $("#bt-cpy").css("color", "#000") }, "1000");
		$("#tx-output").css("display", "block");
		$("#tx-output").select()
	})
}

var data_hs = function(n) {
	if ($("#cpy-cb" + n).is(':checked')) $(".dt-hc" + n).css("display", 'table-cell');
	else $(".dt-hc" + n).css("display", 'none');
}