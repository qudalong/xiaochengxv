var a = getApp().requirejs("core");

Page({
    data: {},
    onLoad: function(t) {
        console.log(t), this.setData(t), t.order_no && t.type || a.alert("订单不存在", function() {
            a.jump("", 5);
        }), this.get_list();
    },
    onShow: function() {},
    onPullDownRefresh: function() {
        this.get_list(), wx.stopPullDownRefresh();
    },
    get_list: function() {
        var e = this;
        a.get("Community/OrderInfo", {
            order_no: e.data.order_no,
            type: e.data.type
        }, function(t) {
            console.log(t), 0 == t.code ? e.setData({
                info: t.info,
                show: !0
            }) : a.alert(t.msg);
        });
    },
    verifyOrder: function(t) {
        var e = this, o = e.data.order_no;
        console.log(e.data.order_no), console.log(e.data.type), a.get("Community/verifyOrder", {
            order_no: o,
            type: e.data.type
        }, function(t) {
            0 == t.code ? (a.success("收获成功"), e.get_list(), setTimeout(function() {
                e.setData({
                    orderlist: [],
                    page: 1,
                    loaded: !1
                });
            }, 1e3)) : a.alert(t.msg);
        });
    },
    refund: function(t) {
        var e = this, o = a.pdata(t).id;
        a.get("Community/refund", {
            order_no: o,
            type: e.data.type
        }, function(t) {
            0 == t.code ? (a.success("退货成功"), e.get_list(), setTimeout(function() {
                e.setData({
                    orderlist: [],
                    page: 1,
                    loaded: !1
                });
            }, 1e3)) : a.alert(t.msg);
        });
    },
    finish: function(t) {
        var e = this, o = a.data(t).id;
        console.log(this.data.type), 7 == e.data.info.order_status ? a.get("community/SignOrder", {
            order_no: o,
            type: this.data.type
        }, function(t) {
            0 == t.code ? (a.success("核销成功"), e.get_list()) : a.alert(t.msg);
        }) : a.alert("当前订单状态为" + e.data.info.status_name + ",请选确定收货！");
    },
    finish2: function(t) {
        var e = this, o = a.data(t).id;
        console.log(this.data.type), 8 == e.data.info.order_status ? a.get("community/SignOrder", {
            order_no: o,
            type: this.data.type
        }, function(t) {
            0 == t.code ? (a.success("核销成功"), e.get_list()) : a.alert(t.msg);
        }) : a.alert("当前订单状态为" + e.data.info.status_name + ",请选确定收货！");
    },
    finish3: function(t) {
        var e = this, o = this.data.order_no;
        console.log(this.data.type), console.log(o), 8 == e.data.info.order_status ? a.get("community/SignOrder", {
            order_no: o,
            type: this.data.type
        }, function(t) {
            0 == t.code ? (a.success("核销成功"), e.get_list()) : a.alert(t.msg);
        }) : a.alert("当前订单状态为" + e.data.info.status_name + ",请选确定收货！");
    },
    finish4: function(t) {
        var e = this, o = a.data(t).id;
        console.log(this.data.type), console.log(o), 8 == e.data.info.order_status ? a.get("community/SignOrder", {
            order_no: o,
            type: this.data.type
        }, function(t) {
            0 == t.code ? (a.success("核销成功"), e.get_list()) : a.alert(t.msg);
        }) : a.alert("当前订单状态为" + e.data.info.status_name + ",请选确定收货！");
    }
});