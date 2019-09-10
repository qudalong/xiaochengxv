module.exports = function(d) {
    var u = d.helpers;
    function s(t, e) {
        var a = u.getStyle(t, e), i = a && a.match(/(\d+)px/);
        return i ? Number(i[1]) : void 0;
    }
    function h(t, e) {
        var a = t;
        return function(t, e) {
            var a = t.style, i = t.getAttribute("height"), n = t.getAttribute("width");
            if (t._chartjs = {
                initial: {
                    height: i,
                    width: n,
                    style: {
                        display: a.display,
                        height: a.height,
                        width: a.width
                    }
                }
            }, a.display = a.display || "block", null === n || "" === n) {
                var o = s(t, "width");
                void 0 !== o && (t.width = o);
            }
            if (null === i || "" === i) if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2); else {
                var r = s(t, "height");
                void 0 !== o && (t.height = r);
            }
        }(t.canvas, e), a;
    }
    d.types = {}, d.instances = {}, d.controllers = {}, d.Controller = function(t, e, a) {
        var i, n, o = this;
        (n = (i = (i = e) || {}).data = i.data || {}).datasets = n.datasets || [], n.labels = n.labels || [], 
        i.options = u.configMerge(d.defaults.global, d.defaults[i.type], i.options || {});
        var r = h(t, e = i), s = r && r.canvas, l = s && s.height, c = s && s.width;
        return a.ctx = r, a.canvas = s, a.config = e, a.width = c, a.height = l, a.aspectRatio = l ? c / l : null, 
        o.id = u.uid(), o.chart = a, o.config = e, o.options = e.options, o._bufferedRender = !1, 
        d.instances[o.id] = o, Object.defineProperty(o, "data", {
            get: function() {
                return o.config.data;
            }
        }), r && s ? (u.retinaScale(a), o.options.responsive && (u.addResizeListener(s.parentNode, function() {
            o.resize();
        }), o.resize(!0)), o.initialize()) : console.error("Failed to create chart: can't acquire context from the given item"), 
        o;
    }, u.extend(d.Controller.prototype, {
        initialize: function() {
            var t = this;
            return d.plugins.notify("beforeInit", [ t ]), t.bindEvents(), t.ensureScalesHaveIDs(), 
            t.buildOrUpdateControllers(), t.buildScales(), t.updateLayout(), t.resetElements(), 
            t.initToolTip(), t.update(), d.plugins.notify("afterInit", [ t ]), t;
        },
        clear: function() {
            return u.clear(this.chart), this;
        },
        stop: function() {
            return d.animationService.cancelAnimation(this), this;
        },
        resize: function(t) {
            var e = this, a = e.chart, i = e.options, n = a.canvas, o = i.maintainAspectRatio && a.aspectRatio || null, r = Math.floor(u.getMaximumWidth(n)), s = Math.floor(o ? r / o : u.getMaximumHeight(n));
            if (a.width !== r || a.height !== s) {
                n.width = a.width = r, n.height = a.height = s, u.retinaScale(a), n.style.width = r + "px", 
                n.style.height = s + "px";
                var l = {
                    width: r,
                    height: s
                };
                d.plugins.notify("resize", [ e, l ]), e.options.onResize && e.options.onResize(e, l), 
                t || (e.stop(), e.update(e.options.responsiveAnimationDuration));
            }
        },
        ensureScalesHaveIDs: function() {
            var t = this.options, e = t.scales || {}, a = t.scale;
            u.each(e.xAxes, function(t, e) {
                t.id = t.id || "x-axis-" + e;
            }), u.each(e.yAxes, function(t, e) {
                t.id = t.id || "y-axis-" + e;
            }), a && (a.id = a.id || "scale");
        },
        buildScales: function() {
            var o = this, t = o.options, r = o.scales = {}, e = [];
            t.scales && (e = e.concat((t.scales.xAxes || []).map(function(t) {
                return {
                    options: t,
                    dtype: "category"
                };
            }), (t.scales.yAxes || []).map(function(t) {
                return {
                    options: t,
                    dtype: "linear"
                };
            }))), t.scale && e.push({
                options: t.scale,
                dtype: "radialLinear",
                isDefault: !0
            }), u.each(e, function(t) {
                var e = t.options, a = u.getValueOrDefault(e.type, t.dtype), i = d.scaleService.getScaleConstructor(a);
                if (i) {
                    var n = new i({
                        id: e.id,
                        options: e,
                        ctx: o.chart.ctx,
                        chart: o
                    });
                    r[n.id] = n, t.isDefault && (o.scale = n);
                }
            }), d.scaleService.addScalesToLayout(this);
        },
        updateLayout: function() {
            d.layoutService.update(this, this.chart.width, this.chart.height);
        },
        buildOrUpdateControllers: function() {
            var i = this, n = [], o = [];
            if (u.each(i.data.datasets, function(t, e) {
                var a = i.getDatasetMeta(e);
                a.type || (a.type = t.type || i.config.type), n.push(a.type), a.controller ? a.controller.updateIndex(e) : (a.controller = new d.controllers[a.type](i, e), 
                o.push(a.controller));
            }, i), 1 < n.length) for (var t = 1; t < n.length; t++) if (n[t] !== n[t - 1]) {
                i.isCombo = !0;
                break;
            }
            return o;
        },
        resetElements: function() {
            var a = this;
            u.each(a.data.datasets, function(t, e) {
                a.getDatasetMeta(e).controller.reset();
            }, a);
        },
        reset: function() {
            this.resetElements(), this.tooltip.initialize();
        },
        update: function(t, e) {
            var a = this;
            d.plugins.notify("beforeUpdate", [ a ]), a.tooltip._data = a.data;
            var i = a.buildOrUpdateControllers();
            u.each(a.data.datasets, function(t, e) {
                a.getDatasetMeta(e).controller.buildOrUpdateElements();
            }, a), d.layoutService.update(a, a.chart.width, a.chart.height), d.plugins.notify("afterScaleUpdate", [ a ]), 
            u.each(i, function(t) {
                t.reset();
            }), a.updateDatasets(), d.plugins.notify("afterUpdate", [ a ]), a._bufferedRender ? a._bufferedRequest = {
                lazy: e,
                duration: t
            } : a.render(t, e);
        },
        updateDatasets: function() {
            var t, e;
            if (d.plugins.notify("beforeDatasetsUpdate", [ this ])) {
                for (t = 0, e = this.data.datasets.length; t < e; ++t) this.getDatasetMeta(t).controller.update();
                d.plugins.notify("afterDatasetsUpdate", [ this ]);
            }
        },
        render: function(t, e) {
            var a = this;
            d.plugins.notify("beforeRender", [ a ]);
            var i = a.options.animation;
            if (i && (void 0 !== t && 0 !== t || void 0 === t && 0 !== i.duration)) {
                var n = new d.Animation();
                n.numSteps = (t || i.duration) / 16.66, n.easing = i.easing, n.render = function(t, e) {
                    var a = u.easingEffects[e.easing], i = e.currentStep / e.numSteps, n = a(i);
                    t.draw(n, i, e.currentStep);
                }, n.onAnimationProgress = i.onProgress, n.onAnimationComplete = i.onComplete, d.animationService.addAnimation(a, n, t, e);
            } else a.draw(), i && i.onComplete && i.onComplete.call && i.onComplete.call(a);
            return a;
        },
        draw: function(a) {
            var i = this, t = a || 1;
            i.clear(), d.plugins.notify("beforeDraw", [ i, t ]), u.each(i.boxes, function(t) {
                t.draw(i.chartArea, t);
            }, i), i.scale && i.scale.draw(), d.plugins.notify("beforeDatasetsDraw", [ i, t ]), 
            u.each(i.data.datasets, function(t, e) {
                i.isDatasetVisible(e) && i.getDatasetMeta(e).controller.draw(a);
            }, i, !0), d.plugins.notify("afterDatasetsDraw", [ i, t ]), i.tooltip.transition(t).draw(), 
            d.plugins.notify("afterDraw", [ i, t ]);
        },
        getElementAtEvent: function(t) {
            return d.Interaction.modes.single(this, t);
        },
        getElementsAtEvent: function(t) {
            return d.Interaction.modes.label(this, t, {
                intersect: !0
            });
        },
        getElementsAtXAxis: function(t) {
            return d.Interaction.modes["x-axis"](this, t, {
                intersect: !0
            });
        },
        getElementsAtEventForMode: function(t, e, a) {
            var i = d.Interaction.modes[e];
            return "function" == typeof i ? i(this, t, a) : [];
        },
        getDatasetAtEvent: function(t) {
            return d.Interaction.modes.dataset(this, t);
        },
        getDatasetMeta: function(t) {
            var e = this.data.datasets[t];
            e._meta || (e._meta = {});
            var a = e._meta[this.id];
            return a || (a = e._meta[this.id] = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null
            }), a;
        },
        getVisibleDatasetCount: function() {
            for (var t = 0, e = 0, a = this.data.datasets.length; e < a; ++e) this.isDatasetVisible(e) && t++;
            return t;
        },
        isDatasetVisible: function(t) {
            var e = this.getDatasetMeta(t);
            return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden;
        },
        generateLegend: function() {
            return this.options.legendCallback(this);
        },
        destroy: function() {
            var t, e, a, i = this, n = i.chart.canvas;
            for (i.stop(), e = 0, a = i.data.datasets.length; e < a; ++e) (t = i.getDatasetMeta(e)).controller && (t.controller.destroy(), 
            t.controller = null);
            n && (u.unbindEvents(i, i.events), u.removeResizeListener(n.parentNode), u.clear(i.chart), 
            function(a) {
                if (a._chartjs) {
                    var i = a._chartjs.initial;
                    [ "height", "width" ].forEach(function(t) {
                        var e = i[t];
                        null == e ? a.removeAttribute(t) : a.setAttribute(t, e);
                    }), u.each(i.style || {}, function(t, e) {
                        a.style[e] = t;
                    }), delete a._chartjs;
                }
            }(n), i.chart.canvas = null, i.chart.ctx = null), void 0 !== i.chart.originalDevicePixelRatio && i.chart.ctx.scale(1 / i.chart.originalDevicePixelRatio, 1 / i.chart.originalDevicePixelRatio), 
            d.plugins.notify("destroy", [ i ]), delete d.instances[i.id];
        },
        toBase64Image: function() {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
        },
        initToolTip: function() {
            var t = this;
            t.tooltip = new d.Tooltip({
                _chart: t.chart,
                _chartInstance: t,
                _data: t.data,
                _options: t.options.tooltips
            }, t), t.tooltip.initialize();
        },
        bindEvents: function() {
            var e = this;
            u.bindEvents(e, e.options.events, function(t) {
                e.eventHandler(t);
            });
        },
        updateHoverStyle: function(t, e, a) {
            var i, n, o, r = a ? "setHoverStyle" : "removeHoverStyle";
            for (n = 0, o = t.length; n < o; ++n) (i = t[n]) && this.getDatasetMeta(i._datasetIndex).controller[r](i);
        },
        eventHandler: function(t) {
            var e = this, a = e.options.hover;
            e._bufferedRender = !0, e._bufferedRequest = null;
            var i = e.handleEvent(t);
            i |= e.legend.handleEvent(t), i |= e.tooltip.handleEvent(t);
            var n = e._bufferedRequest;
            return n ? e.render(n.duration, n.lazy) : i && !e.animating && (e.stop(), e.render(a.animationDuration, !0)), 
            e._bufferedRender = !1, e._bufferedRequest = null, e;
        },
        handleEvent: function(t) {
            var e, a = this, i = a.options || {}, n = i.hover;
            return a.lastActive = a.lastActive || [], "mouseout" === t.type ? a.active = [] : a.active = a.getElementsAtEventForMode(t, n.mode, n), 
            n.onHover && n.onHover.call(a, a.active), "mouseup" !== t.type && "click" !== t.type || i.onClick && i.onClick.call(a, t, a.active), 
            a.lastActive.length && a.updateHoverStyle(a.lastActive, n.mode, !1), a.active.length && n.mode && a.updateHoverStyle(a.active, n.mode, !0), 
            e = !u.arrayEquals(a.active, a.lastActive), a.lastActive = a.active, e;
        }
    });
};