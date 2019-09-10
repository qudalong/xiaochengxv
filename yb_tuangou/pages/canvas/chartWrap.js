Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    var t, a, n, r, i = e.canvasConfig.id, o = this, u = wx.createCanvasContext(i), c = f.getGid();
    return u.gid = c, t = o, a = e.canvasConfig, n = {}, r = a.id + "Style", n[r] = {}, 
    n[r].width = a.width, n[r].height = a.height, console.log("resetCanvas", n), t.setData(n), 
    (0, d.default)(u, e.canvasConfig), s.default.pluginService.register({
        beforeRender: function(e) {},
        afterDraw: function(e, t) {
            var a = e.chart.ctx;
            a.gid == c && a.draw();
        }
    }), s.default.helpers.addEvent = function(e, t, a) {
        switch (t) {
          case "touchstart":
            o[i + "TouchStart"] = a, o[i + "TouchMove"] = a, o[i + "TouchEnd"] = function() {};
        }
    }, s.default.helpers.getRelativePosition = function(e, t) {
        var a = e.changedTouches[0], n = a.x, r = a.y;
        return console.log("touches", n, r), {
            x: n,
            y: r
        };
    }, new s.default(u, e.chartConfig);
};

var s = e(require("./chart")), d = e(require("./fixedCtx"));

function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var f = getApp();