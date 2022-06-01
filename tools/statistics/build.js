var $template, template_ls;
var builder = function(ls) {
	$template = $("<section>" + $("#template").html() + "</section>");
	template_ls = "<div class='no-big-list'>" + $template.children("div").html() + "</div>";
	console.log($template);
	$(".container").html("");
	for (let i in ls) {
		$template.children("h2").children("span").text(ls[i]);
		$(".container").append("<section>" + $template.html() + "</section>");
	}
	data_loadin();
}

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

var analyze_formatter = function(cla, err, s, o) {
	return ('<span class="no-name' + (cla ? (" " + cla) : "") + '" h-data="' + o +
	'" onclick="analyze_del($(this));bt_save()">' + (err ? (err + " ") : "") + s + ' <i class="far fa-minus-square"></i></span>');
}

var analyze = function($t) {
	let tv = $t.val().replace(/[|]/g, " ").split(" ");
	let vis = {};
	tv = tv.filter(function (s) {return s && s.trim()});
	console.log(tv);
	let tele = "";
	for (let i in tv)
		if (name_list[tv[i]] || num_list[tv[i]]) {
			if (! vis[num_list[name_list[tv[i]]] || num_list[tv[i]]]) {
				vis[num_list[name_list[tv[i]]] || num_list[tv[i]]] = true;
				tele += analyze_formatter(undefined, undefined, name_list[tv[i]] || tv[i], tv[i]);
			} else tele += analyze_formatter("no-err", "重复的", name_list[tv[i]] || tv[i], tv[i]);
		} else tele += analyze_formatter("no-err", "不存在", tv[i], tv[i]);
	$t.parents().siblings(".no-numlist").html(tele);
}

var analyze_del = function($t) {
	let tls = [];
	$.each($t.siblings(), function(key, val) {tls.push($(val).attr("h-data"))});
	let $o = $t.parent().siblings(".no-input").children(".no-num");
	console.log($o.val(tls.join(" "))); analyze($o); $t.remove();
}

var data_clear = function() {
	$(".no-num").val("");
	$.each($(".no-num"), function(key, val) {$(val).val(""); analyze($(val))});
	$(".no-content").val("");
	bt_save();
}

var data_save = function() {
	$("#bt-save").text("保存中");
	
	let data = {};
	$.each($("#container").children(), function(key, val) {
		let $t = $(val);
		let title = $t.children("h2").children("span").text();
		data[title] = [];
		$.each($t.children(".no-big-list").children(), function(k, v) {
			let $v = $(v);
			if ($v.children(".no-num").val() || $v.children(".no-content").val())
				data[title].push([$v.children(".no-content").val(), $v.children(".no-num").val()]);
		});
	});
	console.log(data);
	_.storage.set("statistics_index_data", JSON.stringify(data));
	
	$("#bt-save").css("color", "rgb(0, 185, 0)"); $("#bt-save").text("保存成功");
}

var data_loadin = function() {
	$("#bt-save").text("导入中");
	
	let data = JSON.parse(_.storage.get("statistics_index_data"));
	
	console.log(data);
	
	$.each($("#container").children(), function(key, val) {
		let $t = $(val);
		let title = $t.children("h2").children("span").text(), lsdata = data[title];
		for (let i = 0; i < lsdata.length; i ++) {
			$t.append(template_ls);
			let $v = $t.children(".no-big-list").eq(i).children(".no-input");
			$v.children(".no-content").val(lsdata[i][0]);
			$v.children(".no-num").val(lsdata[i][1]);
			analyze($v.children(".no-num"));
		}
	});
	
	$("#bt-save").css("color", "rgb(0, 185, 0)"); $("#bt-save").text("导入成功");
}

var bt_save = new Function('$("#bt-save").text("未保存"); $("#bt-save").css("color", "#f00")');

var data_export = function() {
	
}