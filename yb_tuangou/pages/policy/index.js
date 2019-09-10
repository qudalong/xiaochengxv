var e = getApp(), t = e.requirejs("core"), a = e.requirejs("wxParse/wxParse");

Page({
    data: {
        show: !1,
        use_wxParse: !0
    },
    onLoad: function(e) {
        this.getinfo();
    },
    getinfo: function() {
        var s = this, o = {};
        t.get("Arliki/get_apply", {}, function(e) {
            if (0 == e.code) {
                if (e.info.law) try {
                    a.wxParse("wxParseData", "html", e.info.law, t, "0"), o.use_wxParse = !0, console.log("use wxParse !!!");
                } catch (e) {
                    o.use_wxParse = !1, console.log("not use wxParse !!!");
                }
                o.detail = e.info, o.show = !0, s.setData(o);
            } else t.alert(e.msg);
        }, !0);
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.getinfo(), wx.stopPullDownRefresh();
    }
});