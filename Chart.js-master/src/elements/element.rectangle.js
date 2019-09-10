module.exports = function(t) {
    var e = t.defaults.global;
    function s(t) {
        return void 0 !== t._view.width;
    }
    function o(t) {
        var e, r, i, o, n = t._view;
        if (s(t)) {
            var a = n.width / 2;
            e = n.x - a, r = n.x + a, i = Math.min(n.y, n.base), o = Math.max(n.y, n.base);
        } else {
            var h = n.height / 2;
            e = Math.min(n.x, n.base), r = Math.max(n.x, n.base), i = n.y - h, o = n.y + h;
        }
        return {
            left: e,
            top: i,
            right: r,
            bottom: o
        };
    }
    e.elements.rectangle = {
        backgroundColor: e.defaultColor,
        borderWidth: 0,
        borderColor: e.defaultColor,
        borderSkipped: "bottom"
    }, t.elements.Rectangle = t.Element.extend({
        draw: function() {
            var t = this._chart.ctx, e = this._view, r = e.width / 2, i = e.x - r, o = e.x + r, n = e.base - (e.base - e.y), a = e.borderWidth / 2;
            e.borderWidth && (i += a, o -= a, n += a), t.beginPath(), t.setFillStyle(e.backgroundColor), 
            t.setStrokeStyle(e.borderColor), t.setLineWidth(e.borderWidth);
            var h = [ [ i, e.base ], [ i, n ], [ o, n ], [ o, e.base ] ], s = [ "bottom", "left", "top", "right" ].indexOf(e.borderSkipped, 0);
            function b(t) {
                return h[(s + t) % 4];
            }
            -1 === s && (s = 0);
            var l = b(0);
            t.moveTo(l[0], l[1]);
            for (var u = 1; u < 4; u++) l = b(u), t.lineTo(l[0], l[1]);
            t.fill(), e.borderWidth && t.stroke();
        },
        height: function() {
            var t = this._view;
            return t.base - t.y;
        },
        inRange: function(t, e) {
            var r = !1;
            if (this._view) {
                var i = o(this);
                r = t >= i.left && t <= i.right && e >= i.top && e <= i.bottom;
            }
            return r;
        },
        inLabelRange: function(t, e) {
            var r = this;
            if (!r._view) return !1;
            var i = o(r);
            return s(r) ? t >= i.left && t <= i.right : e >= i.top && e <= i.bottom;
        },
        inXRange: function(t) {
            var e = o(this);
            return t >= e.left && t <= e.right;
        },
        inYRange: function(t) {
            var e = o(this);
            return t >= e.top && t <= e.bottom;
        },
        getCenterPoint: function() {
            var t, e, r = this._view;
            return e = s(this) ? (t = r.x, (r.y + r.base) / 2) : (t = (r.x + r.base) / 2, r.y), 
            {
                x: t,
                y: e
            };
        },
        getArea: function() {
            var t = this._view;
            return t.width * Math.abs(t.y - t.base);
        },
        tooltipPosition: function() {
            var t = this._view;
            return {
                x: t.x,
                y: t.y
            };
        }
    });
};