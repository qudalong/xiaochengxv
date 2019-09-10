var a = getApp().requirejs("core");

Page({
    data: {
        select: 0,
        selected: 1,
        page: 1,
        info: {},
        list: [],
        loaded: !1,
        running: !1
    },
    onLoad: function(t) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.getlist();
    },
    getlist: function() {
        if (!this.data.running) {
            var e = this, s = e.data.page, t = e.data.select;
            e.setData({
                running: !0
            }), a.get("commander/CommissionLog", {
                page: s,
                id: getApp().getCache("userinfo").id,
                select: t
            }, function(t) {
                console.log("dd", t), !1, e.setData({
                    running: !1
                }), 0 == t.code ? e.setData({
                    info: t.info,
                    list: e.data.list.concat(t.info.list_account),
                    show: !0,
                    page: s + 1
                }) : a.alert(t.msg);
            });
        }
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getlist(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.getlist();
    },
    onShareAppMessage: function() {},
    select: function(t) {
        "w" == t.currentTarget.dataset.w ? this.setData({
            select: 0,
            selected: 1
        }) : "y" == t.currentTarget.dataset.y && this.setData({
            select: 1,
            selected: 0
        }), this.setData({
            list: [],
            show: !0,
            page: 1
        }), this.getlist();
    }
});