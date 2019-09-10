module.exports = function(a) {
    var m = a.helpers;
    a.Ticks = {
        generators: {
            linear: function(a, t) {
                var o, r = [];
                if (a.stepSize && 0 < a.stepSize) o = a.stepSize; else {
                    var e = m.niceNum(t.max - t.min, !1);
                    o = m.niceNum(e / (a.maxTicks - 1), !0);
                }
                var i = Math.floor(t.min / o) * o, n = Math.ceil(t.max / o) * o;
                a.min && a.max && a.stepSize && ((a.max - a.min) % a.stepSize == 0 && (i = a.min, 
                n = a.max));
                var h = (n - i) / o;
                h = m.almostEquals(h, Math.round(h), o / 1e3) ? Math.round(h) : Math.ceil(h), r.push(void 0 !== a.min ? a.min : i);
                for (var l = 1; l < h; ++l) r.push(i + l * o);
                return r.push(void 0 !== a.max ? a.max : n), r;
            },
            logarithmic: function(a, t) {
                for (var o = [], r = m.getValueOrDefault, e = r(a.min, Math.pow(10, Math.floor(m.log10(t.min)))); e < t.max; ) {
                    var i, n;
                    o.push(e), 10 === (n = 0 === e ? (i = Math.floor(m.log10(t.minNotZero)), Math.round(t.minNotZero / Math.pow(10, i))) : (i = Math.floor(m.log10(e)), 
                    Math.floor(e / Math.pow(10, i)) + 1)) && (n = 1, ++i), e = n * Math.pow(10, i);
                }
                var h = r(a.max, e);
                return o.push(h), o;
            }
        },
        formatters: {
            values: function(a) {
                return m.isArray(a) ? a : "" + a;
            },
            linear: function(a, t, o) {
                var r = 3 < o.length ? o[2] - o[1] : o[1] - o[0];
                1 < Math.abs(r) && a !== Math.floor(a) && (r = a - Math.floor(a));
                var e = m.log10(Math.abs(r)), i = "";
                if (0 !== a) {
                    var n = -1 * Math.floor(e);
                    n = Math.max(Math.min(n, 20), 0), i = a.toFixed(n);
                } else i = "0";
                return i;
            },
            logarithmic: function(a, t, o) {
                var r = a / Math.pow(10, Math.floor(m.log10(a)));
                return 0 === a ? "0" : 1 === r || 2 === r || 5 === r || 0 === t || t === o.length - 1 ? a.toExponential() : "";
            }
        }
    };
};