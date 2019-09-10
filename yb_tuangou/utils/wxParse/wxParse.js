var g = e(require("./showdown.js")), l = e(require("./html2json.js"));

function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function m(e) {
    console.log(e);
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && 0 < a.length && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function h(e) {
    var t = e.target.dataset.from, a = e.target.dataset.idx;
    void 0 !== t && 0 < t.length && function(e, t, a, i) {
        var r = a.data[i];
        if (!r || 0 == r.images.length) return;
        var d = r.images, s = (n = e.detail.width, o = e.detail.height, g = a, l = i, m = 0, 
        h = 0, v = 0, u = {}, wx.getSystemInfo({
            success: function(e) {
                var t = g.data[l].view.imagePadding;
                m = e.windowWidth - 2 * t, e.windowHeight, u.imageheight = m < n ? (v = (h = m) * o / n, 
                u.imageWidth = h, v) : (u.imageWidth = n, o);
            }
        }), u);
        var n, o, g, l, m, h, v, u;
        d[t].width = s.imageWidth, d[t].height = s.imageheight, r.images = d;
        var w = {};
        w[i] = r, a.setData(w);
    }(e, a, this, t);
}

module.exports = {
    wxParse: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', i = arguments[3], r = arguments[4], d = i, s = {};
        if ("html" == t) s = l.default.html2json(a, e); else if ("md" == t || "markdown" == t) {
            var n = new g.default.Converter().makeHtml(a);
            s = l.default.html2json(n, e), console.log(JSON.stringify(s, " ", " "));
        }
        s.view = {}, void (s.view.imagePadding = 0) !== r && (s.view.imagePadding = r);
        var o = {};
        o[e] = s, d.setData(o), d.wxParseImgLoad = h, d.wxParseImgTap = m;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], d = i.data, s = null, n = 0; n < a; n++) {
            var o = d[t + n].nodes;
            r.push(o);
        }
        e = e || "wxParseTemArray", (s = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(s);
    },
    emojisInit: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments[2];
        l.default.emojisInit(e, t, a);
    }
};