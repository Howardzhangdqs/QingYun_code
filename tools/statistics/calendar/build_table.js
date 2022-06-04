var $tb;

var name_list = {
    "1":  "刘豫皖", "2":  "齐欣怡", "3":  "李予心", "4":  "杨睿怡", "5":  "吴嘉雯", "6":  "沈筱祎",
    "7":  "张伊容", "8":  "张煜琀", "9":  "张嘉怡", "10": "邵亦涵", "11": "邵思晴", "12": "罗怡霖",
    "13": "金品希", "15": "秦黄蕊", "16": "桂诗韵", "17": "顾思仪", "19": "黄语菲", "20": "曹锦秀",
    "21": "梁彦欣", "22": "温璐宁", "23": "卫澜",   "24": "王屹杨", "26": "邓湛",   "27": "史炜乐",
    "28": "任思渔", "29": "严睿扬", "30": "李晟淏", "31": "佘轶舟", "32": "张乙夏", "33": "张金皓",
    "34": "张既同", "36": "郁佳一", "37": "金泰仰", "38": "周津仕", "39": "赵国桓", "41": "费云帆",
    "42": "蒋奕铭", "43": "魏舒天", "44": "李欣宜", "45": "吕一飞",
	"lyw": "刘豫皖", "qxy": "齐欣怡", "lyx": "李予心", "yry": "杨睿怡", "wjw": "吴嘉雯", "sxy": "沈筱祎",
    "zyr": "张伊容", "zyh": "张煜琀", "zjy": "张嘉怡", "syh": "邵亦涵", "ssq": "邵思晴", "lyl": "罗怡霖",
    "jpx": "金品希", "qhr": "秦黄蕊", "gsy": "桂诗韵", "gsy1": "顾思仪", "hyf": "黄语菲", "cjx": "曹锦秀",
    "lyx1": "梁彦欣", "wln": "温璐宁", "wl" : "卫澜",   "wyy": "王屹杨", "dz" : "邓湛",   "syl": "史炜乐",
    "rsy": "任思渔", "yry1": "严睿扬", "lsh": "李晟淏", "syz": "佘轶舟", "zyx": "张乙夏", "zjh": "张金皓",
    "zjt": "张既同", "yjy": "郁佳一", "jty": "金泰仰", "zjs": "周津仕", "zgh": "赵国桓", "fyf": "费云帆",
    "jym": "蒋奕铭", "wst": "魏舒天", "lxy": "李欣宜", "lyf": "吕一飞"
};

var num_list = {
    "刘豫皖": 1,  "齐欣怡": 2,  "李予心": 3,  "杨睿怡": 4,  "吴嘉雯": 5,  "沈筱祎": 6,
    "张伊容": 7,  "张煜琀": 8,  "张嘉怡": 9,  "邵亦涵": 10, "邵思晴": 11, "罗怡霖": 12,
    "金品希": 13, "秦黄蕊": 15, "桂诗韵": 16, "顾思仪": 17, "黄语菲": 19, "曹锦秀": 20,
    "梁彦欣": 21, "温璐宁": 22, "卫澜"  : 23, "王屹杨": 24, "邓湛"  : 26, "史炜乐": 27,
    "任思渔": 28, "严睿扬": 29, "李晟淏": 30, "佘轶舟": 31, "张乙夏": 32, "张金皓": 33,
    "张既同": 34, "郁佳一": 36, "金泰仰": 37, "周津仕": 38, "赵国桓": 39, "费云帆": 41,
    "蒋奕铭": 42, "魏舒天": 43, "李欣宜": 44, "吕一飞": 45
};

$(function() {
	jQuery.extend(jQuery.fn.dataTableExt.oSort, {
		"h-numsort-pre":  function (a) { return parseInt(a.split(" ")[0]) },
		"h-numsort-asc":  function (a, b) { return ((a < b) ? -1 : ((a > b) ? 1 : 0)) },
		"h-numsort-desc": function (a, b) { return ((a < b) ? 1 : ((a > b) ? -1 : 0)) }
	});
	//$("#table-container, #table-container-d").css("display", "none");
	data_export();
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
	
	let d = JSON.parse(_.storage.get("statistics_index_data")) || {};
	
	let thref = window.location.href.split("?")[1];
	let ts, te;
	try {
		ts = parseInt(thref.split("-")[0]), te = parseInt(thref.split("-")[1]);
	} catch {
		$("body").html("<div style='color:red'>ERROR: 参数错误</div>"); return;
	}
	
	console.log(ts, te);
	
	for (let i = ts; i <= te; i ++) {
		let key = "" + i;
		if (d[key]) {
			for (let j in d[key]) {
				if (! d[key][j].length) continue;
				console.log("20" + i, j, d[key][j]);
				for (let l in d[key][j]) {
					let tv = analyze_data_process(d[key][j][l][1]);
					for (let k in tv) {
						data[k].times ++;
						data[k].con.push("20" + i + " " + j + " - " + (d[key][j][l][0] ? d[key][j][l][0] : "未定义"));
					}
				}
			}
		}
	}
	console.log(data);
	
	for (let i = 1; i <= TOTN; i ++) {
		let pd = data[i];
		if (f) {
			if (pd.name) tb_data.push(["" + i, pd.name, pd.times, (pd.con).join("<br>")]);
			else tb_data.push(["" + i, "", "", ""]);
		} else if (pd.times != 0) tb_data.push(["" + i, pd.name, pd.times, (pd.con).join("<br>")])
	}

	console.log(tb_data);
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
	$("[aria-describedby]").addClass("display")
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
	try {
		navigator.clipboard.writeText(cpydata).then(function() {
			$("#bt-cpy").text("复制成功"), $("#bt-cpy").css("color", "#00b900");
			setTimeout(function() { $("#bt-cpy").text("复制"), $("#bt-cpy").css("color", "#000") }, "1000");
		}).catch(function() {
			$("#bt-cpy").text("复制失败"), $("#bt-cpy").css("color", "#f00");
			setTimeout(function() { $("#bt-cpy").text("复制"), $("#bt-cpy").css("color", "#000") }, "1000");
			$("#tx-output").css("display", "block");
			$("#tx-output").select()
		})
	} catch {
		$("#bt-cpy").text("复制失败"), $("#bt-cpy").css("color", "#f00");
		setTimeout(function() { $("#bt-cpy").text("复制"), $("#bt-cpy").css("color", "#000") }, "1000");
		$("#tx-output").css("display", "block"); $("#tx-output").select()
	}
}

var data_hs = function(n) {
	if ($("#cpy-cb" + n).is(':checked')) $(".dt-hc" + n).css("display", 'table-cell');
	else $(".dt-hc" + n).css("display", 'none');
}