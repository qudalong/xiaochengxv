require("yb_tuangou/utils/core.js");

var t, e = require("yb_tuangou/utils/promise").Promise;

App({
    onShow: function(t) {},
    version: "1.0",
    onLaunch: function(t) {
        this.deviceInfo = this.promise.getDeviceInfo();
        this.util.getUserInfo();
    },
    promise: {
        getDeviceInfo: function() {
            return new e(function(e, t) {
                wx.getSystemInfo({
                    success: function(t) {
                        e(t);
                    },
                    fail: function() {
                        t();
                    }
                });
            });
        }
    },
    getGid: (t = 0, function() {
        return ++t;
    }),
    requirejs: function(t) {
        return require("yb_tuangou/utils/" + t + ".js");
    },
    getCache: function(t, e) {
        var a = +new Date() / 1e3, o = "";
        a = parseInt(a);
        try {
            (o = wx.getStorageSync(t + this.globalData.appid)).expire > a || 0 == o.expire ? o = o.value : (o = "", 
            this.removeCache(t));
        } catch (t) {
            o = void 0 === e ? "" : e;
        }
        return o || "";
    },
    setCache: function(t, e, a) {
        var o = +new Date() / 1e3, n = !0, i = {
            expire: a ? o + parseInt(a) : 0,
            value: e
        };
        try {
            wx.setStorageSync(t + this.globalData.appid, i);
        } catch (t) {
            n = !1;
        }
        return n;
    },
    removeCache: function(t) {
        var e = !0;
        try {
            wx.removeStorageSync(t + this.globalData.appid);
        } catch (t) {
            e = !1;
        }
        return e;
    },
    ab: function(t) {},
    util: require("./we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    globalData: {
        appid: "liu2417301781",
        userInfo: null,
        app_name: ""
    },
    config: {
        background: "#8b8b8b",
        button_color: "#fff",
        alert_color: "#fff",
        font_color: "black",
        selectedColor: "#df2f20",
        kuan: "款",
        dan: "单",
        fu: "付",
        gou: "购",
        huo: "货"
    },
    redirect: function(t, e) {
        wx.navigateTo({
            url: "/yb_tuangou/pages/pintuan/pages/" + t + "?" + e
        });
    },
    showModal: function(t) {
        var e = wx.createAnimation({
            duration: 200
        });
        e.opacity(0).rotateX(-100).step(), t.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), t.setData({
                animationData: e
            });
        }.bind(t), 200);
    },
    showToast: function(t, e) {
        var a = {};
        a.toastTitle = e, t.setData({
            toast: a
        });
        var o = wx.createAnimation({
            duration: 100
        });
        o.opacity(0).rotateY(-100).step(), a.toastStatus = !0, a.toastAnimationData = o.export(), 
        t.setData({
            toast: a
        }), setTimeout(function() {
            o.opacity(1).rotateY(0).step(), a.toastAnimationData = o, t.setData({
                toast: a
            });
        }.bind(t), 100), setTimeout(function() {
            a.toastStatus = !1, t.setData({
                toast: a
            });
        }.bind(t), 2e3);
    }
});