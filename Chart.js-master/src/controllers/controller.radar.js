module.exports = function(e) {
    var s = e.helpers;
    e.defaults.radar = {
        aspectRatio: 1,
        scale: {
            type: "radialLinear"
        },
        elements: {
            line: {
                tension: 0
            }
        }
    }, e.controllers.radar = e.DatasetController.extend({
        datasetElementType: e.elements.Line,
        dataElementType: e.elements.Point,
        linkScales: s.noop,
        update: function(t) {
            var r = this, e = r.getMeta(), o = e.dataset, a = e.data, d = o.custom || {}, n = r.getDataset(), i = r.chart.options.elements.line, l = r.chart.scale;
            void 0 !== n.tension && void 0 === n.lineTension && (n.lineTension = n.tension), 
            s.extend(e.dataset, {
                _datasetIndex: r.index,
                _children: a,
                _loop: !0,
                _model: {
                    tension: d.tension ? d.tension : s.getValueOrDefault(n.lineTension, i.tension),
                    backgroundColor: d.backgroundColor ? d.backgroundColor : n.backgroundColor || i.backgroundColor,
                    borderWidth: d.borderWidth ? d.borderWidth : n.borderWidth || i.borderWidth,
                    borderColor: d.borderColor ? d.borderColor : n.borderColor || i.borderColor,
                    fill: d.fill ? d.fill : void 0 !== n.fill ? n.fill : i.fill,
                    borderCapStyle: d.borderCapStyle ? d.borderCapStyle : n.borderCapStyle || i.borderCapStyle,
                    borderDash: d.borderDash ? d.borderDash : n.borderDash || i.borderDash,
                    borderDashOffset: d.borderDashOffset ? d.borderDashOffset : n.borderDashOffset || i.borderDashOffset,
                    borderJoinStyle: d.borderJoinStyle ? d.borderJoinStyle : n.borderJoinStyle || i.borderJoinStyle,
                    scaleTop: l.top,
                    scaleBottom: l.bottom,
                    scaleZero: l.getBasePosition()
                }
            }), e.dataset.pivot(), s.each(a, function(e, o) {
                r.updateElement(e, o, t);
            }, r), r.updateBezierControlPoints();
        },
        updateElement: function(e, o, t) {
            var r = this, a = e.custom || {}, d = r.getDataset(), n = r.chart.scale, i = r.chart.options.elements.point, l = n.getPointPositionForValue(o, d.data[o]);
            s.extend(e, {
                _datasetIndex: r.index,
                _index: o,
                _scale: n,
                _model: {
                    x: t ? n.xCenter : l.x,
                    y: t ? n.yCenter : l.y,
                    tension: a.tension ? a.tension : s.getValueOrDefault(d.tension, r.chart.options.elements.line.tension),
                    radius: a.radius ? a.radius : s.getValueAtIndexOrDefault(d.pointRadius, o, i.radius),
                    backgroundColor: a.backgroundColor ? a.backgroundColor : s.getValueAtIndexOrDefault(d.pointBackgroundColor, o, i.backgroundColor),
                    borderColor: a.borderColor ? a.borderColor : s.getValueAtIndexOrDefault(d.pointBorderColor, o, i.borderColor),
                    borderWidth: a.borderWidth ? a.borderWidth : s.getValueAtIndexOrDefault(d.pointBorderWidth, o, i.borderWidth),
                    pointStyle: a.pointStyle ? a.pointStyle : s.getValueAtIndexOrDefault(d.pointStyle, o, i.pointStyle),
                    hitRadius: a.hitRadius ? a.hitRadius : s.getValueAtIndexOrDefault(d.hitRadius, o, i.hitRadius)
                }
            }), e._model.skip = a.skip ? a.skip : isNaN(e._model.x) || isNaN(e._model.y);
        },
        updateBezierControlPoints: function() {
            var a = this.chart.chartArea, d = this.getMeta();
            s.each(d.data, function(e, o) {
                var t = e._model, r = s.splineCurve(s.previousItem(d.data, o, !0)._model, t, s.nextItem(d.data, o, !0)._model, t.tension);
                t.controlPointPreviousX = Math.max(Math.min(r.previous.x, a.right), a.left), t.controlPointPreviousY = Math.max(Math.min(r.previous.y, a.bottom), a.top), 
                t.controlPointNextX = Math.max(Math.min(r.next.x, a.right), a.left), t.controlPointNextY = Math.max(Math.min(r.next.y, a.bottom), a.top), 
                e.pivot();
            });
        },
        draw: function(e) {
            var o = this.getMeta(), t = e || 1;
            s.each(o.data, function(e) {
                e.transition(t);
            }), o.dataset.transition(t).draw(), s.each(o.data, function(e) {
                e.draw();
            });
        },
        setHoverStyle: function(e) {
            var o = this.chart.data.datasets[e._datasetIndex], t = e.custom || {}, r = e._index, a = e._model;
            a.radius = t.hoverRadius ? t.hoverRadius : s.getValueAtIndexOrDefault(o.pointHoverRadius, r, this.chart.options.elements.point.hoverRadius), 
            a.backgroundColor = t.hoverBackgroundColor ? t.hoverBackgroundColor : s.getValueAtIndexOrDefault(o.pointHoverBackgroundColor, r, s.getHoverColor(a.backgroundColor)), 
            a.borderColor = t.hoverBorderColor ? t.hoverBorderColor : s.getValueAtIndexOrDefault(o.pointHoverBorderColor, r, s.getHoverColor(a.borderColor)), 
            a.borderWidth = t.hoverBorderWidth ? t.hoverBorderWidth : s.getValueAtIndexOrDefault(o.pointHoverBorderWidth, r, a.borderWidth);
        },
        removeHoverStyle: function(e) {
            var o = this.chart.data.datasets[e._datasetIndex], t = e.custom || {}, r = e._index, a = e._model, d = this.chart.options.elements.point;
            a.radius = t.radius ? t.radius : s.getValueAtIndexOrDefault(o.radius, r, d.radius), 
            a.backgroundColor = t.backgroundColor ? t.backgroundColor : s.getValueAtIndexOrDefault(o.pointBackgroundColor, r, d.backgroundColor), 
            a.borderColor = t.borderColor ? t.borderColor : s.getValueAtIndexOrDefault(o.pointBorderColor, r, d.borderColor), 
            a.borderWidth = t.borderWidth ? t.borderWidth : s.getValueAtIndexOrDefault(o.pointBorderWidth, r, d.borderWidth);
        }
    });
};