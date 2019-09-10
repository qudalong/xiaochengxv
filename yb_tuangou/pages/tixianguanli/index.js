var a = getApp().requirejs("core");

Page({
    data: {
        select: !1,
        selected: !0,
        loaded: !1,
        list: [],
        running: !1
    },
    select: function(t) {
        "w" == t.currentTarget.dataset.w ? this.setData({
            select: !1,
            selected: !0
        }) : "y" == t.currentTarget.dataset.y && this.setData({
            select: !0,
            selected: !1
        }), this.setData({
            list: [],
            show: !0,
            page: 1
        }), this.getinfo();
    },
    onLoad: function(t) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.getinfo();
    },
    getinfo: function(t) {
        if (!this.data.running) {
            var e = this, o = e.data.select, n = e.data.page;
            e.setData({
                running: !0
            }), a.get("commander/CashManage", {
                id: getApp().getCache("userinfo").id,
                select: o,
                page: n
            }, function(t) {
                !1, e.setData({
                    running: !1
                }), 0 == t.code ? e.setData({
                    userinfo: t.info,
                    show: !0,
                    page: n + 1,
                    list: e.data.list.concat(t.info.cash_list)
                }) : a.alert(t.msg);
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            page: 1,
            loaded: !1
        }), this.getinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("加载更多"), this.data.loaded || this.getinfo();
    },
    onPageScroll: function(t) {
        var e = this;
        t.scrollTop <= 0 ? t.scrollTop = 0 : t.scrollTop > wx.getSystemInfoSync().windowHeight && (t.scrollTop = wx.getSystemInfoSync().windowHeight), 
        t.scrollTop > this.data.scrollTop || (t.scrollTop, wx.getSystemInfoSync().windowHeight), 
        setTimeout(function() {
            e.setData({
                scrollTop: t.scrollTop
            });
        }, 0);
    },
    onShareAppMessage: function() {},
    bindViewTap: function(t) {
        var e = a.pdata(t).index;
        console.log(11), 11 == e && a.jump("/yb_tuangou/pages/withdraw_request/index");
    }
});