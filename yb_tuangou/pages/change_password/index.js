var o = getApp(), s = o.requirejs("core");

Page({
    data: {
        icon: o.requirejs("icons"),
        passwordType: "password",
        focus: !1
    },
    formSubmit: function(o) {
        var e = o.detail.value.pwd1, n = o.detail.value.pwd2;
        return "" == e ? (console.log("1234567"), s.alert("密码格式错误"), !1) : "" == n ? (console.log("测试1"), 
        s.alert("新密码不能为空"), !1) : e == n ? (console.log("测试二"), s.alert("无效修改！"), !1) : (this.change_password(e, n), 
        !0);
    },
    testTap: function() {
        this.setData({
            passwordType: "password" == this.data.passwordType ? "text" : "password",
            focus: !0
        });
    },
    onLoad: function(o) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        });
    },
    change_password: function(o, e) {
        console.log("11221");
        s.get("commander/UpdatePassword", {
            id: getApp().getCache("userinfo").id,
            password: e,
            old_password: o
        }, function(o) {
            console.log(o), 0 == o.code ? (s.success("修改成功！"), setTimeout(function() {
                s.jump("/yb_tuangou/pages/login/index", 3);
            }, 1e3)) : s.alert(o.msg);
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