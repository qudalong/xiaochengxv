var n = getApp(),
  t = n.requirejs("core");

Page({
  data: {
    icon: n.requirejs("icons"),
    version: n.version,
    status: 0,
    userinfo:{},

    is_copyright: !1
  },
  bindViewTap: function(n) {
    var e = t.pdata(n).index;
    if (e == 9) {
      t.jump("/yb_tuangou/pages/change_password/index")
    } else if (e == 14) {
      t.jump("/yb_tuangou/pages/yqm/yqm")
    } else if (e == 1) {
      t.jump("/yb_tuangou/pages/monthCharts/monthCharts")
    } else if (e == 100) {
      t.jump("/yb_tuangou/pages/notice/notice")
    }
    console.log(123), 1 == e ? t.jump("/yb_tuangou/pages/member/index") : 2 == e ? t.jump("/yb_tuangou/pages/jingying/index") : 3 == e ? t.jump("/yb_tuangou/pages/yongjin/index") : 4 == e ? t.jump("/yb_tuangou/pages/tixianguanli/index") : 6 == e ? t.jump("/yb_tuangou/pages/policy/index") : 7 == e && t.jump("/yb_tuangou/pages/change_data/index");
  },
  onLoad: function(n) {
    let user = getApp().getCache("userinfo");
    user|| wx.redirectTo({
      url: "/yb_tuangou/pages/login/index"
    });

    if(user.i_level == 0){
      this.setData({
        isAdmin:1
      });
    }else{
      this.setData({
        isAdmin: 0
      });
    }

    let userinfo = this.data.userinfo;
    if(user){
      
      userinfo.name = user.v_real_name;
      userinfo.after_commission = user.v_scale_level_name;
      userinfo.before_commission = user.v_level_name;
      if(user.i_level == 0){
        
      }

      this.setData({
        userinfo:userinfo
      });

    }
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