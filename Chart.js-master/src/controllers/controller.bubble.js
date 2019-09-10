var m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(x) {
    var y = x.helpers;
    x.defaults.bubble = {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [ {
                type: "linear",
                position: "bottom",
                id: "x-axis-0"
            } ],
            yAxes: [ {
                type: "linear",
                position: "left",
                id: "y-axis-0"
            } ]
        },
        tooltips: {
            callbacks: {
                title: function() {
                    return "";
                },
                label: function(t, e) {
                    var a = e.datasets[t.datasetIndex].label || "", o = e.datasets[t.datasetIndex].data[t.index];
                    return a + ": (" + t.xLabel + ", " + t.yLabel + ", " + o.r + ")";
                }
            }
        }
    }, x.controllers.bubble = x.DatasetController.extend({
        dataElementType: x.elements.Point,
        update: function(a) {
            var o = this, t = o.getMeta().data;
            y.each(t, function(t, e) {
                o.updateElement(t, e, a);
            });
        },
        updateElement: function(t, e, a) {
            var o = this, i = o.getMeta(), s = o.getScaleForId(i.xAxisID), r = o.getScaleForId(i.yAxisID), l = t.custom || {}, n = o.getDataset(), d = n.data[e], u = o.chart.options.elements.point, c = o.index;
            y.extend(t, {
                _xScale: s,
                _yScale: r,
                _datasetIndex: c,
                _index: e,
                _model: {
                    x: a ? s.getPixelForDecimal(.5) : s.getPixelForValue("object" === (void 0 === d ? "undefined" : m(d)) ? d : NaN, e, c, o.chart.isCombo),
                    y: a ? r.getBasePixel() : r.getPixelForValue(d, e, c),
                    radius: a ? 0 : l.radius ? l.radius : o.getRadius(d),
                    hitRadius: l.hitRadius ? l.hitRadius : y.getValueAtIndexOrDefault(n.hitRadius, e, u.hitRadius)
                }
            }), x.DatasetController.prototype.removeHoverStyle.call(o, t, u);
            var p = t._model;
            p.skip = l.skip ? l.skip : isNaN(p.x) || isNaN(p.y), t.pivot();
        },
        getRadius: function(t) {
            return t.r || this.chart.options.elements.point.radius;
        },
        setHoverStyle: function(t) {
            var e = this;
            x.DatasetController.prototype.setHoverStyle.call(e, t);
            var a = e.chart.data.datasets[t._datasetIndex], o = t._index, i = t.custom || {};
            t._model.radius = i.hoverRadius ? i.hoverRadius : y.getValueAtIndexOrDefault(a.hoverRadius, o, e.chart.options.elements.point.hoverRadius) + e.getRadius(a.data[o]);
        },
        removeHoverStyle: function(t) {
            var e = this;
            x.DatasetController.prototype.removeHoverStyle.call(e, t, e.chart.options.elements.point);
            var a = e.chart.data.datasets[t._datasetIndex].data[t._index], o = t.custom || {};
            t._model.radius = o.radius ? o.radius : e.getRadius(a);
        }
    });
};