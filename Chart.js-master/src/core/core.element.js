module.exports = function(e) {
    var s = e.helpers;
    e.elements = {}, e.Element = function(e) {
        s.extend(this, e), this.initialize.apply(this, arguments);
    }, s.extend(e.Element.prototype, {
        initialize: function() {
            this.hidden = !1;
        },
        pivot: function() {
            var e = this;
            return e._view || (e._view = s.clone(e._model)), e._start = s.clone(e._view), e;
        },
        transition: function(o) {
            var r = this;
            return r._view || (r._view = s.clone(r._model)), 1 === o ? (r._view = r._model, 
            r._start = null) : (r._start || r.pivot(), s.each(r._model, function(t, i) {
                if ("_" === i[0]) ; else if (r._view.hasOwnProperty(i)) if (t === r._view[i]) ; else if ("string" == typeof t) try {
                    var e = s.color(r._model[i]).mix(s.color(r._start[i]), o);
                    r._view[i] = e.rgbString();
                } catch (e) {
                    r._view[i] = t;
                } else if ("number" == typeof t) {
                    var n = void 0 !== r._start[i] && !1 === isNaN(r._start[i]) ? r._start[i] : 0;
                    r._view[i] = (r._model[i] - n) * o + n;
                } else r._view[i] = t; else "number" != typeof t || isNaN(r._view[i]) ? r._view[i] = t : r._view[i] = t * o;
            }, r)), r;
        },
        tooltipPosition: function() {
            return {
                x: this._model.x,
                y: this._model.y
            };
        },
        hasValue: function() {
            return s.isNumber(this._model.x) && s.isNumber(this._model.y);
        }
    }), e.Element.extend = s.inherits;
};