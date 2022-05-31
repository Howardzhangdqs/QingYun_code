var _ = {

	save_as_svg: function(s){
		s = '\uFEFF' + s;
		var a = window.document.createElement('a');
		a.setAttribute('href', 'data:text/plain; charset=utf-8,' + encodeURIComponent(s)); a.setAttribute('download', 'example.csv');
		document.body.appendChild(a); a.click(); document.body.removeChild(a);
	},

	init_array: function(x, y) {
		let t = [];
		for (let i = 0; i < x; i ++) {
			t.push([]); for (let j = 0; j < y; j ++) t[i].push(0);
		}
		return t;
	},
	
	storage: {
		key: function(key) {
			return window.localStorage.key(key);
		},
		get: function(key) {
			return window.localStorage.getItem(key);
		},
		set: function(key, val) {
			window.localStorage.setItem(key, val);
		},
		del: function(key) {
			window.localStorage.removeItem(key);
		},
		clear: function(key) {
			window.localStorage.clear();
		}
	}
};