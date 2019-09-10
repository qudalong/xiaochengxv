var t = function() {
    function i(t, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(t, e, o) {
        return e && i(t.prototype, e), o && i(t, o), t;
    };
}();

var i = 310, r = "请求参数信息有误", a = 600, n = "系统错误", s = 1e3, u = 200, e = "https://apis.map.qq.com/ws/", c = e + "geocoder/v1/", l = {
    location2query: function(t) {
        if ("string" == typeof t) return t;
        for (var e = "", o = 0; o < t.length; o++) {
            var i = t[o];
            e && (e += ";"), i.location && (e = e + i.location.lat + "," + i.location.lng), 
            i.latitude && i.longitude && (e = e + i.latitude + "," + i.longitude);
        }
        return e;
    },
    getWXLocation: function(t, e, o) {
        wx.getLocation({
            type: "gcj02",
            success: t,
            fail: e,
            complete: o
        });
    },
    getLocationParam: function(t) {
        return "string" == typeof t && (t = 2 === t.split(",").length ? {
            latitude: t.split(",")[0],
            longitude: t.split(",")[1]
        } : {}), t;
    },
    polyfillParam: function(t) {
        t.success = t.success || function() {}, t.fail = t.fail || function() {}, t.complete = t.complete || function() {};
    },
    checkParamKeyEmpty: function(t, e) {
        if (t[e]) return !1;
        var o = this.buildErrorConfig(i, r + e + "参数格式有误");
        return t.fail(o), t.complete(o), !0;
    },
    checkKeyword: function(t) {
        return !this.checkParamKeyEmpty(t, "keyword");
    },
    checkLocation: function(t) {
        var e = this.getLocationParam(t.location);
        if (e && e.latitude && e.longitude) return !0;
        var o = this.buildErrorConfig(i, r + " location参数格式有误");
        return t.fail(o), t.complete(o), !1;
    },
    buildErrorConfig: function(t, e) {
        return {
            status: t,
            message: e
        };
    },
    buildWxRequestConfig: function(o, t) {
        var i = this;
        return t.header = {
            "content-type": "application/json"
        }, t.method = "GET", t.success = function(t) {
            var e = t.data;
            0 === e.status ? o.success(e) : o.fail(e);
        }, t.fail = function(t) {
            t.statusCode = s, o.fail(i.buildErrorConfig(s, result.errMsg));
        }, t.complete = function(t) {
            switch (+t.statusCode) {
              case s:
                o.complete(i.buildErrorConfig(s, t.errMsg));
                break;

              case u:
                var e = t.data;
                0 === e.status ? o.complete(e) : o.complete(i.buildErrorConfig(e.status, e.message));
                break;

              default:
                o.complete(i.buildErrorConfig(a, n));
            }
        }, t;
    },
    locationProcess: function(e, t, o, i) {
        var r = this;
        o = o || function(t) {
            t.statusCode = s, e.fail(r.buildErrorConfig(s, t.errMsg));
        }, i = i || function(t) {
            t.statusCode == s && e.complete(r.buildErrorConfig(s, t.errMsg));
        }, e.location ? r.checkLocation(e) && t(l.getLocationParam(e.location)) : r.getWXLocation(t, o, i);
    }
}, o = function() {
    function e(t) {
        if (function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), !t.key) throw Error("key值不能为空");
        this.key = t.key;
    }
    return t(e, [ {
        key: "search",
        value: function(e) {
            if (e = e || {}, l.polyfillParam(e), l.checkKeyword(e)) {
                var o = {
                    keyword: e.keyword,
                    orderby: e.orderby || "_distance",
                    page_size: e.page_size || 10,
                    page_index: e.page_index || 1,
                    output: "json",
                    key: this.key
                };
                e.address_format && (o.address_format = e.address_format), e.filter && (o.filter = e.filter);
                var i = e.distance || "1000", r = e.auto_extend || 1;
                l.locationProcess(e, function(t) {
                    o.boundary = "nearby(" + t.latitude + "," + t.longitude + "," + i + "," + r + ")", 
                    wx.request(l.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/place/v1/search",
                        data: o
                    }));
                });
            }
        }
    }, {
        key: "getSuggestion",
        value: function(t) {
            if (t = t || {}, l.polyfillParam(t), l.checkKeyword(t)) {
                var e = {
                    keyword: t.keyword,
                    region: t.region || "全国",
                    region_fix: t.region_fix || 0,
                    policy: t.policy || 0,
                    output: "json",
                    key: this.key
                };
                wx.request(l.buildWxRequestConfig(t, {
                    url: "https://apis.map.qq.com/ws/place/v1/suggestion",
                    data: e
                }));
            }
        }
    }, {
        key: "reverseGeocoder",
        value: function(e) {
            e = e || {}, l.polyfillParam(e);
            var o = {
                coord_type: e.coord_type || 5,
                get_poi: e.get_poi || 0,
                output: "json",
                key: this.key
            };
            e.poi_options && (o.poi_options = e.poi_options), l.locationProcess(e, function(t) {
                o.location = t.latitude + "," + t.longitude, wx.request(l.buildWxRequestConfig(e, {
                    url: c,
                    data: o
                }));
            });
        }
    }, {
        key: "geocoder",
        value: function(t) {
            if (t = t || {}, l.polyfillParam(t), !l.checkParamKeyEmpty(t, "address")) {
                var e = {
                    address: t.address,
                    output: "json",
                    key: this.key
                };
                wx.request(l.buildWxRequestConfig(t, {
                    url: c,
                    data: e
                }));
            }
        }
    }, {
        key: "getCityList",
        value: function(t) {
            t = t || {}, l.polyfillParam(t);
            var e = {
                output: "json",
                key: this.key
            };
            wx.request(l.buildWxRequestConfig(t, {
                url: "https://apis.map.qq.com/ws/district/v1/list",
                data: e
            }));
        }
    }, {
        key: "getDistrictByCityId",
        value: function(t) {
            if (t = t || {}, l.polyfillParam(t), !l.checkParamKeyEmpty(t, "id")) {
                var e = {
                    id: t.id || "",
                    output: "json",
                    key: this.key
                };
                wx.request(l.buildWxRequestConfig(t, {
                    url: "https://apis.map.qq.com/ws/district/v1/getchildren",
                    data: e
                }));
            }
        }
    }, {
        key: "calculateDistance",
        value: function(e) {
            if (e = e || {}, l.polyfillParam(e), !l.checkParamKeyEmpty(e, "to")) {
                var o = {
                    mode: e.mode || "walking",
                    to: l.location2query(e.to),
                    output: "json",
                    key: this.key
                };
                e.from && (e.location = e.from), l.locationProcess(e, function(t) {
                    o.from = t.latitude + "," + t.longitude, wx.request(l.buildWxRequestConfig(e, {
                        url: "https://apis.map.qq.com/ws/distance/v1/",
                        data: o
                    }));
                });
            }
        }
    } ]), e;
}();

module.exports = o;