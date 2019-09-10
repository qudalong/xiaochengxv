var A = {
    CHAR_TILDE: 102
}, B = {
    ANY: 1,
    AB: 2,
    A: 3,
    B: 4,
    C: 5
};

function v(t, r) {
    return void 0 === r ? 32 <= t ? t - 32 : t + 64 : parseInt(String.fromCharCode(t) + String.fromCharCode(r));
}

function w(t, r) {
    var i = C(t);
    return i == B.ANY || (i == B.AB || (i == B.A && r == B.A || i == B.B && r == B.B));
}

function C(t) {
    return 48 <= t && t <= 57 ? B.ANY : 32 <= t && t <= 95 ? B.AB : t < 32 ? B.A : B.B;
}

exports.code128 = function(t, r, i, e) {
    i = parseInt(i), e = parseInt(e);
    for (var s = function(t) {
        var h = {
            currcs: B.C
        }, r = function(t) {
            for (var r = [], i = 0; i < t.length; i++) r.push(t.charCodeAt(i));
            return r;
        }(t), i = 126 == r[0] ? 1 : 0, e = 0 < r.length ? C(r[i++]) : B.AB, s = 0 < r.length ? C(r[i++]) : B.AB;
        h.currcs = (n = e, c = s, a = 0, a += n == B.A ? 1 : 0, a += n == B.B ? -1 : 0, 
        a += c == B.A ? 1 : 0, 0 < (a += c == B.B ? -1 : 0) ? B.A : B.B), h.currcs = function(t, r) {
            for (var i = 0; i < t.length; i++) {
                var e = t[i];
                if ((e < 48 || 57 < e) && 126 != e) return r;
            }
            return B.C;
        }(r, h.currcs);
        var n, c, a;
        var u = new Array();
        switch (h.currcs) {
          case B.A:
            u.push(103);
            break;

          case B.B:
            u.push(104);
            break;

          default:
            u.push(105);
        }
        for (var f = 0; f < r.length; f++) {
            var o = r[f];
            o in A && (u.push(A[o]), o = r[++f]);
            var l = r.length > f + 1 ? r[f + 1] : -1;
            u = u.concat(g(o, l, h.currcs)), h.currcs == B.C && f++;
        }
        for (var d = u[0], p = 1; p < u.length; p++) d += p * u[p];
        return u.push(d % 103), u.push(106), u;
        function g(t, r, i) {
            var e = [], s = -1;
            if (w(t, i)) i == B.C && (-1 == r ? (s = 100, i = B.B) : -1 == r || w(r, i) || (i = w(r, B.A) ? (s = 101, 
            B.A) : (s = 100, B.B))); else if (-1 == r || w(r, i)) s = 98; else switch (i) {
              case B.A:
                s = 100, i = B.B;
                break;

              case B.B:
                s = 101, i = B.A;
            }
            return -1 != s ? (e.push(s), e.push(v(t))) : i == B.C ? e.push(v(t, r)) : e.push(v(t)), 
            h.currcs = i, e;
        }
    }(r), h = new g(t, i, e), n = h.area.width / (11 * (s.length - 3) + 35), c = h.area.left, a = h.area.top, u = 0; u < s.length; u++) for (var f = s[u], o = 0; o < 8; o += 2) {
        var l = _[f][o] * n, d = e - a, p = _[f][o + 1] * n;
        0 < l && h.fillFgRect(c, a, l, d), c += l + p;
    }
    t.draw();
};

var g = function(t, r, i) {
    this.width = r, this.height = i, this.quiet = Math.round(this.width / 40), this.border_size = 0, 
    this.padding_width = 0, this.area = {
        width: r - 2 * this.padding_width - 2 * this.quiet,
        height: i - 2 * this.border_size,
        top: this.border_size - 4,
        left: this.padding_width + this.quiet
    }, this.ctx = t, this.fg = "#000000", this.bg = "#ffffff", this.fillBgRect(0, 0, r, i), 
    this.fillBgRect(0, this.border_size, r, i - 2 * this.border_size);
};

g.prototype._fillRect = function(t, r, i, e, s) {
    this.ctx.setFillStyle(s), this.ctx.fillRect(t, r, i, e);
}, g.prototype.fillFgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.fg);
}, g.prototype.fillBgRect = function(t, r, i, e) {
    this._fillRect(t, r, i, e, this.bg);
};

var _ = [ [ 2, 1, 2, 2, 2, 2, 0, 0 ], [ 2, 2, 2, 1, 2, 2, 0, 0 ], [ 2, 2, 2, 2, 2, 1, 0, 0 ], [ 1, 2, 1, 2, 2, 3, 0, 0 ], [ 1, 2, 1, 3, 2, 2, 0, 0 ], [ 1, 3, 1, 2, 2, 2, 0, 0 ], [ 1, 2, 2, 2, 1, 3, 0, 0 ], [ 1, 2, 2, 3, 1, 2, 0, 0 ], [ 1, 3, 2, 2, 1, 2, 0, 0 ], [ 2, 2, 1, 2, 1, 3, 0, 0 ], [ 2, 2, 1, 3, 1, 2, 0, 0 ], [ 2, 3, 1, 2, 1, 2, 0, 0 ], [ 1, 1, 2, 2, 3, 2, 0, 0 ], [ 1, 2, 2, 1, 3, 2, 0, 0 ], [ 1, 2, 2, 2, 3, 1, 0, 0 ], [ 1, 1, 3, 2, 2, 2, 0, 0 ], [ 1, 2, 3, 1, 2, 2, 0, 0 ], [ 1, 2, 3, 2, 2, 1, 0, 0 ], [ 2, 2, 3, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 3, 2, 0, 0 ], [ 2, 2, 1, 2, 3, 1, 0, 0 ], [ 2, 1, 3, 2, 1, 2, 0, 0 ], [ 2, 2, 3, 1, 1, 2, 0, 0 ], [ 3, 1, 2, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 2, 2, 2, 0, 0 ], [ 3, 2, 1, 1, 2, 2, 0, 0 ], [ 3, 2, 1, 2, 2, 1, 0, 0 ], [ 3, 1, 2, 2, 1, 2, 0, 0 ], [ 3, 2, 2, 1, 1, 2, 0, 0 ], [ 3, 2, 2, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 2, 3, 0, 0 ], [ 2, 1, 2, 3, 2, 1, 0, 0 ], [ 2, 3, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 3, 2, 3, 0, 0 ], [ 1, 3, 1, 1, 2, 3, 0, 0 ], [ 1, 3, 1, 3, 2, 1, 0, 0 ], [ 1, 1, 2, 3, 1, 3, 0, 0 ], [ 1, 3, 2, 1, 1, 3, 0, 0 ], [ 1, 3, 2, 3, 1, 1, 0, 0 ], [ 2, 1, 1, 3, 1, 3, 0, 0 ], [ 2, 3, 1, 1, 1, 3, 0, 0 ], [ 2, 3, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 2, 1, 3, 3, 0, 0 ], [ 1, 1, 2, 3, 3, 1, 0, 0 ], [ 1, 3, 2, 1, 3, 1, 0, 0 ], [ 1, 1, 3, 1, 2, 3, 0, 0 ], [ 1, 1, 3, 3, 2, 1, 0, 0 ], [ 1, 3, 3, 1, 2, 1, 0, 0 ], [ 3, 1, 3, 1, 2, 1, 0, 0 ], [ 2, 1, 1, 3, 3, 1, 0, 0 ], [ 2, 3, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 3, 1, 1, 3, 0, 0 ], [ 2, 1, 3, 3, 1, 1, 0, 0 ], [ 2, 1, 3, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 2, 3, 0, 0 ], [ 3, 1, 1, 3, 2, 1, 0, 0 ], [ 3, 3, 1, 1, 2, 1, 0, 0 ], [ 3, 1, 2, 1, 1, 3, 0, 0 ], [ 3, 1, 2, 3, 1, 1, 0, 0 ], [ 3, 3, 2, 1, 1, 1, 0, 0 ], [ 3, 1, 4, 1, 1, 1, 0, 0 ], [ 2, 2, 1, 4, 1, 1, 0, 0 ], [ 4, 3, 1, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 2, 4, 0, 0 ], [ 1, 1, 1, 4, 2, 2, 0, 0 ], [ 1, 2, 1, 1, 2, 4, 0, 0 ], [ 1, 2, 1, 4, 2, 1, 0, 0 ], [ 1, 4, 1, 1, 2, 2, 0, 0 ], [ 1, 4, 1, 2, 2, 1, 0, 0 ], [ 1, 1, 2, 2, 1, 4, 0, 0 ], [ 1, 1, 2, 4, 1, 2, 0, 0 ], [ 1, 2, 2, 1, 1, 4, 0, 0 ], [ 1, 2, 2, 4, 1, 1, 0, 0 ], [ 1, 4, 2, 1, 1, 2, 0, 0 ], [ 1, 4, 2, 2, 1, 1, 0, 0 ], [ 2, 4, 1, 2, 1, 1, 0, 0 ], [ 2, 2, 1, 1, 1, 4, 0, 0 ], [ 4, 1, 3, 1, 1, 1, 0, 0 ], [ 2, 4, 1, 1, 1, 2, 0, 0 ], [ 1, 3, 4, 1, 1, 1, 0, 0 ], [ 1, 1, 1, 2, 4, 2, 0, 0 ], [ 1, 2, 1, 1, 4, 2, 0, 0 ], [ 1, 2, 1, 2, 4, 1, 0, 0 ], [ 1, 1, 4, 2, 1, 2, 0, 0 ], [ 1, 2, 4, 1, 1, 2, 0, 0 ], [ 1, 2, 4, 2, 1, 1, 0, 0 ], [ 4, 1, 1, 2, 1, 2, 0, 0 ], [ 4, 2, 1, 1, 1, 2, 0, 0 ], [ 4, 2, 1, 2, 1, 1, 0, 0 ], [ 2, 1, 2, 1, 4, 1, 0, 0 ], [ 2, 1, 4, 1, 2, 1, 0, 0 ], [ 4, 1, 2, 1, 2, 1, 0, 0 ], [ 1, 1, 1, 1, 4, 3, 0, 0 ], [ 1, 1, 1, 3, 4, 1, 0, 0 ], [ 1, 3, 1, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 1, 3, 0, 0 ], [ 1, 1, 4, 3, 1, 1, 0, 0 ], [ 4, 1, 1, 1, 1, 3, 0, 0 ], [ 4, 1, 1, 3, 1, 1, 0, 0 ], [ 1, 1, 3, 1, 4, 1, 0, 0 ], [ 1, 1, 4, 1, 3, 1, 0, 0 ], [ 3, 1, 1, 1, 4, 1, 0, 0 ], [ 4, 1, 1, 1, 3, 1, 0, 0 ], [ 2, 1, 1, 4, 1, 2, 0, 0 ], [ 2, 1, 1, 2, 1, 4, 0, 0 ], [ 2, 1, 1, 2, 3, 2, 0, 0 ], [ 2, 3, 3, 1, 1, 1, 2, 0 ] ];