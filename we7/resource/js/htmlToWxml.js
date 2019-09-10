var h = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, d = /^<\/([-A-Za-z0-9_]+)[^>]*>/, u = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, f = t("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), p = t("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), m = t("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), g = t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), v = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), x = t("script,style");

function t(t) {
    for (var e = {}, r = t.split(","), a = 0; a < r.length; a++) e[r[a]] = !0;
    return e;
}

var r = {};

r.html2json = function(t) {
    t = t.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
    var n = [], s = {
        node: "root",
        child: []
    };
    return function(t, n) {
        var e, r, a, s = [], i = t;
        for (s.last = function() {
            return this[this.length - 1];
        }; t; ) {
            if (r = !0, s.last() && x[s.last()]) t = t.replace(new RegExp("([\\s\\S]*?)</" + s.last() + "[^>]*>"), function(t, e) {
                return e = e.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), n.chars && n.chars(e), 
                "";
            }), c(0, s.last()); else if (0 == t.indexOf("\x3c!--") ? 0 <= (e = t.indexOf("--\x3e")) && (n.comment && n.comment(t.substring(4, e)), 
            t = t.substring(e + 3), r = !1) : 0 == t.indexOf("</") ? (a = t.match(d)) && (t = t.substring(a[0].length), 
            a[0].replace(d, c), r = !1) : 0 == t.indexOf("<") && (a = t.match(h)) && (t = t.substring(a[0].length), 
            a[0].replace(h, l), r = !1), r) {
                var o = (e = t.indexOf("<")) < 0 ? t : t.substring(0, e);
                t = e < 0 ? "" : t.substring(e), n.chars && n.chars(o);
            }
            if (t == i) throw "Parse Error: " + t;
            i = t;
        }
        function l(t, e, r, a) {
            if (e = e.toLowerCase(), p[e]) for (;s.last() && m[s.last()]; ) c(0, s.last());
            if (g[e] && s.last() == e && c(0, e), (a = f[e] || !!a) || s.push(e), n.start) {
                var i = [];
                r.replace(u, function(t, e) {
                    var r = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : v[e] ? e : "";
                    i.push({
                        name: e,
                        value: r,
                        escaped: r.replace(/(^|[^\\])"/g, '$1\\"')
                    });
                }), n.start && n.start(e, i, a);
            }
        }
        function c(t, e) {
            if (e) for (r = s.length - 1; 0 <= r && s[r] != e; r--) ; else var r = 0;
            if (0 <= r) {
                for (var a = s.length - 1; r <= a; a--) n.end && n.end(s[a]);
                s.length = r;
            }
        }
        c();
    }(t, {
        start: function(t, e, r) {
            var a = {
                node: "element",
                tag: t
            };
            if (0 !== e.length && (a.attr = e.reduce(function(t, e) {
                var r = e.name, a = e.value;
                return a.match(/ /) && (a = a.split(" ")), t[r] ? Array.isArray(t[r]) ? t[r].push(a) : t[r] = [ t[r], a ] : t[r] = a, 
                t;
            }, {})), r) {
                var i = n[0] || s;
                void 0 === i.child && (i.child = []), i.child.push(a);
            } else n.unshift(a);
        },
        end: function(t) {
            var e = n.shift();
            if (e.tag !== t && console.error("invalid state: mismatch end tag"), 0 === n.length) s.child.push(e); else {
                var r = n[0];
                void 0 === r.child && (r.child = []), r.child.push(e);
            }
        },
        chars: function(t) {
            var e = {
                node: "text",
                text: t
            };
            if (0 === n.length) s.child.push(e); else {
                var r = n[0];
                void 0 === r.child && (r.child = []), r.child.push(e);
            }
        },
        comment: function(t) {
            var e = {
                node: "comment",
                text: t
            }, r = n[0];
            void 0 === r.child && (r.child = []), r.child.push(e);
        }
    }), s;
}, r.json2html = function e(r) {
    var t = "";
    r.child && (t = r.child.map(function(t) {
        return e(t);
    }).join(""));
    var a = "";
    if (r.attr && "" !== (a = Object.keys(r.attr).map(function(t) {
        var e = r.attr[t];
        return Array.isArray(e) && (e = e.join(" ")), t + "=" + ('"' + e + '"');
    }).join(" ")) && (a = " " + a), "element" !== r.node) return "text" === r.node ? r.text : "comment" === r.node ? "\x3c!--" + r.text + "--\x3e" : "root" === r.node ? t : void 0;
    var i = r.tag;
    return -1 < [ "area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed" ].indexOf(i) ? "<" + r.tag + a + "/>" : "<" + r.tag + a + ">" + t + "</" + r.tag + ">";
};

var a = function(t) {
    for (var e = [], r = [], a = 0, i = t.length; a < i; a++) if (0 == a) {
        if ("view" == t[a].type) continue;
        e.push(t[a]);
    } else if ("view" == t[a].type) {
        if (0 < e.length) {
            var n = {
                type: "view",
                child: e
            };
            r.push(n);
        }
        e = [];
    } else if ("img" == t[a].type) {
        0 < e.length && (n = {
            type: "view",
            child: e
        }, r.push(n));
        var s = t[a].attr;
        t[a].attr.width && -1 === t[a].attr.width.indexOf("%") && -1 === t[a].attr.width.indexOf("px") && (t[a].attr.width = t[a].attr.width + "px"), 
        t[a].attr.height && -1 === t[a].attr.height.indexOf("%") && -1 === t[a].attr.height.indexOf("px") && (t[a].attr.height = t[a].attr.height + "px"), 
        n = {
            type: "img",
            attr: s
        }, r.push(n), e = [];
    } else e.push(t[a]), a == i - 1 && (n = {
        type: "view",
        child: e
    }, r.push(n));
    return r;
}, i = function(t) {
    var n = [];
    return function t(e) {
        var r = {};
        if ("root" == e.node) ; else if ("element" == e.node) switch (e.tag) {
          case "a":
            r = {
                type: "a",
                text: e.child[0].text
            };
            break;

          case "img":
            r = {
                type: "img",
                text: e.text
            };
            break;

          case "p":
          case "div":
            r = {
                type: "view",
                text: e.text
            };
        } else "text" == e.node && (r = {
            type: "text",
            text: e.text
        });
        if (e.attr && (r.attr = e.attr), 0 != Object.keys(r).length && n.push(r), "a" != e.tag) {
            var a = e.child;
            if (a) for (var i in a) t(a[i]);
        }
    }(t), n;
};

module.exports = {
    html2json: function(t) {
        var e = r.html2json(t);
        return e = i(e), a(e);
    }
};