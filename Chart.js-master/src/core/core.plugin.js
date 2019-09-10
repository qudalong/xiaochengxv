module.exports = function(n) {
    var t = n.helpers.noop;
    n.plugins = {
        _plugins: [],
        register: function(n) {
            var t = this._plugins;
            [].concat(n).forEach(function(n) {
                -1 === t.indexOf(n) && t.push(n);
            });
        },
        unregister: function(n) {
            var e = this._plugins;
            [].concat(n).forEach(function(n) {
                var t = e.indexOf(n);
                -1 !== t && e.splice(t, 1);
            });
        },
        clear: function() {
            this._plugins = [];
        },
        count: function() {
            return this._plugins.length;
        },
        getAll: function() {
            return this._plugins;
        },
        notify: function(n, t) {
            var e, i, r = this._plugins, u = r.length;
            for (e = 0; e < u; ++e) if ("function" == typeof (i = r[e])[n] && !1 === i[n].apply(i, t || [])) return !1;
            return !0;
        }
    }, n.PluginBase = n.Element.extend({
        beforeInit: t,
        afterInit: t,
        beforeUpdate: t,
        afterUpdate: t,
        beforeDraw: t,
        afterDraw: t,
        destroy: t
    }), n.pluginService = n.plugins;
};