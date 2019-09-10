var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function(e) {
    var g = e.helpers;
    function h(e, t) {
        return g.getValueOrDefault(e.showLine, t.showLines);
    }
    e.defaults.line = {
        showLines: !0,
        spanGaps: !1,
        hover: {
            mode: "label"
        },
        scales: {
            xAxes: [ {
                type: "category",
                id: "x-axis-0"
            } ],
            yAxes: [ {
                type: "linear",
                id: "y-axis-0"
            } ]
        }
    }, e.controllers.line = e.DatasetController.extend({
        datasetElementType: e.elements.Line,
        dataElementType: e.elements.Point,
        update: function(e) {
            var t, o, r, i = this, n = i.getMeta(), a = n.dataset, d = n.data || [], l = i.chart.options, s = l.elements.line, u = i.getScaleForId(n.yAxisID), c = i.getDataset(), p = h(c, l);
            for (p && (r = a.custom || {}, void 0 !== c.tension && void 0 === c.lineTension && (c.lineTension = c.tension), 
            a._scale = u, a._datasetIndex = i.index, a._children = d, a._model = {
                spanGaps: c.spanGaps ? c.spanGaps : l.spanGaps,
                tension: r.tension ? r.tension : g.getValueOrDefault(c.lineTension, s.tension),
                backgroundColor: r.backgroundColor ? r.backgroundColor : c.backgroundColor || s.backgroundColor,
                borderWidth: r.borderWidth ? r.borderWidth : c.borderWidth || s.borderWidth,
                borderColor: r.borderColor ? r.borderColor : c.borderColor || s.borderColor,
                borderCapStyle: r.borderCapStyle ? r.borderCapStyle : c.borderCapStyle || s.borderCapStyle,
                borderDash: r.borderDash ? r.borderDash : c.borderDash || s.borderDash,
                borderDashOffset: r.borderDashOffset ? r.borderDashOffset : c.borderDashOffset || s.borderDashOffset,
                borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : c.borderJoinStyle || s.borderJoinStyle,
                fill: r.fill ? r.fill : void 0 !== c.fill ? c.fill : s.fill,
                steppedLine: r.steppedLine ? r.steppedLine : g.getValueOrDefault(c.steppedLine, s.stepped),
                cubicInterpolationMode: r.cubicInterpolationMode ? r.cubicInterpolationMode : g.getValueOrDefault(c.cubicInterpolationMode, s.cubicInterpolationMode),
                scaleTop: u.top,
                scaleBottom: u.bottom,
                scaleZero: u.getBasePixel()
            }, a.pivot()), t = 0, o = d.length; t < o; ++t) i.updateElement(d[t], t, e);
            for (p && 0 !== a._model.tension && i.updateBezierControlPoints(), t = 0, o = d.length; t < o; ++t) d[t].pivot();
        },
        getPointBackgroundColor: function(e, t) {
            var o = this.chart.options.elements.point.backgroundColor, r = this.getDataset(), i = e.custom || {};
            return i.backgroundColor ? o = i.backgroundColor : r.pointBackgroundColor ? o = g.getValueAtIndexOrDefault(r.pointBackgroundColor, t, o) : r.backgroundColor && (o = r.backgroundColor), 
            o;
        },
        getPointBorderColor: function(e, t) {
            var o = this.chart.options.elements.point.borderColor, r = this.getDataset(), i = e.custom || {};
            return i.borderColor ? o = i.borderColor : r.pointBorderColor ? o = g.getValueAtIndexOrDefault(r.pointBorderColor, t, o) : r.borderColor && (o = r.borderColor), 
            o;
        },
        getPointBorderWidth: function(e, t) {
            var o = this.chart.options.elements.point.borderWidth, r = this.getDataset(), i = e.custom || {};
            return i.borderWidth ? o = i.borderWidth : r.pointBorderWidth ? o = g.getValueAtIndexOrDefault(r.pointBorderWidth, t, o) : r.borderWidth && (o = r.borderWidth), 
            o;
        },
        updateElement: function(e, t, o) {
            var r, i, n = this, a = n.getMeta(), d = e.custom || {}, l = n.getDataset(), s = n.index, u = l.data[t], c = n.getScaleForId(a.yAxisID), p = n.getScaleForId(a.xAxisID), h = n.chart.options.elements.point, b = 1 === (n.chart.data.labels || []).length || 1 === l.data.length || n.chart.isCombo;
            void 0 !== l.radius && void 0 === l.pointRadius && (l.pointRadius = l.radius), void 0 !== l.hitRadius && void 0 === l.pointHitRadius && (l.pointHitRadius = l.hitRadius), 
            r = p.getPixelForValue("object" === (void 0 === u ? "undefined" : f(u)) ? u : NaN, t, s, b), 
            i = o ? c.getBasePixel() : n.calculatePointY(u, t, s), e._xScale = p, e._yScale = c, 
            e._datasetIndex = s, e._index = t, e._model = {
                x: r,
                y: i,
                skip: d.skip || isNaN(r) || isNaN(i),
                radius: d.radius || g.getValueAtIndexOrDefault(l.pointRadius, t, h.radius),
                pointStyle: d.pointStyle || g.getValueAtIndexOrDefault(l.pointStyle, t, h.pointStyle),
                backgroundColor: n.getPointBackgroundColor(e, t),
                borderColor: n.getPointBorderColor(e, t),
                borderWidth: n.getPointBorderWidth(e, t),
                tension: a.dataset._model ? a.dataset._model.tension : 0,
                steppedLine: !!a.dataset._model && a.dataset._model.steppedLine,
                hitRadius: d.hitRadius || g.getValueAtIndexOrDefault(l.pointHitRadius, t, h.hitRadius)
            };
        },
        calculatePointY: function(e, t, o) {
            var r, i, n, a = this.chart, d = this.getMeta(), l = this.getScaleForId(d.yAxisID), s = 0, u = 0;
            if (l.options.stacked) {
                for (r = 0; r < o; r++) if (i = a.data.datasets[r], "line" === (n = a.getDatasetMeta(r)).type && n.yAxisID === l.id && a.isDatasetVisible(r)) {
                    var c = Number(l.getRightValue(i.data[t]));
                    c < 0 ? u += c || 0 : s += c || 0;
                }
                var p = Number(l.getRightValue(e));
                return p < 0 ? l.getPixelForValue(u + p) : l.getPixelForValue(s + p);
            }
            return l.getPixelForValue(e);
        },
        updateBezierControlPoints: function() {
            var e, t, o, r, i = this.getMeta(), n = this.chart.chartArea, a = i.data || [];
            function d(e, t, o) {
                return Math.max(Math.min(e, o), t);
            }
            if (i.dataset._model.spanGaps && (a = a.filter(function(e) {
                return !e._model.skip;
            })), "monotone" === i.dataset._model.cubicInterpolationMode) g.splineCurveMonotone(a); else for (e = 0, 
            t = a.length; e < t; ++e) o = a[e]._model, r = g.splineCurve(g.previousItem(a, e)._model, o, g.nextItem(a, e)._model, i.dataset._model.tension), 
            o.controlPointPreviousX = r.previous.x, o.controlPointPreviousY = r.previous.y, 
            o.controlPointNextX = r.next.x, o.controlPointNextY = r.next.y;
            if (this.chart.options.elements.line.capBezierPoints) for (e = 0, t = a.length; e < t; ++e) (o = a[e]._model).controlPointPreviousX = d(o.controlPointPreviousX, n.left, n.right), 
            o.controlPointPreviousY = d(o.controlPointPreviousY, n.top, n.bottom), o.controlPointNextX = d(o.controlPointNextX, n.left, n.right), 
            o.controlPointNextY = d(o.controlPointNextY, n.top, n.bottom);
        },
        draw: function(e) {
            var t, o, r = this.getMeta(), i = r.data || [], n = e || 1;
            for (t = 0, o = i.length; t < o; ++t) i[t].transition(n);
            for (h(this.getDataset(), this.chart.options) && r.dataset.transition(n).draw(), 
            t = 0, o = i.length; t < o; ++t) i[t].draw();
        },
        setHoverStyle: function(e) {
            var t = this.chart.data.datasets[e._datasetIndex], o = e._index, r = e.custom || {}, i = e._model;
            i.radius = r.hoverRadius || g.getValueAtIndexOrDefault(t.pointHoverRadius, o, this.chart.options.elements.point.hoverRadius), 
            i.backgroundColor = r.hoverBackgroundColor || g.getValueAtIndexOrDefault(t.pointHoverBackgroundColor, o, g.getHoverColor(i.backgroundColor)), 
            i.borderColor = r.hoverBorderColor || g.getValueAtIndexOrDefault(t.pointHoverBorderColor, o, g.getHoverColor(i.borderColor)), 
            i.borderWidth = r.hoverBorderWidth || g.getValueAtIndexOrDefault(t.pointHoverBorderWidth, o, i.borderWidth);
        },
        removeHoverStyle: function(e) {
            var t = this, o = t.chart.data.datasets[e._datasetIndex], r = e._index, i = e.custom || {}, n = e._model;
            void 0 !== o.radius && void 0 === o.pointRadius && (o.pointRadius = o.radius), n.radius = i.radius || g.getValueAtIndexOrDefault(o.pointRadius, r, t.chart.options.elements.point.radius), 
            n.backgroundColor = t.getPointBackgroundColor(e, r), n.borderColor = t.getPointBorderColor(e, r), 
            n.borderWidth = t.getPointBorderWidth(e, r);
        }
    });
};