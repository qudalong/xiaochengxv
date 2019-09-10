module.exports = function(o) {
    var d = o.helpers, t = {
        position: "left",
        ticks: {
            callback: o.Ticks.formatters.logarithmic
        }
    }, i = o.Scale.extend({
        determineDataLimits: function() {
            var n = this, l = n.options, t = l.ticks, a = n.chart, i = a.data.datasets, e = d.getValueOrDefault, o = n.isHorizontal();
            function r(t) {
                return o ? t.xAxisID === n.id : t.yAxisID === n.id;
            }
            if (n.min = null, n.max = null, n.minNotZero = null, l.stacked) {
                var s = {};
                d.each(i, function(t, i) {
                    var o = a.getDatasetMeta(i);
                    a.isDatasetVisible(i) && r(o) && (void 0 === s[o.type] && (s[o.type] = []), d.each(t.data, function(t, i) {
                        var a = s[o.type], e = +n.getRightValue(t);
                        isNaN(e) || o.data[i].hidden || (a[i] = a[i] || 0, l.relativePoints ? a[i] = 100 : a[i] += e);
                    }));
                }), d.each(s, function(t) {
                    var i = d.min(t), a = d.max(t);
                    n.min = null === n.min ? i : Math.min(n.min, i), n.max = null === n.max ? a : Math.max(n.max, a);
                });
            } else d.each(i, function(t, i) {
                var e = a.getDatasetMeta(i);
                a.isDatasetVisible(i) && r(e) && d.each(t.data, function(t, i) {
                    var a = +n.getRightValue(t);
                    isNaN(a) || e.data[i].hidden || (null === n.min ? n.min = a : a < n.min && (n.min = a), 
                    null === n.max ? n.max = a : a > n.max && (n.max = a), 0 !== a && (null === n.minNotZero || a < n.minNotZero) && (n.minNotZero = a));
                });
            });
            n.min = e(t.min, n.min), n.max = e(t.max, n.max), n.min === n.max && (0 !== n.min && null !== n.min ? (n.min = Math.pow(10, Math.floor(d.log10(n.min)) - 1), 
            n.max = Math.pow(10, Math.floor(d.log10(n.max)) + 1)) : (n.min = 1, n.max = 10));
        },
        buildTicks: function() {
            var t = this, i = t.options.ticks, a = {
                min: i.min,
                max: i.max
            }, e = t.ticks = o.Ticks.generators.logarithmic(a, t);
            t.isHorizontal() || e.reverse(), t.max = d.max(e), t.min = d.min(e), i.reverse ? (e.reverse(), 
            t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max);
        },
        convertTicksToLabels: function() {
            this.tickValues = this.ticks.slice(), o.Scale.prototype.convertTicksToLabels.call(this);
        },
        getLabelForIndex: function(t, i) {
            return +this.getRightValue(this.chart.data.datasets[i].data[t]);
        },
        getPixelForTick: function(t) {
            return this.getPixelForValue(this.tickValues[t]);
        },
        getPixelForValue: function(t) {
            var i, a, e, o = this, n = o.start, l = +o.getRightValue(t), r = o.paddingTop, s = o.paddingBottom, m = o.paddingLeft, g = o.options.ticks;
            return o.isHorizontal() ? (e = d.log10(o.end) - d.log10(n), 0 === l ? a = o.left + m : (i = o.width - (m + o.paddingRight), 
            a = o.left + i / e * (d.log10(l) - d.log10(n)), a += m)) : (i = o.height - (r + s), 
            a = 0 !== n || g.reverse ? 0 === o.end && g.reverse ? (e = d.log10(o.start) - d.log10(o.minNotZero), 
            l === o.end ? o.top + r : l === o.minNotZero ? o.top + r + .02 * i : o.top + r + .02 * i + .98 * i / e * (d.log10(l) - d.log10(o.minNotZero))) : (e = d.log10(o.end) - d.log10(n), 
            i = o.height - (r + s), o.bottom - s - i / e * (d.log10(l) - d.log10(n))) : (e = d.log10(o.end) - d.log10(o.minNotZero), 
            l === n ? o.bottom - s : l === o.minNotZero ? o.bottom - s - .02 * i : o.bottom - s - .02 * i - .98 * i / e * (d.log10(l) - d.log10(o.minNotZero)))), 
            a;
        },
        getValueForPixel: function(t) {
            var i, a = this, e = d.log10(a.end) - d.log10(a.start);
            return a.isHorizontal() ? (i = a.width - (a.paddingLeft + a.paddingRight), a.start * Math.pow(10, (t - a.left - a.paddingLeft) * e / i)) : (i = a.height - (a.paddingTop + a.paddingBottom), 
            Math.pow(10, (a.bottom - a.paddingBottom - t) * e / i) / a.start);
        }
    });
    o.scaleService.registerScaleType("logarithmic", i, t);
};