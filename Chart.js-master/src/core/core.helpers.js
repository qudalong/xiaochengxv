var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("../nodeModule/chartjs-color");

module.exports = function(i) {
    var e, g = i.helpers = {};
    g.each = function(e, t, n, r) {
        var o, a;
        if (g.isArray(e)) if (a = e.length, r) for (o = a - 1; 0 <= o; o--) t.call(n, e[o], o); else for (o = 0; o < a; o++) t.call(n, e[o], o); else if ("object" === (void 0 === e ? "undefined" : u(e))) {
            var i = Object.keys(e);
            for (a = i.length, o = 0; o < a; o++) t.call(n, e[i[o]], i[o]);
        }
    }, g.clone = function(e) {
        var n = {};
        return g.each(e, function(e, t) {
            g.isArray(e) ? n[t] = e.slice(0) : "object" === (void 0 === e ? "undefined" : u(e)) && null !== e ? n[t] = g.clone(e) : n[t] = e;
        }), n;
    }, g.extend = function(n) {
        for (var e = function(e, t) {
            n[t] = e;
        }, t = 1, r = arguments.length; t < r; t++) g.each(arguments[t], e);
        return n;
    }, g.configMerge = function(e) {
        var o = g.clone(e);
        return g.each(Array.prototype.slice.call(arguments, 1), function(e) {
            g.each(e, function(e, t) {
                var n = o.hasOwnProperty(t), r = n ? o[t] : {};
                "scales" === t ? o[t] = g.scaleMerge(r, e) : "scale" === t ? o[t] = g.configMerge(r, i.scaleService.getScaleDefaults(e.type), e) : !n || "object" !== (void 0 === r ? "undefined" : u(r)) || g.isArray(r) || null === r || "object" !== (void 0 === e ? "undefined" : u(e)) || g.isArray(e) ? o[t] = e : o[t] = g.configMerge(r, e);
            });
        }), o;
    }, g.scaleMerge = function(e, t) {
        var a = g.clone(e);
        return g.each(t, function(e, o) {
            "xAxes" === o || "yAxes" === o ? a.hasOwnProperty(o) ? g.each(e, function(e, t) {
                var n = g.getValueOrDefault(e.type, "xAxes" === o ? "category" : "linear"), r = i.scaleService.getScaleDefaults(n);
                t >= a[o].length || !a[o][t].type ? a[o].push(g.configMerge(r, e)) : e.type && e.type !== a[o][t].type ? a[o][t] = g.configMerge(a[o][t], r, e) : a[o][t] = g.configMerge(a[o][t], e);
            }) : (a[o] = [], g.each(e, function(e) {
                var t = g.getValueOrDefault(e.type, "xAxes" === o ? "category" : "linear");
                a[o].push(g.configMerge(i.scaleService.getScaleDefaults(t), e));
            })) : a.hasOwnProperty(o) && "object" === u(a[o]) && null !== a[o] && "object" === (void 0 === e ? "undefined" : u(e)) ? a[o] = g.configMerge(a[o], e) : a[o] = e;
        }), a;
    }, g.getValueAtIndexOrDefault = function(e, t, n) {
        return null == e ? n : g.isArray(e) ? t < e.length ? e[t] : n : e;
    }, g.getValueOrDefault = function(e, t) {
        return void 0 === e ? t : e;
    }, g.indexOf = Array.prototype.indexOf ? function(e, t) {
        return e.indexOf(t);
    } : function(e, t) {
        for (var n = 0, r = e.length; n < r; ++n) if (e[n] === t) return n;
        return -1;
    }, g.where = function(e, t) {
        if (g.isArray(e) && Array.prototype.filter) return e.filter(t);
        var n = [];
        return g.each(e, function(e) {
            t(e) && n.push(e);
        }), n;
    }, g.findIndex = Array.prototype.findIndex ? function(e, t, n) {
        return e.findIndex(t, n);
    } : function(e, t, n) {
        n = void 0 === n ? e : n;
        for (var r = 0, o = e.length; r < o; ++r) if (t.call(n, e[r], r, e)) return r;
        return -1;
    }, g.findNextWhere = function(e, t, n) {
        null == n && (n = -1);
        for (var r = n + 1; r < e.length; r++) {
            var o = e[r];
            if (t(o)) return o;
        }
    }, g.findPreviousWhere = function(e, t, n) {
        null == n && (n = e.length);
        for (var r = n - 1; 0 <= r; r--) {
            var o = e[r];
            if (t(o)) return o;
        }
    }, g.inherits = function(e) {
        var t = this, n = e && e.hasOwnProperty("constructor") ? e.constructor : function() {
            return t.apply(this, arguments);
        }, r = function() {
            this.constructor = n;
        };
        return r.prototype = t.prototype, n.prototype = new r(), n.extend = g.inherits, 
        e && g.extend(n.prototype, e), n.__super__ = t.prototype, n;
    }, g.noop = function() {}, g.uid = (e = 0, function() {
        return e++;
    }), g.isNumber = function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
    }, g.almostEquals = function(e, t, n) {
        return Math.abs(e - t) < n;
    }, g.max = function(e) {
        return e.reduce(function(e, t) {
            return isNaN(t) ? e : Math.max(e, t);
        }, Number.NEGATIVE_INFINITY);
    }, g.min = function(e) {
        return e.reduce(function(e, t) {
            return isNaN(t) ? e : Math.min(e, t);
        }, Number.POSITIVE_INFINITY);
    }, g.sign = Math.sign ? function(e) {
        return Math.sign(e);
    } : function(e) {
        return 0 === (e = +e) || isNaN(e) ? e : 0 < e ? 1 : -1;
    }, g.log10 = Math.log10 ? function(e) {
        return Math.log10(e);
    } : function(e) {
        return Math.log(e) / Math.LN10;
    }, g.toRadians = function(e) {
        return e * (Math.PI / 180);
    }, g.toDegrees = function(e) {
        return e * (180 / Math.PI);
    }, g.getAngleFromPoint = function(e, t) {
        var n = t.x - e.x, r = t.y - e.y, o = Math.sqrt(n * n + r * r), a = Math.atan2(r, n);
        return a < -.5 * Math.PI && (a += 2 * Math.PI), {
            angle: a,
            distance: o
        };
    }, g.distanceBetweenPoints = function(e, t) {
        return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
    }, g.aliasPixel = function(e) {
        return e % 2 == 0 ? 0 : .5;
    }, g.splineCurve = function(e, t, n, r) {
        var o = e.skip ? t : e, a = t, i = n.skip ? t : n, u = Math.sqrt(Math.pow(a.x - o.x, 2) + Math.pow(a.y - o.y, 2)), c = Math.sqrt(Math.pow(i.x - a.x, 2) + Math.pow(i.y - a.y, 2)), l = u / (u + c), s = c / (u + c), f = r * (l = isNaN(l) ? 0 : l), h = r * (s = isNaN(s) ? 0 : s);
        return {
            previous: {
                x: a.x - f * (i.x - o.x),
                y: a.y - f * (i.y - o.y)
            },
            next: {
                x: a.x + h * (i.x - o.x),
                y: a.y + h * (i.y - o.y)
            }
        };
    }, g.EPSILON = Number.EPSILON || 1e-14, g.splineCurveMonotone = function(e) {
        var t, n, r, o, a, i, u, c, l, s = (e || []).map(function(e) {
            return {
                model: e._model,
                deltaK: 0,
                mK: 0
            };
        }), f = s.length;
        for (t = 0; t < f; ++t) (r = s[t]).model.skip || (n = 0 < t ? s[t - 1] : null, (o = t < f - 1 ? s[t + 1] : null) && !o.model.skip && (r.deltaK = (o.model.y - r.model.y) / (o.model.x - r.model.x)), 
        !n || n.model.skip ? r.mK = r.deltaK : !o || o.model.skip ? r.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(r.deltaK) ? r.mK = 0 : r.mK = (n.deltaK + r.deltaK) / 2);
        for (t = 0; t < f - 1; ++t) r = s[t], o = s[t + 1], r.model.skip || o.model.skip || (g.almostEquals(r.deltaK, 0, this.EPSILON) ? r.mK = o.mK = 0 : (a = r.mK / r.deltaK, 
        i = o.mK / r.deltaK, (c = Math.pow(a, 2) + Math.pow(i, 2)) <= 9 || (u = 3 / Math.sqrt(c), 
        r.mK = a * u * r.deltaK, o.mK = i * u * r.deltaK)));
        for (t = 0; t < f; ++t) (r = s[t]).model.skip || (n = 0 < t ? s[t - 1] : null, o = t < f - 1 ? s[t + 1] : null, 
        n && !n.model.skip && (l = (r.model.x - n.model.x) / 3, r.model.controlPointPreviousX = r.model.x - l, 
        r.model.controlPointPreviousY = r.model.y - l * r.mK), o && !o.model.skip && (l = (o.model.x - r.model.x) / 3, 
        r.model.controlPointNextX = r.model.x + l, r.model.controlPointNextY = r.model.y + l * r.mK));
    }, g.nextItem = function(e, t, n) {
        return n ? t >= e.length - 1 ? e[0] : e[t + 1] : t >= e.length - 1 ? e[e.length - 1] : e[t + 1];
    }, g.previousItem = function(e, t, n) {
        return n ? t <= 0 ? e[e.length - 1] : e[t - 1] : t <= 0 ? e[0] : e[t - 1];
    }, g.niceNum = function(e, t) {
        var n = Math.floor(g.log10(e)), r = e / Math.pow(10, n);
        return (t ? r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10 : r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * Math.pow(10, n);
    };
    var t = g.easingEffects = {
        linear: function(e) {
            return e;
        },
        easeInQuad: function(e) {
            return e * e;
        },
        easeOutQuad: function(e) {
            return -1 * e * (e - 2);
        },
        easeInOutQuad: function(e) {
            return (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1);
        },
        easeInCubic: function(e) {
            return e * e * e;
        },
        easeOutCubic: function(e) {
            return 1 * ((e = e / 1 - 1) * e * e + 1);
        },
        easeInOutCubic: function(e) {
            return (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2);
        },
        easeInQuart: function(e) {
            return e * e * e * e;
        },
        easeOutQuart: function(e) {
            return -1 * ((e = e / 1 - 1) * e * e * e - 1);
        },
        easeInOutQuart: function(e) {
            return (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2);
        },
        easeInQuint: function(e) {
            return 1 * (e /= 1) * e * e * e * e;
        },
        easeOutQuint: function(e) {
            return 1 * ((e = e / 1 - 1) * e * e * e * e + 1);
        },
        easeInOutQuint: function(e) {
            return (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2);
        },
        easeInSine: function(e) {
            return -1 * Math.cos(e / 1 * (Math.PI / 2)) + 1;
        },
        easeOutSine: function(e) {
            return 1 * Math.sin(e / 1 * (Math.PI / 2));
        },
        easeInOutSine: function(e) {
            return -.5 * (Math.cos(Math.PI * e / 1) - 1);
        },
        easeInExpo: function(e) {
            return 0 === e ? 1 : 1 * Math.pow(2, 10 * (e / 1 - 1));
        },
        easeOutExpo: function(e) {
            return 1 === e ? 1 : 1 * (1 - Math.pow(2, -10 * e / 1));
        },
        easeInOutExpo: function(e) {
            return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e));
        },
        easeInCirc: function(e) {
            return 1 <= e ? e : -1 * (Math.sqrt(1 - (e /= 1) * e) - 1);
        },
        easeOutCirc: function(e) {
            return 1 * Math.sqrt(1 - (e = e / 1 - 1) * e);
        },
        easeInOutCirc: function(e) {
            return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
        },
        easeInElastic: function(e) {
            var t = 1.70158, n = 0, r = 1;
            return 0 === e ? 0 : 1 == (e /= 1) ? 1 : (n || (n = .3), t = r < Math.abs(1) ? (r = 1, 
            n / 4) : n / (2 * Math.PI) * Math.asin(1 / r), -r * Math.pow(2, 10 * (e -= 1)) * Math.sin((1 * e - t) * (2 * Math.PI) / n));
        },
        easeOutElastic: function(e) {
            var t = 1.70158, n = 0, r = 1;
            return 0 === e ? 0 : 1 == (e /= 1) ? 1 : (n || (n = .3), t = r < Math.abs(1) ? (r = 1, 
            n / 4) : n / (2 * Math.PI) * Math.asin(1 / r), r * Math.pow(2, -10 * e) * Math.sin((1 * e - t) * (2 * Math.PI) / n) + 1);
        },
        easeInOutElastic: function(e) {
            var t = 1.70158, n = 0, r = 1;
            return 0 === e ? 0 : 2 == (e /= .5) ? 1 : (n || (n = .3 * 1.5 * 1), t = r < Math.abs(1) ? (r = 1, 
            n / 4) : n / (2 * Math.PI) * Math.asin(1 / r), e < 1 ? r * Math.pow(2, 10 * (e -= 1)) * Math.sin((1 * e - t) * (2 * Math.PI) / n) * -.5 : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((1 * e - t) * (2 * Math.PI) / n) * .5 + 1);
        },
        easeInBack: function(e) {
            return 1 * (e /= 1) * e * (2.70158 * e - 1.70158);
        },
        easeOutBack: function(e) {
            return 1 * ((e = e / 1 - 1) * e * (2.70158 * e + 1.70158) + 1);
        },
        easeInOutBack: function(e) {
            var t = 1.70158;
            return (e /= .5) < 1 ? e * e * ((1 + (t *= 1.525)) * e - t) * .5 : .5 * ((e -= 2) * e * ((1 + (t *= 1.525)) * e + t) + 2);
        },
        easeInBounce: function(e) {
            return 1 - t.easeOutBounce(1 - e);
        },
        easeOutBounce: function(e) {
            return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e * 1 : e < 2 / 2.75 ? 1 * (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 1 * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 * (7.5625 * (e -= 2.625 / 2.75) * e + .984375);
        },
        easeInOutBounce: function(e) {
            return e < .5 ? .5 * t.easeInBounce(2 * e) : .5 * t.easeOutBounce(2 * e - 1) + .5;
        }
    };
    function s(e, t, n) {
        var r;
        return "string" == typeof e ? (r = parseInt(e, 10), -1 !== e.indexOf("%") && (r = r / 100 * t.parentNode[n])) : r = e, 
        r;
    }
    function f(e) {
        return null != e && "none" !== e;
    }
    function n(e, t, n) {
        var r = document.defaultView, o = e.parentNode, a = r.getComputedStyle(e)[t], i = r.getComputedStyle(o)[t], u = f(a), c = f(i), l = Number.POSITIVE_INFINITY;
        return u || c ? Math.min(u ? s(a, e, n) : l, c ? s(i, o, n) : l) : "none";
    }
    g.requestAnimFrame = function(e) {
        return setTimeout(e, 1e3 / 60);
    }, g.cancelAnimFrame = function(e) {
        return clearTimeout(e, 1e3 / 60);
    }, g.getRelativePosition = function(e, t) {
        var n, r, o = e.originalEvent || e, a = e.currentTarget || e.srcElement, i = a.getBoundingClientRect(), u = o.touches;
        r = u && 0 < u.length ? (n = u[0].clientX, u[0].clientY) : (n = o.clientX, o.clientY);
        var c = parseFloat(g.getStyle(a, "padding-left")), l = parseFloat(g.getStyle(a, "padding-top")), s = parseFloat(g.getStyle(a, "padding-right")), f = parseFloat(g.getStyle(a, "padding-bottom")), h = i.right - i.left - c - s, d = i.bottom - i.top - l - f;
        return {
            x: n = Math.round((n - i.left - c) / h * a.width / t.currentDevicePixelRatio),
            y: r = Math.round((r - i.top - l) / d * a.height / t.currentDevicePixelRatio)
        };
    }, g.addEvent = function(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
    }, g.removeEvent = function(e, t, n) {
        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = g.noop;
    }, g.bindEvents = function(t, e, n) {
        var r = t.events = t.events || {};
        g.each(e, function(e) {
            r[e] = function() {
                n.apply(t, arguments);
            }, g.addEvent(t.chart.canvas, e, r[e]);
        });
    }, g.unbindEvents = function(e, t) {
        var n = e.chart.canvas;
        g.each(t, function(e, t) {
            g.removeEvent(n, t, e);
        });
    }, g.getConstraintWidth = function(e) {
        return n(e, "max-width", "clientWidth");
    }, g.getConstraintHeight = function(e) {
        return n(e, "max-height", "clientHeight");
    }, g.getMaximumWidth = function(e) {
        return e.style.width;
    }, g.getMaximumHeight = function(e) {
        return e.style.height;
    }, g.getStyle = function(e, t) {
        return e.currentStyle ? e.currentStyle[t] : document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
    }, g.retinaScale = function(e) {
        var t = e.ctx, n = e.canvas, r = n.width, o = n.height, a = e.currentDevicePixelRatio = t.devicePixelRatio || 1;
        1 !== a && (n.height = o * a, n.width = r * a, t.scale(a, a), e.originalDevicePixelRatio = e.originalDevicePixelRatio || a);
    }, g.clear = function(e) {
        e.ctx.clearRect(0, 0, e.width, e.height);
    }, g.fontString = function(e, t, n) {
        return t + " " + e + "px " + n;
    }, g.longestText = function(t, e, n, r) {
        var o = (r = r || {}).data = r.data || {}, a = r.garbageCollect = r.garbageCollect || [];
        r.font !== e && (o = r.data = {}, a = r.garbageCollect = [], r.font = e), t.font = e;
        var i = 0;
        g.each(n, function(e) {
            null != e && !0 !== g.isArray(e) ? i = g.measureText(t, o, a, i, e) : g.isArray(e) && g.each(e, function(e) {
                null == e || g.isArray(e) || (i = g.measureText(t, o, a, i, e));
            });
        });
        var u = a.length / 2;
        if (u > n.length) {
            for (var c = 0; c < u; c++) delete o[a[c]];
            a.splice(0, u);
        }
        return i;
    }, g.measureText = function(e, t, n, r, o) {
        var a = t[o];
        return a || (a = t[o] = e.measureText(o).width, n.push(o)), r < a && (r = a), r;
    }, g.numberOfLabelLines = function(e) {
        var t = 1;
        return g.each(e, function(e) {
            g.isArray(e) && e.length > t && (t = e.length);
        }), t;
    }, g.drawRoundedRectangle = function(e, t, n, r, o, a) {
        e.beginPath(), e.moveTo(t + a, n), e.lineTo(t + r - a, n), e.quadraticCurveTo(t + r, n, t + r, n + a), 
        e.lineTo(t + r, n + o - a), e.quadraticCurveTo(t + r, n + o, t + r - a, n + o), 
        e.lineTo(t + a, n + o), e.quadraticCurveTo(t, n + o, t, n + o - a), e.lineTo(t, n + a), 
        e.quadraticCurveTo(t, n, t + a, n), e.closePath();
    }, g.color = function(e) {
        return r ? r(e) : (console.error("Color.js not found!"), e);
    }, g.addResizeListener = function(e, t) {}, g.removeResizeListener = function(e) {}, 
    g.isArray = Array.isArray ? function(e) {
        return Array.isArray(e);
    } : function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }, g.arrayEquals = function(e, t) {
        var n, r, o, a;
        if (!e || !t || e.length !== t.length) return !1;
        for (n = 0, r = e.length; n < r; ++n) if (o = e[n], a = t[n], o instanceof Array && a instanceof Array) {
            if (!g.arrayEquals(o, a)) return !1;
        } else if (o !== a) return !1;
        return !0;
    }, g.callCallback = function(e, t, n) {
        e && "function" == typeof e.call && e.apply(n, t);
    }, g.getHoverColor = function(e) {
        return g.color(e).saturate(.5).darken(.1).rgbString();
    };
};