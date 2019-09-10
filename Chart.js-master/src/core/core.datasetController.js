module.exports = function(t) {
    var s = t.helpers, o = [ "push", "pop", "shift", "splice", "unshift" ];
    function i(e, t) {
        var a = e._chartjs;
        if (a) {
            var r = a.listeners, n = r.indexOf(t);
            -1 !== n && r.splice(n, 1), 0 < r.length || (o.forEach(function(t) {
                delete e[t];
            }), delete e._chartjs);
        }
    }
    t.DatasetController = function(t, e) {
        this.initialize(t, e);
    }, s.extend(t.DatasetController.prototype, {
        datasetElementType: null,
        dataElementType: null,
        initialize: function(t, e) {
            var a = this;
            a.chart = t, a.index = e, a.linkScales(), a.addElements();
        },
        updateIndex: function(t) {
            this.index = t;
        },
        linkScales: function() {
            var t = this, e = t.getMeta(), a = t.getDataset();
            null === e.xAxisID && (e.xAxisID = a.xAxisID || t.chart.options.scales.xAxes[0].id), 
            null === e.yAxisID && (e.yAxisID = a.yAxisID || t.chart.options.scales.yAxes[0].id);
        },
        getDataset: function() {
            return this.chart.data.datasets[this.index];
        },
        getMeta: function() {
            return this.chart.getDatasetMeta(this.index);
        },
        getScaleForId: function(t) {
            return this.chart.scales[t];
        },
        reset: function() {
            this.update(!0);
        },
        destroy: function() {
            this._data && i(this._data, this);
        },
        createMetaDataset: function() {
            var t = this, e = t.datasetElementType;
            return e && new e({
                _chart: t.chart.chart,
                _datasetIndex: t.index
            });
        },
        createMetaData: function(t) {
            var e = this, a = e.dataElementType;
            return a && new a({
                _chart: e.chart.chart,
                _datasetIndex: e.index,
                _index: t
            });
        },
        addElements: function() {
            var t, e, a = this, r = a.getMeta(), n = a.getDataset().data || [], o = r.data;
            for (t = 0, e = n.length; t < e; ++t) o[t] = o[t] || a.createMetaData(t);
            r.dataset = r.dataset || a.createMetaDataset();
        },
        addElementAndReset: function(t) {
            var e = this.createMetaData(t);
            this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0);
        },
        buildOrUpdateElements: function() {
            var n, t, e = this, a = e.getDataset(), r = a.data || (a.data = []);
            e._data !== r && (e._data && i(e._data, e), t = e, (n = r)._chartjs ? n._chartjs.listeners.push(t) : (Object.defineProperty(n, "_chartjs", {
                configurable: !0,
                enumerable: !1,
                value: {
                    listeners: [ t ]
                }
            }), o.forEach(function(t) {
                var a = "onData" + t.charAt(0).toUpperCase() + t.slice(1), r = n[t];
                Object.defineProperty(n, t, {
                    configurable: !0,
                    enumerable: !1,
                    value: function() {
                        var e = Array.prototype.slice.call(arguments), t = r.apply(this, e);
                        return s.each(n._chartjs.listeners, function(t) {
                            "function" == typeof t[a] && t[a].apply(t, e);
                        }), t;
                    }
                });
            })), e._data = r), e.resyncElements();
        },
        update: s.noop,
        draw: function(t) {
            var e, a, r = t || 1, n = this.getMeta().data;
            for (e = 0, a = n.length; e < a; ++e) n[e].transition(r).draw();
        },
        removeHoverStyle: function(t, e) {
            var a = this.chart.data.datasets[t._datasetIndex], r = t._index, n = t.custom || {}, o = s.getValueAtIndexOrDefault, i = t._model;
            i.backgroundColor = n.backgroundColor ? n.backgroundColor : o(a.backgroundColor, r, e.backgroundColor), 
            i.borderColor = n.borderColor ? n.borderColor : o(a.borderColor, r, e.borderColor), 
            i.borderWidth = n.borderWidth ? n.borderWidth : o(a.borderWidth, r, e.borderWidth);
        },
        setHoverStyle: function(t) {
            var e = this.chart.data.datasets[t._datasetIndex], a = t._index, r = t.custom || {}, n = s.getValueAtIndexOrDefault, o = s.getHoverColor, i = t._model;
            i.backgroundColor = r.hoverBackgroundColor ? r.hoverBackgroundColor : n(e.hoverBackgroundColor, a, o(i.backgroundColor)), 
            i.borderColor = r.hoverBorderColor ? r.hoverBorderColor : n(e.hoverBorderColor, a, o(i.borderColor)), 
            i.borderWidth = r.hoverBorderWidth ? r.hoverBorderWidth : n(e.hoverBorderWidth, a, i.borderWidth);
        },
        resyncElements: function() {
            var t = this.getMeta(), e = this.getDataset().data, a = t.data.length, r = e.length;
            r < a ? t.data.splice(r, a - r) : a < r && this.insertElements(a, r - a);
        },
        insertElements: function(t, e) {
            for (var a = 0; a < e; ++a) this.addElementAndReset(t + a);
        },
        onDataPush: function() {
            this.insertElements(this.getDataset().data.length - 1, arguments.length);
        },
        onDataPop: function() {
            this.getMeta().data.pop();
        },
        onDataShift: function() {
            this.getMeta().data.shift();
        },
        onDataSplice: function(t, e) {
            this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2);
        },
        onDataUnshift: function() {
            this.insertElements(0, arguments.length);
        }
    }), t.DatasetController.extend = s.inherits;
};