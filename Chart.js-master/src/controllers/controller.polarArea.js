module.exports = function(t) {
    var k = t.helpers;
    t.defaults.polarArea = {
        scale: {
            type: "radialLinear",
            lineArc: !0,
            ticks: {
                beginAtZero: !0
            }
        },
        animation: {
            animateRotate: !0,
            animateScale: !0
        },
        startAngle: -.5 * Math.PI,
        aspectRatio: 1,
        legendCallback: function(e) {
            var t = [];
            t.push('<ul class="' + e.id + '-legend">');
            var a = e.data, n = a.datasets, r = a.labels;
            if (n.length) for (var o = 0; o < n[0].data.length; ++o) t.push('<li><span style="background-color:' + n[0].backgroundColor[o] + '"></span>'), 
            r[o] && t.push(r[o]), t.push("</li>");
            return t.push("</ul>"), t.join("");
        },
        legend: {
            labels: {
                generateLabels: function(l) {
                    var d = l.data;
                    return d.labels.length && d.datasets.length ? d.labels.map(function(e, t) {
                        var a = l.getDatasetMeta(0), n = d.datasets[0], r = a.data[t].custom || {}, o = k.getValueAtIndexOrDefault, i = l.options.elements.arc;
                        return {
                            text: e,
                            fillStyle: r.backgroundColor ? r.backgroundColor : o(n.backgroundColor, t, i.backgroundColor),
                            strokeStyle: r.borderColor ? r.borderColor : o(n.borderColor, t, i.borderColor),
                            lineWidth: r.borderWidth ? r.borderWidth : o(n.borderWidth, t, i.borderWidth),
                            hidden: isNaN(n.data[t]) || a.data[t].hidden,
                            index: t
                        };
                    }) : [];
                }
            },
            onClick: function(e, t) {
                var a, n, r, o = t.index, i = this.chart;
                for (a = 0, n = (i.data.datasets || []).length; a < n; ++a) (r = i.getDatasetMeta(a)).data[o].hidden = !r.data[o].hidden;
                i.update();
            }
        },
        tooltips: {
            callbacks: {
                title: function() {
                    return "";
                },
                label: function(e, t) {
                    return t.labels[e.index] + ": " + e.yLabel;
                }
            }
        }
    }, t.controllers.polarArea = t.DatasetController.extend({
        dataElementType: t.elements.Arc,
        linkScales: k.noop,
        update: function(a) {
            var n = this, e = n.chart, t = e.chartArea, r = n.getMeta(), o = e.options, i = o.elements.arc, l = Math.min(t.right - t.left, t.bottom - t.top);
            e.outerRadius = Math.max((l - i.borderWidth / 2) / 2, 0), e.innerRadius = Math.max(o.cutoutPercentage ? e.outerRadius / 100 * o.cutoutPercentage : 1, 0), 
            e.radiusLength = (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount(), n.outerRadius = e.outerRadius - e.radiusLength * n.index, 
            n.innerRadius = n.outerRadius - e.radiusLength, r.count = n.countVisibleElements(), 
            k.each(r.data, function(e, t) {
                n.updateElement(e, t, a);
            });
        },
        updateElement: function(e, t, a) {
            for (var n = this, r = n.chart, o = n.getDataset(), i = r.options, l = i.animation, d = r.scale, s = k.getValueAtIndexOrDefault, u = r.data.labels, c = n.calculateCircumference(o.data[t]), h = d.xCenter, g = d.yCenter, b = 0, m = n.getMeta(), p = 0; p < t; ++p) isNaN(o.data[p]) || m.data[p].hidden || ++b;
            var f = i.startAngle, C = e.hidden ? 0 : d.getDistanceFromCenterForValue(o.data[t]), v = f + c * b, x = v + (e.hidden ? 0 : c), R = l.animateScale ? 0 : d.getDistanceFromCenterForValue(o.data[t]);
            k.extend(e, {
                _datasetIndex: n.index,
                _index: t,
                _scale: d,
                _model: {
                    x: h,
                    y: g,
                    innerRadius: 0,
                    outerRadius: a ? R : C,
                    startAngle: a && l.animateRotate ? f : v,
                    endAngle: a && l.animateRotate ? f : x,
                    label: s(u, t, u[t])
                }
            }), n.removeHoverStyle(e), e.pivot();
        },
        removeHoverStyle: function(e) {
            t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc);
        },
        countVisibleElements: function() {
            var a = this.getDataset(), e = this.getMeta(), n = 0;
            return k.each(e.data, function(e, t) {
                isNaN(a.data[t]) || e.hidden || n++;
            }), n;
        },
        calculateCircumference: function(e) {
            var t = this.getMeta().count;
            return 0 < t && !isNaN(e) ? 2 * Math.PI / t : 0;
        }
    });
};