var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

function i(r, n, e, o) {
    var t;
    if (y.isArray(n)) y.each(n, function(n, t) {
        e || s.test(r) ? o(r, t) : i(r + "[" + ("object" === (void 0 === t ? "undefined" : l(t)) ? n : "") + "]", t, e, o);
    }); else if (e || "object" !== y.type(n)) o(r, n); else for (t in n) i(r + "[" + t + "]", n[t], e, o);
}

function u(n) {
    var t = n.length, r = y.type(n);
    return !y.isWindow(n) && (!(1 !== n.nodeType || !t) || "array" === r || "function" !== r && (0 === t || "number" == typeof t && 0 < t && t - 1 in n));
}

var l = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : t(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : t(n);
}, r = {}, n = [], e = n.push, o = n.indexOf, f = r.toString, c = r.hasOwnProperty, a = "1.10.2".trim, s = /\[\]$/, y = {
    isFunction: function(n) {
        return "function" === y.type(n);
    },
    isArray: Array.isArray || function(n) {
        return "array" === y.type(n);
    },
    isWindow: function(n) {
        return null != n && n == n.window;
    },
    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    type: function(n) {
        return null == n ? String(n) : "object" === (void 0 === n ? "undefined" : l(n)) || "function" == typeof n ? r[f.call(n)] || "object" : void 0 === n ? "undefined" : l(n);
    },
    isPlainObject: function(n) {
        var t;
        if (!n || "object" !== y.type(n) || n.nodeType || y.isWindow(n)) return !1;
        try {
            if (n.constructor && !c.call(n, "constructor") && !c.call(n.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (n) {
            return !1;
        }
        if (y.support.ownLast) for (t in n) return c.call(n, t);
        for (t in n) ;
        return void 0 === t || c.call(n, t);
    },
    isEmptyObject: function(n) {
        var t;
        for (t in n) return !1;
        return !0;
    },
    each: function(n, t, r) {
        var e = 0, o = n.length, i = u(n);
        if (r) {
            if (i) for (;e < o && !1 !== t.apply(n[e], r); e++) ; else for (e in n) if (!1 === t.apply(n[e], r)) break;
        } else if (i) for (;e < o && !1 !== t.call(n[e], e, n[e]); e++) ; else for (e in n) if (!1 === t.call(n[e], e, n[e])) break;
        return n;
    },
    trim: a && !a.call("\ufeff?") ? function(n) {
        return null == n ? "" : a.call(n);
    } : function(n) {
        return null == n ? "" : (n + "").replace(s, "");
    },
    makeArray: function(n, t) {
        var r = t || [];
        return null != n && (u(Object(n)) ? y.merge(r, "string" == typeof n ? [ n ] : n) : e.call(r, n)), 
        r;
    },
    inArray: function(n, t, r) {
        var e;
        if (t) {
            if (o) return o.call(t, n, r);
            for (e = t.length, r = r ? r < 0 ? Math.max(0, e + r) : r : 0; r < e; r++) if (r in t && t[r] === n) return r;
        }
        return -1;
    },
    merge: function(n, t) {
        var r = t.length, e = n.length, o = 0;
        if ("number" == typeof r) for (;o < r; o++) n[e++] = t[o]; else for (;void 0 !== t[o]; ) n[e++] = t[o++];
        return n.length = e, n;
    },
    isMobile: function(n) {
        return "" !== y.trim(n) && /^1[3|4|5|7|8][0-9]\d{8}$/.test(y.trim(n));
    },
    toFixed: function(n, t) {
        var r = parseInt(t) || 0;
        if (r < -20 || 100 < r) throw new RangeError("Precision of " + r + " fractional digits is out of range");
        var e = Number(n);
        if (isNaN(e)) return "NaN";
        var o, i = "";
        if (e <= 0 && (i = "-", e = -e), e >= Math.pow(10, 21)) return i + e.toString();
        if (o = 0 == (t = Math.round(e * Math.pow(10, r))) ? "0" : t.toString(), 0 == r) return i + o;
        var u = o.length;
        return u <= r && (o = Math.pow(10, r + 1 - u).toString().substring(1) + o, u = r + 1), 
        0 < r && (o = o.substring(0, u - r) + "." + o.substring(u - r)), i + o;
    },
    extend: function() {
        var n, t, r, e, o, i, u = arguments[0] || {}, f = 1, c = arguments.length, a = !1;
        for ("boolean" == typeof u && (a = u, u = arguments[1] || {}, f = 2), "object" === (void 0 === u ? "undefined" : l(u)) || y.isFunction(u) || (u = {}), 
        c === f && (u = this, --f); f < c; f++) if (null != (n = arguments[f])) for (t in n) r = u[t], 
        u !== (e = n[t]) && (a && e && (y.isPlainObject(e) || (o = y.isArray(e))) ? (i = o ? (o = !1, 
        r && y.isArray(r) ? r : []) : r && y.isPlainObject(r) ? r : {}, u[t] = y.extend(a, i, e)) : void 0 !== e && (u[t] = e));
        return u;
    },
    param: function(n, t) {
        var r, e = [], o = function(n, t) {
            t = y.isFunction(t) ? t() : null == t ? "" : t, e[e.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t);
        };
        if (void 0 === t && (t = !1), y.isArray(n) || n.jquery && !y.isPlainObject(n)) y.each(n, function() {
            o(this.name, this.value);
        }); else for (r in n) i(r, n[r], t, o);
        return e.join("&").replace(/%20/g, "+");
    }
};

module.exports = y;