module.exports = function(s) {
    var c = s.helpers;
    s.scaleService = {
        constructors: {},
        defaults: {},
        registerScaleType: function(t, e, s) {
            this.constructors[t] = e, this.defaults[t] = c.clone(s);
        },
        getScaleConstructor: function(t) {
            return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0;
        },
        getScaleDefaults: function(t) {
            return this.defaults.hasOwnProperty(t) ? c.scaleMerge(s.defaults.scale, this.defaults[t]) : {};
        },
        updateScaleDefaults: function(t, e) {
            var s = this.defaults;
            s.hasOwnProperty(t) && (s[t] = c.extend(s[t], e));
        },
        addScalesToLayout: function(e) {
            c.each(e.scales, function(t) {
                s.layoutService.addBox(e, t);
            });
        }
    };
};