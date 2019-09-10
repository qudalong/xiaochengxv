module.exports = function(e) {
    var d = e.helpers, t = e.defaults.global;
    t.elements.arc = {
        backgroundColor: t.defaultColor,
        borderColor: "#ffffff",
        borderWidth: 2
    }, e.elements.Arc = e.Element.extend({
        inLabelRange: function(e) {
            var t = this._view;
            return !!t && Math.pow(e - t.x, 2) < Math.pow(t.radius + t.hoverRadius, 2);
        },
        inRange: function(e, t) {
            var r = this._view;
            if (r) {
                for (var n = d.getAngleFromPoint(r, {
                    x: e,
                    y: t
                }), i = n.angle, a = n.distance, o = r.startAngle, s = r.endAngle; s < o; ) s += 2 * Math.PI;
                for (;s < i; ) i -= 2 * Math.PI;
                for (;i < o; ) i += 2 * Math.PI;
                var l = o <= i && i <= s, u = a >= r.innerRadius && a <= r.outerRadius;
                return l && u;
            }
            return !1;
        },
        getCenterPoint: function() {
            var e = this._view, t = (e.startAngle + e.endAngle) / 2, r = (e.innerRadius + e.outerRadius) / 2;
            return {
                x: e.x + Math.cos(t) * r,
                y: e.y + Math.sin(t) * r
            };
        },
        getArea: function() {
            var e = this._view;
            return Math.PI * ((e.endAngle - e.startAngle) / (2 * Math.PI)) * (Math.pow(e.outerRadius, 2) - Math.pow(e.innerRadius, 2));
        },
        tooltipPosition: function() {
            var e = this._view, t = e.startAngle + (e.endAngle - e.startAngle) / 2, r = (e.outerRadius - e.innerRadius) / 2 + e.innerRadius;
            return {
                x: e.x + Math.cos(t) * r,
                y: e.y + Math.sin(t) * r
            };
        },
        draw: function() {
            var e = this._chart.ctx, t = this._view, r = t.startAngle, n = t.endAngle;
            e.beginPath(), e.arc(t.x, t.y, t.outerRadius, r, n), e.arc(t.x, t.y, t.innerRadius, n, r, !0), 
            e.closePath(), e.setStrokeStyle(t.borderColor), e.setLineWidth(t.borderWidth), e.setFillStyle(t.backgroundColor), 
            e.fill(), e.setLineJoin("bevel"), t.borderWidth && e.stroke();
        }
    });
};