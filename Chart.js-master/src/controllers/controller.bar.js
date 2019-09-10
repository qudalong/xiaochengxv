module.exports = function(a) {
    var h = a.helpers;
    a.defaults.bar = {
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [ {
                type: "category",
                categoryPercentage: .8,
                barPercentage: .9,
                gridLines: {
                    offsetGridLines: !0
                }
            } ],
            yAxes: [ {
                type: "linear"
            } ]
        }
    }, a.controllers.bar = a.DatasetController.extend({
        dataElementType: a.elements.Rectangle,
        initialize: function(e, t) {
            a.DatasetController.prototype.initialize.call(this, e, t), this.getMeta().bar = !0;
        },
        getBarCount: function() {
            var a = this, r = 0;
            return h.each(a.chart.data.datasets, function(e, t) {
                a.chart.getDatasetMeta(t).bar && a.chart.isDatasetVisible(t) && ++r;
            }, a), r;
        },
        update: function(a) {
            var r = this;
            h.each(r.getMeta().data, function(e, t) {
                r.updateElement(e, t, a);
            }, r);
        },
        updateElement: function(e, t, a) {
            var r = this, o = r.getMeta(), i = r.getScaleForId(o.xAxisID), l = r.getScaleForId(o.yAxisID), d = l.getBasePixel(), n = r.chart.options.elements.rectangle, s = e.custom || {}, c = r.getDataset();
            e._xScale = i, e._yScale = l, e._datasetIndex = r.index, e._index = t;
            var g = r.getRuler(t);
            e._model = {
                x: r.calculateBarX(t, r.index, g),
                y: a ? d : r.calculateBarY(t, r.index),
                label: r.chart.data.labels[t],
                datasetLabel: c.label,
                base: a ? d : r.calculateBarBase(r.index, t),
                width: r.calculateBarWidth(g),
                backgroundColor: s.backgroundColor ? s.backgroundColor : h.getValueAtIndexOrDefault(c.backgroundColor, t, n.backgroundColor),
                borderSkipped: s.borderSkipped ? s.borderSkipped : n.borderSkipped,
                borderColor: s.borderColor ? s.borderColor : h.getValueAtIndexOrDefault(c.borderColor, t, n.borderColor),
                borderWidth: s.borderWidth ? s.borderWidth : h.getValueAtIndexOrDefault(c.borderWidth, t, n.borderWidth)
            }, e.pivot();
        },
        calculateBarBase: function(e, t) {
            var a = this, r = a.getMeta(), o = a.getScaleForId(r.yAxisID), i = 0;
            if (o.options.stacked) {
                for (var l = a.chart, d = l.data.datasets, n = Number(d[e].data[t]), s = 0; s < e; s++) {
                    var c = d[s], g = l.getDatasetMeta(s);
                    if (g.bar && g.yAxisID === o.id && l.isDatasetVisible(s)) {
                        var h = Number(c.data[t]);
                        i += n < 0 ? Math.min(h, 0) : Math.max(h, 0);
                    }
                }
                return o.getPixelForValue(i);
            }
            return o.getBasePixel();
        },
        getRuler: function(e) {
            var t, a = this, r = a.getMeta(), o = a.getScaleForId(r.xAxisID), i = a.getBarCount(), l = (t = "category" === o.options.type ? o.getPixelForTick(e + 1) - o.getPixelForTick(e) : o.width / o.ticks.length) * o.options.categoryPercentage, d = (t - t * o.options.categoryPercentage) / 2, n = l / i;
            o.ticks.length !== a.chart.data.labels.length && (n *= o.ticks.length / a.chart.data.labels.length);
            return {
                datasetCount: i,
                tickWidth: t,
                categoryWidth: l,
                categorySpacing: d,
                fullBarWidth: n,
                barWidth: n * o.options.barPercentage,
                barSpacing: n - n * o.options.barPercentage
            };
        },
        calculateBarWidth: function(e) {
            var t = this.getScaleForId(this.getMeta().xAxisID);
            return t.options.barThickness ? t.options.barThickness : t.options.stacked ? e.categoryWidth : e.barWidth;
        },
        getBarIndex: function(e) {
            var t, a = 0;
            for (t = 0; t < e; ++t) this.chart.getDatasetMeta(t).bar && this.chart.isDatasetVisible(t) && ++a;
            return a;
        },
        calculateBarX: function(e, t, a) {
            var r = this, o = r.getMeta(), i = r.getScaleForId(o.xAxisID), l = r.getBarIndex(t), d = i.getPixelForValue(null, e, t, r.chart.isCombo);
            return d -= r.chart.isCombo ? a.tickWidth / 2 : 0, i.options.stacked ? d + a.categoryWidth / 2 + a.categorySpacing : d + a.barWidth / 2 + a.categorySpacing + a.barWidth * l + a.barSpacing / 2 + a.barSpacing * l;
        },
        calculateBarY: function(e, t) {
            var a = this, r = a.getMeta(), o = a.getScaleForId(r.yAxisID), i = Number(a.getDataset().data[e]);
            if (o.options.stacked) {
                for (var l = 0, d = 0, n = 0; n < t; n++) {
                    var s = a.chart.data.datasets[n], c = a.chart.getDatasetMeta(n);
                    if (c.bar && c.yAxisID === o.id && a.chart.isDatasetVisible(n)) {
                        var g = Number(s.data[e]);
                        g < 0 ? d += g || 0 : l += g || 0;
                    }
                }
                return i < 0 ? o.getPixelForValue(d + i) : o.getPixelForValue(l + i);
            }
            return o.getPixelForValue(i);
        },
        draw: function(e) {
            var t, a, r = e || 1, o = this.getMeta().data, i = this.getDataset();
            for (t = 0, a = o.length; t < a; ++t) {
                var l = i.data[t];
                null == l || isNaN(l) || o[t].transition(r).draw();
            }
        },
        setHoverStyle: function(e) {
            var t = this.chart.data.datasets[e._datasetIndex], a = e._index, r = e.custom || {}, o = e._model;
            o.backgroundColor = r.hoverBackgroundColor ? r.hoverBackgroundColor : h.getValueAtIndexOrDefault(t.hoverBackgroundColor, a, h.getHoverColor(o.backgroundColor)), 
            o.borderColor = r.hoverBorderColor ? r.hoverBorderColor : h.getValueAtIndexOrDefault(t.hoverBorderColor, a, h.getHoverColor(o.borderColor)), 
            o.borderWidth = r.hoverBorderWidth ? r.hoverBorderWidth : h.getValueAtIndexOrDefault(t.hoverBorderWidth, a, o.borderWidth);
        },
        removeHoverStyle: function(e) {
            var t = this.chart.data.datasets[e._datasetIndex], a = e._index, r = e.custom || {}, o = e._model, i = this.chart.options.elements.rectangle;
            o.backgroundColor = r.backgroundColor ? r.backgroundColor : h.getValueAtIndexOrDefault(t.backgroundColor, a, i.backgroundColor), 
            o.borderColor = r.borderColor ? r.borderColor : h.getValueAtIndexOrDefault(t.borderColor, a, i.borderColor), 
            o.borderWidth = r.borderWidth ? r.borderWidth : h.getValueAtIndexOrDefault(t.borderWidth, a, i.borderWidth);
        }
    }), a.defaults.horizontalBar = {
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [ {
                type: "linear",
                position: "bottom"
            } ],
            yAxes: [ {
                position: "left",
                type: "category",
                categoryPercentage: .8,
                barPercentage: .9,
                gridLines: {
                    offsetGridLines: !0
                }
            } ]
        },
        elements: {
            rectangle: {
                borderSkipped: "left"
            }
        },
        tooltips: {
            callbacks: {
                title: function(e, t) {
                    var a = "";
                    return 0 < e.length && (e[0].yLabel ? a = e[0].yLabel : 0 < t.labels.length && e[0].index < t.labels.length && (a = t.labels[e[0].index])), 
                    a;
                },
                label: function(e, t) {
                    return (t.datasets[e.datasetIndex].label || "") + ": " + e.xLabel;
                }
            }
        }
    }, a.controllers.horizontalBar = a.controllers.bar.extend({
        updateElement: function(e, t, a) {
            var r = this, o = r.getMeta(), i = r.getScaleForId(o.xAxisID), l = r.getScaleForId(o.yAxisID), d = i.getBasePixel(), n = e.custom || {}, s = r.getDataset(), c = r.chart.options.elements.rectangle;
            e._xScale = i, e._yScale = l, e._datasetIndex = r.index, e._index = t;
            var g = r.getRuler(t);
            e._model = {
                x: a ? d : r.calculateBarX(t, r.index),
                y: r.calculateBarY(t, r.index, g),
                label: r.chart.data.labels[t],
                datasetLabel: s.label,
                base: a ? d : r.calculateBarBase(r.index, t),
                height: r.calculateBarHeight(g),
                backgroundColor: n.backgroundColor ? n.backgroundColor : h.getValueAtIndexOrDefault(s.backgroundColor, t, c.backgroundColor),
                borderSkipped: n.borderSkipped ? n.borderSkipped : c.borderSkipped,
                borderColor: n.borderColor ? n.borderColor : h.getValueAtIndexOrDefault(s.borderColor, t, c.borderColor),
                borderWidth: n.borderWidth ? n.borderWidth : h.getValueAtIndexOrDefault(s.borderWidth, t, c.borderWidth)
            }, e.draw = function() {
                var e = this._chart.ctx, t = this._view, a = t.height / 2, r = t.y - a, o = t.y + a, i = t.base - (t.base - t.x), l = t.borderWidth / 2;
                t.borderWidth && (r += l, o -= l, i += l), e.beginPath(), e.setFillStyle(t.backgroundColor), 
                e.setStrokeStyle(t.borderColor), e.setLineWidth(t.borderWidth);
                var d = [ [ t.base, o ], [ t.base, r ], [ i, r ], [ i, o ] ], n = [ "bottom", "left", "top", "right" ].indexOf(t.borderSkipped, 0);
                function s(e) {
                    return d[(n + e) % 4];
                }
                -1 === n && (n = 0), e.moveTo.apply(e, s(0));
                for (var c = 1; c < 4; c++) e.lineTo.apply(e, s(c));
                e.fill(), t.borderWidth && e.stroke();
            }, e.pivot();
        },
        calculateBarBase: function(e, t) {
            var a = this.getMeta(), r = this.getScaleForId(a.xAxisID), o = 0;
            if (r.options.stacked) {
                for (var i = this.chart, l = i.data.datasets, d = Number(l[e].data[t]), n = 0; n < e; n++) {
                    var s = l[n], c = i.getDatasetMeta(n);
                    if (c.bar && c.xAxisID === r.id && i.isDatasetVisible(n)) {
                        var g = Number(s.data[t]);
                        o += d < 0 ? Math.min(g, 0) : Math.max(g, 0);
                    }
                }
                return r.getPixelForValue(o);
            }
            return r.getBasePixel();
        },
        getRuler: function(e) {
            var t, a = this, r = a.getMeta(), o = a.getScaleForId(r.yAxisID), i = a.getBarCount(), l = (t = "category" === o.options.type ? o.getPixelForTick(e + 1) - o.getPixelForTick(e) : o.width / o.ticks.length) * o.options.categoryPercentage, d = (t - t * o.options.categoryPercentage) / 2, n = l / i;
            o.ticks.length !== a.chart.data.labels.length && (n *= o.ticks.length / a.chart.data.labels.length);
            return {
                datasetCount: i,
                tickHeight: t,
                categoryHeight: l,
                categorySpacing: d,
                fullBarHeight: n,
                barHeight: n * o.options.barPercentage,
                barSpacing: n - n * o.options.barPercentage
            };
        },
        calculateBarHeight: function(e) {
            var t = this.getScaleForId(this.getMeta().yAxisID);
            return t.options.barThickness ? t.options.barThickness : t.options.stacked ? e.categoryHeight : e.barHeight;
        },
        calculateBarX: function(e, t) {
            var a = this, r = a.getMeta(), o = a.getScaleForId(r.xAxisID), i = Number(a.getDataset().data[e]);
            if (o.options.stacked) {
                for (var l = 0, d = 0, n = 0; n < t; n++) {
                    var s = a.chart.data.datasets[n], c = a.chart.getDatasetMeta(n);
                    if (c.bar && c.xAxisID === o.id && a.chart.isDatasetVisible(n)) {
                        var g = Number(s.data[e]);
                        g < 0 ? d += g || 0 : l += g || 0;
                    }
                }
                return i < 0 ? o.getPixelForValue(d + i) : o.getPixelForValue(l + i);
            }
            return o.getPixelForValue(i);
        },
        calculateBarY: function(e, t, a) {
            var r = this, o = r.getMeta(), i = r.getScaleForId(o.yAxisID), l = r.getBarIndex(t), d = i.getPixelForValue(null, e, t, r.chart.isCombo);
            return d -= r.chart.isCombo ? a.tickHeight / 2 : 0, i.options.stacked ? d + a.categoryHeight / 2 + a.categorySpacing : d + a.barHeight / 2 + a.categorySpacing + a.barHeight * l + a.barSpacing / 2 + a.barSpacing * l;
        }
    });
};