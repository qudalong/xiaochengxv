module.exports = function(e) {
    var p = e.helpers, u = e.defaults.global;
    e.defaults.global.elements.line = {
        tension: .4,
        backgroundColor: u.defaultColor,
        borderWidth: 3,
        borderColor: u.defaultColor,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        capBezierPoints: !0,
        fill: !0
    }, e.elements.Line = e.Element.extend({
        draw: function() {
            var e = this, o = e._view, t = o.spanGaps, r = o.scaleZero, i = e._loop;
            i || ("top" === o.fill ? r = o.scaleTop : "bottom" === o.fill && (r = o.scaleBottom));
            var l = e._chart.ctx;
            function n(e, o) {
                var t = o._view;
                !0 === o._view.steppedLine ? (l.lineTo(t.x, e._view.y), l.lineTo(t.x, t.y)) : 0 === o._view.tension ? l.lineTo(t.x, t.y) : l.bezierCurveTo(e._view.controlPointNextX, e._view.controlPointNextY, t.controlPointPreviousX, t.controlPointPreviousY, t.x, t.y);
            }
            l.save();
            var s, a, d, v, b = e._children.slice(), f = -1;
            if (i && b.length && b.push(b[0]), b.length && o.fill) {
                for (l.beginPath(), s = 0; s < b.length; ++s) a = b[s], d = p.previousItem(b, s), 
                v = a._view, 0 === s ? (i ? l.moveTo(r.x, r.y) : l.moveTo(v.x, r), v.skip || (f = s, 
                l.lineTo(v.x, v.y))) : (d = -1 === f ? d : b[f], v.skip ? t || f !== s - 1 || (i ? l.lineTo(r.x, r.y) : l.lineTo(d._view.x, r)) : (f !== s - 1 ? t && -1 !== f ? n(d, a) : (i || l.lineTo(v.x, r), 
                l.lineTo(v.x, v.y)) : n(d, a), f = s));
                i || -1 === f || l.lineTo(b[f]._view.x, r), l.setFillStyle(o.backgroundColor || u.defaultColor), 
                l.closePath(), l.fill();
            }
            var h = u.elements.line;
            for (l.setLineCap(o.borderCapStyle || h.borderCapStyle), l.setLineDash && l.setLineDash(o.borderDash || h.borderDash), 
            l.lineDashOffset = o.borderDashOffset || h.borderDashOffset, l.setLineJoin(o.borderJoinStyle || h.borderJoinStyle), 
            l.setLineWidth(o.borderWidth || h.borderWidth), l.setStrokeStyle(o.borderColor || u.defaultColor), 
            l.beginPath(), f = -1, s = 0; s < b.length; ++s) a = b[s], d = p.previousItem(b, s), 
            v = a._view, 0 === s ? v.skip || (l.moveTo(v.x, v.y), f = s) : (d = -1 === f ? d : b[f], 
            v.skip || (f !== s - 1 && !t || -1 === f ? l.moveTo(v.x, v.y) : n(d, a), f = s));
            l.stroke(), l.restore();
        }
    });
};