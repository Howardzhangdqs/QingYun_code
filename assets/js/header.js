(function() {
	var t = document.getElementById("header");
	var jqt = $("#header");
	
	var pic_list = ["group_1.min.png", "sports-meeting_5.min.png", "other_6.min.png", "other_10.min.png", "sports-meeting_1.min.png",
	"sports-meeting_2.png", "group_3.min.png", "other_8.min.png", "other_9.min.png", "sports-meeting_4.min.png", "sports-meeting_3.min.png"];
	
	var build_css = function() {
		let Script = document.createElement('style');
		Script.setAttribute('class', "headerpiccss"); Script.innerHTML = "";
		document.head.appendChild(Script);
	}
	
	var build_dom = function() {
		for (let i = 1; i <= pic_list.length; i ++) {
			let Script = document.createElement('div');
			Script.setAttribute('class', "headerpic");
			Script.setAttribute('id', "headerpic" + i);
			Script.innerHTML = "<div class='headerpic-son' style='background-image: url(images/header/" + pic_list[i - 1] + ")'></div>";
			Script.setAttribute('style', "background-image: url(images/header/" + pic_list[i - 1] + ")");
			t.appendChild(Script);
		}
	}
	
	build_css(); build_dom();
	
	var p = 0, pp;
	
	var controller = function() {
		setTimeout(function() {
			try {document.getElementById("headerpic" + pp).classList.remove('headerpic-show')} catch {}
		}, 3000);
		pp = p;
		p ++;
		if (p > pic_list.length) {
			p = 0; document.getElementById("headerpic" + pp).classList.remove('headerpic-show');
			//pic_list.sort(function(){ return Math.random() - 0.5 });
		} else document.getElementById("headerpic" + p).classList.add('headerpic-show');
		setTimeout(controller, 5000);
	}
	
	setTimeout(controller, 4000);
})();