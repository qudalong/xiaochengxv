Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, t) {
    return String.prototype.realLength = function() {
        return this.replace(/[^\x00-\xff]/g, "**").length;
    }, e.devicePixelRatio = 1, t.width < 305 ? e.measureText = function(t) {
        var e = ("" + t).length;
        return {
            width: e *= 4
        };
    } : e.measureText = function(t) {
        var e = ("" + t).length;
        return {
            width: e *= 5
        };
    }, e.measureTextXscale = function(t) {
        return {
            width: ("" + t).realLength()
        };
    }, e.measureTextToolTip = function(t) {
        return {
            width: 5.95 * ("" + t).realLength()
        };
    }, e.canvas = {
        width: t.width,
        height: t.height
    }, e.canvas.style = {
        width: e.canvas.width,
        height: e.canvas.height,
        display: "block"
    }, e.canvas.getAttribute = function(t) {
        return "width" == t ? e.canvas.width : "height" == t ? e.canvas.height : void 0;
    }, e.canvas.id = t.id, e;
};