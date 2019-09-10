module.exports = function(x) {
    var S = x.helpers;
    x.defaults.global.title = {
        display: !1,
        position: "top",
        fullWidth: !0,
        fontStyle: "bold",
        padding: 10,
        text: ""
    };
    var t = S.noop;
    x.Title = x.Element.extend({
        initialize: function(t) {
            var e = this;
            S.extend(e, t), e.options = S.configMerge(x.defaults.global.title, t.options), e.legendHitBoxes = [];
        },
        beforeUpdate: function() {
            var t = this.chart.options;
            t && t.title && (this.options = S.configMerge(x.defaults.global.title, t.title));
        },
        update: function(t, e, i) {
            var o = this;
            return o.beforeUpdate(), o.maxWidth = t, o.maxHeight = e, o.margins = i, o.beforeSetDimensions(), 
            o.setDimensions(), o.afterSetDimensions(), o.beforeBuildLabels(), o.buildLabels(), 
            o.afterBuildLabels(), o.beforeFit(), o.fit(), o.afterFit(), o.afterUpdate(), o.minSize;
        },
        afterUpdate: t,
        beforeSetDimensions: t,
        setDimensions: function() {
            var t = this;
            t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, 
            t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, 
            t.paddingBottom = 0, t.minSize = {
                width: 0,
                height: 0
            };
        },
        afterSetDimensions: t,
        beforeBuildLabels: t,
        buildLabels: t,
        afterBuildLabels: t,
        beforeFit: t,
        fit: function() {
            var t = this, e = S.getValueOrDefault, i = t.options, o = x.defaults.global, n = i.display, a = e(i.fontSize, o.defaultFontSize), l = t.minSize;
            t.isHorizontal() ? (l.width = t.maxWidth, l.height = n ? a + 2 * i.padding : 0) : (l.width = n ? a + 2 * i.padding : 0, 
            l.height = t.maxHeight), t.width = l.width, t.height = l.height;
        },
        afterFit: t,
        isHorizontal: function() {
            var t = this.options.position;
            return "top" === t || "bottom" === t;
        },
        draw: function() {
            var t = this, e = t.ctx, i = S.getValueOrDefault, o = t.options, n = x.defaults.global;
            if (o.display) {
                var a, l, s, r = i(o.fontSize, n.defaultFontSize), f = i(o.fontStyle, n.defaultFontStyle), d = i(o.fontFamily, n.defaultFontFamily), h = S.fontString(r, f, d), g = 0, p = t.top, u = t.left, b = t.bottom, m = t.right;
                e.setFillStyle(i(o.fontColor, n.defaultFontColor)), e.font = h, e.setFontSize(r), 
                t.isHorizontal() ? (a = u + (m - u) / 2, l = p + (b - p) / 2, s = m - u) : (a = "left" === o.position ? u + r / 2 : m - r / 2, 
                l = p + (b - p) / 2, s = b - p, g = Math.PI * ("left" === o.position ? -.5 : .5)), 
                e.save(), e.translate(a, l), e.rotate(g), e.textAlign = "center", e.textBaseline = "middle";
                var c = -2.9 * (o.text + "").replace(/[^\x00-\xff]/g, "**").length;
                e.fillText(o.text, c, 0, s), e.restore();
            }
        }
    }), x.plugins.register({
        beforeInit: function(t) {
            var e = t.options.title;
            e && (t.titleBlock = new x.Title({
                ctx: t.chart.ctx,
                options: e,
                chart: t
            }), x.layoutService.addBox(t, t.titleBlock));
        }
    });
};