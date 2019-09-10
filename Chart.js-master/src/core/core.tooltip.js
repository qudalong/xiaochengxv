module.exports = function(I) {
    var R = I.helpers;
    function S(t, e) {
        var o = R.color(t);
        return o.alpha(e * o.alpha()).rgbaString();
    }
    function r(t, e) {
        return e && (R.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
    }
    function L(t) {
        var e = I.defaults.global, o = R.getValueOrDefault;
        return {
            xPadding: t.xPadding,
            yPadding: t.yPadding,
            xAlign: t.xAlign,
            yAlign: t.yAlign,
            bodyFontColor: t.bodyFontColor,
            _bodyFontFamily: o(t.bodyFontFamily, e.defaultFontFamily),
            _bodyFontStyle: o(t.bodyFontStyle, e.defaultFontStyle),
            _bodyAlign: t.bodyAlign,
            bodyFontSize: o(t.bodyFontSize, e.defaultFontSize),
            bodySpacing: t.bodySpacing,
            titleFontColor: t.titleFontColor,
            _titleFontFamily: o(t.titleFontFamily, e.defaultFontFamily),
            _titleFontStyle: o(t.titleFontStyle, e.defaultFontStyle),
            titleFontSize: o(t.titleFontSize, e.defaultFontSize),
            _titleAlign: t.titleAlign,
            titleSpacing: t.titleSpacing,
            titleMarginBottom: t.titleMarginBottom,
            footerFontColor: t.footerFontColor,
            _footerFontFamily: o(t.footerFontFamily, e.defaultFontFamily),
            _footerFontStyle: o(t.footerFontStyle, e.defaultFontStyle),
            footerFontSize: o(t.footerFontSize, e.defaultFontSize),
            _footerAlign: t.footerAlign,
            footerSpacing: t.footerSpacing,
            footerMarginTop: t.footerMarginTop,
            caretSize: t.caretSize,
            cornerRadius: t.cornerRadius,
            backgroundColor: t.backgroundColor,
            opacity: 0,
            legendColorBackground: t.multiKeyBackground,
            displayColors: t.displayColors
        };
    }
    I.defaults.global.tooltips = {
        enabled: !0,
        custom: null,
        mode: "nearest",
        position: "average",
        intersect: !0,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontStyle: "bold",
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleFontColor: "#ffffff",
        titleAlign: "left",
        bodySpacing: 2,
        bodyFontColor: "#ffffff",
        bodyAlign: "left",
        footerFontStyle: "bold",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFontColor: "#ffffff",
        footerAlign: "left",
        yPadding: 6,
        xPadding: 6,
        caretSize: 5,
        cornerRadius: 6,
        multiKeyBackground: "#ffffff",
        displayColors: !0,
        callbacks: {
            beforeTitle: R.noop,
            title: function(t, e) {
                var o = "", i = e.labels, n = i ? i.length : 0;
                if (0 < t.length) {
                    var l = t[0];
                    l.xLabel ? o = l.xLabel : 0 < n && l.index < n && (o = i[l.index]);
                }
                return o;
            },
            afterTitle: R.noop,
            beforeBody: R.noop,
            beforeLabel: R.noop,
            label: function(t, e) {
                return (e.datasets[t.datasetIndex].label || "") + ": " + t.yLabel;
            },
            labelColor: function(t, e) {
                var o = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                return {
                    borderColor: o.borderColor,
                    backgroundColor: o.backgroundColor
                };
            },
            afterLabel: R.noop,
            afterBody: R.noop,
            beforeFooter: R.noop,
            footer: R.noop,
            afterFooter: R.noop
        }
    }, I.Tooltip = I.Element.extend({
        initialize: function() {
            this._model = L(this._options);
        },
        getTitle: function() {
            var t = this._options.callbacks, e = t.beforeTitle.apply(this, arguments), o = t.title.apply(this, arguments), i = t.afterTitle.apply(this, arguments), n = [];
            return n = r(n = r(n = r(n, e), o), i);
        },
        getBeforeBody: function() {
            var t = this._options.callbacks.beforeBody.apply(this, arguments);
            return R.isArray(t) ? t : void 0 !== t ? [ t ] : [];
        },
        getBody: function(t, o) {
            var i = this, n = i._options.callbacks, l = [];
            return R.each(t, function(t) {
                var e = {
                    before: [],
                    lines: [],
                    after: []
                };
                r(e.before, n.beforeLabel.call(i, t, o)), r(e.lines, n.label.call(i, t, o)), r(e.after, n.afterLabel.call(i, t, o)), 
                l.push(e);
            }), l;
        },
        getAfterBody: function() {
            var t = this._options.callbacks.afterBody.apply(this, arguments);
            return R.isArray(t) ? t : void 0 !== t ? [ t ] : [];
        },
        getFooter: function() {
            var t = this._options.callbacks, e = t.beforeFooter.apply(this, arguments), o = t.footer.apply(this, arguments), i = t.afterFooter.apply(this, arguments), n = [];
            return n = r(n = r(n = r(n, e), o), i);
        },
        update: function(t) {
            var e, o, i, n, l, r, a, f, d, c, y, g, s, h, u, p, F, b, S, x = this, _ = x._options, v = x._model, m = x._model = L(_), A = x._active, C = x._data, B = x._chartInstance, w = {
                xAlign: v.xAlign,
                yAlign: v.yAlign
            }, z = {
                x: v.x,
                y: v.y
            }, T = {
                width: v.width,
                height: v.height
            }, k = {
                x: v.caretX,
                y: v.caretY
            };
            if (A.length) {
                m.opacity = 1;
                var P = [];
                k = I.Tooltip.positioners[_.position](A, x._eventPosition);
                var M = [];
                for (e = 0, o = A.length; e < o; ++e) M.push((u = A[e], F = p = void 0, p = u._xScale, 
                F = u._yScale || u._scale, b = u._index, S = u._datasetIndex, {
                    xLabel: p ? p.getLabelForIndex(b, S) : "",
                    yLabel: F ? F.getLabelForIndex(b, S) : "",
                    index: b,
                    datasetIndex: S,
                    x: u._model.x,
                    y: u._model.y
                }));
                _.filter && (M = M.filter(function(t) {
                    return _.filter(t, C);
                })), _.itemSort && (M = M.sort(function(t, e) {
                    return _.itemSort(t, e, C);
                })), R.each(M, function(t) {
                    P.push(_.callbacks.labelColor.call(x, t, B));
                }), m.title = x.getTitle(M, C), m.beforeBody = x.getBeforeBody(M, C), m.body = x.getBody(M, C), 
                m.afterBody = x.getAfterBody(M, C), m.footer = x.getFooter(M, C), m.x = Math.round(k.x), 
                m.y = Math.round(k.y), m.caretPadding = R.getValueOrDefault(k.padding, 2), m.labelColors = P, 
                m.dataPoints = M, w = function(t, e) {
                    var o, i, n, l, r, a = t._model, f = t._chart, d = t._chartInstance.chartArea, c = "center", y = "center";
                    a.y < e.height ? y = "top" : a.y > f.height - e.height && (y = "bottom");
                    var g = (d.left + d.right) / 2, s = (d.top + d.bottom) / 2;
                    i = "center" === y ? (o = function(t) {
                        return t <= g;
                    }, function(t) {
                        return g < t;
                    }) : (o = function(t) {
                        return t <= e.width / 2;
                    }, function(t) {
                        return t >= f.width - e.width / 2;
                    }), n = function(t) {
                        return t + e.width > f.width;
                    }, l = function(t) {
                        return t - e.width < 0;
                    }, r = function(t) {
                        return t <= s ? "top" : "bottom";
                    }, o(a.x) ? (c = "left", n(a.x) && (c = "center", y = r(a.y))) : i(a.x) && (c = "right", 
                    l(a.x) && (c = "center", y = r(a.y)));
                    var h = t._options;
                    return {
                        xAlign: h.xAlign ? h.xAlign : c,
                        yAlign: h.yAlign ? h.yAlign : y
                    };
                }(this, T = function(t, e) {
                    var o = t._chart.ctx, i = 2 * e.yPadding, n = 0, l = e.body, r = l.reduce(function(t, e) {
                        return t + e.before.length + e.lines.length + e.after.length;
                    }, 0);
                    r += e.beforeBody.length + e.afterBody.length;
                    var a = e.title.length, f = e.footer.length, d = e.titleFontSize, c = e.bodyFontSize, y = e.footerFontSize;
                    i += a * d, i += a ? (a - 1) * e.titleSpacing : 0, i += a ? e.titleMarginBottom : 0, 
                    i += r * c, i += r ? (r - 1) * e.bodySpacing : 0, i += f ? e.footerMarginTop : 0, 
                    i += f * y, i += f ? (f - 1) * e.footerSpacing : 0;
                    var g = 0, s = function(t) {
                        n = Math.max(n, o.measureTextToolTip(t).width + g);
                    };
                    return o.font = R.fontString(d, e._titleFontStyle, e._titleFontFamily), o.setFontSize(d), 
                    R.each(e.title, s), o.font = R.fontString(c, e._bodyFontStyle, e._bodyFontFamily), 
                    o.setFontSize(c), R.each(e.beforeBody.concat(e.afterBody), s), g = e.displayColors ? c + 2 : 0, 
                    R.each(l, function(t) {
                        R.each(t.before, s), R.each(t.lines, s), R.each(t.after, s);
                    }), g = 0, o.font = R.fontString(y, e._footerFontStyle, e._footerFontFamily), o.setFontSize(y), 
                    R.each(e.footer, s), {
                        width: n += 2 * e.xPadding,
                        height: i
                    };
                }(this, m)), n = T, l = w, r = (i = m).x, a = i.y, f = i.caretSize, d = i.caretPadding, 
                c = i.cornerRadius, y = l.xAlign, g = l.yAlign, s = f + d, h = c + d, "right" === y ? r -= n.width : "center" === y && (r -= n.width / 2), 
                "top" === g ? a += s : a -= "bottom" === g ? n.height + s : n.height / 2, "center" === g ? "left" === y ? r += s : "right" === y && (r -= s) : "left" === y ? r -= h : "right" === y && (r += h), 
                z = {
                    x: r,
                    y: a
                };
            } else m.opacity = 0;
            return m.xAlign = w.xAlign, m.yAlign = w.yAlign, m.x = z.x, m.y = z.y, m.width = T.width, 
            m.height = T.height, m.caretX = k.x, m.caretY = k.y, x._model = m, t && _.custom && _.custom.call(x, m), 
            x;
        },
        drawCaret: function(t, e, o) {
            var i, n, l, r, a, f, d = this._view, c = this._chart.ctx, y = d.caretSize, g = d.cornerRadius, s = d.xAlign, h = d.yAlign, u = t.x, p = t.y, F = e.width, b = e.height;
            f = "center" === h ? (l = (n = "left" === s ? (i = u) - y : (i = u + F) + y, i), 
            r = (a = p + b / 2) - y, a + y) : (l = "left" === s ? (n = (i = u + g) + y) + y : "right" === s ? (n = (i = u + F - g) - y) - y : (i = (n = u + F / 2) - y, 
            n + y), a = "top" === h ? (r = p) - y : (r = p + b) + y, r), c.setFillStyle(S(d.backgroundColor, o)), 
            c.beginPath(), c.moveTo(i, r), c.lineTo(n, a), c.lineTo(l, f), c.closePath(), c.fill();
        },
        drawTitle: function(t, e, o, i) {
            var n = e.title;
            if (n.length) {
                o.textAlign = e._titleAlign, o.textBaseline = "top";
                var l, r, a = e.titleFontSize, f = e.titleSpacing;
                o.setFillStyle(S(e.titleFontColor, i)), o.font = R.fontString(a, e._titleFontStyle, e._titleFontFamily), 
                o.setFontSize(a);
                var d = 8;
                for (e.displayColors || (d = 13), l = 0, r = n.length; l < r; ++l) o.fillText(n[l], t.x, t.y + d), 
                t.y += a + f, l + 1 === n.length && (t.y += e.titleMarginBottom - f);
            }
        },
        drawBody: function(o, i, n, l) {
            var r = i.bodyFontSize, e = i.bodySpacing, t = i.body;
            n.textAlign = i._bodyAlign, n.textBaseline = "top";
            var a = S(i.bodyFontColor, l);
            n.setFillStyle(a), n.font = R.fontString(r, i._bodyFontStyle, i._bodyFontFamily), 
            n.setFontSize(r);
            var f = 0, d = function(t) {
                n.fillText(t, o.x + f, o.y + 10), o.y += r + e;
            };
            R.each(i.beforeBody, d);
            var c = i.displayColors;
            f = c ? r + 2 : 0, R.each(t, function(t, e) {
                R.each(t.before, d), R.each(t.lines, function(t) {
                    c && (n.setFillStyle(S(i.legendColorBackground, l)), n.fillRect(o.x, o.y, r, r), 
                    n.setStrokeStyle(S(i.labelColors[e].borderColor, l)), n.strokeRect(o.x, o.y, r, r), 
                    n.setFillStyle(S(i.labelColors[e].backgroundColor, l)), n.fillRect(o.x + 1, o.y + 1, r - 2, r - 2), 
                    n.setFillStyle(a)), d(t);
                }), R.each(t.after, d);
            }), f = 0, R.each(i.afterBody, d), o.y -= e;
        },
        drawFooter: function(e, o, i, t) {
            var n = o.footer;
            n.length && (e.y += o.footerMarginTop, i.textAlign = o._footerAlign, i.textBaseline = "top", 
            i.setFillStyle(S(o.footerFontColor, t)), i.font = R.fontString(o.footerFontSize, o._footerFontStyle, o._footerFontFamily), 
            i.setFontSize(o.footerFontSize), R.each(n, function(t) {
                i.fillText(t, e.x, e.y), e.y += o.footerFontSize + o.footerSpacing;
            }));
        },
        drawBackground: function(t, e, o, i, n) {
            o.setFillStyle(S(e.backgroundColor, n)), R.drawRoundedRectangle(o, t.x, t.y, i.width, i.height, e.cornerRadius), 
            o.fill();
        },
        draw: function() {
            var t = this._chart.ctx, e = this._view;
            if (0 !== e.opacity) {
                var o = {
                    width: e.width,
                    height: e.height
                }, i = {
                    x: e.x,
                    y: e.y
                }, n = Math.abs(e.opacity < .001) ? 0 : e.opacity;
                this._options.enabled && (this.drawBackground(i, e, t, o, n), this.drawCaret(i, o, n), 
                i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, n), this.drawBody(i, e, t, n), 
                this.drawFooter(i, e, t, n));
            }
        },
        handleEvent: function(t) {
            var e = this, o = e._options, i = !1;
            if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chartInstance.getElementsAtEventForMode(t, o.mode, o), 
            i = !R.arrayEquals(e._active, e._lastActive), e._lastActive = e._active, o.enabled || o.custom) {
                e._eventPosition = R.getRelativePosition(t, e._chart);
                var n = e._model;
                e.update(!0), e.pivot(), i |= n.x !== e._model.x || n.y !== e._model.y;
            }
            return i;
        }
    }), I.Tooltip.positioners = {
        average: function(t) {
            if (!t.length) return !1;
            var e, o, i = 0, n = 0, l = 0;
            for (e = 0, o = t.length; e < o; ++e) {
                var r = t[e];
                if (r && r.hasValue()) {
                    var a = r.tooltipPosition();
                    i += a.x, n += a.y, ++l;
                }
            }
            return {
                x: Math.round(i / l),
                y: Math.round(n / l)
            };
        },
        nearest: function(t, e) {
            var o, i, n, l = e.x, r = e.y, a = Number.POSITIVE_INFINITY;
            for (i = 0, n = t.length; i < n; ++i) {
                var f = t[i];
                if (f && f.hasValue()) {
                    var d = f.getCenterPoint(), c = R.distanceBetweenPoints(e, d);
                    c < a && (a = c, o = f);
                }
            }
            if (o) {
                var y = o.tooltipPosition();
                l = y.x, r = y.y;
            }
            return {
                x: l,
                y: r
            };
        }
    };
};