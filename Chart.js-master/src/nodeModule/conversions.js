function a(r) {
    var e, n, t = r[0] / 255, a = r[1] / 255, o = r[2] / 255, i = Math.min(t, a, o), u = Math.max(t, a, o), l = u - i;
    return u == i ? e = 0 : t == u ? e = (a - o) / l : a == u ? e = 2 + (o - t) / l : o == u && (e = 4 + (t - a) / l), 
    (e = Math.min(60 * e, 360)) < 0 && (e += 360), n = (i + u) / 2, [ e, 100 * (u == i ? 0 : n <= .5 ? l / (u + i) : l / (2 - u - i)), 100 * n ];
}

function e(r) {
    var e, n, t = r[0], a = r[1], o = r[2], i = Math.min(t, a, o), u = Math.max(t, a, o), l = u - i;
    return n = 0 == u ? 0 : l / u * 1e3 / 10, u == i ? e = 0 : t == u ? e = (a - o) / l : a == u ? e = 2 + (o - t) / l : o == u && (e = 4 + (t - a) / l), 
    (e = Math.min(60 * e, 360)) < 0 && (e += 360), [ e, n, u / 255 * 1e3 / 10 ];
}

function n(r) {
    var e = r[0], n = r[1], t = r[2];
    return [ a(r)[0], 100 * (1 / 255 * Math.min(e, Math.min(n, t))), 100 * (t = 1 - 1 / 255 * Math.max(e, Math.max(n, t))) ];
}

function t(r) {
    var e, n = r[0] / 255, t = r[1] / 255, a = r[2] / 255;
    return [ 100 * ((1 - n - (e = Math.min(1 - n, 1 - t, 1 - a))) / (1 - e) || 0), 100 * ((1 - t - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e ];
}

function o(r) {
    return p[JSON.stringify(r)];
}

function i(r) {
    var e = r[0] / 255, n = r[1] / 255, t = r[2] / 255;
    return [ 100 * (.4124 * (e = .04045 < e ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (n = .04045 < n ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (t = .04045 < t ? Math.pow((t + .055) / 1.055, 2.4) : t / 12.92)), 100 * (.2126 * e + .7152 * n + .0722 * t), 100 * (.0193 * e + .1192 * n + .9505 * t) ];
}

function u(r) {
    var e = i(r), n = e[0], t = e[1], a = e[2];
    return t /= 100, a /= 108.883, n = .008856 < (n /= 95.047) ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, 
    [ 116 * (t = .008856 < t ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116) - 16, 500 * (n - t), 200 * (t - (a = .008856 < a ? Math.pow(a, 1 / 3) : 7.787 * a + 16 / 116)) ];
}

function l(r) {
    var e, n, t, a, o, i = r[0] / 360, u = r[1] / 100, l = r[2] / 100;
    if (0 == u) return [ o = 255 * l, o, o ];
    e = 2 * l - (n = l < .5 ? l * (1 + u) : l + u - l * u), a = [ 0, 0, 0 ];
    for (var h = 0; h < 3; h++) (t = i + 1 / 3 * -(h - 1)) < 0 && t++, 1 < t && t--, 
    o = 6 * t < 1 ? e + 6 * (n - e) * t : 2 * t < 1 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e, 
    a[h] = 255 * o;
    return a;
}

function h(r) {
    var e = r[0] / 60, n = r[1] / 100, t = r[2] / 100, a = Math.floor(e) % 6, o = e - Math.floor(e), i = 255 * t * (1 - n), u = 255 * t * (1 - n * o), l = 255 * t * (1 - n * (1 - o));
    t *= 255;
    switch (a) {
      case 0:
        return [ t, l, i ];

      case 1:
        return [ u, t, i ];

      case 2:
        return [ i, t, l ];

      case 3:
        return [ i, u, t ];

      case 4:
        return [ l, i, t ];

      case 5:
        return [ t, i, u ];
    }
}

function c(e) {
    var n, t, a, o, i = e[0] / 360, u = e[1] / 100, l = e[2] / 100, h = u + l;
    switch (1 < h && (u /= h, l /= h), a = 6 * i - (n = Math.floor(6 * i)), 0 != (1 & n) && (a = 1 - a), 
    o = u + a * ((t = 1 - l) - u), n) {
      default:
      case 6:
      case 0:
        r = t, g = o, b = u;
        break;

      case 1:
        r = o, g = t, b = u;
        break;

      case 2:
        r = u, g = t, b = o;
        break;

      case 3:
        r = u, g = o, b = t;
        break;

      case 4:
        r = o, g = u, b = t;
        break;

      case 5:
        r = t, g = u, b = o;
    }
    return [ 255 * r, 255 * g, 255 * b ];
}

function s(r) {
    var e = r[0] / 100, n = r[1] / 100, t = r[2] / 100, a = r[3] / 100;
    return [ 255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, t * (1 - a) + a)) ];
}

function d(r) {
    var e, n, t, a = r[0] / 100, o = r[1] / 100, i = r[2] / 100;
    return n = -.9689 * a + 1.8758 * o + .0415 * i, t = .0557 * a + -.204 * o + 1.057 * i, 
    e = .0031308 < (e = 3.2406 * a + -1.5372 * o + -.4986 * i) ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e *= 12.92, 
    n = .0031308 < n ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : n *= 12.92, t = .0031308 < t ? 1.055 * Math.pow(t, 1 / 2.4) - .055 : t *= 12.92, 
    [ 255 * (e = Math.min(Math.max(0, e), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (t = Math.min(Math.max(0, t), 1)) ];
}

function m(r) {
    var e = r[0], n = r[1], t = r[2];
    return n /= 100, t /= 108.883, e = .008856 < (e /= 95.047) ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, 
    [ 116 * (n = .008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (e - n), 200 * (n - (t = .008856 < t ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116)) ];
}

function y(r) {
    var e, n, t, a, o = r[0], i = r[1], u = r[2];
    return a = o <= 8 ? (n = 100 * o / 903.3) / 100 * 7.787 + 16 / 116 : (n = 100 * Math.pow((o + 16) / 116, 3), 
    Math.pow(n / 100, 1 / 3)), [ e = e / 95.047 <= .008856 ? e = 95.047 * (i / 500 + a - 16 / 116) / 7.787 : 95.047 * Math.pow(i / 500 + a, 3), n, t = t / 108.883 <= .008859 ? t = 108.883 * (a - u / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(a - u / 200, 3) ];
}

function w(r) {
    var e, n = r[0], t = r[1], a = r[2];
    return (e = 360 * Math.atan2(a, t) / 2 / Math.PI) < 0 && (e += 360), [ n, Math.sqrt(t * t + a * a), e ];
}

function f(r) {
    return d(y(r));
}

function k(r) {
    var e, n = r[0], t = r[1];
    return e = r[2] / 360 * 2 * Math.PI, [ n, t * Math.cos(e), t * Math.sin(e) ];
}

function M(r) {
    return v[r];
}

module.exports = {
    rgb2hsl: a,
    rgb2hsv: e,
    rgb2hwb: n,
    rgb2cmyk: t,
    rgb2keyword: o,
    rgb2xyz: i,
    rgb2lab: u,
    rgb2lch: function(r) {
        return w(u(r));
    },
    hsl2rgb: l,
    hsl2hsv: function(r) {
        var e = r[0], n = r[1] / 100, t = r[2] / 100;
        return 0 !== t ? [ e, 100 * (2 * (n *= (t *= 2) <= 1 ? t : 2 - t) / (t + n)), 100 * ((t + n) / 2) ] : [ 0, 0, 0 ];
    },
    hsl2hwb: function(r) {
        return n(l(r));
    },
    hsl2cmyk: function(r) {
        return t(l(r));
    },
    hsl2keyword: function(r) {
        return o(l(r));
    },
    hsv2rgb: h,
    hsv2hsl: function(r) {
        var e, n, t = r[0], a = r[1] / 100, o = r[2] / 100;
        return e = a * o, [ t, 100 * (e = (e /= (n = (2 - a) * o) <= 1 ? n : 2 - n) || 0), 100 * (n /= 2) ];
    },
    hsv2hwb: function(r) {
        return n(h(r));
    },
    hsv2cmyk: function(r) {
        return t(h(r));
    },
    hsv2keyword: function(r) {
        return o(h(r));
    },
    hwb2rgb: c,
    hwb2hsl: function(r) {
        return a(c(r));
    },
    hwb2hsv: function(r) {
        return e(c(r));
    },
    hwb2cmyk: function(r) {
        return t(c(r));
    },
    hwb2keyword: function(r) {
        return o(c(r));
    },
    cmyk2rgb: s,
    cmyk2hsl: function(r) {
        return a(s(r));
    },
    cmyk2hsv: function(r) {
        return e(s(r));
    },
    cmyk2hwb: function(r) {
        return n(s(r));
    },
    cmyk2keyword: function(r) {
        return o(s(r));
    },
    keyword2rgb: M,
    keyword2hsl: function(r) {
        return a(M(r));
    },
    keyword2hsv: function(r) {
        return e(M(r));
    },
    keyword2hwb: function(r) {
        return n(M(r));
    },
    keyword2cmyk: function(r) {
        return t(M(r));
    },
    keyword2lab: function(r) {
        return u(M(r));
    },
    keyword2xyz: function(r) {
        return i(M(r));
    },
    xyz2rgb: d,
    xyz2lab: m,
    xyz2lch: function(r) {
        return w(m(r));
    },
    lab2xyz: y,
    lab2rgb: f,
    lab2lch: w,
    lch2lab: k,
    lch2xyz: function(r) {
        return y(k(r));
    },
    lch2rgb: function(r) {
        return f(k(r));
    }
};

var v = {
    aliceblue: [ 240, 248, 255 ],
    antiquewhite: [ 250, 235, 215 ],
    aqua: [ 0, 255, 255 ],
    aquamarine: [ 127, 255, 212 ],
    azure: [ 240, 255, 255 ],
    beige: [ 245, 245, 220 ],
    bisque: [ 255, 228, 196 ],
    black: [ 0, 0, 0 ],
    blanchedalmond: [ 255, 235, 205 ],
    blue: [ 0, 0, 255 ],
    blueviolet: [ 138, 43, 226 ],
    brown: [ 165, 42, 42 ],
    burlywood: [ 222, 184, 135 ],
    cadetblue: [ 95, 158, 160 ],
    chartreuse: [ 127, 255, 0 ],
    chocolate: [ 210, 105, 30 ],
    coral: [ 255, 127, 80 ],
    cornflowerblue: [ 100, 149, 237 ],
    cornsilk: [ 255, 248, 220 ],
    crimson: [ 220, 20, 60 ],
    cyan: [ 0, 255, 255 ],
    darkblue: [ 0, 0, 139 ],
    darkcyan: [ 0, 139, 139 ],
    darkgoldenrod: [ 184, 134, 11 ],
    darkgray: [ 169, 169, 169 ],
    darkgreen: [ 0, 100, 0 ],
    darkgrey: [ 169, 169, 169 ],
    darkkhaki: [ 189, 183, 107 ],
    darkmagenta: [ 139, 0, 139 ],
    darkolivegreen: [ 85, 107, 47 ],
    darkorange: [ 255, 140, 0 ],
    darkorchid: [ 153, 50, 204 ],
    darkred: [ 139, 0, 0 ],
    darksalmon: [ 233, 150, 122 ],
    darkseagreen: [ 143, 188, 143 ],
    darkslateblue: [ 72, 61, 139 ],
    darkslategray: [ 47, 79, 79 ],
    darkslategrey: [ 47, 79, 79 ],
    darkturquoise: [ 0, 206, 209 ],
    darkviolet: [ 148, 0, 211 ],
    deeppink: [ 255, 20, 147 ],
    deepskyblue: [ 0, 191, 255 ],
    dimgray: [ 105, 105, 105 ],
    dimgrey: [ 105, 105, 105 ],
    dodgerblue: [ 30, 144, 255 ],
    firebrick: [ 178, 34, 34 ],
    floralwhite: [ 255, 250, 240 ],
    forestgreen: [ 34, 139, 34 ],
    fuchsia: [ 255, 0, 255 ],
    gainsboro: [ 220, 220, 220 ],
    ghostwhite: [ 248, 248, 255 ],
    gold: [ 255, 215, 0 ],
    goldenrod: [ 218, 165, 32 ],
    gray: [ 128, 128, 128 ],
    green: [ 0, 128, 0 ],
    greenyellow: [ 173, 255, 47 ],
    grey: [ 128, 128, 128 ],
    honeydew: [ 240, 255, 240 ],
    hotpink: [ 255, 105, 180 ],
    indianred: [ 205, 92, 92 ],
    indigo: [ 75, 0, 130 ],
    ivory: [ 255, 255, 240 ],
    khaki: [ 240, 230, 140 ],
    lavender: [ 230, 230, 250 ],
    lavenderblush: [ 255, 240, 245 ],
    lawngreen: [ 124, 252, 0 ],
    lemonchiffon: [ 255, 250, 205 ],
    lightblue: [ 173, 216, 230 ],
    lightcoral: [ 240, 128, 128 ],
    lightcyan: [ 224, 255, 255 ],
    lightgoldenrodyellow: [ 250, 250, 210 ],
    lightgray: [ 211, 211, 211 ],
    lightgreen: [ 144, 238, 144 ],
    lightgrey: [ 211, 211, 211 ],
    lightpink: [ 255, 182, 193 ],
    lightsalmon: [ 255, 160, 122 ],
    lightseagreen: [ 32, 178, 170 ],
    lightskyblue: [ 135, 206, 250 ],
    lightslategray: [ 119, 136, 153 ],
    lightslategrey: [ 119, 136, 153 ],
    lightsteelblue: [ 176, 196, 222 ],
    lightyellow: [ 255, 255, 224 ],
    lime: [ 0, 255, 0 ],
    limegreen: [ 50, 205, 50 ],
    linen: [ 250, 240, 230 ],
    magenta: [ 255, 0, 255 ],
    maroon: [ 128, 0, 0 ],
    mediumaquamarine: [ 102, 205, 170 ],
    mediumblue: [ 0, 0, 205 ],
    mediumorchid: [ 186, 85, 211 ],
    mediumpurple: [ 147, 112, 219 ],
    mediumseagreen: [ 60, 179, 113 ],
    mediumslateblue: [ 123, 104, 238 ],
    mediumspringgreen: [ 0, 250, 154 ],
    mediumturquoise: [ 72, 209, 204 ],
    mediumvioletred: [ 199, 21, 133 ],
    midnightblue: [ 25, 25, 112 ],
    mintcream: [ 245, 255, 250 ],
    mistyrose: [ 255, 228, 225 ],
    moccasin: [ 255, 228, 181 ],
    navajowhite: [ 255, 222, 173 ],
    navy: [ 0, 0, 128 ],
    oldlace: [ 253, 245, 230 ],
    olive: [ 128, 128, 0 ],
    olivedrab: [ 107, 142, 35 ],
    orange: [ 255, 165, 0 ],
    orangered: [ 255, 69, 0 ],
    orchid: [ 218, 112, 214 ],
    palegoldenrod: [ 238, 232, 170 ],
    palegreen: [ 152, 251, 152 ],
    paleturquoise: [ 175, 238, 238 ],
    palevioletred: [ 219, 112, 147 ],
    papayawhip: [ 255, 239, 213 ],
    peachpuff: [ 255, 218, 185 ],
    peru: [ 205, 133, 63 ],
    pink: [ 255, 192, 203 ],
    plum: [ 221, 160, 221 ],
    powderblue: [ 176, 224, 230 ],
    purple: [ 128, 0, 128 ],
    rebeccapurple: [ 102, 51, 153 ],
    red: [ 255, 0, 0 ],
    rosybrown: [ 188, 143, 143 ],
    royalblue: [ 65, 105, 225 ],
    saddlebrown: [ 139, 69, 19 ],
    salmon: [ 250, 128, 114 ],
    sandybrown: [ 244, 164, 96 ],
    seagreen: [ 46, 139, 87 ],
    seashell: [ 255, 245, 238 ],
    sienna: [ 160, 82, 45 ],
    silver: [ 192, 192, 192 ],
    skyblue: [ 135, 206, 235 ],
    slateblue: [ 106, 90, 205 ],
    slategray: [ 112, 128, 144 ],
    slategrey: [ 112, 128, 144 ],
    snow: [ 255, 250, 250 ],
    springgreen: [ 0, 255, 127 ],
    steelblue: [ 70, 130, 180 ],
    tan: [ 210, 180, 140 ],
    teal: [ 0, 128, 128 ],
    thistle: [ 216, 191, 216 ],
    tomato: [ 255, 99, 71 ],
    turquoise: [ 64, 224, 208 ],
    violet: [ 238, 130, 238 ],
    wheat: [ 245, 222, 179 ],
    white: [ 255, 255, 255 ],
    whitesmoke: [ 245, 245, 245 ],
    yellow: [ 255, 255, 0 ],
    yellowgreen: [ 154, 205, 50 ]
}, p = {};

for (var x in v) p[JSON.stringify(v[x])] = x;