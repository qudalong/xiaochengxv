module.exports = function(n) {
    var u = n.helpers, t = {
        position: "left",
        ticks: {
            callback: n.Ticks.formatters.linear
        }
    }, i = n.LinearScaleBase.extend({
        determineDataLimits: function() {
            var l = this, o = l.options, a = l.chart, t = a.data.datasets, i = l.isHorizontal();
            function r(t) {
                return i ? t.xAxisID === l.id : t.yAxisID === l.id;
            }
            if (l.min = null, l.max = null, o.stacked) {
                var d = {};
                u.each(t, function(t, i) {
                    var e = a.getDatasetMeta(i);
                    void 0 === d[e.type] && (d[e.type] = {
                        positiveValues: [],
                        negativeValues: []
                    });
                    var n = d[e.type].positiveValues, s = d[e.type].negativeValues;
                    a.isDatasetVisible(i) && r(e) && u.each(t.data, function(t, i) {
                        var a = +l.getRightValue(t);
                        isNaN(a) || e.data[i].hidden || (n[i] = n[i] || 0, s[i] = s[i] || 0, o.relativePoints ? n[i] = 100 : a < 0 ? s[i] += a : n[i] += a);
                    });
                }), u.each(d, function(t) {
                    var i = t.positiveValues.concat(t.negativeValues), a = u.min(i), e = u.max(i);
                    l.min = null === l.min ? a : Math.min(l.min, a), l.max = null === l.max ? e : Math.max(l.max, e);
                });
            } else u.each(t, function(t, i) {
                var e = a.getDatasetMeta(i);
                a.isDatasetVisible(i) && r(e) && u.each(t.data, function(t, i) {
                    var a = +l.getRightValue(t);
                    isNaN(a) || e.data[i].hidden || (null === l.min ? l.min = a : a < l.min && (l.min = a), 
                    null === l.max ? l.max = a : a > l.max && (l.max = a));
                });
            });
            this.handleTickRangeOptions();
        },
        getTickLimit: function() {
            var t, i = this, a = i.options.ticks;
            if (i.isHorizontal()) t = Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(i.width / 50)); else {
                var e = u.getValueOrDefault(a.fontSize, n.defaults.global.defaultFontSize);
                t = Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(i.height / (2 * e)));
            }
            return t;
        },
        handleDirectionalChanges: function() {
            this.isHorizontal() || this.ticks.reverse();
        },
        getLabelForIndex: function(t, i) {
            return +this.getRightValue(this.chart.data.datasets[i].data[t]);
        },
        getPixelForValue: function(t) {
            var i, a, e = this, n = e.paddingLeft, s = e.paddingBottom, l = e.start, o = +e.getRightValue(t), r = e.end - l;
            return e.isHorizontal() ? (a = e.width - (n + e.paddingRight), i = e.left + a / r * (o - l), 
            Math.round(i + n)) : (a = e.height - (e.paddingTop + s), i = e.bottom - s - a / r * (o - l), 
            Math.round(i));
        },
        getValueForPixel: function(t) {
            var i = this, a = i.isHorizontal(), e = i.paddingLeft, n = i.paddingBottom, s = a ? i.width - (e + i.paddingRight) : i.height - (i.paddingTop + n), l = (a ? t - i.left - e : i.bottom - n - t) / s;
            return i.start + (i.end - i.start) * l;
        },
        getPixelForTick: function(t) {
            return this.getPixelForValue(this.ticksAsNumbers[t]);
        }
    });
    n.scaleService.registerScaleType("linear", i, t);
};