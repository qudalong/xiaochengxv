var o = getApp(),
  n = o.requirejs("core");

Page({
  data: {
    icon: o.requirejs("icons")
  },
  toReginter() {
    wx.navigateTo({
      url: '../register/index'
    })
  },
  onLoad: function(o) {},
  formSubmit: function(o) {
    console.log(o);
    var e = o.detail.value;
    "" != e.phone && 0 != e.phone ? "" != e.password ? n.get("User/CommanderId", {
      mobile: e.phone,
      password: e.password
    }, function(o) {
      console.log(o), 0 == o.code ? (getApp().setCache("userinfo", o.info), n.success("登录成功"),
        setTimeout(function() {
          n.jump("/yb_tuangou/pages/index/index", 4);
        }, 1e3)) : n.alert(o.msg);
    }) : n.error("请输入密码") : n.error("请输入账号");
  },
  formReset: function() {
    console.log("form发生了reset事件");
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});