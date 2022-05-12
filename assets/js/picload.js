(function() {
	var pt = document.getElementsByTagName("img");
	for (let i = 0; i < pt.length; i ++) if (pt[i].getAttribute("loaded")) {
		pt[i].style.backgroundImage = "url(" + pt[i].getAttribute("loaded") + ")";
		pt[i].style.backgroundRepeat = "no-repeat";
		pt[i].style.backgroundPosition = "center";
		pt[i].style.backgroundSize = "cover";
	}
})();