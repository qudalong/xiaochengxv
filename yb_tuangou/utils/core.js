var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = "function" == typeof Symbol && "symbol" == r(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : r(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : r(t);
}, c = require("./check");

module.exports = {
    toQueryPair: function(t, e) {
        return void 0 === e ? t : t + "=" + encodeURIComponent(null === e ? "" : String(e));
    },
    getUrl: function(t, e) {
        t = t.replace(/\//gi, "/");
        var o = getApp().globalData.api + "api/" + t;
        return e && ("object" == (void 0 === e ? "undefined" : n(e)) ? o += "?app_id=" + getApp().globalData.appid + "&" + c.param(e) : "string" == typeof e && (o += "&" + e)), 
        o;
    },
    json: function(t, e, o, n, a, i) {
        var r = getApp(), u = (r.getCache("userinfo"), r.requirejs("core"));
        n && u.loading();
        var s = {
            url: a ? this.getUrl(t) : this.getUrl(t, e),
            method: a ? "POST" : "GET",
            header: {
                "Content-type": a ? "application/x-www-form-urlencoded" : "application/json"
            }
        };
        a && (s.data = c.param(e)), o && (s.success = function(t) {
            if (n && u.hideLoading(), "request:ok" == t.errMsg) {
                if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void u.error("服务器错误！");
                o(t.data);
            } else this.alert(t.errMsg);
        }), s.fail = function(t) {
            that.alert(t.errMsg);
        }, wx.request(s), console.log(s);
    },
    post: function(t, e, o, n) {
        var a = this, i = t.split("/");
        i = i[0] + "_" + i[1], e.comm_id = getApp().getCache("userinfo").id, n && a.loading(), 
        getApp().util.request({
           // url: "entry/wxapp/" + i,
            url:t,
            data: e,
            method: "POST",
            success: function(t) {
                if (n && a.hideLoading(), "request:ok" == t.errMsg) {
                    if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void a.error("请求错误002");
                    if ("" == t.data) return void console.log("请求异常！");
                    var e = t.data;
                    "string" == typeof e && (console.log(void 0 === e ? "undefined" : r(e)), e = a.json_parse(e)), 
                    o(e);
                } else a.alert(t.errMsg);
            },
            fail: function(t) {
                a.alert(t.errMsg);
            }
        });
    },
    get: function(t, e, o, n) {
        var a = this, i = t.split("/");
        i = i[0] + "_" + i[1], e.comm_id = getApp().getCache("userinfo").id, n && a.loading(), 
        getApp().util.request({
            url: "entry/wxapp/" + i,
            data: e,
            success: function(t) {
                if (n && a.hideLoading(), "request:ok" == t.errMsg) {
                    if ("string" == typeof t.data && 0 <= t.data.indexOf("html") && 0 <= t.data.indexOf("head") && 0 <= t.data.indexOf("body")) return void a.error("请求错误001");
                    if ("" == t.data) return void console.log("请求异常！");
                    var e = t.data;
                    "string" == typeof e && (console.log(void 0 === e ? "undefined" : r(e)), e = a.json_parse(e)), 
                    o(e);
                } else a.alert(t.errMsg);
            },
            fail: function(t) {
                n && a.hideLoading(), a.alert(t.errMsg);
            }
        });
    },
    alert: function(t, e) {
        "object" === (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof e && e();
            }
        });
    },
    confirm: function(t, e, o) {
        "object" === (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), wx.showModal({
            title: "提示",
            content: t,
            showCancel: !0,
            success: function(t) {
                t.confirm ? "function" == typeof e && e() : "function" == typeof o && o();
            }
        });
    },
    loading: function(t) {
        void 0 !== t && "" != t || (t = "加载中"), wx.showToast({
            title: t,
            icon: "loading",
            duration: 5e6
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    toast: function(t, e) {
        e || (e = "loading"), wx.showToast({
            title: t,
            icon: e,
            duration: 1e3
        });
    },
    warning: function(t) {
        wx.showToast({
            title: t,
            image: "/yb_tuangou/static/images/icon-warning.png",
            duration: 2e3
        });
    },
    error: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            image: "/yb_tuangou/static/images/x.png",
            duration: 2e3
        });
    },
    success: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            duration: 1e3
        });
    },
    pdata: function(t) {
        return t.currentTarget.dataset;
    },
    data: function(t) {
        return t.target.dataset;
    },
    phone: function(t) {
        var e = this.pdata(t).phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    time_format: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    },
    time_str: function(t) {
        return t = (t = t.substring(0, 19)).replace(/-/g, "/"), new Date(t).getTime() / 1e3;
    },
    Countdown: function(t, s) {
        var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, c = (3 < arguments.length && void 0 !== arguments[3] && arguments[3], 
        {}), l = "interval" + e, f = t - Date.parse(new Date()) / 1e3;
        f <= 0 && (c.show_time = !1, s(c)), l = setInterval(function() {
            var t = f, e = Math.floor(t / 3600 / 24), o = e.toString();
            1 == o.length && (o = "0" + o);
            var n = Math.floor((t - 3600 * e * 24) / 3600), a = n.toString();
            1 == a.length && (a = "0" + a);
            var i = Math.floor((t - 3600 * e * 24 - 3600 * n) / 60), r = i.toString();
            1 == r.length && (r = "0" + r);
            var u = (t - 3600 * e * 24 - 3600 * n - 60 * i).toString();
            1 == u.length && (u = "0" + u), c.countDownDay = o, c.countDownHour = a, c.countDownMinute = r, 
            c.countDownSecond = u, c.show_time = !0, "function" == typeof s && s(c), --f < 0 && (clearInterval(l), 
            wx.showToast({
                title: "活动已结束"
            }), c.countDownDay = "0", c.countDownHour = "0", c.countDownMinute = "0", c.countDownSecond = "0", 
            c.show_time = !1, "function" == typeof s && s(c));
        }.bind(this), 1e3);
    },
    json_parse: function(t) {
        var e = t;
        if ("object" != (void 0 === (e = e.replace(" ", "")) ? "undefined" : r(e))) return e = e.replace(/\ufeff/g, ""), 
        JSON.parse(e);
    },
    str: function(t) {
        return JSON.stringify(t);
    },
    tx_map: function(e, o, n) {
        e = parseFloat(e), o = parseFloat(o);
        var t = this;
        getApp().getCache("map") ? wx.openLocation({
            latitude: e,
            longitude: o,
            scale: 28,
            name: n
        }) : wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), getApp().setCache("map", t, 1200);
                t.latitude, t.longitude;
                wx.openLocation({
                    latitude: e,
                    longitude: o,
                    scale: 28,
                    name: n
                });
            },
            fail: function() {
                t.alert("未授权位置信息");
            }
        });
    },
    previewImage: function(t, e, o) {
        var n = [];
        (e = JSON.parse(e)).forEach(function(t, e) {
            n[e] = t[o];
        }), wx.previewImage({
            current: t,
            urls: n
        });
    },
    Clipboard: function(t) {
        wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {}
                });
            }
        });
    },
    jump: function(e, t) {
        console.log(e), t = t && "" != t ? t : 1, 1 == (t = "/yb_tuangou/pages/index/index" === e ? 3 : t) ? wx.navigateTo({
            url: e,
            fail: function(t) {
                0 <= t.errMsg.indexOf("tabbar") && wx.switchTab({
                    url: e
                });
            }
        }) : 2 == t ? wx.redirectTo({
            url: e
        }) : 3 == t ? wx.reLaunch({
            url: e
        }) : 4 == t ? wx.switchTab({
            url: e
        }) : 5 == t && wx.navigateBack();
    },
    ReName: function(t) {
        wx.setNavigationBarTitle({
            title: t || ""
        });
    },
    removeByValue: function(t, e, o) {
        for (var n = -1, a = 0; a < t.length; a++) if (console.log(t[a]), t[a] == e) {
            n = a;
            break;
        }
        t.splice(n, 1), "function" == typeof o && o(t);
    },
    setting: function() {
        wx.setNavigationBarColor({
            frontColor: getApp().page.text_color,
            backgroundColor: getApp().page.nv_color,
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), getApp().check_is_tabbar();
    },
    compatible_phonex: function(e) {
        wx.getSystemInfo({
            success: function(t) {
                "iphonrx" == t.model && e.setData({
                    isIphoneX: !0
                });
            }
        });
    },
    menu_url: function(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, o = this, n = o.pdata(t), a = (t = n.key, 
        n.url ? n.url : ""), i = n.appid ? n.appid : "", r = n.path ? n.path : "", u = n.title ? n.title : "", s = n.phone ? n.phone : "", c = n.lat ? n.lat : "", l = n.lng ? n.lng : "";
        if (console.log(n), 1 == t) a && 0 < a.length && o.jump(a, e); else if (2 == t) wx.navigateToMiniProgram({
            appId: i,
            path: r,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(t) {
                console.log("打开成功");
            },
            fail: function(t) {}
        }); else if (3 == t) o.jump(a, 1); else if (4 == t) s ? wx.makePhoneCall({
            phoneNumber: s
        }) : o.alert("电话不能为空"); else {
            if (5 != t) return;
            c && l ? o.tx_map(c, l, u) : o.alert("请完善位置信息");
        }
    },
    upload: function(t, e, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0;
        this.chooseWxImage("album", t, e, o, n);
    },
    chooseWxImage: function(t, e, o, n, i) {
        var r = getApp().siteInfo, u = e.data.form_data ? e.data.form_data : {}, s = r.siteroot + "?i=" + r.uniacid + "&t=undefined&v=" + r.version + "&from=wxapp&c=entry&a=wxapp&do=index_uploadFile&path=" + n + "&m=yb_tuangou&sign=5201314";
        u[o] = u[o] ? u[o] : [], wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ t ],
            success: function(t) {
                0 == i ? t.tempFilePaths.forEach(function(t) {
                    wx.uploadFile({
                        url: s,
                        filePath: t,
                        name: "file_upload",
                        success: function(t) {
                            console.log(t.data), null != t.data && "" != t.data ? (u[o] = u[o].concat(t.data), 
                            e.setData({
                                form_data: u
                            })) : a.error(data.msg);
                        }
                    });
                }) : wx.uploadFile({
                    url: s,
                    filePath: t.tempFilePaths[0],
                    name: "file_upload",
                    success: function(t) {
                        null != t.data && "" != t.data ? (console.log(t.data), u[o] = t.data, e.setData({
                            form_data: u
                        })) : a.error("上传失败，请重试");
                    }
                });
            }
        });
    },
    scancode: function(t) {
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(t) {
                console.log(t.result), "function" == typeof obj && obj(t);
            },
            fail: function(t) {
                console.log(t), "function" == typeof obj && obj(t);
            }
        });
    }
};