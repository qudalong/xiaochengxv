var n = getApp(), t = n.requirejs("core");

Page({
    data: {
        icon: n.requirejs("icons"),
        version: n.version,
        status: 0,
        is_copyright: !1
    },
    bindViewTap: function(n) {
        var e = t.pdata(n).index;
        if(e == 9){
          t.jump("/yb_tuangou/pages/change_password/index")
        }
        console.log(123), 1 == e ? t.jump("/yb_tuangou/pages/member/index") : 2 == e ? t.jump("/yb_tuangou/pages/jingying/index") : 3 == e ? t.jump("/yb_tuangou/pages/yongjin/index") : 4 == e ? t.jump("/yb_tuangou/pages/tixianguanli/index") : 6 == e ? t.jump("/yb_tuangou/pages/policy/index") : 7 == e && t.jump("/yb_tuangou/pages/change_data/index");
    },
    onLoad: function(n) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.getinfo();
    },
    getinfo: function(n) {
      return;
        var e = this;
        t.get("commander/CommanderCenter", {
            id: getApp().getCache("userinfo").id
        }, function(n) {
            0 == n.code ? e.setData({
                userinfo: n.info
            }) : t.alert(n.msg);
        });
    },
    copyright: function() {
        var n = this.data.is_copyright;
        this.setData({
            is_copyright: !n
        });
    },
  btnViewTap: function () {
    wx.showModal({
      title: "提示",
      content: "退出当前账号",
      success: function (n) {
        n.confirm ? (console.log("用户点击确定"), e.jump("/yb_tuangou/pages/login/index", 3)) : console.log("用户点击取消");
      }
    });
  },
    onReady: function() {},
    tapName: function(n) {
        var e = t.pdata(n);
        this.setData({
            status: e.name
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});