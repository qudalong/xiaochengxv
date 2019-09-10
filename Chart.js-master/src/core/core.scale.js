var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(Z) {
    var j = Z.helpers;
    Z.defaults.scale = {
        display: !0,
        position: "left",
        gridLines: {
            display: !0,
            color: "rgba(0, 0, 0, 0.1)",
            lineWidth: 1,
            drawBorder: !0,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickMarkLength: 10,
            zeroLineWidth: 1,
            zeroLineColor: "rgba(0,0,0,0.25)",
            offsetGridLines: !1,
            borderDash: [],
            borderDashOffset: 0
        },
        scaleLabel: {
            labelString: "",
            display: !1
        },
        ticks: {
            beginAtZero: !1,
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            padding: 10,
            reverse: !1,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 0,
            labelOffset: 0,
            callback: Z.Ticks.formatters.values
        }
    }, Z.Scale = Z.Element.extend({
        beforeUpdate: function() {
            j.callCallback(this.options.beforeUpdate, [ this ]);
        },
        update: function(t, i, e) {
            var a = this;
            return a.beforeUpdate(), a.maxWidth = t, a.maxHeight = i, a.margins = j.extend({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, e), a.beforeSetDimensions(), a.setDimensions(), a.afterSetDimensions(), a.beforeDataLimits(), 
            a.determineDataLimits(), a.afterDataLimits(), a.beforeBuildTicks(), a.buildTicks(), 
            a.afterBuildTicks(), a.beforeTickToLabelConversion(), a.convertTicksToLabels(), 
            a.afterTickToLabelConversion(), a.beforeCalculateTickRotation(), a.calculateTickRotation(), 
            a.afterCalculateTickRotation(), a.beforeFit(), a.fit(), a.afterFit(), a.afterUpdate(), 
            a.minSize;
        },
        afterUpdate: function() {
            j.callCallback(this.options.afterUpdate, [ this ]);
        },
        beforeSetDimensions: function() {
            j.callCallback(this.options.beforeSetDimensions, [ this ]);
        },
        setDimensions: function() {
            var t = this;
            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, 
            t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, 
            t.paddingBottom = 0;
        },
        afterSetDimensions: function() {
            j.callCallback(this.options.afterSetDimensions, [ this ]);
        },
        beforeDataLimits: function() {
            j.callCallback(this.options.beforeDataLimits, [ this ]);
        },
        determineDataLimits: j.noop,
        afterDataLimits: function() {
            j.callCallback(this.options.afterDataLimits, [ this ]);
        },
        beforeBuildTicks: function() {
            j.callCallback(this.options.beforeBuildTicks, [ this ]);
        },
        buildTicks: j.noop,
        afterBuildTicks: function() {
            j.callCallback(this.options.afterBuildTicks, [ this ]);
        },
        beforeTickToLabelConversion: function() {
            j.callCallback(this.options.beforeTickToLabelConversion, [ this ]);
        },
        convertTicksToLabels: function() {
            var t = this, i = t.options.ticks;
            t.ticks = t.ticks.map(i.userCallback || i.callback);
        },
        afterTickToLabelConversion: function() {
            j.callCallback(this.options.afterTickToLabelConversion, [ this ]);
        },
        beforeCalculateTickRotation: function() {
            j.callCallback(this.options.beforeCalculateTickRotation, [ this ]);
        },
        calculateTickRotation: function() {
            var t = this, i = t.ctx, e = Z.defaults.global, a = t.options.ticks, o = j.getValueOrDefault(a.fontSize, e.defaultFontSize), l = j.getValueOrDefault(a.fontStyle, e.defaultFontStyle), n = j.getValueOrDefault(a.fontFamily, e.defaultFontFamily), s = j.fontString(o, l, n);
            i.font = s, i.setFontSize(o);
            var r, d = i.measureText(t.ticks[0]).width, f = i.measureText(t.ticks[t.ticks.length - 1]).width;
            if (t.labelRotation = a.minRotation || 0, t.paddingRight = 0, t.paddingLeft = 0, 
            t.options.display && t.isHorizontal()) {
                t.paddingRight = f / 2 + 3, t.paddingLeft = d / 2 + 3, t.longestTextCache || (t.longestTextCache = {});
                for (var h, g, c = j.longestText(i, s, t.ticks, t.longestTextCache), u = c, p = t.getPixelForTick(1) - t.getPixelForTick(0) - 6; p < u && t.labelRotation < a.maxRotation; ) {
                    if (h = Math.cos(j.toRadians(t.labelRotation)), g = Math.sin(j.toRadians(t.labelRotation)), 
                    (r = h * d) + o / 2 > t.yLabelWidth && (t.paddingLeft = r + o / 2), t.paddingRight = o / 2, 
                    g * c > t.maxHeight) {
                        t.labelRotation--;
                        break;
                    }
                    t.labelRotation++, u = h * c;
                }
            }
            t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0));
        },
        afterCalculateTickRotation: function() {
            j.callCallback(this.options.afterCalculateTickRotation, [ this ]);
        },
        beforeFit: function() {
            j.callCallback(this.options.beforeFit, [ this ]);
        },
        fit: function() {
            var t = this, i = t.minSize = {
                width: 0,
                height: 0
            }, e = t.options, a = Z.defaults.global, o = e.ticks, l = e.scaleLabel, n = e.gridLines, s = e.display, r = t.isHorizontal(), d = j.getValueOrDefault(o.fontSize, a.defaultFontSize), f = j.getValueOrDefault(o.fontStyle, a.defaultFontStyle), h = j.getValueOrDefault(o.fontFamily, a.defaultFontFamily), g = j.fontString(d, f, h), c = j.getValueOrDefault(l.fontSize, a.defaultFontSize), u = e.gridLines.tickMarkLength;
            if (i.width = r ? t.isFullWidth() ? t.maxWidth - t.margins.left - t.margins.right : t.maxWidth : s && n.drawTicks ? u : 0, 
            i.height = r ? s && n.drawTicks ? u : 0 : t.maxHeight, l.display && s && (r ? i.height += 1.5 * c : i.width += 1.5 * c), 
            o.display && s) {
                t.longestTextCache || (t.longestTextCache = {});
                var p = j.longestText(t.ctx, g, t.ticks, t.longestTextCache), b = j.numberOfLabelLines(t.ticks), m = .5 * d;
                if (r) {
                    t.longestLabelWidth = p;
                    var k = Math.sin(j.toRadians(t.labelRotation)) * t.longestLabelWidth + d * b + m * b;
                    i.height = Math.min(t.maxHeight, i.height + k), t.ctx.font = g, t.ctx.setFontSize(d);
                    var x = t.ctx.measureTextXscale(t.ticks[0]).width, T = t.ctx.measureTextXscale(t.ticks[t.ticks.length - 1]).width, L = Math.cos(j.toRadians(t.labelRotation)), y = Math.sin(j.toRadians(t.labelRotation));
                    t.labelRotation = 0, t.labelRotation = 0, t.paddingLeft = 0 !== t.labelRotation ? L * x + 3 : x / 2 + 3, 
                    t.paddingRight = 0 !== t.labelRotation ? y * (d / 2) + 3 : T / 2 + 3;
                } else {
                    var v = t.maxWidth - i.width;
                    o.mirror ? p = 0 : p += t.options.ticks.padding, p < v ? i.width += p : i.width = t.maxWidth, 
                    t.paddingTop = d / 2, t.paddingBottom = d / 2;
                }
            }
            t.margins && (t.paddingLeft = Math.max(t.paddingLeft - t.margins.left, 0), t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0), 
            t.paddingRight = Math.max(t.paddingRight - t.margins.right, 0), t.paddingBottom = Math.max(t.paddingBottom - t.margins.bottom, 0)), 
            t.width = i.width, t.height = i.height;
        },
        afterFit: function() {
            j.callCallback(this.options.afterFit, [ this ]);
        },
        isHorizontal: function() {
            return "top" === this.options.position || "bottom" === this.options.position;
        },
        isFullWidth: function() {
            return this.options.fullWidth;
        },
        getRightValue: function(t) {
            return null == t ? NaN : "number" != typeof t || isFinite(t) ? "object" === (void 0 === t ? "undefined" : i(t)) ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN;
        },
        getLabelForIndex: j.noop,
        getPixelForValue: j.noop,
        getValueForPixel: j.noop,
        getPixelForTick: function(t, i) {
            var e = this;
            if (e.isHorizontal()) {
                var a = (e.width - (e.paddingLeft + e.paddingRight)) / Math.max(e.ticks.length - (e.options.gridLines.offsetGridLines ? 0 : 1), 1), o = a * t + e.paddingLeft;
                i && (o += a / 2);
                var l = e.left + Math.round(o);
                return l += e.isFullWidth() ? e.margins.left : 0;
            }
            var n = e.height - (e.paddingTop + e.paddingBottom);
            return e.top + t * (n / (e.ticks.length - 1));
        },
        getPixelForDecimal: function(t) {
            var i = this;
            if (i.isHorizontal()) {
                var e = (i.width - (i.paddingLeft + i.paddingRight)) * t + i.paddingLeft, a = i.left + Math.round(e);
                return a += i.isFullWidth() ? i.margins.left : 0;
            }
            return i.top + t * i.height;
        },
        getBasePixel: function() {
            var t = this.min, i = this.max;
            return this.getPixelForValue(this.beginAtZero ? 0 : t < 0 && i < 0 ? i : 0 < t && 0 < i ? t : 0);
        },
        draw: function(x, l) {
            var T = this, L = T.options;
            if (L.display) {
                var y, t, n = T.ctx, i = Z.defaults.global, v = L.ticks, S = L.gridLines, e = L.scaleLabel, D = 0 !== T.labelRotation, a = v.autoSkip, F = T.isHorizontal();
                v.maxTicksLimit && (t = v.maxTicksLimit);
                var o = j.getValueOrDefault(v.fontColor, i.defaultFontColor), s = j.getValueOrDefault(v.fontSize, i.defaultFontSize), r = j.getValueOrDefault(v.fontStyle, i.defaultFontStyle), d = j.getValueOrDefault(v.fontFamily, i.defaultFontFamily), f = j.fontString(s, r, d), R = S.tickMarkLength, C = j.getValueOrDefault(S.borderDash, i.borderDash), O = j.getValueOrDefault(S.borderDashOffset, i.borderDashOffset), h = j.getValueOrDefault(e.fontColor, i.defaultFontColor), g = j.getValueOrDefault(e.fontSize, i.defaultFontSize), c = j.getValueOrDefault(e.fontStyle, i.defaultFontStyle), u = j.getValueOrDefault(e.fontFamily, i.defaultFontFamily), p = j.fontString(g, c, u), z = j.toRadians(T.labelRotation), b = Math.cos(z), m = T.longestLabelWidth * b;
                n.setFillStyle(o);
                var w = [];
                if (F) {
                    if (y = !1, D && (m /= 2), (m + v.autoSkipPadding) * T.ticks.length > T.width - (T.paddingLeft + T.paddingRight) && (y = 1 + Math.floor((m + v.autoSkipPadding) * T.ticks.length / (T.width - (T.paddingLeft + T.paddingRight)))), 
                    t && T.ticks.length > t) for (;!y || T.ticks.length / (y || 1) > t; ) y || (y = 1), 
                    y += 1;
                    a || (y = !1);
                }
                var V = "right" === L.position ? T.left : T.right - R, W = "right" === L.position ? T.left + R : T.right, P = "bottom" === L.position ? T.top : T.bottom - R, B = "bottom" === L.position ? T.top + R : T.bottom;
                if (j.each(T.ticks, function(t, i) {
                    if (null != t) {
                        var e = T.ticks.length === i + 1;
                        if ((!(1 < y && 0 < i % y || i % y == 0 && i + y >= T.ticks.length) || e) && null != t) {
                            var a, o, l, n, s, r, d, f, h, g, c, u;
                            o = i === (void 0 !== T.zeroLineIndex ? T.zeroLineIndex : 0) ? (a = S.zeroLineWidth, 
                            S.zeroLineColor) : (a = j.getValueAtIndexOrDefault(S.lineWidth, i), j.getValueAtIndexOrDefault(S.color, i));
                            var p = "middle", b = "middle";
                            if (F) {
                                D || (b = "top" === L.position ? "bottom" : "top"), p = D ? "right" : "center";
                                var m = T.getPixelForTick(i) + j.aliasPixel(a);
                                c = T.getPixelForTick(i, S.offsetGridLines) + v.labelOffset, u = D ? T.top + 12 : "top" === L.position ? T.bottom - R : T.top + R, 
                                l = s = d = h = m, n = P, r = B, f = x.top, g = x.bottom;
                            } else {
                                p = "left" === L.position ? v.mirror ? (c = T.right + v.padding, "left") : (c = T.right - v.padding, 
                                "right") : v.mirror ? (c = T.left - v.padding, "right") : (c = T.left + v.padding, 
                                "left");
                                var k = T.getPixelForTick(i);
                                k += j.aliasPixel(a), u = T.getPixelForTick(i, S.offsetGridLines), l = V, s = W, 
                                d = x.left, h = x.right, n = r = f = g = k;
                            }
                            w.push({
                                tx1: l,
                                ty1: n,
                                tx2: s,
                                ty2: r,
                                x1: d,
                                y1: f,
                                x2: h,
                                y2: g,
                                labelX: c,
                                labelY: u,
                                glWidth: a,
                                glColor: o,
                                glBorderDash: C,
                                glBorderDashOffset: O,
                                rotation: -1 * z,
                                label: t,
                                textBaseline: b,
                                textAlign: p
                            });
                        }
                    }
                }), j.each(w, function(t) {
                    if (S.display && (n.save(), n.setLineWidth(t.glWidth), n.setStrokeStyle(t.glColor), 
                    n.setLineDash && (n.setLineDash(t.glBorderDash), n.lineDashOffset = t.glBorderDashOffset), 
                    n.beginPath(), S.drawTicks && (n.moveTo(t.tx1, t.ty1), n.lineTo(t.tx2, t.ty2)), 
                    S.drawOnChartArea && (n.moveTo(t.x1, t.y1), n.lineTo(t.x2, t.y2)), n.stroke(), n.restore()), 
                    v.display) {
                        n.save(), n.translate(t.labelX, t.labelY), n.rotate(t.rotation), n.font = f, n.setFontSize(s), 
                        n.textBaseline = t.textBaseline, n.textAlign = t.textAlign;
                        var i = t.label;
                        if (j.isArray(i)) for (var e = 0, a = -(i.length - 1) * s * .75; e < i.length; ++e) n.fillText("" + i[e], 0, a), 
                        a += 1.5 * s; else {
                            var o = (i + "").replace(/[^\x00-\xff]/g, "**").length;
                            "y-axis-0" == l.id || "y-axis-1" == l.id ? n.fillText(i, -1 * (5 * o + 7), 4.4) : "y-axis-2" == l.id ? n.fillText(i, 5, 4.4) : n.fillText(i, -2.9 * o, 10);
                        }
                        n.restore();
                    }
                }), e.display) {
                    var k, M, A = 0;
                    if (F) k = T.left + (T.right - T.left) / 2, M = "bottom" === L.position ? T.bottom - g / 2 : T.top + g / 2; else {
                        var H = "left" === L.position;
                        k = H ? T.left + g / 2 : T.right - g / 2, M = T.top + (T.bottom - T.top) / 2, A = H ? -.5 * Math.PI : .5 * Math.PI;
                    }
                    n.save(), n.translate(k, M), n.rotate(A), n.textAlign = "center", n.textBaseline = "middle", 
                    n.setFillStyle(h), n.font = p, n.setFontSize(g), n.fillText(e.labelString, 0, 0), 
                    n.restore();
                }
                if (S.drawBorder) {
                    var I = j.getValueAtIndexOrDefault(S.lineWidth, 0);
                    n.setLineWidth(I), n.setStrokeStyle(j.getValueAtIndexOrDefault(S.color, 0));
                    var U = T.left, X = T.right, G = T.top, N = T.bottom, Y = j.aliasPixel(I);
                    F ? (G = N = "top" === L.position ? T.bottom : T.top, G += Y, N += Y) : (U = X = "left" === L.position ? T.right : T.left, 
                    U += Y, X += Y), F && !S.hideX && (n.beginPath(), n.moveTo(U, G), n.lineTo(X, N), 
                    n.stroke()), F || S.hideY || (n.beginPath(), n.moveTo(U, G), n.lineTo(X, N), n.stroke());
                }
            }
        }
    });
};