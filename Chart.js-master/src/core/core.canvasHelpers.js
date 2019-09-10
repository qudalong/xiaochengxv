var T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function(e) {
    (e.canvasHelpers = {}).drawPoint = function(e, o, t, a, n) {
        var i, l, s, c, r, h;
        if ("object" !== (void 0 === o ? "undefined" : T(o)) || "[object HTMLImageElement]" !== (i = o.toString()) && "[object HTMLCanvasElement]" !== i) {
            if (!(isNaN(t) || t <= 0)) {
                switch (o) {
                  default:
                    e.beginPath(), e.arc(a, n, t, 0, 2 * Math.PI), e.closePath(), e.fill();
                    break;

                  case "triangle":
                    e.beginPath(), r = (l = 3 * t / Math.sqrt(3)) * Math.sqrt(3) / 2, e.moveTo(a - l / 2, n + r / 3), 
                    e.lineTo(a + l / 2, n + r / 3), e.lineTo(a, n - 2 * r / 3), e.closePath(), e.fill();
                    break;

                  case "rect":
                    h = 1 / Math.SQRT2 * t, e.beginPath(), e.fillRect(a - h, n - h, 2 * h, 2 * h), e.strokeRect(a - h, n - h, 2 * h, 2 * h);
                    break;

                  case "rectRot":
                    h = 1 / Math.SQRT2 * t, e.beginPath(), e.moveTo(a - h, n), e.lineTo(a, n + h), e.lineTo(a + h, n), 
                    e.lineTo(a, n - h), e.closePath(), e.fill();
                    break;

                  case "cross":
                    e.beginPath(), e.moveTo(a, n + t), e.lineTo(a, n - t), e.moveTo(a - t, n), e.lineTo(a + t, n), 
                    e.closePath();
                    break;

                  case "crossRot":
                    e.beginPath(), s = Math.cos(Math.PI / 4) * t, c = Math.sin(Math.PI / 4) * t, e.moveTo(a - s, n - c), 
                    e.lineTo(a + s, n + c), e.moveTo(a - s, n + c), e.lineTo(a + s, n - c), e.closePath();
                    break;

                  case "star":
                    e.beginPath(), e.moveTo(a, n + t), e.lineTo(a, n - t), e.moveTo(a - t, n), e.lineTo(a + t, n), 
                    s = Math.cos(Math.PI / 4) * t, c = Math.sin(Math.PI / 4) * t, e.moveTo(a - s, n - c), 
                    e.lineTo(a + s, n + c), e.moveTo(a - s, n + c), e.lineTo(a + s, n - c), e.closePath();
                    break;

                  case "line":
                    e.beginPath(), e.moveTo(a - t, n), e.lineTo(a + t, n), e.closePath();
                    break;

                  case "dash":
                    e.beginPath(), e.moveTo(a, n), e.lineTo(a + t, n), e.closePath();
                }
                e.stroke();
            }
        } else e.drawImage(o, a - o.width / 2, n - o.height / 2);
    };
};