var n = function() {
    function t(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}();

var e = function() {
    function e() {
        !function(e, n) {
            if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
        }(this, e);
    }
    return n(e, null, [ {
        key: "login",
        value: function() {
            return new Promise(function(e, n) {
                return wx.login({
                    success: e,
                    fail: n
                });
            });
        }
    }, {
        key: "getUserInfo",
        value: function() {
            return new Promise(function(e, n) {
                return wx.getUserInfo({
                    success: e,
                    fail: n
                });
            });
        }
    }, {
        key: "downloadFile",
        value: function(r) {
            return new Promise(function(e, n) {
                return wx.downloadFile({
                    url: r,
                    success: e,
                    fail: n
                });
            });
        }
    }, {
        key: "saveFile",
        value: function(r) {
            return new Promise(function(e, n) {
                return wx.saveFile({
                    tempFilePath: r,
                    success: e,
                    fail: n
                });
            });
        }
    }, {
        key: "saveImageToPhotosAlbum",
        value: function(r) {
            return new Promise(function(e, n) {
                return wx.saveImageToPhotosAlbum({
                    filePath: r,
                    success: e,
                    fail: n
                });
            });
        }
    } ]), e;
}();

module.exports = e;