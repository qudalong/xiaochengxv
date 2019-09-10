var P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t) {
    function e() {
        for (var t = 0; t < g.length; t++) g[t][0](g[t][1]);
        d = !(g = []);
    }
    function o(t, n) {
        g.push([ t, n ]), d || (d = !0, j(e, 0));
    }
    function r(n) {
        var t = (e = n.owner).state_, e = e.data_, o = n[t];
        if (n = n.then, "function" == typeof o) {
            t = _;
            try {
                e = o(e);
            } catch (t) {
                u(n, t);
            }
        }
        i(n, e) || (t === _ && f(n, e), t === b && u(n, e));
    }
    function i(n, e) {
        var o;
        try {
            if (n === e) throw new TypeError("A promises callback cannot return that same promise.");
            if (e && ("function" == typeof e || "object" === (void 0 === e ? "undefined" : P(e)))) {
                var t = e.then;
                if ("function" == typeof t) return t.call(e, function(t) {
                    o || (o = !0, e !== t ? f(n, t) : c(n, t));
                }, function(t) {
                    o || (o = !0, u(n, t));
                }), !0;
            }
        } catch (t) {
            return o || u(n, t), !0;
        }
        return !1;
    }
    function f(t, n) {
        t !== n && i(t, n) || c(t, n);
    }
    function c(t, n) {
        t.state_ === m && (t.state_ = w, t.data_ = n, o(a, t));
    }
    function u(t, n) {
        t.state_ === m && (t.state_ = w, t.data_ = n, o(s, t));
    }
    function n(t) {
        var n = t.then_;
        for (t.then_ = void 0, t = 0; t < n.length; t++) r(n[t]);
    }
    function a(t) {
        t.state_ = _, n(t);
    }
    function s(t) {
        t.state_ = b, n(t);
    }
    function l(t) {
        if ("function" != typeof t) throw new TypeError("Promise constructor takes a function argument");
        if (!1 == this instanceof l) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        this.then_ = [], function(t, n) {
            function e(t) {
                u(n, t);
            }
            try {
                t(function(t) {
                    f(n, t);
                }, e);
            } catch (t) {
                e(t);
            }
        }(t, this);
    }
    var h, p = t.Promise, y = p && "resolve" in p && "reject" in p && "all" in p && "race" in p && (new p(function(t) {
        h = t;
    }), "function" == typeof h);
    "undefined" != typeof exports && exports ? (exports.Promise = y ? p : l, exports.Polyfill = l) : "function" == typeof define && define.amd ? define(function() {
        return y ? p : l;
    }) : y || (t.Promise = l);
    var d, m = "pending", w = "sealed", _ = "fulfilled", b = "rejected", v = function() {}, j = "undefined" != typeof setImmediate ? setImmediate : setTimeout, g = [];
    l.prototype = {
        constructor: l,
        state_: m,
        then_: null,
        data_: void 0,
        then: function(t, n) {
            var e = {
                owner: this,
                then: new this.constructor(v),
                fulfilled: t,
                rejected: n
            };
            return this.state_ === _ || this.state_ === b ? o(r, e) : this.then_.push(e), e.then;
        },
        catch: function(t) {
            return this.then(null, t);
        }
    }, l.all = function(c) {
        if ("[object Array]" !== Object.prototype.toString.call(c)) throw new TypeError("You must pass an array to Promise.all().");
        return new this(function(e, t) {
            function n(n) {
                return i++, function(t) {
                    r[n] = t, --i || e(r);
                };
            }
            for (var o, r = [], i = 0, f = 0; f < c.length; f++) (o = c[f]) && "function" == typeof o.then ? o.then(n(f), t) : r[f] = o;
            i || e(r);
        });
    }, l.race = function(r) {
        if ("[object Array]" !== Object.prototype.toString.call(r)) throw new TypeError("You must pass an array to Promise.race().");
        return new this(function(t, n) {
            for (var e, o = 0; o < r.length; o++) (e = r[o]) && "function" == typeof e.then ? e.then(t, n) : t(e);
        });
    }, l.resolve = function(n) {
        return n && "object" === (void 0 === n ? "undefined" : P(n)) && n.constructor === this ? n : new this(function(t) {
            t(n);
        });
    }, l.reject = function(e) {
        return new this(function(t, n) {
            n(e);
        });
    };
}("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : void 0);