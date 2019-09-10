module.exports = function() {
    var t = function t(e, a) {
        return this.controller = new t.Controller(e, a, this), this.controller;
    };
    return t.defaults = {
        global: {
            responsive: !0,
            responsiveAnimationDuration: 0,
            maintainAspectRatio: !0,
            events: [ "mousemove", "mouseout", "click", "touchstart", "touchmove" ],
            hover: {
                onHover: null,
                mode: "nearest",
                intersect: !0,
                animationDuration: 400
            },
            onClick: null,
            defaultColor: "rgba(0,0,0,0.1)",
            defaultFontColor: "#666666",
            defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            defaultFontSize: 12,
            defaultFontStyle: "normal",
            showLines: !0,
            elements: {},
            legendCallback: function(t) {
                var e = [];
                e.push('<ul class="' + t.id + '-legend">');
                for (var a = 0; a < t.data.datasets.length; a++) e.push('<li><span style="background-color:' + t.data.datasets[a].backgroundColor + '"></span>'), 
                t.data.datasets[a].label && e.push(t.data.datasets[a].label), e.push("</li>");
                return e.push("</ul>"), e.join("");
            }
        }
    }, t.Chart = t;
};