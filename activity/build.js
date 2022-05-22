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
				if (data[i].m != undefined && data[i].m != "") {
					m = data[i].m;//"<iframe style='width:100%;height:338px' frameborder='no' allowfullscreen mozallowfullscreen webkitallowfullscreen src='" + data[i].m + "'></iframe>"
				} else {
					m = "<img src='" + data[i].pic + "' alt='' loaded='images/intro/pic_1.minn.png'/>"
				}
				if (i % 2 == 0) {
					t.innerHTML += `<div class="row gtr-150">
							<div class="col-6 col-12-medium"><ul class="major-icons"><li><span class="image fit">
								` + m + `
							</span></li></ul></div>
							<div class="col-6 col-12-medium">
								<header class="major"><h3>` + data[i].title + `</h3></header>
								<p class="para">` + data[i].content + `</p>
							</div>
						</div>`;
				} else {
					t.innerHTML += `<div class="row gtr-150"><div class="col-6 col-12-medium spe-col">
								<header class="major"><h3>` + data[i].title + `</h3></header><p class="para">` + data[i].content + `</p>
							</div><div class="col-6 col-12-medium"><ul class="major-icons"><li><span class="image fit">
									` + m + `
								</span></li></ul></div></div>
					`;
				}
			}
			document.getElementById("two").appendChild(t);
		}).catch(function(error) {setTimeout(build, dtime)});
	}; build();
})();