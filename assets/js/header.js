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
	
	var pic_list = ["group_1.png", "test1.png", "test2.png", "test3.png"];
	
	var build_css = function() {
		let Script = document.createElement('style');
		Script.setAttribute('class', "headerpiccss"); Script.innerHTML = "";
		document.head.appendChild(Script);
	}
	
	var build_dom = function() {
		for (let i in pic_list) {
			let Script = document.createElement('div');
			Script.setAttribute('class', "headerpic");
			Script.setAttribute('id', "headerpic" + i);
			Script.innerHTML = "<div class='headerpic-son' style='background-image: url(images/header/" + pic_list[i] + ")'></div>";
			Script.setAttribute('style', "background-image: url(images/header/" + pic_list[i] + ")");
			t.appendChild(Script);
		}
	}
	
	var builder = function() {
		build_css();
		build_dom();
	}
	
	builder();
})();