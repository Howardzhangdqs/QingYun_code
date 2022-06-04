function Calendarize() {
    var b = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    var a = ["日", "一", "二", "三", "四", "五", "六"];
    return {
        getDaysInMonth: function(e, f) {
            var c = new Date(f,e,1);
            var d = [];
            while (c.getMonth() === e) {
                d.push(new Date(c));
                c.setDate(c.getDate() + 1)
            }
            return d
        },
        getMonthsInYear: function(f) {
            var c = new Date(f,0,1);
            var e = [];
            var d = 0;
            while (d < 12) {
                e.push(new Date(c));
                c.setMonth(c.getMonth() + 1);
                d++
            }
            return e
        },
        buildYearCalendar: function(d, g, fun) {
            var c = this;
            var e = c.getMonthsInYear(g);
            var f = {
                showMonth: true,
                showDaysOfWeek: true,
                showYear: true,
                clickHandler: fun
            };
            e.forEach(function(i, j) {
                var h = c.buildMonth(j, g, f);
                if (j == 0) console.log(h)
                d.appendChild(h)
            })
        },
        buildMonth: function(p, w, r) {
            var f = this;
            var l = new Date(w,p,1);
            var m = l.getMonth();
            var u = new Date(l.setMonth(m - 1));
            var q = new Date(l.setMonth(m + 1));
            var g = f.getDaysInMonth(p, w);
            var k = f.getDaysInMonth(u.getMonth(), u.getFullYear());
            var h = f.getDaysInMonth(q.getMonth(), q.getFullYear());
            var d = document.createElement("div");
            var e = document.createElement("h3");
            var v = g[0].getDay();
            var t = g.length + v;
            var s = function() {
                if (t % 7 === 0) {
                    return 0
                } else {
                    if (t < 35) {
                        return 35 - t
                    } else {
                        return 42 - t
                    }
                }
            };
            d.classList.add("month");
            if (r.showMonth) {
                e.innerText = (r.showYear ? w + " " : "") + b[p];
                d.appendChild(e)
            }
            if (r.showDaysOfWeek) {
                a.forEach(function(j, x) {
                    var i = document.createElement("div");
                    i.classList.add("dow");
                    i.innerHTML = a[x];
                    d.appendChild(i)
                })
            }
            for (var n = 0; n < v; n++) {
                var c = document.createElement("div");
                c.classList.add("dummy-day");
                c.innerText = k.length - (v - (n + 1));
                d.appendChild(c)
            }
			let showf = false;
            g.forEach(function(j, x) {
                var i = document.createElement("div");
                i.classList.add("day");
				if (data[j.format("YYMMDD")]) i.classList.add("with-data"), showf = true;
                i.setAttribute("data-date", j.format("YYMMDD"));
                i.innerHTML = (x + 1);
                var y = new Date(j).getDay();
                if (y === 0 || y === 6) {
                    i.classList.add("weekend")
                }
                if (r.clickHandler) {
                    i.addEventListener("click", r.clickHandler)
                }
                d.appendChild(i)
            });
			if (! showf) d.classList.add("no-month");
            for (var o = 0; o < s(); o++) {
                var c = document.createElement("div");
                c.classList.add("dummy-day");
                c.innerText = o + 1;
                d.appendChild(c)
            }
            return d
        }
    }
};

var select_date = function() {
	onselect_date = true;
	$("#select-date").text("请选择开始日期");
}