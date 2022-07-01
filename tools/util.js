Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var s in/(y+)/i.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+s+")","i").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t};

var _ = {
	save_as_svg: function(s){
		s = '\uFEFF' + s;
		var a = window.document.createElement('a');
		a.setAttribute('href', 'data:text/plain; charset=utf-8,' + encodeURIComponent(s)); a.setAttribute('download', 'example.csv');
		document.body.appendChild(a); a.click(); document.body.removeChild(a);
	},

	init_array: function(t,e){let r=[];for(let o=0;o<t;o++){r.push([]);for(let t=0;t<e;t++)r[o].push(0)}return r},
	
	storage: {
		key:function(t){return window.localStorage.key(t)}, get:function(t){return window.localStorage.getItem(t)},
		set:function(t,e){window.localStorage.setItem(t,e)}, del:function(t){window.localStorage.removeItem(t)},
		clear:function(t){window.localStorage.clear()},
	},
	
	Base64: {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _dkeyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		setseed: function(seed) {
			if (! seed) this._keyStr = this._dkeyStr;
			else {
				let sed = parseInt(("" + seed).replace(".", ""));
				this._keyStr = this._dkeyStr.split("").sort(function(a,b) {return (Math.sin(sed + a.charCodeAt() * seed + b.charCodeAt()))}).join("");
			}
		},
		encode:function(t){var e,r,o,n,a,i,h,c="",d=0;for(t=this._utf8_encode(t);d<t.length;)n=(e=t.charCodeAt(d++))>>2,a=(3&e)<<4|(r=t.charCodeAt(d++))>>4,i=(15&r)<<2|(o=t.charCodeAt(d++))>>6,h=63&o,isNaN(r)?i=h=64:isNaN(o)&&(h=64),c=c+this._keyStr.charAt(n)+this._keyStr.charAt(a)+this._keyStr.charAt(i)+this._keyStr.charAt(h);return c},
		decode:function(t){var e,r,o,n,a,i,h="",c=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");c<t.length;)e=this._keyStr.indexOf(t.charAt(c++))<<2|(n=this._keyStr.indexOf(t.charAt(c++)))>>4,r=(15&n)<<4|(a=this._keyStr.indexOf(t.charAt(c++)))>>2,o=(3&a)<<6|(i=this._keyStr.indexOf(t.charAt(c++))),h+=String.fromCharCode(e),64!=a&&(h+=String.fromCharCode(r)),64!=i&&(h+=String.fromCharCode(o));return h=this._utf8_decode(h)},
		_utf8_encode:function(t){t=t.replace(/\r\n/g,"\n");for(var e="",r=0;r<t.length;r++){var o=t.charCodeAt(r);o<128?e+=String.fromCharCode(o):o>127&&o<2048?(e+=String.fromCharCode(o>>6|192),e+=String.fromCharCode(63&o|128)):(e+=String.fromCharCode(o>>12|224),e+=String.fromCharCode(o>>6&63|128),e+=String.fromCharCode(63&o|128))}return e},
		_utf8_decode:function(t){for(var e="",r=0,o=c1=c2=0;r<t.length;)(o=t.charCodeAt(r))<128?(e+=String.fromCharCode(o),r++):o>191&&o<224?(c2=t.charCodeAt(r+1),e+=String.fromCharCode((31&o)<<6|63&c2),r+=2):(c2=t.charCodeAt(r+1),c3=t.charCodeAt(r+2),e+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),r+=3);return e}
    }
};