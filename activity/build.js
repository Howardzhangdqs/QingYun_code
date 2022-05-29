(function() {
	var dtime = 0;
	var build = function() {
		dtime += 300;
		axios.get('/config.json').then(function(response) {
			console.log(response);
			data = response.data.activity.data;
			let t = document.createElement('div');
			t.setAttribute("class", "container")
			for (let i = 0; i < data.length; i ++) {
				let m;
				if (data[i].pic == "") t.innerHTML += '<div class="row gtr-150" id="act' + i +
					'"><div class="col-12-medium" style="text-align:center"><header class="major" style="text-align:center"><h3>' + data[i].title +
					'</h3></header><p class="para">' + data[i].content + '</p><a href="' + data[i].link + '" target="_blank" class="button">查看原文</a></div></div>';
				else {
					if (data[i].m != undefined && data[i].m != "") {
						m = data[i].m;
					} else {
						m = "<img src='" + data[i].pic + "' alt='' loaded='images/intro/pic_1.minn.png'/>"
					}
					if (i % 2 == 0) {
						t.innerHTML += '<div class="row gtr-150" id="act' + i +
						'"><div class="col-6 col-12-medium" style=""><ul class="major-icons"><li><span class="image fit">' + m +
						'</span></li></ul></div><div class="col-6 col-12-medium"><header class="major"><h3>' + data[i].title +
						'</h3></header><p class="para">' + data[i].content + '</p><a href="' + data[i].link + '" target="_blank" class="button" style="float:left">查看原文</a></div></div>';
					} else {
						t.innerHTML += '<div class="row gtr-150" id="act' + i +
						'"><div class="col-6 col-12-medium spe-col" style=""><header class="major"><h3>' + data[i].title +
						'</h3></header><p class="para">' + data[i].content +
						'</p><a href="' + data[i].link + '" target="_blank" class="button" style="float:right">查看原文</a></div><div class="col-6 col-12-medium"><ul class="major-icons"><li><span class="image fit">' + m +
						'</span></li></ul></div></div>';
					}
				}

			}
			document.getElementById("two").appendChild(t);
			$(function() {$.scrollTo('#' + ((window.location.href).split("#")[1]),1000)})
		}).catch(function(error) {setTimeout(build, dtime)});
	}; build();
})();