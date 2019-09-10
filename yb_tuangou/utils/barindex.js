var r = require("./barcode");

function c(e) {
    return Math.round(wx.getSystemInfoSync().windowWidth * e / 750);
}

module.exports = {
    barcode: function(e, t, n, o) {
        r.code128(wx.createCanvasContext(e), t, c(n), c(o));
    }
};