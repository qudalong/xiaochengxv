var o = getApp().requirejs("core"), n = !1;

Page({
    data: {},
    tixian: function(e) {
        console.log(e, "张孟辉");
        var n = e.target.dataset.type_name;
        console.log(123456, n), "" == n && o.jump("/yb_tuangou/pages/cashout_account/index");
    },
    formsubmit: function(e) {
        console.log(e);
        var n = e.detail.value.money;
        e.detail.value.account, e.detail.value.zhanghu;
        if ("" == n) return o.alert("提现金额不能为空！"), !1;
        /^([1-9][0-9]*)$/.test(n) ? this.withdraw_request(n) : o.error("格式错误！");
    },
    onLoad: function() {},
    withdraw: function() {
        console.log();
        var n = this;
        o.get("commander/CashMethod", {
            id: getApp().getCache("userinfo").id
        }, function(e) {
            0 == e.code ? n.setData({
                info: e.info
            }) : o.alert(e.msg);
        });
    },
    withdraw_request: function(e) {
        if (!n) {
            n = !0, o.get("commander/CashApply", {
                id: getApp().getCache("userinfo").id,
                price: e
            }, function(e) {
                n = !1, console.log(e), 0 == e.code ? (o.success("申请成功！"), setTimeout(function() {
                    o.jump("/yb_tuangou/pages/tixianguanli/index");
                }, 1e3)) : o.alert(e.msg);
            });
        }
    },
    onReady: function() {},
    onShow: function(e) {
        this.withdraw();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});