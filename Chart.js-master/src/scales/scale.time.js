var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, l = require("moment");

l = "function" == typeof l ? l : window.moment, module.exports = function(S) {
    var b = S.helpers, y = {
        units: [ {
            name: "millisecond",
            steps: [ 1, 2, 5, 10, 20, 50, 100, 250, 500 ]
        }, {
            name: "second",
            steps: [ 1, 2, 5, 10, 30 ]
        }, {
            name: "minute",
            steps: [ 1, 2, 5, 10, 30 ]
        }, {
            name: "hour",
            steps: [ 1, 2, 3, 6, 12 ]
        }, {
            name: "day",
            steps: [ 1, 2, 5 ]
        }, {
            name: "week",
            maxStep: 4
        }, {
            name: "month",
            maxStep: 3
        }, {
            name: "quarter",
            maxStep: 4
        }, {
            name: "year",
            maxStep: !1
        } ]
    }, t = S.Scale.extend({
        initialize: function() {
            if (!l) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
            S.Scale.prototype.initialize.call(this);
        },
        getLabelMoment: function(t, i) {
            return null === t || null === i ? null : void 0 !== this.labelMoments[t] ? this.labelMoments[t][i] : null;
        },
        getLabelDiff: function(t, i) {
            var e = this;
            return null === t || null === i ? null : (void 0 === e.labelDiffs && e.buildLabelDiffs(), 
            void 0 !== e.labelDiffs[t] ? e.labelDiffs[t][i] : null);
        },
        getMomentStartOf: function(t) {
            var i = this;
            return "week" === i.options.time.unit && !1 !== i.options.time.isoWeekday ? t.clone().startOf("isoWeek").isoWeekday(i.options.time.isoWeekday) : t.clone().startOf(i.tickUnit);
        },
        determineDataLimits: function() {
            var n = this;
            n.labelMoments = [];
            var s = [];
            n.chart.data.labels && 0 < n.chart.data.labels.length ? (b.each(n.chart.data.labels, function(t) {
                var i = n.parseTime(t);
                i.isValid() && (n.options.time.round && i.startOf(n.options.time.round), s.push(i));
            }, n), n.firstTick = l.min.call(n, s), n.lastTick = l.max.call(n, s)) : (n.firstTick = null, 
            n.lastTick = null), b.each(n.chart.data.datasets, function(t, i) {
                var e = [], a = n.chart.isDatasetVisible(i);
                "object" === o(t.data[0]) && null !== t.data[0] ? b.each(t.data, function(t) {
                    var i = n.parseTime(n.getRightValue(t));
                    i.isValid() && (n.options.time.round && i.startOf(n.options.time.round), e.push(i), 
                    a && (n.firstTick = null !== n.firstTick ? l.min(n.firstTick, i) : i, n.lastTick = null !== n.lastTick ? l.max(n.lastTick, i) : i));
                }, n) : e = s, n.labelMoments.push(e);
            }, n), n.options.time.min && (n.firstTick = n.parseTime(n.options.time.min)), n.options.time.max && (n.lastTick = n.parseTime(n.options.time.max)), 
            n.firstTick = (n.firstTick || l()).clone(), n.lastTick = (n.lastTick || l()).clone();
        },
        buildLabelDiffs: function() {
            var a = this;
            a.labelDiffs = [];
            var n = [];
            a.chart.data.labels && 0 < a.chart.data.labels.length && b.each(a.chart.data.labels, function(t) {
                var i = a.parseTime(t);
                i.isValid() && (a.options.time.round && i.startOf(a.options.time.round), n.push(i.diff(a.firstTick, a.tickUnit, !0)));
            }, a), b.each(a.chart.data.datasets, function(t) {
                var e = [];
                "object" === o(t.data[0]) && null !== t.data[0] ? b.each(t.data, function(t) {
                    var i = a.parseTime(a.getRightValue(t));
                    i.isValid() && (a.options.time.round && i.startOf(a.options.time.round), e.push(i.diff(a.firstTick, a.tickUnit, !0)));
                }, a) : e = n, a.labelDiffs.push(e);
            }, a);
        },
        buildTicks: function() {
            var t = this;
            t.ctx.save();
            var i, e = b.getValueOrDefault(t.options.ticks.fontSize, S.defaults.global.defaultFontSize), a = b.getValueOrDefault(t.options.ticks.fontStyle, S.defaults.global.defaultFontStyle), n = b.getValueOrDefault(t.options.ticks.fontFamily, S.defaults.global.defaultFontFamily), s = b.fontString(e, a, n);
            if (t.ctx.font = s, t.ctx.setFontSize(e), t.ticks = [], t.unitScale = 1, t.scaleSizeInUnits = 0, 
            t.options.time.unit) t.tickUnit = t.options.time.unit || "day", t.displayFormat = t.options.time.displayFormats[t.tickUnit], 
            t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0), t.unitScale = b.getValueOrDefault(t.options.time.unitStepSize, 1); else {
                var o = t.isHorizontal() ? t.width - (t.paddingLeft + t.paddingRight) : t.height - (t.paddingTop + t.paddingBottom), l = t.tickFormatFunction(t.firstTick, 0, []), r = t.ctx.measureText(l).width, c = o / (r = r * Math.cos(b.toRadians(t.options.ticks.maxRotation)) + e * Math.sin(b.toRadians(t.options.ticks.maxRotation)));
                t.tickUnit = t.options.time.minUnit, t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0), 
                t.displayFormat = t.options.time.displayFormats[t.tickUnit];
                for (var f = 0, m = y.units[f]; f < y.units.length; ) {
                    if (t.unitScale = 1, b.isArray(m.steps) && Math.ceil(t.scaleSizeInUnits / c) < b.max(m.steps)) {
                        for (var d = 0; d < m.steps.length; ++d) if (m.steps[d] >= Math.ceil(t.scaleSizeInUnits / c)) {
                            t.unitScale = b.getValueOrDefault(t.options.time.unitStepSize, m.steps[d]);
                            break;
                        }
                        break;
                    }
                    if (!1 === m.maxStep || Math.ceil(t.scaleSizeInUnits / c) < m.maxStep) {
                        t.unitScale = b.getValueOrDefault(t.options.time.unitStepSize, Math.ceil(t.scaleSizeInUnits / c));
                        break;
                    }
                    m = y.units[++f], t.tickUnit = m.name;
                    var p = t.firstTick.diff(t.getMomentStartOf(t.firstTick), t.tickUnit, !0), u = t.getMomentStartOf(t.lastTick.clone().add(1, t.tickUnit)).diff(t.lastTick, t.tickUnit, !0);
                    t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0) + p + u, t.displayFormat = t.options.time.displayFormats[m.name];
                }
            }
            if (i = t.options.time.min ? t.getMomentStartOf(t.firstTick) : (t.firstTick = t.getMomentStartOf(t.firstTick), 
            t.firstTick), !t.options.time.max) {
                var k = t.getMomentStartOf(t.lastTick), h = k.diff(t.lastTick, t.tickUnit, !0);
                h < 0 ? t.lastTick = t.getMomentStartOf(t.lastTick.add(1, t.tickUnit)) : 0 <= h && (t.lastTick = k), 
                t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0);
            }
            t.options.time.displayFormat && (t.displayFormat = t.options.time.displayFormat), 
            t.ticks.push(t.firstTick.clone());
            for (var T = 1; T <= t.scaleSizeInUnits; ++T) {
                var g = i.clone().add(T, t.tickUnit);
                if (t.options.time.max && 0 <= g.diff(t.lastTick, t.tickUnit, !0)) break;
                T % t.unitScale == 0 && t.ticks.push(g);
            }
            0 === t.ticks[t.ticks.length - 1].diff(t.lastTick, t.tickUnit) && 0 !== t.scaleSizeInUnits || (t.options.time.max ? (t.ticks.push(t.lastTick.clone()), 
            t.scaleSizeInUnits = t.lastTick.diff(t.ticks[0], t.tickUnit, !0)) : (t.ticks.push(t.lastTick.clone()), 
            t.scaleSizeInUnits = t.lastTick.diff(t.firstTick, t.tickUnit, !0))), t.ctx.restore(), 
            t.labelDiffs = void 0;
        },
        getLabelForIndex: function(t, i) {
            var e = this, a = e.chart.data.labels && t < e.chart.data.labels.length ? e.chart.data.labels[t] : "";
            return "object" === o(e.chart.data.datasets[i].data[0]) && (a = e.getRightValue(e.chart.data.datasets[i].data[t])), 
            e.options.time.tooltipFormat && (a = e.parseTime(a).format(e.options.time.tooltipFormat)), 
            a;
        },
        tickFormatFunction: function(t, i, e) {
            var a = t.format(this.displayFormat), n = this.options.ticks, s = b.getValueOrDefault(n.callback, n.userCallback);
            return s ? s(a, i, e) : a;
        },
        convertTicksToLabels: function() {
            var t = this;
            t.tickMoments = t.ticks, t.ticks = t.ticks.map(t.tickFormatFunction, t);
        },
        getPixelForValue: function(t, i, e) {
            var a = this, n = null;
            if (void 0 !== i && void 0 !== e && (n = a.getLabelDiff(e, i)), null === n && (t && t.isValid || (t = a.parseTime(a.getRightValue(t))), 
            t && t.isValid && t.isValid() && (n = t.diff(a.firstTick, a.tickUnit, !0))), null !== n) {
                var s = 0 !== n ? n / a.scaleSizeInUnits : n;
                if (a.isHorizontal()) {
                    var o = (a.width - (a.paddingLeft + a.paddingRight)) * s + a.paddingLeft;
                    return a.left + Math.round(o);
                }
                var l = (a.height - (a.paddingTop + a.paddingBottom)) * s + a.paddingTop;
                return a.top + Math.round(l);
            }
        },
        getPixelForTick: function(t) {
            return this.getPixelForValue(this.tickMoments[t], null, null);
        },
        getValueForPixel: function(t) {
            var i = this, e = i.isHorizontal() ? i.width - (i.paddingLeft + i.paddingRight) : i.height - (i.paddingTop + i.paddingBottom), a = (t - (i.isHorizontal() ? i.left + i.paddingLeft : i.top + i.paddingTop)) / e;
            return a *= i.scaleSizeInUnits, i.firstTick.clone().add(l.duration(a, i.tickUnit).asSeconds(), "seconds");
        },
        parseTime: function(t) {
            var i = this;
            return "string" == typeof i.options.time.parser ? l(t, i.options.time.parser) : "function" == typeof i.options.time.parser ? i.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? l(t) : t.isValid && t.isValid() ? t : "string" != typeof i.options.time.format && i.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), 
            i.options.time.format(t)) : l(t, i.options.time.format);
        }
    });
    S.scaleService.registerScaleType("time", t, {
        position: "bottom",
        time: {
            parser: !1,
            format: !1,
            unit: !1,
            round: !1,
            displayFormat: !1,
            isoWeekday: !1,
            minUnit: "millisecond",
            displayFormats: {
                millisecond: "h:mm:ss.SSS a",
                second: "h:mm:ss a",
                minute: "h:mm:ss a",
                hour: "MMM D, hA",
                day: "ll",
                week: "ll",
                month: "MMM YYYY",
                quarter: "[Q]Q - YYYY",
                year: "YYYY"
            }
        },
        ticks: {
            autoSkip: !1
        }
    });
};