module.exports = function(e) {
    var S = e.helpers, t = e.defaults;
    t.doughnut = {
        animation: {
            animateRotate: !0,
            animateScale: !1
        },
        aspectRatio: 1,
        hover: {
            mode: "single"
        },
        legendCallback: function(t) {
            var e = [];
            e.push('<ul class="' + t.id + '-legend">');
            var a = t.data, r = a.datasets, n = a.labels;
            if (r.length) for (var o = 0; o < r[0].data.length; ++o) e.push('<li><span style="background-color:' + r[0].backgroundColor[o] + '"></span>'), 
            n[o] && e.push(n[o]), e.push("</li>");
            return e.push("</ul>"), e.join("");
        },
        legend: {
            labels: {
                generateLabels: function(l) {
                    var s = l.data;
                    return s.labels.length && s.datasets.length ? s.labels.map(function(t, e) {
                        var a = l.getDatasetMeta(0), r = s.datasets[0], n = a.data[e], o = n && n.custom || {}, i = S.getValueAtIndexOrDefault, d = l.options.elements.arc;
                        return {
                            text: t,
                            fillStyle: o.backgroundColor ? o.backgroundColor : i(r.backgroundColor, e, d.backgroundColor),
                            strokeStyle: o.borderColor ? o.borderColor : i(r.borderColor, e, d.borderColor),
                            lineWidth: o.borderWidth ? o.borderWidth : i(r.borderWidth, e, d.borderWidth),
                            hidden: isNaN(r.data[e]) || a.data[e].hidden,
                            index: e
                        };
                    }) : [];
                }
            },
            onClick: function(t, e) {
                var a, r, n, o = e.index, i = this.chart;
                for (a = 0, r = (i.data.datasets || []).length; a < r; ++a) (n = i.getDatasetMeta(a)).data[o] && (n.data[o].hidden = !n.data[o].hidden);
                i.update();
            }
        },
        cutoutPercentage: 50,
        rotation: -.5 * Math.PI,
        circumference: 2 * Math.PI,
        tooltips: {
            callbacks: {
                title: function() {
                    return "";
                },
                label: function(t, e) {
                    var a = e.labels[t.index], r = ": " + e.datasets[t.datasetIndex].data[t.index];
                    return S.isArray(a) ? (a = a.slice())[0] += r : a += r, a;
                }
            }
        }
    }, t.pie = S.clone(t.doughnut), S.extend(t.pie, {
        cutoutPercentage: 0
    }), e.controllers.doughnut = e.controllers.pie = e.DatasetController.extend({
        dataElementType: e.elements.Arc,
        linkScales: S.noop,
        getRingIndex: function(t) {
            for (var e = 0, a = 0; a < t; ++a) this.chart.isDatasetVisible(a) && ++e;
            return e;
        },
        update: function(a) {
            var r = this, t = r.chart, e = t.chartArea, n = t.options, o = n.elements.arc, i = e.right - e.left - o.borderWidth, d = e.bottom - e.top - o.borderWidth, l = Math.min(i, d), s = {
                x: 0,
                y: 0
            }, u = r.getMeta(), h = n.cutoutPercentage, c = n.circumference;
            if (c < 2 * Math.PI) {
                var g = n.rotation % (2 * Math.PI), f = (g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0)) + c, m = Math.cos(g), M = Math.sin(g), b = Math.cos(f), p = Math.sin(f), x = g <= 0 && 0 <= f || g <= 2 * Math.PI && 2 * Math.PI <= f, I = g <= .5 * Math.PI && .5 * Math.PI <= f || g <= 2.5 * Math.PI && 2.5 * Math.PI <= f, P = g <= -Math.PI && -Math.PI <= f || g <= Math.PI && Math.PI <= f, v = g <= .5 * -Math.PI && .5 * -Math.PI <= f || g <= 1.5 * Math.PI && 1.5 * Math.PI <= f, R = h / 100, C = P ? -1 : Math.min(m * (m < 0 ? 1 : R), b * (b < 0 ? 1 : R)), y = v ? -1 : Math.min(M * (M < 0 ? 1 : R), p * (p < 0 ? 1 : R)), W = x ? 1 : Math.max(m * (0 < m ? 1 : R), b * (0 < b ? 1 : R)), A = I ? 1 : Math.max(M * (0 < M ? 1 : R), p * (0 < p ? 1 : R)), k = .5 * (W - C), D = .5 * (A - y);
                l = Math.min(i / k, d / D), s = {
                    x: -.5 * (W + C),
                    y: -.5 * (A + y)
                };
            }
            t.borderWidth = r.getMaxBorderWidth(u.data), t.outerRadius = Math.max((l - t.borderWidth) / 2, 0), 
            t.innerRadius = Math.max(h ? t.outerRadius / 100 * h : 1, 0), t.radiusLength = (t.outerRadius - t.innerRadius) / t.getVisibleDatasetCount(), 
            t.offsetX = s.x * t.outerRadius, t.offsetY = s.y * t.outerRadius, u.total = r.calculateTotal(), 
            r.outerRadius = t.outerRadius - t.radiusLength * r.getRingIndex(r.index), r.innerRadius = r.outerRadius - t.radiusLength, 
            S.each(u.data, function(t, e) {
                r.updateElement(t, e, a);
            });
        },
        updateElement: function(t, e, a) {
            var r = this, n = r.chart, o = n.chartArea, i = n.options, d = i.animation, l = (o.left + o.right) / 2, s = (o.top + o.bottom) / 2, u = i.rotation, h = i.rotation, c = r.getDataset(), g = a && d.animateRotate ? 0 : t.hidden ? 0 : r.calculateCircumference(c.data[e]) * (i.circumference / (2 * Math.PI)), f = a && d.animateScale ? 0 : r.innerRadius, m = a && d.animateScale ? 0 : r.outerRadius, M = S.getValueAtIndexOrDefault;
            S.extend(t, {
                _datasetIndex: r.index,
                _index: e,
                _model: {
                    x: l + n.offsetX,
                    y: s + n.offsetY,
                    startAngle: u,
                    endAngle: h,
                    circumference: g,
                    outerRadius: m,
                    innerRadius: f,
                    label: M(c.label, e, n.data.labels[e])
                }
            });
            var b = t._model;
            this.removeHoverStyle(t), a && d.animateRotate || (b.startAngle = 0 === e ? i.rotation : r.getMeta().data[e - 1]._model.endAngle, 
            b.endAngle = b.startAngle + b.circumference), t.pivot();
        },
        removeHoverStyle: function(t) {
            e.DatasetController.prototype.removeHoverStyle.call(this, t, this.chart.options.elements.arc);
        },
        calculateTotal: function() {
            var a, r = this.getDataset(), t = this.getMeta(), n = 0;
            return S.each(t.data, function(t, e) {
                a = r.data[e], isNaN(a) || t.hidden || (n += Math.abs(a));
            }), n;
        },
        calculateCircumference: function(t) {
            var e = this.getMeta().total;
            return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
        },
        getMaxBorderWidth: function(t) {
            for (var e, a, r = 0, n = this.index, o = t.length, i = 0; i < o; i++) r = (r = r < (e = t[i]._model ? t[i]._model.borderWidth : 0) ? e : r) < (a = t[i]._chart ? t[i]._chart.config.data.datasets[n].hoverBorderWidth : 0) ? a : r;
            return r;
        }
    });
};