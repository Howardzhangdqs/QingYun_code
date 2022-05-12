(function() {
	var dtime = 0;
	var build = function() {
		dtime += 300;
		axios.get('config.json').then(function(response) {
			console.log(response);
			data = response.data;
			new Vue({el: "#three", data: { msg: data }});
			new Vue({el: "#four",  data: { msg: data }});
		}).catch(function(error) {setTimeout(build, dtime)});
	}; build();
})();