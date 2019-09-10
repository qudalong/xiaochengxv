var d = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, f = /^<\/([-A-Za-z0-9_]+)[^>]*>/, p = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, u = e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), h = e("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), b = e("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), m = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), g = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), v = e("wxxxcode-style,script,style,view,scroll-view,block");

function e(e) {
    for (var t = {}, r = e.split(","), s = 0; s < r.length; s++) t[r[s]] = !0;
    return t;
}

module.exports = function(e, n) {
    var t, r, s, i = [], a = e;
    for (i.last = function() {
        return this[this.length - 1];
    }; e; ) {
        if (r = !0, i.last() && v[i.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + i.last() + "[^>]*>"), function(e, t) {
            return t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), n.chars && n.chars(t), 
            "";
        }), c(0, i.last()); else if (0 == e.indexOf("\x3c!--") ? 0 <= (t = e.indexOf("--\x3e")) && (n.comment && n.comment(e.substring(4, t)), 
        e = e.substring(t + 3), r = !1) : 0 == e.indexOf("</") ? (s = e.match(f)) && (e = e.substring(s[0].length), 
        s[0].replace(f, c), r = !1) : 0 == e.indexOf("<") && (s = e.match(d)) && (e = e.substring(s[0].length), 
        s[0].replace(d, l), r = !1), r) {
            t = e.indexOf("<");
            for (var o = ""; 0 === t; ) o += "<", t = (e = e.substring(1)).indexOf("<");
            o += t < 0 ? e : e.substring(0, t), e = t < 0 ? "" : e.substring(t), n.chars && n.chars(o);
        }
        if (e == a) throw "Parse Error: " + e;
        a = e;
    }
    function l(e, t, r, s) {
        if (t = t.toLowerCase(), h[t]) for (;i.last() && b[i.last()]; ) c(0, i.last());
        if (m[t] && i.last() == t && c(0, t), (s = u[t] || !!s) || i.push(t), n.start) {
            var a = [];
            r.replace(p, function(e, t) {
                var r = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : g[t] ? t : "";
                a.push({
                    name: t,
                    value: r,
                    escaped: r.replace(/(^|[^\\])"/g, '$1\\"')
                });
            }), n.start && n.start(t, a, s);
        }
    }
    function c(e, t) {
        if (t) for (t = t.toLowerCase(), r = i.length - 1; 0 <= r && i[r] != t; r--) ; else var r = 0;
        if (0 <= r) {
            for (var s = i.length - 1; r <= s; s--) n.end && n.end(i[s]);
            i.length = r;
        }
    }
    c();
};