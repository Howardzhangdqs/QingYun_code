(function() {
	var pt = document.getElementsByTagName("img");
	for (let i = 0; i < pt.length; i ++) if (pt[i].getAttribute("loaded")) {
		let k = new Image(); k.src = pt[i].getAttribute("src");
		pt[i].setAttribute("src", pt[i].getAttribute("loaded")); pt[i].setAttribute("loaded", k.src);
		console.log(pt[i]);
		k.onload = function() {
			pt[i].setAttribute("src", pt[i].getAttribute("loaded")); pt[i].classList.remove("picloadjsmask");
		}
		pt[i].classList.add("picloadjsmask"); pt[i].classList.add("picloadjs");
	}
})();