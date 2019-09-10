var u = e(require("../canvas/chartWrap")), c = e(require("./getConfig"));

function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = getApp(), o = n.requirejs("core");

Page({
    data: {
        icon: n.requirejs("icons"),
        labels: [ "11-01", "11-02", "11-03", "11-04", "11-05", "11-06", "十二月" ],
        data: [ 1, 12, 123, 1234, 12345, 123456, 123456789 ]
    },
    onLoad: function(e) {
        getApp().getCache("userinfo") || wx.redirectTo({
            url: "/yb_tuangou/pages/login/index"
        }), this.getinfo();
    },
    getinfo: function() {
        var n = this;
        o.get("commander/ManageData", {
            id: getApp().getCache("userinfo").id
        }, function(e) {
            0 == e.code ? (n.setData({
                userinfo: e.info,
                data: e.info.money,
                labels: e.info.time
            }), n.get_chart()) : o.alert(e.msg);
        });
    },
    get_chart: function() {
        var r = this;
        n.deviceInfo.then(function(e) {
            console.log("设备信息", e);
            var n = r.data.labels, o = r.data.data, t = e.windowWidth - 10;
            console.log(t);
            var a = {
                width: t,
                height: 260,
                id: "myCanvas"
            }, i = (0, c.default)(a, n, o);
            u.default.bind(r)(i);
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