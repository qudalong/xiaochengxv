var u = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var e = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), r = t.getHours(), o = t.getMinutes(), i = t.getSeconds();
        return [ e, n, a ].map(u).join("/") + " " + [ r, o, i ].map(u).join(":");
    },
    DateDiff: function(t, e) {
        var n, a, r;
        return n = t.split("-"), a = new Date(n[1] + "-" + n[2] + "-" + n[0]), n = e.split("-"), 
        r = new Date(n[1] + "-" + n[2] + "-" + n[0]), parseInt(Math.abs(a - r) / 1e3 / 60 / 60 / 24);
    },
    getDistance: function(t, e, n, a) {
        e = e || 0, n = n || 0, a = a || 0;
        var r = (t = t || 0) * Math.PI / 180, o = n * Math.PI / 180, i = r - o, u = e * Math.PI / 180 - a * Math.PI / 180;
        return 12756274 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(r) * Math.cos(o) * Math.pow(Math.sin(u / 2), 2)));
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + n(e.getMonth() + 1, 2) + "-" + n(e.getDate(), 2) + " " + n(e.getHours(), 2) + ":" + n(e.getMinutes(), 2) + ":" + n(e.getSeconds(), 2);
        function n(t, e) {
            for (var n = "" + t, a = n.length, r = "", o = e; o-- > a; ) r += "0";
            return r + n;
        }
    },
    recordTime: function(t) {
        var e = t.getMonth() + 1, n = t.getDate(), a = t.getHours(), r = t.getMinutes();
        return [ e, n ].map(u).join("/") + " " + [ a, r ].map(u).join(":");
    }
};