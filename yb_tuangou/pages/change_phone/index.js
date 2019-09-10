var o = getApp().requirejs("core");

Page({
    data: {
        text: "获取验证码",
        disabled: !1
    },
    formSubmit: function(e) {
        console.log(e);
        var n = e.detail.value.phone, t = e.detail.value.yanzhengma;
        return "" == t ? (o.alert("验证码格式错误！"), !1) : "" == n ? (o.alert("手机号不能为空"), !1) : 11 != n.length ? (o.alert("手机号码格式不正确"), 
        !1) : /^1[3,4,5,7,8]\d{9}$/.test(n) ? (this.change_phone(n, t), !0) : void o.error("手机号码格式不正确");
    },
    setInterval: function(e) {
        function n() {
            return e.apply(this, arguments);
        }
        return n.toString = function() {
            return e.toString();
        }, n;
    }(function() {
        var e = this, n = 60, t = setInterval(function() {
            n--, e.setData({
                text: n + "s"
            }), n <= 0 && (clearInterval(t), e.setData({
                text: "重新发送",
                disabled: !1,
                color: "#fff"
            }), e.setData({
                disabled: !1,
                color: "#fff"
            }));
        }, 1e3);
        o.get("Community/sendcode", {
            phone: getApp().getCache("userinfo").mobile
        }, function(e) {
            console.log(e);
        });
    }),
    onLoad: function(e) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        });
    },
    change_phone: function(e, n) {
        o.get("commander/UpdateMobile", {
            id: getApp().getCache("userinfo").id,
            mobile: e,
            old_mobile: getApp().getCache("userinfo").mobile,
            verification: n
        }, function(e) {
            console.log(e), 0 == e.code ? (o.success("修改成功！"), setTimeout(function() {
                getApp().removeCache("userinfo"), o.jump("/yb_tuangou/pages/login/index", 3);
            }, 1e3)) : o.alert(e.msg);
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