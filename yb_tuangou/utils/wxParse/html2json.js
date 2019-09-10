var i = "", l = "", d = {}, m = require("./wxDiscode.js"), t = require("./htmlparser.js"), h = (e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), 
e("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video")), f = e("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), g = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), 
e("wxxxcode-style,script,style,view,scroll-view,block");

function e(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

module.exports = {
    html2json: function(e, c) {
        e = e.replace(/<\?xml.*\?>\n/, "").replace(/<.*!doctype.*\>\n/, "").replace(/<.*!DOCTYPE.*\>\n/, ""), 
        e = m.strDiscode(e);
        var u = [], p = {
            node: c,
            nodes: [],
            images: [],
            imageUrls: []
        };
        return t(e, {
            start: function(e, t, r) {
                var a = {
                    node: "element",
                    tag: e
                };
                if (h[e] ? a.tagType = "block" : f[e] ? a.tagType = "inline" : g[e] && (a.tagType = "closeSelf"), 
                0 !== t.length && (a.attr = t.reduce(function(e, t) {
                    var r = t.name, s = t.value;
                    return "class" == r && (a.classStr = s), "style" == r && (a.styleStr = s), s.match(/ /) && (s = s.split(" ")), 
                    e[r] ? Array.isArray(e[r]) ? e[r].push(s) : e[r] = [ e[r], s ] : e[r] = s, e;
                }, {})), console.log(a), "img" === a.tag) {
                    a.imgIndex = p.images.length;
                    var s = a.attr.src;
                    s = m.urlToHttpUrl(s, "https"), a.attr.src = s, a.from = c, p.images.push(a), p.imageUrls.push(s);
                }
                if ("font" === a.tag) {
                    var o = [ "x-small", "small", "medium", "large", "x-large", "xx-large", "-webkit-xxx-large" ], n = {
                        color: "color",
                        face: "font-family",
                        size: "font-size"
                    };
                    for (var i in a.attr.style || (a.attr.style = []), a.styleStr || (a.styleStr = ""), 
                    n) if (a.attr[i]) {
                        var l = "size" === i ? o[a.attr[i] - 1] : a.attr[i];
                        a.attr.style.push(n[i]), a.attr.style.push(l), a.styleStr += n[i] + ": " + l + ";", 
                        "size" == i && (a.styleStr += "line-height:" + l + ";");
                    }
                }
                if ("source" === a.tag && (p.source = a.attr.src), r) {
                    var d = u[0] || p;
                    void 0 === d.nodes && (d.nodes = []), d.nodes.push(a);
                } else u.unshift(a);
            },
            end: function(e) {
                var t = u.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), "video" === t.tag && p.source && (t.attr.src = p.source, 
                delete result.source), 0 === u.length) p.nodes.push(t); else {
                    var r = u[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e,
                    textArray: function(e) {
                        var t = [];
                        if (0 == i.length || !d) {
                            var r = {
                                node: "text"
                            };
                            return r.text = e, a = [ r ];
                        }
                        e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
                        for (var s = new RegExp("[:]"), a = e.split(s), o = 0; o < a.length; o++) {
                            var n = a[o], r = {};
                            d[n] ? (r.node = "element", r.tag = "emoji", r.text = d[n], r.baseSrc = l) : (r.node = "text", 
                            r.text = n), t.push(r);
                        }
                        return t;
                    }(e)
                };
                if (0 === u.length) p.nodes.push(t); else {
                    var r = u[0];
                    void 0 === r.nodes && (r.nodes = []), r.nodes.push(t);
                }
            },
            comment: function(e) {}
        }), p;
    },
    emojisInit: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", r = arguments[2];
        i = e, l = t, d = r;
    }
};