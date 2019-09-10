var o = require("./conversions"), s = function() {
    return new i();
};

for (var t in o) {
    s[t + "Raw"] = function(r) {
        return function(t) {
            return "number" == typeof t && (t = Array.prototype.slice.call(arguments)), o[r](t);
        };
    }(t);
    var r = /(\w+)2(\w+)/.exec(t), e = r[1], n = r[2];
    (s[e] = s[e] || {})[n] = s[t] = function(n) {
        return function(t) {
            "number" == typeof t && (t = Array.prototype.slice.call(arguments));
            var r = o[n](t);
            if ("string" == typeof r || void 0 === r) return r;
            for (var e = 0; e < r.length; e++) r[e] = Math.round(r[e]);
            return r;
        };
    }(t);
}

var i = function() {
    this.convs = {};
};

i.prototype.routeSpace = function(t, r) {
    var e = r[0];
    return void 0 === e ? this.getValues(t) : ("number" == typeof e && (e = Array.prototype.slice.call(r)), 
    this.setValues(t, e));
}, i.prototype.setValues = function(t, r) {
    return this.space = t, this.convs = {}, this.convs[t] = r, this;
}, i.prototype.getValues = function(t) {
    var r = this.convs[t];
    if (!r) {
        var e = this.space, n = this.convs[e];
        r = s[e][t](n), this.convs[t] = r;
    }
    return r;
}, [ "rgb", "hsl", "hsv", "cmyk", "keyword" ].forEach(function(r) {
    i.prototype[r] = function(t) {
        return this.routeSpace(r, arguments);
    };
}), module.exports = s;