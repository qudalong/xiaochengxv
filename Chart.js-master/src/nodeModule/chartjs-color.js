var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = require("./color-convert"), n = require("./chartjs-color-string"), i = function t(e) {
    if (e instanceof t) return e;
    if (!(this instanceof t)) return new t(e);
    var s;
    if (this.values = {
        rgb: [ 0, 0, 0 ],
        hsl: [ 0, 0, 0 ],
        hsv: [ 0, 0, 0 ],
        hwb: [ 0, 0, 0 ],
        cmyk: [ 0, 0, 0, 0 ],
        alpha: 1
    }, "string" == typeof e) if (s = n.getRgba(e)) this.setValues("rgb", s); else if (s = n.getHsla(e)) this.setValues("hsl", s); else {
        if (!(s = n.getHwb(e))) throw new Error('Unable to parse color from string "' + e + '"');
        this.setValues("hwb", s);
    } else if ("object" === (void 0 === e ? "undefined" : r(e))) if (void 0 !== (s = e).r || void 0 !== s.red) this.setValues("rgb", s); else if (void 0 !== s.l || void 0 !== s.lightness) this.setValues("hsl", s); else if (void 0 !== s.v || void 0 !== s.value) this.setValues("hsv", s); else if (void 0 !== s.w || void 0 !== s.whiteness) this.setValues("hwb", s); else {
        if (void 0 === s.c && void 0 === s.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(e));
        this.setValues("cmyk", s);
    }
};

(i.prototype = {
    rgb: function() {
        return this.setSpace("rgb", arguments);
    },
    hsl: function() {
        return this.setSpace("hsl", arguments);
    },
    hsv: function() {
        return this.setSpace("hsv", arguments);
    },
    hwb: function() {
        return this.setSpace("hwb", arguments);
    },
    cmyk: function() {
        return this.setSpace("cmyk", arguments);
    },
    rgbArray: function() {
        return this.values.rgb;
    },
    hslArray: function() {
        return this.values.hsl;
    },
    hsvArray: function() {
        return this.values.hsv;
    },
    hwbArray: function() {
        var t = this.values;
        return 1 !== t.alpha ? t.hwb.concat([ t.alpha ]) : t.hwb;
    },
    cmykArray: function() {
        return this.values.cmyk;
    },
    rgbaArray: function() {
        var t = this.values;
        return t.rgb.concat([ t.alpha ]);
    },
    hslaArray: function() {
        var t = this.values;
        return t.hsl.concat([ t.alpha ]);
    },
    alpha: function(t) {
        return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this);
    },
    red: function(t) {
        return this.setChannel("rgb", 0, t);
    },
    green: function(t) {
        return this.setChannel("rgb", 1, t);
    },
    blue: function(t) {
        return this.setChannel("rgb", 2, t);
    },
    hue: function(t) {
        return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t);
    },
    saturation: function(t) {
        return this.setChannel("hsl", 1, t);
    },
    lightness: function(t) {
        return this.setChannel("hsl", 2, t);
    },
    saturationv: function(t) {
        return this.setChannel("hsv", 1, t);
    },
    whiteness: function(t) {
        return this.setChannel("hwb", 1, t);
    },
    blackness: function(t) {
        return this.setChannel("hwb", 2, t);
    },
    value: function(t) {
        return this.setChannel("hsv", 2, t);
    },
    cyan: function(t) {
        return this.setChannel("cmyk", 0, t);
    },
    magenta: function(t) {
        return this.setChannel("cmyk", 1, t);
    },
    yellow: function(t) {
        return this.setChannel("cmyk", 2, t);
    },
    black: function(t) {
        return this.setChannel("cmyk", 3, t);
    },
    hexString: function() {
        return n.hexString(this.values.rgb);
    },
    rgbString: function() {
        return n.rgbString(this.values.rgb, this.values.alpha);
    },
    rgbaString: function() {
        return n.rgbaString(this.values.rgb, this.values.alpha);
    },
    percentString: function() {
        return n.percentString(this.values.rgb, this.values.alpha);
    },
    hslString: function() {
        return n.hslString(this.values.hsl, this.values.alpha);
    },
    hslaString: function() {
        return n.hslaString(this.values.hsl, this.values.alpha);
    },
    hwbString: function() {
        return n.hwbString(this.values.hwb, this.values.alpha);
    },
    keyword: function() {
        return n.keyword(this.values.rgb, this.values.alpha);
    },
    rgbNumber: function() {
        var t = this.values.rgb;
        return t[0] << 16 | t[1] << 8 | t[2];
    },
    luminosity: function() {
        for (var t = this.values.rgb, e = [], s = 0; s < t.length; s++) {
            var r = t[s] / 255;
            e[s] = r <= .03928 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
        }
        return .2126 * e[0] + .7152 * e[1] + .0722 * e[2];
    },
    contrast: function(t) {
        var e = this.luminosity(), s = t.luminosity();
        return s < e ? (e + .05) / (s + .05) : (s + .05) / (e + .05);
    },
    level: function(t) {
        var e = this.contrast(t);
        return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : "";
    },
    dark: function() {
        var t = this.values.rgb;
        return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
    },
    light: function() {
        return !this.dark();
    },
    negate: function() {
        for (var t = [], e = 0; e < 3; e++) t[e] = 255 - this.values.rgb[e];
        return this.setValues("rgb", t), this;
    },
    lighten: function(t) {
        var e = this.values.hsl;
        return e[2] += e[2] * t, this.setValues("hsl", e), this;
    },
    darken: function(t) {
        var e = this.values.hsl;
        return e[2] -= e[2] * t, this.setValues("hsl", e), this;
    },
    saturate: function(t) {
        var e = this.values.hsl;
        return e[1] += e[1] * t, this.setValues("hsl", e), this;
    },
    desaturate: function(t) {
        var e = this.values.hsl;
        return e[1] -= e[1] * t, this.setValues("hsl", e), this;
    },
    whiten: function(t) {
        var e = this.values.hwb;
        return e[1] += e[1] * t, this.setValues("hwb", e), this;
    },
    blacken: function(t) {
        var e = this.values.hwb;
        return e[2] += e[2] * t, this.setValues("hwb", e), this;
    },
    greyscale: function() {
        var t = this.values.rgb, e = .3 * t[0] + .59 * t[1] + .11 * t[2];
        return this.setValues("rgb", [ e, e, e ]), this;
    },
    clearer: function(t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e - e * t), this;
    },
    opaquer: function(t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e + e * t), this;
    },
    rotate: function(t) {
        var e = this.values.hsl, s = (e[0] + t) % 360;
        return e[0] = s < 0 ? 360 + s : s, this.setValues("hsl", e), this;
    },
    mix: function(t, e) {
        var s = this, r = t, n = void 0 === e ? .5 : e, a = 2 * n - 1, i = s.alpha() - r.alpha(), h = ((a * i == -1 ? a : (a + i) / (1 + a * i)) + 1) / 2, u = 1 - h;
        return this.rgb(h * s.red() + u * r.red(), h * s.green() + u * r.green(), h * s.blue() + u * r.blue()).alpha(s.alpha() * n + r.alpha() * (1 - n));
    },
    toJSON: function() {
        return this.rgb();
    },
    clone: function() {
        var t, e, s = new i(), r = this.values, n = s.values;
        for (var a in r) r.hasOwnProperty(a) && (t = r[a], "[object Array]" === (e = {}.toString.call(t)) ? n[a] = t.slice(0) : "[object Number]" === e ? n[a] = t : console.error("unexpected color value:", t));
        return s;
    }
}).spaces = {
    rgb: [ "red", "green", "blue" ],
    hsl: [ "hue", "saturation", "lightness" ],
    hsv: [ "hue", "saturation", "value" ],
    hwb: [ "hue", "whiteness", "blackness" ],
    cmyk: [ "cyan", "magenta", "yellow", "black" ]
}, i.prototype.maxes = {
    rgb: [ 255, 255, 255 ],
    hsl: [ 360, 100, 100 ],
    hsv: [ 360, 100, 100 ],
    hwb: [ 360, 100, 100 ],
    cmyk: [ 100, 100, 100, 100 ]
}, i.prototype.getValues = function(t) {
    for (var e = this.values, s = {}, r = 0; r < t.length; r++) s[t.charAt(r)] = e[t][r];
    return 1 !== e.alpha && (s.a = e.alpha), s;
}, i.prototype.setValues = function(t, e) {
    var s, r, n = this.values, a = this.spaces, i = this.maxes, h = 1;
    if ("alpha" === t) h = e; else if (e.length) n[t] = e.slice(0, t.length), h = e[t.length]; else if (void 0 !== e[t.charAt(0)]) {
        for (s = 0; s < t.length; s++) n[t][s] = e[t.charAt(s)];
        h = e.a;
    } else if (void 0 !== e[a[t][0]]) {
        var u = a[t];
        for (s = 0; s < t.length; s++) n[t][s] = e[u[s]];
        h = e.alpha;
    }
    if (n.alpha = Math.max(0, Math.min(1, void 0 === h ? n.alpha : h)), "alpha" === t) return !1;
    for (s = 0; s < t.length; s++) r = Math.max(0, Math.min(i[t][s], n[t][s])), n[t][s] = Math.round(r);
    for (var l in a) l !== t && (n[l] = o[t][l](n[t]));
    return !0;
}, i.prototype.setSpace = function(t, e) {
    var s = e[0];
    return void 0 === s ? this.getValues(t) : ("number" == typeof s && (s = Array.prototype.slice.call(e)), 
    this.setValues(t, s), this);
}, i.prototype.setChannel = function(t, e, s) {
    var r = this.values[t];
    return void 0 === s ? r[e] : (s === r[e] || (r[e] = s, this.setValues(t, r)), this);
}, "undefined" != typeof window && (window.Color = i), module.exports = i;