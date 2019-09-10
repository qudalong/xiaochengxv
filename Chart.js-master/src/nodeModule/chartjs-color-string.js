var s = require("./color-name");

function n(r) {
    if (r) {
        var t = [ 0, 0, 0 ], n = 1, e = r.match(/^#([a-fA-F0-9]{3})$/);
        if (e) {
            e = e[1];
            for (var a = 0; a < t.length; a++) t[a] = parseInt(e[a] + e[a], 16);
        } else if (e = r.match(/^#([a-fA-F0-9]{6})$/)) {
            e = e[1];
            for (a = 0; a < t.length; a++) t[a] = parseInt(e.slice(2 * a, 2 * a + 2), 16);
        } else if (e = r.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
            for (a = 0; a < t.length; a++) t[a] = parseInt(e[a + 1]);
            n = parseFloat(e[4]);
        } else if (e = r.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)) {
            for (a = 0; a < t.length; a++) t[a] = Math.round(2.55 * parseFloat(e[a + 1]));
            n = parseFloat(e[4]);
        } else if (e = r.match(/(\w+)/)) {
            if ("transparent" == e[1]) return [ 0, 0, 0, 0 ];
            if (!(t = s[e[1]])) return;
        }
        for (a = 0; a < t.length; a++) t[a] = f(t[a], 0, 255);
        return n = n || 0 == n ? f(n, 0, 1) : 1, t[3] = n, t;
    }
}

function e(r) {
    if (r) {
        var t = r.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
        if (t) {
            var n = parseFloat(t[4]);
            return [ f(parseInt(t[1]), 0, 360), f(parseFloat(t[2]), 0, 100), f(parseFloat(t[3]), 0, 100), f(isNaN(n) ? 1 : n, 0, 1) ];
        }
    }
}

function a(r) {
    if (r) {
        var t = r.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);
        if (t) {
            var n = parseFloat(t[4]);
            return [ f(parseInt(t[1]), 0, 360), f(parseFloat(t[2]), 0, 100), f(parseFloat(t[3]), 0, 100), f(isNaN(n) ? 1 : n, 0, 1) ];
        }
    }
}

function i(r, t) {
    return void 0 === t && (t = void 0 !== r[3] ? r[3] : 1), "rgba(" + r[0] + ", " + r[1] + ", " + r[2] + ", " + t + ")";
}

function o(r, t) {
    return "rgba(" + Math.round(r[0] / 255 * 100) + "%, " + Math.round(r[1] / 255 * 100) + "%, " + Math.round(r[2] / 255 * 100) + "%, " + (t || r[3] || 1) + ")";
}

function u(r, t) {
    return void 0 === t && (t = void 0 !== r[3] ? r[3] : 1), "hsla(" + r[0] + ", " + r[1] + "%, " + r[2] + "%, " + t + ")";
}

function f(r, t, n) {
    return Math.min(Math.max(t, r), n);
}

function t(r) {
    var t = r.toString(16).toUpperCase();
    return t.length < 2 ? "0" + t : t;
}

module.exports = {
    getRgba: n,
    getHsla: e,
    getRgb: function(r) {
        var t = n(r);
        return t && t.slice(0, 3);
    },
    getHsl: function(r) {
        var t = e(r);
        return t && t.slice(0, 3);
    },
    getHwb: a,
    getAlpha: function(r) {
        var t = n(r);
        {
            if (t) return t[3];
            if (t = e(r)) return t[3];
            if (t = a(r)) return t[3];
        }
    },
    hexString: function(r) {
        return "#" + t(r[0]) + t(r[1]) + t(r[2]);
    },
    rgbString: function(r, t) {
        if (t < 1 || r[3] && r[3] < 1) return i(r, t);
        return "rgb(" + r[0] + ", " + r[1] + ", " + r[2] + ")";
    },
    rgbaString: i,
    percentString: function(r, t) {
        if (t < 1 || r[3] && r[3] < 1) return o(r, t);
        var n = Math.round(r[0] / 255 * 100), e = Math.round(r[1] / 255 * 100), a = Math.round(r[2] / 255 * 100);
        return "rgb(" + n + "%, " + e + "%, " + a + "%)";
    },
    percentaString: o,
    hslString: function(r, t) {
        if (t < 1 || r[3] && r[3] < 1) return u(r, t);
        return "hsl(" + r[0] + ", " + r[1] + "%, " + r[2] + "%)";
    },
    hslaString: u,
    hwbString: function(r, t) {
        void 0 === t && (t = void 0 !== r[3] ? r[3] : 1);
        return "hwb(" + r[0] + ", " + r[1] + "%, " + r[2] + "%" + (void 0 !== t && 1 !== t ? ", " + t : "") + ")";
    },
    keyword: function(r) {
        return d[r.slice(0, 3)];
    }
};

var d = {};

for (var r in s) d[s[r]] = r;