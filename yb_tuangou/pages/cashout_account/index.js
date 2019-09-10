var t = getApp(), o = t.requirejs("core");

Page({
    data: {
        icon: t.requirejs("icons"),
        show: !1,
        select: !1,
        text: "支付宝",
        i: 1,
        type_name: ""
    },
    formSubmit: function(t) {
        console.log(t);
        var e = this, n = t.detail.value.zhanghao, a = e.data.i;
        return "0" == a || "1" == a ? "" == n ? (o.alert("账号不能为空"), !1) : 11 != n.length && 0 == n ? (o.alert("账号格式不正确"), 
        !1) : (e.cashout_account(t), !0) : "" == n ? (o.alert("银行卡格式不正确"), !1) : (e.cashout_account(t), 
        !0);
    },
    bindShowMsg: function() {
        this.setData({
            select: !this.data.select
        });
    },
    mySelect: function(t) {
        var e = t.currentTarget.dataset.name, n = t.currentTarget.dataset.i;
        this.setData({
            text: e,
            select: !1,
            i: n
        });
    },
    onLoad: function(t) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        });
    },
    cashout_account: function(t) {
        var e = t.detail.value.zhanghao;
        o.get("commander/UpdateType", {
            id: getApp().getCache("userinfo").id,
            type_name: e,
            type: this.data.i
        }, function(t) {
            "0" == t.code ? (o.success("修改成功！"), setTimeout(function() {
                o.jump("/yb_tuangou/pages/change_data/index", 4);
            }, 1e3)) : o.alert(t.msg);
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