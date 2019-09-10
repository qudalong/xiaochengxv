module.exports = function(W) {
    var L = W.helpers, e = L.noop;
    function k(e, t) {
        return e.usePointStyle ? t * Math.SQRT2 : e.boxWidth;
    }
    W.defaults.global.legend = {
        display: !0,
        displayFixed: !0,
        position: "top",
        fullWidth: !0,
        reverse: !1,
        onClick: function(e, t) {
            var i = t.datasetIndex, n = this.chart, l = n.getDatasetMeta(i);
            l.hidden = null === l.hidden ? !n.data.datasets[i].hidden : null, n.update();
        },
        onHover: null,
        labels: {
            boxWidth: 40,
            padding: 10,
            generateLabels: function(i) {
                var e = i.data;
                return L.isArray(e.datasets) ? e.datasets.map(function(e, t) {
                    return {
                        text: e.label,
                        fillStyle: L.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
                        hidden: !i.isDatasetVisible(t),
                        lineCap: e.borderCapStyle,
                        lineDash: e.borderDash,
                        lineDashOffset: e.borderDashOffset,
                        lineJoin: e.borderJoinStyle,
                        lineWidth: e.borderWidth,
                        strokeStyle: e.borderColor,
                        pointStyle: e.pointStyle,
                        datasetIndex: t
                    };
                }, this) : [];
            }
        }
    }, W.Legend = W.Element.extend({
        initialize: function(e) {
            L.extend(this, e), this.legendHitBoxes = [], this.doughnutMode = !1;
        },
        beforeUpdate: e,
        update: function(e, t, i) {
            var n = this;
            return n.beforeUpdate(), n.maxWidth = e, n.maxHeight = t, n.margins = i, n.beforeSetDimensions(), 
            n.setDimensions(), n.afterSetDimensions(), n.beforeBuildLabels(), n.buildLabels(), 
            n.afterBuildLabels(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize;
        },
        afterUpdate: e,
        beforeSetDimensions: e,
        setDimensions: function() {
            var e = this;
            e.isHorizontal() ? (e.width = e.maxWidth, e.left = 0, e.right = e.width) : (e.height = e.maxHeight, 
            e.top = 0, e.bottom = e.height), e.paddingLeft = 0, e.paddingTop = 0, e.paddingRight = 0, 
            e.paddingBottom = 0, e.minSize = {
                width: 0,
                height: 0
            };
        },
        afterSetDimensions: e,
        beforeBuildLabels: e,
        buildLabels: function() {
            var e = this;
            e.legendItems = e.options.labels.generateLabels.call(e, e.chart), e.options.reverse && e.legendItems.reverse();
        },
        afterBuildLabels: e,
        beforeFit: e,
        fit: function() {
            var n = this, e = n.options, l = e.labels, t = e.display, o = n.ctx, i = W.defaults.global, a = L.getValueOrDefault, d = a(l.fontSize, i.defaultFontSize), s = a(l.fontStyle, i.defaultFontStyle), r = a(l.fontFamily, i.defaultFontFamily), h = L.fontString(d, s, r), f = n.legendHitBoxes = [], g = n.minSize, u = n.isHorizontal();
            if (g.height = u ? (g.width = n.maxWidth, t ? 10 : 0) : (g.width = t ? 10 : 0, n.maxHeight), 
            t) if (o.font = h, o.setFontSize(d), u) {
                var p = n.lineWidths = [ 0 ], c = n.legendItems.length ? d + l.padding : 0;
                o.textAlign = "left", o.textBaseline = "top", L.each(n.legendItems, function(e, t) {
                    var i = k(l, d) + d / 2 + o.measureText(e.text).width;
                    p[p.length - 1] + i + l.padding >= n.width && (c += d + l.padding, p[p.length] = n.left), 
                    f[t] = {
                        left: 0,
                        top: 0,
                        width: i,
                        height: d
                    }, p[p.length - 1] += i + l.padding;
                }), g.height += c;
            } else {
                var b = l.padding, m = n.columnWidths = [], x = l.padding, y = 0, S = 0, v = d + b;
                L.each(n.legendItems, function(e, t) {
                    var i = k(l, d) + d / 2 + o.measureText(e.text).width;
                    S + v > g.height && (x += y + l.padding, m.push(y), S = y = 0), y = Math.max(y, i), 
                    S += v, f[t] = {
                        left: 0,
                        top: 0,
                        width: i,
                        height: d
                    };
                }), x += y, m.push(y), g.width += x;
            }
            n.width = g.width, n.height = g.height;
        },
        afterFit: e,
        isHorizontal: function() {
            return "top" === this.options.position || "bottom" === this.options.position;
        },
        draw: function() {
            var h = this, f = h.options, g = f.labels, u = W.defaults.global, p = u.elements.line, c = h.width, b = h.lineWidths;
            if (f.display) {
                var m, x = h.ctx, y = L.getValueOrDefault, e = y(g.fontColor, u.defaultFontColor), S = y(g.fontSize, u.defaultFontSize), t = y(g.fontStyle, u.defaultFontStyle), i = y(g.fontFamily, u.defaultFontFamily), n = L.fontString(S, t, i);
                x.textAlign = "left", x.textBaseline = "top", x.setLineWidth(.5), x.setStrokeStyle(e), 
                x.setFillStyle(e), x.font = n, x.setFontSize(S);
                var v = k(g, S), D = h.legendHitBoxes, F = h.isHorizontal();
                m = F ? {
                    x: h.left + (c - b[0]) / 2,
                    y: h.top + g.padding,
                    line: 0
                } : {
                    x: h.left + g.padding,
                    y: h.top + g.padding,
                    line: 0
                };
                var w = S + g.padding;
                L.each(h.legendItems, function(e, t) {
                    var i, n, l, o, a = x.measureText(e.text).width, d = v + S / 2 + a, s = m.x, r = m.y;
                    F ? c <= s + d && (r = m.y += w, m.line++, s = m.x = h.left + (c - b[m.line]) / 2) : r + w > h.bottom && (s = m.x = s + h.columnWidths[m.line] + g.padding, 
                    r = m.y = h.top, m.line++), function(e, t, i) {
                        if (!(isNaN(v) || v <= 0) && f.displayFixed) {
                            x.save(), x.setFillStyle(y(i.fillStyle, u.defaultColor)), x.setLineCap(y(i.lineCap, p.borderCapStyle)), 
                            x.lineDashOffset = y(i.lineDashOffset, p.borderDashOffset), x.setLineJoin(y(i.lineJoin, p.borderJoinStyle)), 
                            x.setLineWidth(y(i.lineWidth, p.borderWidth)), x.setStrokeStyle(y(i.strokeStyle, u.defaultColor));
                            var n = 0 === y(i.lineWidth, p.borderWidth);
                            if (x.setLineDash && x.setLineDash(y(i.lineDash, p.borderDash)), f.labels && f.labels.usePointStyle) {
                                var l = S * Math.SQRT2 / 2, o = l / Math.SQRT2, a = e + o, d = t + o;
                                W.canvasHelpers.drawPoint(x, i.pointStyle, l, a, d);
                            } else n || x.strokeRect(e, t, v, S), x.fillRect(e, t, v, S);
                            x.restore();
                        }
                    }(s, r, e), D[t].left = s, D[t].top = r, i = s, n = r, l = e, o = a, x.fillText(l.text, v + S / 2 + i, n + 10), 
                    l.hidden && (x.beginPath(), x.setLineWidth(2), x.moveTo(v + S / 2 + i, n + S / 2), 
                    x.lineTo(v + S / 2 + i + o, n + S / 2), x.stroke()), F ? m.x += d + g.padding : m.y += w;
                });
            }
        },
        handleEvent: function(e) {
            var t = this, i = t.options, n = "mouseup" === e.type ? "click" : e.type, l = !1;
            if ("mousemove" === n) {
                if (!i.onHover) return;
            } else {
                if ("click" !== n && "touchstart" != n) return;
                if (!i.onClick) return;
            }
            var o = L.getRelativePosition(e, t.chart.chart), a = o.x, d = o.y;
            if (a >= t.left && a <= t.right && d >= t.top && d <= t.bottom) for (var s = t.legendHitBoxes, r = 0; r < s.length; ++r) {
                var h = s[r];
                if (a >= h.left && a <= h.left + h.width && d >= h.top && d <= h.top + h.height) {
                    if ("click" === n || "touchstart" == n) {
                        i.onClick.call(t, e, t.legendItems[r]), l = !0;
                        break;
                    }
                    if ("mousemove" === n) {
                        i.onHover.call(t, e, t.legendItems[r]), l = !0;
                        break;
                    }
                }
            }
            return l;
        }
    }), W.plugins.register({
        beforeInit: function(e) {
            var t = e.options.legend;
            t && (e.legend = new W.Legend({
                ctx: e.chart.ctx,
                options: t,
                chart: e
            }), W.layoutService.addBox(e, e.legend));
        }
    });
};