var n = getApp(), e = n.requirejs("core");

Page({
    data: {
        icon: n.requirejs("icons")
    },
    onLoad: function(n) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        });
        this.change_data();
    },
    change_data: function() {
        var o = this;
        console.log(), e.get("commander/CommanderData", {
            id: getApp().getCache("userinfo").id
        }, function(n) {
            console.log(n), 0 == n.code ? o.setData({
                info: n.info
            }) : e.alert(n.msg);
        });
    },
    bindViewTap: function(n) {
        var o = e.pdata(n).index;
        console.log(11), 8 == o ? e.jump("/yb_tuangou/pages/change_phone/index") : 9 == o ? e.jump("/yb_tuangou/pages/change_password/index") : 10 == o ? e.jump("/yb_tuangou/pages/cashout_account/index") : 11 == o && e.jump("/yb_tuangou/pages/modify_avatar/index");
    },
    btnViewTap: function() {
        wx.showModal({
            title: "提示",
            content: "退出当前账号",
            success: function(n) {
                n.confirm ? (console.log("用户点击确定"), e.jump("/yb_tuangou/pages/login/index", 3)) : console.log("用户点击取消");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});