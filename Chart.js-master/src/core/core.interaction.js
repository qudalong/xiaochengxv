module.exports = function(t) {
    var u = t.helpers;
    function c(t, e) {
        var n, a, i, r, s;
        for (a = 0, r = t.data.datasets.length; a < r; ++a) if (t.isDatasetVisible(a)) for (i = 0, 
        s = (n = t.getDatasetMeta(a)).data.length; i < s; ++i) {
            var o = n.data[i];
            o._view.skip || e(o);
        }
    }
    function s(t, e) {
        var n = [];
        return c(t, function(t) {
            t.inRange(e.x, e.y) && n.push(t);
        }), n;
    }
    function o(t, a, i, r) {
        var s = Number.POSITIVE_INFINITY, o = [];
        return r || (r = u.distanceBetweenPoints), c(t, function(t) {
            if (!i || t.inRange(a.x, a.y)) {
                var e = t.getCenterPoint(), n = r(a, e);
                n < s ? (o = [ t ], s = n) : n === s && o.push(t);
            }
        }), o;
    }
    function n(a, t, e) {
        var n = u.getRelativePosition(t, a.chart), i = e.intersect ? s(a, n) : o(a, n, !1, function(t, e) {
            return Math.abs(t.x - e.x);
        }), r = [];
        return i.length ? (a.data.datasets.forEach(function(t, e) {
            if (a.isDatasetVisible(e)) {
                var n = a.getDatasetMeta(e).data[i[0]._index];
                n && !n._view.skip && r.push(n);
            }
        }), r) : [];
    }
    t.Interaction = {
        modes: {
            single: function(t, e) {
                var n = u.getRelativePosition(e, t.chart), a = [];
                return c(t, function(t) {
                    if (t.inRange(n.x, n.y)) return a.push(t), a;
                }), a.slice(0, 1);
            },
            label: n,
            index: n,
            dataset: function(t, e, n) {
                var a = u.getRelativePosition(e, t.chart), i = n.intersect ? s(t, a) : o(t, a, !1);
                return 0 < i.length && (i = t.getDatasetMeta(i[0]._datasetIndex).data), i;
            },
            "x-axis": function(t, e) {
                return n(t, e, !0);
            },
            point: function(t, e) {
                return s(t, u.getRelativePosition(e, t.chart));
            },
            nearest: function(t, e, n) {
                var a = o(t, u.getRelativePosition(e, t.chart), n.intersect);
                return 1 < a.length && a.sort(function(t, e) {
                    var n = t.getArea() - e.getArea();
                    return 0 === n && (n = t._datasetIndex - e._datasetIndex), n;
                }), a.slice(0, 1);
            },
            x: function(t, e) {
                var n = u.getRelativePosition(e, t.chart), a = [];
                return c(t, function(t) {
                    t.inXRange(n.x) && a.push(t);
                }), a;
            },
            y: function(t, e) {
                var n = u.getRelativePosition(e, t.chart), a = [];
                return c(t, function(t) {
                    t.inYRange(n.y) && a.push(t);
                }), a;
            }
        }
    };
};