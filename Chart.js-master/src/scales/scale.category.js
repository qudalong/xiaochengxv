module.exports = function(i) {
    var n = i.helpers, t = i.Scale.extend({
        getLabels: function() {
            var i = this.chart.data;
            return (this.isHorizontal() ? i.xLabels : i.yLabels) || i.labels;
        },
        determineDataLimits: function() {
            var i, t = this, e = t.getLabels();
            t.minIndex = 0, t.maxIndex = e.length - 1, void 0 !== t.options.ticks.min && (i = n.indexOf(e, t.options.ticks.min), 
            t.minIndex = -1 !== i ? i : t.minIndex), void 0 !== t.options.ticks.max && (i = n.indexOf(e, t.options.ticks.max), 
            t.maxIndex = -1 !== i ? i : t.maxIndex), t.min = e[t.minIndex], t.max = e[t.maxIndex];
        },
        buildTicks: function() {
            var i = this, t = i.getLabels();
            i.ticks = 0 === i.minIndex && i.maxIndex === t.length - 1 ? t : t.slice(i.minIndex, i.maxIndex + 1);
        },
        getLabelForIndex: function(i, t) {
            var e = this, n = e.chart.data, a = e.isHorizontal();
            return n.xLabels && a || n.yLabels && !a ? e.getRightValue(n.datasets[t].data[i]) : e.ticks[i];
        },
        getPixelForValue: function(i, t, e, n) {
            var a = this, d = Math.max(a.maxIndex + 1 - a.minIndex - (a.options.gridLines.offsetGridLines ? 0 : 1), 1);
            if (void 0 !== i && isNaN(t)) {
                var o = a.getLabels().indexOf(i);
                t = -1 !== o ? o : t;
            }
            if (a.isHorizontal()) {
                var s = (a.width - (a.paddingLeft + a.paddingRight)) / d, r = s * (t - a.minIndex) + a.paddingLeft;
                return (a.options.gridLines.offsetGridLines && n || a.maxIndex === a.minIndex && n) && (r += s / 2), 
                a.left + Math.round(r);
            }
            var x = (a.height - (a.paddingTop + a.paddingBottom)) / d, g = x * (t - a.minIndex) + a.paddingTop;
            return a.options.gridLines.offsetGridLines && n && (g += x / 2), a.top + Math.round(g);
        },
        getPixelForTick: function(i, t) {
            return this.getPixelForValue(this.ticks[i], i + this.minIndex, null, t);
        },
        getValueForPixel: function(i) {
            var t = this, e = Math.max(t.ticks.length - (t.options.gridLines.offsetGridLines ? 0 : 1), 1), n = t.isHorizontal(), a = (n ? t.width - (t.paddingLeft + t.paddingRight) : t.height - (t.paddingTop + t.paddingBottom)) / e;
            return i -= n ? t.left : t.top, t.options.gridLines.offsetGridLines && (i -= a / 2), 
            (i -= n ? t.paddingLeft : t.paddingTop) <= 0 ? 0 : Math.round(i / a);
        },
        getBasePixel: function() {
            return this.bottom;
        }
    });
    i.scaleService.registerScaleType("category", t, {
        position: "bottom"
    });
};