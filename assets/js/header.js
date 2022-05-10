/*
<div class="headerpic" style="transition: opacity 3s ease;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 1;
    position: absolute;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url(images/header/group_1.png);
	-webkit-filter: blur(5px) brightness(60%);
    filter: blur(5px) brightness(60%);
    background-attachment: fixed, fixed, fixed;"></div>
*/

/*
background-image: url(images/header/group_1.png);
*/

(function() {
	var t = document.getElementById("header");
	var jqt = $("#header");
	
	var pic_list = ["group_1.min.png", "sports-meeting_3.min.png", "other_6.min.png", "other_10.min.png", "sports-meeting_1.png",
	"sports-meeting_2.png", "group_3.min.png", "other_8.min.png", "other_9.min.png", "sports-meeting_4.min.png"];
	
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
	
	var builder = function() {
		build_css(); build_dom();
	}
	
	builder();
	
	var p = 0, pp;
	
	var controller = function() {
		setTimeout(function() {
			document.getElementById("headerpic" + pp).classList.remove('headerpic-show');
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