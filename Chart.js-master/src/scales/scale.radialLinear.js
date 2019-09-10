module.exports = function(e) {
    var S = e.helpers, k = e.defaults.global, t = {
        display: !0,
        animate: !0,
        lineArc: !1,
        position: "chartArea",
        angleLines: {
            display: !0,
            color: "rgba(0, 0, 0, 0.1)",
            lineWidth: 1
        },
        ticks: {
            showLabelBackdrop: !0,
            backdropColor: "rgba(255,255,255,0.75)",
            backdropPaddingY: 2,
            backdropPaddingX: 2,
            callback: e.Ticks.formatters.linear
        },
        pointLabels: {
            fontSize: 10,
            callback: function(t) {
                return t;
            }
        }
    }, i = e.LinearScaleBase.extend({
        getValueCount: function() {
            return this.chart.data.labels.length;
        },
        setDimensions: function() {
            var t = this, e = t.options, i = e.ticks;
            t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), 
            t.yCenter = Math.round(t.height / 2);
            var a = S.min([ t.height, t.width ]), n = S.getValueOrDefault(i.fontSize, k.defaultFontSize);
            t.drawingArea = e.display ? a / 2 - (n / 2 + i.backdropPaddingY) : a / 2;
        },
        determineDataLimits: function() {
            var n = this, i = n.chart;
            n.min = null, n.max = null, S.each(i.data.datasets, function(t, e) {
                if (i.isDatasetVisible(e)) {
                    var a = i.getDatasetMeta(e);
                    S.each(t.data, function(t, e) {
                        var i = +n.getRightValue(t);
                        isNaN(i) || a.data[e].hidden || (null === n.min ? n.min = i : i < n.min && (n.min = i), 
                        null === n.max ? n.max = i : i > n.max && (n.max = i));
                    });
                }
            }), n.handleTickRangeOptions();
        },
        getTickLimit: function() {
            var t = this.options.ticks, e = S.getValueOrDefault(t.fontSize, k.defaultFontSize);
            return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * e)));
        },
        convertTicksToLabels: function() {
            var t = this;
            e.LinearScaleBase.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map(t.options.pointLabels.callback, t);
        },
        getLabelForIndex: function(t, e) {
            return +this.getRightValue(this.chart.data.datasets[e].data[t]);
        },
        fit: function() {
            var t, e, i, a, n, o, r, l, s, h, d, u, c = this.options.pointLabels, g = S.getValueOrDefault(c.fontSize, k.defaultFontSize), f = S.getValueOrDefault(c.fontStyle, k.defaultFontStyle), x = S.getValueOrDefault(c.fontFamily, k.defaultFontFamily), m = S.fontString(g, f, x), p = S.min([ this.height / 2 - g - 5, this.width / 2 ]), P = this.width, b = 0;
            for (this.ctx.font = m, this.ctx.setFontSize(g), e = 0; e < this.getValueCount(); e++) {
                t = this.getPointPosition(e, p), i = this.ctx.measureText(this.pointLabels[e] ? this.pointLabels[e] : "").width + 5;
                var y = 360 * (this.getIndexAngle(e) + Math.PI / 2) / (2 * Math.PI) % 360;
                0 === y || 180 === y ? (a = i / 2, t.x + a > P && (P = t.x + a, n = e), t.x - a < b && (b = t.x - a, 
                r = e)) : y < 180 ? t.x + i > P && (P = t.x + i, n = e) : t.x - i < b && (b = t.x - i, 
                r = e);
            }
            s = b, h = Math.ceil(P - this.width), o = this.getIndexAngle(n), l = this.getIndexAngle(r), 
            d = h / Math.sin(o + Math.PI / 2), u = s / Math.sin(l + Math.PI / 2), d = S.isNumber(d) ? d : 0, 
            u = S.isNumber(u) ? u : 0, this.drawingArea = Math.round(p - (u + d) / 2), this.setCenterPoint(u, d);
        },
        setCenterPoint: function(t, e) {
            var i = this, a = i.width - e - i.drawingArea, n = t + i.drawingArea;
            i.xCenter = Math.round((n + a) / 2 + i.left), i.yCenter = Math.round(i.height / 2 + i.top);
        },
        getIndexAngle: function(t) {
            var e = 2 * Math.PI / this.getValueCount(), i = (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360;
            return t * e - Math.PI / 2 + i;
        },
        getDistanceFromCenterForValue: function(t) {
            var e = this;
            if (null === t) return 0;
            var i = e.drawingArea / (e.max - e.min);
            return e.options.reverse ? (e.max - t) * i : (t - e.min) * i;
        },
        getPointPosition: function(t, e) {
            var i = this.getIndexAngle(t);
            return {
                x: Math.round(Math.cos(i) * e) + this.xCenter,
                y: Math.round(Math.sin(i) * e) + this.yCenter
            };
        },
        getPointPositionForValue: function(t, e) {
            return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
        },
        getBasePosition: function() {
            var t = this.min, e = this.max;
            return this.getPointPositionForValue(0, this.beginAtZero ? 0 : t < 0 && e < 0 ? e : 0 < t && 0 < e ? t : 0);
        },
        draw: function() {
            var s = this, h = s.options, d = h.gridLines, u = h.ticks, t = h.angleLines, e = h.pointLabels, c = S.getValueOrDefault;
            if (h.display) {
                var g = s.ctx, f = c(u.fontSize, k.defaultFontSize), i = c(u.fontStyle, k.defaultFontStyle), a = c(u.fontFamily, k.defaultFontFamily), x = S.fontString(f, i, a);
                if (S.each(s.ticks, function(t, e) {
                    if (0 < e || h.reverse) {
                        var i = s.getDistanceFromCenterForValue(s.ticksAsNumbers[e]), a = s.yCenter - i;
                        if (d.display && 0 !== e) if (g.setStrokeStyle(S.getValueAtIndexOrDefault(d.color, e - 1)), 
                        g.setLineWidth(S.getValueAtIndexOrDefault(d.lineWidth, e - 1)), h.lineArc) g.beginPath(), 
                        g.arc(s.xCenter, s.yCenter, i, 0, 2 * Math.PI), g.closePath(), g.stroke(); else {
                            g.beginPath();
                            for (var n = 0; n < s.getValueCount(); n++) {
                                var o = s.getPointPosition(n, i);
                                0 === n ? g.moveTo(o.x, o.y) : g.lineTo(o.x, o.y);
                            }
                            g.closePath(), g.stroke();
                        }
                        if (u.display) {
                            var r = c(u.fontColor, k.defaultFontColor);
                            if (g.font = x, g.setFontSize(f), u.showLabelBackdrop) {
                                var l = g.measureText(t).width;
                                g.setFillStyle(u.backdropColor), g.fillRect(s.xCenter - l / 2 - u.backdropPaddingX, a - f / 2 - u.backdropPaddingY, l + 2 * u.backdropPaddingX, f + 2 * u.backdropPaddingY);
                            }
                            g.textAlign = "center", g.textBaseline = "middle", g.setFillStyle(r), g.fillText(t, s.xCenter, a);
                        }
                    }
                }), !h.lineArc) {
                    g.setLineWidth(t.lineWidth), g.setStrokeStyle(t.color);
                    for (var n = s.getDistanceFromCenterForValue(h.reverse ? s.min : s.max), o = c(e.fontSize, k.defaultFontSize), r = c(e.fontStyle, k.defaultFontStyle), l = c(e.fontFamily, k.defaultFontFamily), m = S.fontString(o, r, l), p = s.getValueCount() - 1; 0 <= p; p--) {
                        if (t.display) {
                            var P = s.getPointPosition(p, n);
                            g.beginPath(), g.moveTo(s.xCenter, s.yCenter), g.lineTo(P.x, P.y), g.stroke(), g.closePath();
                        }
                        var b = s.getPointPosition(p, n + 5), y = c(e.fontColor, k.defaultFontColor);
                        g.font = m, g.setFontSize(o), g.setFillStyle(y);
                        var F = s.pointLabels, v = 360 * (this.getIndexAngle(p) + Math.PI / 2) / (2 * Math.PI) % 360;
                        g.textAlign = 0 === v || 180 === v ? "center" : v < 180 ? "left" : "right", g.textBaseline = 90 === v || 270 === v ? "middle" : 270 < v || v < 90 ? "bottom" : "top", 
                        g.fillText(F[p] ? F[p] : "", b.x, b.y);
                    }
                }
            }
        }
    });
    e.scaleService.registerScaleType("radialLinear", i, t);
};