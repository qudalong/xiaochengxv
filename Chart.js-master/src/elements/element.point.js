module.exports = function(a) {
    var d = a.helpers, s = a.defaults.global, u = s.defaultColor;
    function t(t) {
        var e = this._view;
        return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2);
    }
    s.elements.point = {
        radius: 3,
        pointStyle: "circle",
        backgroundColor: u,
        borderWidth: 1,
        borderColor: u,
        hitRadius: 1,
        hoverRadius: 4,
        hoverBorderWidth: 1
    }, a.elements.Point = a.Element.extend({
        inRange: function(t, e) {
            var i = this._view;
            return !!i && Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) < Math.pow(i.hitRadius + i.radius, 2);
        },
        inLabelRange: t,
        inXRange: t,
        inYRange: function(t) {
            var e = this._view;
            return !!e && Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2);
        },
        getCenterPoint: function() {
            var t = this._view;
            return {
                x: t.x,
                y: t.y
            };
        },
        getArea: function() {
            return Math.PI * Math.pow(this._view.radius, 2);
        },
        tooltipPosition: function() {
            var t = this._view;
            return {
                x: t.x,
                y: t.y,
                padding: t.radius + t.borderWidth
            };
        },
        draw: function() {
            var t = this._view, e = this._chart.ctx, i = t.pointStyle, r = t.radius, o = t.x, n = t.y;
            t.skip || (e.setStrokeStyle(t.borderColor || u), e.setLineWidth(d.getValueOrDefault(t.borderWidth, s.elements.point.borderWidth)), 
            e.setFillStyle(t.backgroundColor || u), a.canvasHelpers.drawPoint(e, i, r, o, n));
        }
    });
};