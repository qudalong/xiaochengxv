var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

function r(e) {
    var r = {
        omitExtraWLInCodeBlocks: {
            defaultValue: !1,
            describe: "Omit the default extra whiteline added to code blocks",
            type: "boolean"
        },
        noHeaderId: {
            defaultValue: !1,
            describe: "Turn on/off generated header id",
            type: "boolean"
        },
        prefixHeaderId: {
            defaultValue: !1,
            describe: "Specify a prefix to generated header ids",
            type: "string"
        },
        headerLevelStart: {
            defaultValue: !1,
            describe: "The header blocks level start",
            type: "integer"
        },
        parseImgDimensions: {
            defaultValue: !1,
            describe: "Turn on/off image dimension parsing",
            type: "boolean"
        },
        simplifiedAutoLink: {
            defaultValue: !1,
            describe: "Turn on/off GFM autolink style",
            type: "boolean"
        },
        literalMidWordUnderscores: {
            defaultValue: !1,
            describe: "Parse midword underscores as literal underscores",
            type: "boolean"
        },
        strikethrough: {
            defaultValue: !1,
            describe: "Turn on/off strikethrough support",
            type: "boolean"
        },
        tables: {
            defaultValue: !1,
            describe: "Turn on/off tables support",
            type: "boolean"
        },
        tablesHeaderId: {
            defaultValue: !1,
            describe: "Add an id to table headers",
            type: "boolean"
        },
        ghCodeBlocks: {
            defaultValue: !0,
            describe: "Turn on/off GFM fenced code blocks support",
            type: "boolean"
        },
        tasklists: {
            defaultValue: !1,
            describe: "Turn on/off GFM tasklist support",
            type: "boolean"
        },
        smoothLivePreview: {
            defaultValue: !1,
            describe: "Prevents weird effects in live previews due to incomplete input",
            type: "boolean"
        },
        smartIndentationFix: {
            defaultValue: !1,
            description: "Tries to smartly fix identation in es6 strings",
            type: "boolean"
        }
    };
    if (!1 === e) return JSON.parse(JSON.stringify(r));
    var t = {};
    for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n].defaultValue);
    return t;
}

var m = {}, t = {}, p = {}, s = r(!0), h = {
    github: {
        omitExtraWLInCodeBlocks: !0,
        prefixHeaderId: "user-content-",
        simplifiedAutoLink: !0,
        literalMidWordUnderscores: !0,
        strikethrough: !0,
        tables: !0,
        tablesHeaderId: !0,
        ghCodeBlocks: !0,
        tasklists: !0
    },
    vanilla: r(!0)
};

function d(e, r) {
    var t = r ? "Error in " + r + " extension->" : "Error in unnamed extension", n = {
        valid: !0,
        error: ""
    };
    m.helper.isArray(e) || (e = [ e ]);
    for (var s = 0; s < e.length; ++s) {
        var a = t + " sub-extension " + s + ": ", o = e[s];
        if ("object" !== (void 0 === o ? "undefined" : u(o))) return n.valid = !1, n.error = a + "must be an object, but " + (void 0 === o ? "undefined" : u(o)) + " given", 
        n;
        if (!m.helper.isString(o.type)) return n.valid = !1, n.error = a + 'property "type" must be a string, but ' + u(o.type) + " given", 
        n;
        var i = o.type = o.type.toLowerCase();
        if ("language" === i && (i = o.type = "lang"), "html" === i && (i = o.type = "output"), 
        "lang" !== i && "output" !== i && "listener" !== i) return n.valid = !1, n.error = a + "type " + i + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', 
        n;
        if ("listener" === i) {
            if (m.helper.isUndefined(o.listeners)) return n.valid = !1, n.error = a + '. Extensions of type "listener" must have a property called "listeners"', 
            n;
        } else if (m.helper.isUndefined(o.filter) && m.helper.isUndefined(o.regex)) return n.valid = !1, 
        n.error = a + i + ' extensions must define either a "regex" property or a "filter" method', 
        n;
        if (o.listeners) {
            if ("object" !== u(o.listeners)) return n.valid = !1, n.error = a + '"listeners" property must be an object but ' + u(o.listeners) + " given", 
            n;
            for (var l in o.listeners) if (o.listeners.hasOwnProperty(l) && "function" != typeof o.listeners[l]) return n.valid = !1, 
            n.error = a + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + l + " must be a function but " + u(o.listeners[l]) + " given", 
            n;
        }
        if (o.filter) {
            if ("function" != typeof o.filter) return n.valid = !1, n.error = a + '"filter" must be a function, but ' + u(o.filter) + " given", 
            n;
        } else if (o.regex) {
            if (m.helper.isString(o.regex) && (o.regex = new RegExp(o.regex, "g")), !o.regex instanceof RegExp) return n.valid = !1, 
            n.error = a + '"regex" property must either be a string or a RegExp object, but ' + u(o.regex) + " given", 
            n;
            if (m.helper.isUndefined(o.replace)) return n.valid = !1, n.error = a + '"regex" extensions must implement a replace string or function', 
            n;
        }
    }
    return n;
}

function a(e, r) {
    return "~E" + r.charCodeAt(0) + "E";
}

m.helper = {}, m.extensions = {}, m.setOption = function(e, r) {
    return s[e] = r, this;
}, m.getOption = function(e) {
    return s[e];
}, m.getOptions = function() {
    return s;
}, m.resetOptions = function() {
    s = r(!0);
}, m.setFlavor = function(e) {
    if (h.hasOwnProperty(e)) {
        var r = h[e];
        for (var t in r) r.hasOwnProperty(t) && (s[t] = r[t]);
    }
}, m.getDefaultOptions = function(e) {
    return r(e);
}, m.subParser = function(e, r) {
    if (m.helper.isString(e)) {
        if (void 0 === r) {
            if (t.hasOwnProperty(e)) return t[e];
            throw Error("SubParser named " + e + " not registered!");
        }
        t[e] = r;
    }
}, m.extension = function(e, r) {
    if (!m.helper.isString(e)) throw Error("Extension 'name' must be a string");
    if (e = m.helper.stdExtName(e), m.helper.isUndefined(r)) {
        if (!p.hasOwnProperty(e)) throw Error("Extension named " + e + " is not registered!");
        return p[e];
    }
    "function" == typeof r && (r = r()), m.helper.isArray(r) || (r = [ r ]);
    var t = d(r, e);
    if (!t.valid) throw Error(t.error);
    p[e] = r;
}, m.getAllExtensions = function() {
    return p;
}, m.removeExtension = function(e) {
    delete p[e];
}, m.resetExtensions = function() {
    p = {};
}, m.validateExtension = function(e) {
    var r = d(e, null);
    return !!r.valid || (console.warn(r.error), !1);
}, m.hasOwnProperty("helper") || (m.helper = {}), m.helper.isString = function(e) {
    return "string" == typeof e || e instanceof String;
}, m.helper.isFunction = function(e) {
    return e && "[object Function]" === {}.toString.call(e);
}, m.helper.forEach = function(e, r) {
    if ("function" == typeof e.forEach) e.forEach(r); else for (var t = 0; t < e.length; t++) r(e[t], t, e);
}, m.helper.isArray = function(e) {
    return e.constructor === Array;
}, m.helper.isUndefined = function(e) {
    return void 0 === e;
}, m.helper.stdExtName = function(e) {
    return e.replace(/[_-]||\s/g, "").toLowerCase();
}, m.helper.escapeCharactersCallback = a, m.helper.escapeCharacters = function(e, r, t) {
    var n = "([" + r.replace(/([\[\]\\])/g, "\\$1") + "])";
    t && (n = "\\\\" + n);
    var s = new RegExp(n, "g");
    return e = e.replace(s, a);
};

var f = function(e, r, t, n) {
    var s, a, o, i, l, c = n || "", u = -1 < c.indexOf("g"), p = new RegExp(r + "|" + t, "g" + c.replace(/g/g, "")), h = new RegExp(r, c.replace(/g/g, "")), d = [];
    do {
        for (s = 0; o = p.exec(e); ) if (h.test(o[0])) s++ || (i = (a = p.lastIndex) - o[0].length); else if (s && !--s) {
            l = o.index + o[0].length;
            var f = {
                left: {
                    start: i,
                    end: a
                },
                match: {
                    start: a,
                    end: o.index
                },
                right: {
                    start: o.index,
                    end: l
                },
                wholeMatch: {
                    start: i,
                    end: l
                }
            };
            if (d.push(f), !u) return d;
        }
    } while (s && (p.lastIndex = a));
    return d;
};

m.helper.matchRecursiveRegExp = function(e, r, t, n) {
    for (var s = f(e, r, t, n), a = [], o = 0; o < s.length; ++o) a.push([ e.slice(s[o].wholeMatch.start, s[o].wholeMatch.end), e.slice(s[o].match.start, s[o].match.end), e.slice(s[o].left.start, s[o].left.end), e.slice(s[o].right.start, s[o].right.end) ]);
    return a;
}, m.helper.replaceRecursiveRegExp = function(e, r, t, n, s) {
    if (!m.helper.isFunction(r)) {
        var a = r;
        r = function() {
            return a;
        };
    }
    var o = f(e, t, n, s), i = e, l = o.length;
    if (0 < l) {
        var c = [];
        0 !== o[0].wholeMatch.start && c.push(e.slice(0, o[0].wholeMatch.start));
        for (var u = 0; u < l; ++u) c.push(r(e.slice(o[u].wholeMatch.start, o[u].wholeMatch.end), e.slice(o[u].match.start, o[u].match.end), e.slice(o[u].left.start, o[u].left.end), e.slice(o[u].right.start, o[u].right.end))), 
        u < l - 1 && c.push(e.slice(o[u].wholeMatch.end, o[u + 1].wholeMatch.start));
        o[l - 1].wholeMatch.end < e.length && c.push(e.slice(o[l - 1].wholeMatch.end)), 
        i = c.join("");
    }
    return i;
}, m.helper.isUndefined(console) && (console = {
    warn: function(e) {
        alert(e);
    },
    log: function(e) {
        alert(e);
    },
    error: function(e) {
        throw e;
    }
}), m.Converter = function(t) {
    var a = {}, o = [], i = [], l = {};
    function n(e, r) {
        if (r = r || null, m.helper.isString(e)) {
            if (r = e = m.helper.stdExtName(e), m.extensions[e]) return console.warn("DEPRECATION WARNING: " + e + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), 
            void function(e, r) {
                "function" == typeof e && (e = e(new m.Converter()));
                m.helper.isArray(e) || (e = [ e ]);
                var t = d(e, r);
                if (!t.valid) throw Error(t.error);
                for (var n = 0; n < e.length; ++n) switch (e[n].type) {
                  case "lang":
                    o.push(e[n]);
                    break;

                  case "output":
                    i.push(e[n]);
                    break;

                  default:
                    throw Error("Extension loader error: Type unrecognized!!!");
                }
            }(m.extensions[e], e);
            if (m.helper.isUndefined(p[e])) throw Error('Extension "' + e + '" could not be loaded. It was either not found or is not a valid extension.');
            e = p[e];
        }
        "function" == typeof e && (e = e()), m.helper.isArray(e) || (e = [ e ]);
        var t = d(e, r);
        if (!t.valid) throw Error(t.error);
        for (var n = 0; n < e.length; ++n) {
            switch (e[n].type) {
              case "lang":
                o.push(e[n]);
                break;

              case "output":
                i.push(e[n]);
            }
            if (e[n].hasOwnProperty(l)) for (var s in e[n].listeners) e[n].listeners.hasOwnProperty(s) && c(s, e[n].listeners[s]);
        }
    }
    function c(e, r) {
        if (!m.helper.isString(e)) throw Error("Invalid argument in converter.listen() method: name must be a string, but " + (void 0 === e ? "undefined" : u(e)) + " given");
        if ("function" != typeof r) throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + (void 0 === r ? "undefined" : u(r)) + " given");
        l.hasOwnProperty(e) || (l[e] = []), l[e].push(r);
    }
    !function() {
        for (var e in t = t || {}, s) s.hasOwnProperty(e) && (a[e] = s[e]);
        {
            if ("object" !== (void 0 === t ? "undefined" : u(t))) throw Error("Converter expects the passed parameter to be an object, but " + (void 0 === t ? "undefined" : u(t)) + " was passed instead.");
            for (var r in t) t.hasOwnProperty(r) && (a[r] = t[r]);
        }
        a.extensions && m.helper.forEach(a.extensions, n);
    }(), this._dispatch = function(e, r, t, n) {
        if (l.hasOwnProperty(e)) for (var s = 0; s < l[e].length; ++s) {
            var a = l[e][s](e, r, this, t, n);
            a && void 0 !== a && (r = a);
        }
        return r;
    }, this.listen = function(e, r) {
        return c(e, r), this;
    }, this.makeHtml = function(r) {
        if (!r) return r;
        var e, t, n, s = {
            gHtmlBlocks: [],
            gHtmlMdBlocks: [],
            gHtmlSpans: [],
            gUrls: {},
            gTitles: {},
            gDimensions: {},
            gListLevel: 0,
            hashLinkCounts: {},
            langExtensions: o,
            outputModifiers: i,
            converter: this,
            ghCodeBlocks: []
        };
        return r = (r = (r = (r = r.replace(/~/g, "~T")).replace(/\$/g, "~D")).replace(/\r\n/g, "\n")).replace(/\r/g, "\n"), 
        a.smartIndentationFix && (t = (e = r).match(/^\s*/)[0].length, n = new RegExp("^\\s{0," + t + "}", "gm"), 
        r = e.replace(n, "")), r = r, r = m.subParser("detab")(r, a, s), r = m.subParser("stripBlankLines")(r, a, s), 
        m.helper.forEach(o, function(e) {
            r = m.subParser("runExtension")(e, r, a, s);
        }), r = m.subParser("hashPreCodeTags")(r, a, s), r = m.subParser("githubCodeBlocks")(r, a, s), 
        r = m.subParser("hashHTMLBlocks")(r, a, s), r = m.subParser("hashHTMLSpans")(r, a, s), 
        r = m.subParser("stripLinkDefinitions")(r, a, s), r = m.subParser("blockGamut")(r, a, s), 
        r = m.subParser("unhashHTMLSpans")(r, a, s), r = (r = (r = m.subParser("unescapeSpecialChars")(r, a, s)).replace(/~D/g, "$$")).replace(/~T/g, "~"), 
        m.helper.forEach(i, function(e) {
            r = m.subParser("runExtension")(e, r, a, s);
        }), r;
    }, this.setOption = function(e, r) {
        a[e] = r;
    }, this.getOption = function(e) {
        return a[e];
    }, this.getOptions = function() {
        return a;
    }, this.addExtension = function(e, r) {
        n(e, r = r || null);
    }, this.useExtension = function(e) {
        n(e);
    }, this.setFlavor = function(e) {
        if (h.hasOwnProperty(e)) {
            var r = h[e];
            for (var t in r) r.hasOwnProperty(t) && (a[t] = r[t]);
        }
    }, this.removeExtension = function(e) {
        m.helper.isArray(e) || (e = [ e ]);
        for (var r = 0; r < e.length; ++r) {
            for (var t = e[r], n = 0; n < o.length; ++n) o[n] === t && o[n].splice(n, 1);
            for (;0 < i.length; ++n) i[0] === t && i[0].splice(n, 1);
        }
    }, this.getAllExtensions = function() {
        return {
            language: o,
            output: i
        };
    };
}, m.subParser("anchors", function(e, r, d) {
    var t = function(e, r, t, n, s, a, o, i) {
        m.helper.isUndefined(i) && (i = ""), e = r;
        var l = t, c = n.toLowerCase(), u = s, p = i;
        if (!u) if (c || (c = l.toLowerCase().replace(/ ?\n/g, " ")), u = "#" + c, m.helper.isUndefined(d.gUrls[c])) {
            if (!(-1 < e.search(/\(\s*\)$/m))) return e;
            u = "";
        } else u = d.gUrls[c], m.helper.isUndefined(d.gTitles[c]) || (p = d.gTitles[c]);
        var h = '<a href="' + (u = m.helper.escapeCharacters(u, "*_", !1)) + '"';
        return "" !== p && null !== p && (p = p.replace(/"/g, "&quot;"), h += ' title="' + (p = m.helper.escapeCharacters(p, "*_", !1)) + '"'), 
        h += ">" + l + "</a>";
    };
    return e = (e = (e = (e = d.converter._dispatch("anchors.before", e, r, d)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g, t)).replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, t)).replace(/(\[([^\[\]]+)])()()()()()/g, t), 
    e = d.converter._dispatch("anchors.after", e, r, d);
}), m.subParser("autoLinks", function(e, r, t) {
    function n(e, r) {
        var t = r;
        return /^www\./i.test(r) && (r = r.replace(/^www\./i, "http://www.")), '<a href="' + r + '">' + t + "</a>";
    }
    function s(e, r) {
        var t = m.subParser("unescapeSpecialChars")(r);
        return m.subParser("encodeEmailAddress")(t);
    }
    return e = (e = (e = t.converter._dispatch("autoLinks.before", e, r, t)).replace(/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi, n)).replace(/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, s), 
    r.simplifiedAutoLink && (e = (e = e.replace(/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi, n)).replace(/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi, s)), 
    e = t.converter._dispatch("autoLinks.after", e, r, t);
}), m.subParser("blockGamut", function(e, r, t) {
    e = t.converter._dispatch("blockGamut.before", e, r, t), e = m.subParser("blockQuotes")(e, r, t), 
    e = m.subParser("headers")(e, r, t);
    var n = m.subParser("hashBlock")("<hr />", r, t);
    return e = (e = (e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, n)).replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, n)).replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, n), 
    e = m.subParser("lists")(e, r, t), e = m.subParser("codeBlocks")(e, r, t), e = m.subParser("tables")(e, r, t), 
    e = m.subParser("hashHTMLBlocks")(e, r, t), e = m.subParser("paragraphs")(e, r, t), 
    e = t.converter._dispatch("blockGamut.after", e, r, t);
}), m.subParser("blockQuotes", function(e, n, s) {
    return e = (e = s.converter._dispatch("blockQuotes.before", e, n, s)).replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, r) {
        var t = r;
        return t = (t = (t = t.replace(/^[ \t]*>[ \t]?/gm, "~0")).replace(/~0/g, "")).replace(/^[ \t]+$/gm, ""), 
        t = m.subParser("githubCodeBlocks")(t, n, s), t = (t = (t = m.subParser("blockGamut")(t, n, s)).replace(/(^|\n)/g, "$1  ")).replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, r) {
            var t = r;
            return t = (t = t.replace(/^  /gm, "~0")).replace(/~0/g, "");
        }), m.subParser("hashBlock")("<blockquote>\n" + t + "\n</blockquote>", n, s);
    }), e = s.converter._dispatch("blockQuotes.after", e, n, s);
}), m.subParser("codeBlocks", function(e, o, i) {
    e = i.converter._dispatch("codeBlocks.before", e, o, i);
    return e = (e = (e += "~0").replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, r, t) {
        var n = r, s = t, a = "\n";
        return n = m.subParser("outdent")(n), n = m.subParser("encodeCode")(n), n = (n = (n = m.subParser("detab")(n)).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
        o.omitExtraWLInCodeBlocks && (a = ""), n = "<pre><code>" + n + a + "</code></pre>", 
        m.subParser("hashBlock")(n, o, i) + s;
    })).replace(/~0/, ""), e = i.converter._dispatch("codeBlocks.after", e, o, i);
}), m.subParser("codeSpans", function(e, r, t) {
    return void 0 === (e = t.converter._dispatch("codeSpans.before", e, r, t)) && (e = ""), 
    e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(e, r, t, n) {
        var s = n;
        return s = (s = s.replace(/^([ \t]*)/g, "")).replace(/[ \t]*$/g, ""), r + "<code>" + (s = m.subParser("encodeCode")(s)) + "</code>";
    }), e = t.converter._dispatch("codeSpans.after", e, r, t);
}), m.subParser("detab", function(e) {
    return e = (e = (e = (e = (e = e.replace(/\t(?=\t)/g, "    ")).replace(/\t/g, "~A~B")).replace(/~B(.+?)~A/g, function(e, r) {
        for (var t = r, n = 4 - t.length % 4, s = 0; s < n; s++) t += " ";
        return t;
    })).replace(/~A/g, "    ")).replace(/~B/g, "");
}), m.subParser("encodeAmpsAndAngles", function(e) {
    return e = (e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;")).replace(/<(?![a-z\/?\$!])/gi, "&lt;");
}), m.subParser("encodeBackslashEscapes", function(e) {
    return e = (e = e.replace(/\\(\\)/g, m.helper.escapeCharactersCallback)).replace(/\\([`*_{}\[\]()>#+-.!])/g, m.helper.escapeCharactersCallback);
}), m.subParser("encodeCode", function(e) {
    return e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;"), 
    e = m.helper.escapeCharacters(e, "*_{}[]\\", !1);
}), m.subParser("encodeEmailAddress", function(e) {
    var t = [ function(e) {
        return "&#" + e.charCodeAt(0) + ";";
    }, function(e) {
        return "&#x" + e.charCodeAt(0).toString(16) + ";";
    }, function(e) {
        return e;
    } ];
    return e = (e = '<a href="' + (e = (e = "mailto:" + e).replace(/./g, function(e) {
        if ("@" === e) e = t[Math.floor(2 * Math.random())](e); else if (":" !== e) {
            var r = Math.random();
            e = .9 < r ? t[2](e) : .45 < r ? t[1](e) : t[0](e);
        }
        return e;
    })) + '">' + e + "</a>").replace(/">.+:/g, '">');
}), m.subParser("escapeSpecialCharsWithinTagAttributes", function(e) {
    return e = e.replace(/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi, function(e) {
        var r = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
        return r = m.helper.escapeCharacters(r, "\\`*_", !1);
    });
}), m.subParser("githubCodeBlocks", function(e, s, a) {
    return s.ghCodeBlocks ? (e = a.converter._dispatch("githubCodeBlocks.before", e, s, a), 
    e = (e = (e += "~0").replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(e, r, t) {
        var n = s.omitExtraWLInCodeBlocks ? "" : "\n";
        return t = m.subParser("encodeCode")(t), t = "<pre><code" + (r ? ' class="' + r + " language-" + r + '"' : "") + ">" + (t = (t = (t = m.subParser("detab")(t)).replace(/^\n+/g, "")).replace(/\n+$/g, "")) + n + "</code></pre>", 
        t = m.subParser("hashBlock")(t, s, a), "\n\n~G" + (a.ghCodeBlocks.push({
            text: e,
            codeblock: t
        }) - 1) + "G\n\n";
    })).replace(/~0/, ""), a.converter._dispatch("githubCodeBlocks.after", e, s, a)) : e;
}), m.subParser("hashBlock", function(e, r, t) {
    return e = e.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (t.gHtmlBlocks.push(e) - 1) + "K\n\n";
}), m.subParser("hashElement", function(e, r, n) {
    return function(e, r) {
        var t = r;
        return t = (t = (t = t.replace(/\n\n/g, "\n")).replace(/^\n/, "")).replace(/\n+$/g, ""), 
        t = "\n\n~K" + (n.gHtmlBlocks.push(t) - 1) + "K\n\n";
    };
}), m.subParser("hashHTMLBlocks", function(e, r, a) {
    for (var t = [ "pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p" ], n = function(e, r, t, n) {
        var s = e;
        return -1 !== t.search(/\bmarkdown\b/) && (s = t + a.converter.makeHtml(r) + n), 
        "\n\n~K" + (a.gHtmlBlocks.push(s) - 1) + "K\n\n";
    }, s = 0; s < t.length; ++s) e = m.helper.replaceRecursiveRegExp(e, n, "^(?: |\\t){0,3}<" + t[s] + "\\b[^>]*>", "</" + t[s] + ">", "gim");
    return e = (e = (e = e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, m.subParser("hashElement")(e, r, a))).replace(/(<!--[\s\S]*?-->)/g, m.subParser("hashElement")(e, r, a))).replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, m.subParser("hashElement")(e, r, a));
}), m.subParser("hashHTMLSpans", function(e, r, t) {
    for (var n = m.helper.matchRecursiveRegExp(e, "<code\\b[^>]*>", "</code>", "gi"), s = 0; s < n.length; ++s) e = e.replace(n[s][0], "~L" + (t.gHtmlSpans.push(n[s][0]) - 1) + "L");
    return e;
}), m.subParser("unhashHTMLSpans", function(e, r, t) {
    for (var n = 0; n < t.gHtmlSpans.length; ++n) e = e.replace("~L" + n + "L", t.gHtmlSpans[n]);
    return e;
}), m.subParser("hashPreCodeTags", function(e, r, a) {
    return e = m.helper.replaceRecursiveRegExp(e, function(e, r, t, n) {
        var s = t + m.subParser("encodeCode")(r) + n;
        return "\n\n~G" + (a.ghCodeBlocks.push({
            text: e,
            codeblock: s
        }) - 1) + "G\n\n";
    }, "^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^(?: |\\t){0,3}</code>\\s*</pre>", "gim");
}), m.subParser("headers", function(e, i, l) {
    e = l.converter._dispatch("headers.before", e, i, l);
    var n = i.prefixHeaderId, c = isNaN(parseInt(i.headerLevelStart)) ? 1 : parseInt(i.headerLevelStart), r = i.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, t = i.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
    function u(e) {
        var r, t = e.replace(/[^\w]/g, "").toLowerCase();
        return l.hashLinkCounts[t] ? r = t + "-" + l.hashLinkCounts[t]++ : (r = t, l.hashLinkCounts[t] = 1), 
        !0 === n && (n = "section"), m.helper.isString(n) ? n + r : r;
    }
    return e = (e = (e = e.replace(r, function(e, r) {
        var t = m.subParser("spanGamut")(r, i, l), n = i.noHeaderId ? "" : ' id="' + u(r) + '"', s = "<h" + c + n + ">" + t + "</h" + c + ">";
        return m.subParser("hashBlock")(s, i, l);
    })).replace(t, function(e, r) {
        var t = m.subParser("spanGamut")(r, i, l), n = i.noHeaderId ? "" : ' id="' + u(r) + '"', s = c + 1, a = "<h" + s + n + ">" + t + "</h" + s + ">";
        return m.subParser("hashBlock")(a, i, l);
    })).replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm, function(e, r, t) {
        var n = m.subParser("spanGamut")(t, i, l), s = i.noHeaderId ? "" : ' id="' + u(t) + '"', a = c - 1 + r.length, o = "<h" + a + s + ">" + n + "</h" + a + ">";
        return m.subParser("hashBlock")(o, i, l);
    }), e = l.converter._dispatch("headers.after", e, i, l);
}), m.subParser("images", function(e, r, h) {
    function t(e, r, t, n, s, a, o, i) {
        var l = h.gUrls, c = h.gTitles, u = h.gDimensions;
        if (t = t.toLowerCase(), i || (i = ""), "" === n || null === n) {
            if ("" !== t && null !== t || (t = r.toLowerCase().replace(/ ?\n/g, " ")), n = "#" + t, 
            m.helper.isUndefined(l[t])) return e;
            n = l[t], m.helper.isUndefined(c[t]) || (i = c[t]), m.helper.isUndefined(u[t]) || (s = u[t].width, 
            a = u[t].height);
        }
        r = r.replace(/"/g, "&quot;"), r = m.helper.escapeCharacters(r, "*_", !1);
        var p = '<img src="' + (n = m.helper.escapeCharacters(n, "*_", !1)) + '" alt="' + r + '"';
        return i && (i = i.replace(/"/g, "&quot;"), p += ' title="' + (i = m.helper.escapeCharacters(i, "*_", !1)) + '"'), 
        s && a && (p += ' width="' + (s = "*" === s ? "auto" : s) + '"', p += ' height="' + (a = "*" === a ? "auto" : a) + '"'), 
        p += " />";
    }
    return e = (e = (e = h.converter._dispatch("images.before", e, r, h)).replace(/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g, t)).replace(/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g, t), 
    e = h.converter._dispatch("images.after", e, r, h);
}), m.subParser("italicsAndBold", function(e, r, t) {
    return e = t.converter._dispatch("italicsAndBold.before", e, r, t), e = r.literalMidWordUnderscores ? (e = (e = (e = e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm, "$1<strong>$2</strong>")).replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm, "$1<em>$2</em>")).replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g, "<strong>$2</strong>")).replace(/(\*)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>") : (e = e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>")).replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>"), 
    e = t.converter._dispatch("italicsAndBold.after", e, r, t);
}), m.subParser("lists", function(e, u, p) {
    function i(e, r) {
        p.gListLevel++, e = e.replace(/\n{2,}$/, "\n");
        var c = /\n[ \t]*\n(?!~0)/.test(e += "~0");
        return e = (e = e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(e, r, t, n, s, a, o) {
            o = o && "" !== o.trim();
            var i = m.subParser("outdent")(s, u, p), l = "";
            return a && u.tasklists && (l = ' class="task-list-item" style="list-style-type: none;"', 
            i = i.replace(/^[ \t]*\[(x|X| )?]/m, function() {
                var e = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
                return o && (e += " checked"), e += ">";
            })), i = "\n<li" + l + ">" + (i = r || -1 < i.search(/\n{2,}/) ? (i = m.subParser("githubCodeBlocks")(i, u, p), 
            m.subParser("blockGamut")(i, u, p)) : (i = (i = m.subParser("lists")(i, u, p)).replace(/\n$/, ""), 
            c ? m.subParser("paragraphs")(i, u, p) : m.subParser("spanGamut")(i, u, p))) + "</li>\n";
        })).replace(/~0/g, ""), p.gListLevel--, r && (e = e.replace(/\s+$/, "")), e;
    }
    function s(e, n, s) {
        var a = "ul" === n ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, r = [], o = "";
        if (-1 !== e.search(a)) {
            !function e(r) {
                var t = r.search(a);
                -1 !== t ? (o += "\n\n<" + n + ">" + i(r.slice(0, t), !!s) + "</" + n + ">\n\n", 
                a = "ul" === (n = "ul" === n ? "ol" : "ul") ? /^ {0,2}\d+\.[ \t]/gm : /^ {0,2}[*+-][ \t]/gm, 
                e(r.slice(t))) : o += "\n\n<" + n + ">" + i(r, !!s) + "</" + n + ">\n\n";
            }(e);
            for (var t = 0; t < r.length; ++t) ;
        } else o = "\n\n<" + n + ">" + i(e, !!s) + "</" + n + ">\n\n";
        return o;
    }
    e = p.converter._dispatch("lists.before", e, u, p), e += "~0";
    var r = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
    return e = (e = p.gListLevel ? e.replace(r, function(e, r, t) {
        return s(r, -1 < t.search(/[*+-]/g) ? "ul" : "ol", !0);
    }) : (r = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, 
    e.replace(r, function(e, r, t, n) {
        return s(t, -1 < n.search(/[*+-]/g) ? "ul" : "ol");
    }))).replace(/~0/, ""), e = p.converter._dispatch("lists.after", e, u, p);
}), m.subParser("outdent", function(e) {
    return e = (e = e.replace(/^(\t|[ ]{1,4})/gm, "~0")).replace(/~0/g, "");
}), m.subParser("paragraphs", function(e, r, t) {
    for (var n = (e = (e = (e = t.converter._dispatch("paragraphs.before", e, r, t)).replace(/^\n+/g, "")).replace(/\n+$/g, "")).split(/\n{2,}/g), s = [], a = n.length, o = 0; o < a; o++) {
        var i = n[o];
        0 <= i.search(/~(K|G)(\d+)\1/g) || (i = (i = m.subParser("spanGamut")(i, r, t)).replace(/^([ \t]*)/g, "<p>"), 
        i += "</p>"), s.push(i);
    }
    for (a = s.length, o = 0; o < a; o++) {
        for (var l = "", c = s[o], u = !1; 0 <= c.search(/~(K|G)(\d+)\1/); ) {
            var p = RegExp.$1, h = RegExp.$2;
            l = (l = "K" === p ? t.gHtmlBlocks[h] : u ? m.subParser("encodeCode")(t.ghCodeBlocks[h].text) : t.ghCodeBlocks[h].codeblock).replace(/\$/g, "$$$$"), 
            c = c.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/, l), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(c) && (u = !0);
        }
        s[o] = c;
    }
    return e = (e = (e = s.join("\n\n")).replace(/^\n+/g, "")).replace(/\n+$/g, ""), 
    t.converter._dispatch("paragraphs.after", e, r, t);
}), m.subParser("runExtension", function(e, r, t, n) {
    if (e.filter) r = e.filter(r, n.converter, t); else if (e.regex) {
        var s = e.regex;
        !s instanceof RegExp && (s = new RegExp(s, "g")), r = r.replace(s, e.replace);
    }
    return r;
}), m.subParser("spanGamut", function(e, r, t) {
    return e = t.converter._dispatch("spanGamut.before", e, r, t), e = m.subParser("codeSpans")(e, r, t), 
    e = m.subParser("escapeSpecialCharsWithinTagAttributes")(e, r, t), e = m.subParser("encodeBackslashEscapes")(e, r, t), 
    e = m.subParser("images")(e, r, t), e = m.subParser("anchors")(e, r, t), e = m.subParser("autoLinks")(e, r, t), 
    e = m.subParser("encodeAmpsAndAngles")(e, r, t), e = m.subParser("italicsAndBold")(e, r, t), 
    e = (e = m.subParser("strikethrough")(e, r, t)).replace(/  +\n/g, " <br />\n"), 
    e = t.converter._dispatch("spanGamut.after", e, r, t);
}), m.subParser("strikethrough", function(e, r, t) {
    return r.strikethrough && (e = (e = t.converter._dispatch("strikethrough.before", e, r, t)).replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g, "<del>$1</del>"), 
    e = t.converter._dispatch("strikethrough.after", e, r, t)), e;
}), m.subParser("stripBlankLines", function(e) {
    return e.replace(/^[ \t]+$/gm, "");
}), m.subParser("stripLinkDefinitions", function(e, i, l) {
    return e = (e = (e += "~0").replace(/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm, function(e, r, t, n, s, a, o) {
        return r = r.toLowerCase(), l.gUrls[r] = m.subParser("encodeAmpsAndAngles")(t), 
        a ? a + o : (o && (l.gTitles[r] = o.replace(/"|'/g, "&quot;")), i.parseImgDimensions && n && s && (l.gDimensions[r] = {
            width: n,
            height: s
        }), "");
    })).replace(/~0/, "");
}), m.subParser("tables", function(e, b, v) {
    if (!b.tables) return e;
    return e = (e = v.converter._dispatch("tables.before", e, b, v)).replace(/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm, function(e) {
        var r, t = e.split("\n");
        for (r = 0; r < t.length; ++r) /^[ \t]{0,3}\|/.test(t[r]) && (t[r] = t[r].replace(/^[ \t]{0,3}\|/, "")), 
        /\|[ \t]*$/.test(t[r]) && (t[r] = t[r].replace(/\|[ \t]*$/, ""));
        var n, s, a, o, i, l = t[0].split("|").map(function(e) {
            return e.trim();
        }), c = t[1].split("|").map(function(e) {
            return e.trim();
        }), u = [], p = [], h = [], d = [];
        for (t.shift(), t.shift(), r = 0; r < t.length; ++r) "" !== t[r].trim() && u.push(t[r].split("|").map(function(e) {
            return e.trim();
        }));
        if (l.length < c.length) return e;
        for (r = 0; r < c.length; ++r) h.push((n = c[r], /^:[ \t]*--*$/.test(n) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(n) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(n) ? ' style="text-align:center;"' : ""));
        for (r = 0; r < l.length; ++r) m.helper.isUndefined(h[r]) && (h[r] = ""), p.push((s = l[r], 
        a = h[r], o = void 0, o = "", s = s.trim(), b.tableHeaderId && (o = ' id="' + s.replace(/ /g, "_").toLowerCase() + '"'), 
        "<th" + o + a + ">" + (s = m.subParser("spanGamut")(s, b, v)) + "</th>\n"));
        for (r = 0; r < u.length; ++r) {
            for (var f = [], g = 0; g < p.length; ++g) m.helper.isUndefined(u[r][g]), f.push((i = u[r][g], 
            "<td" + h[g] + ">" + m.subParser("spanGamut")(i, b, v) + "</td>\n"));
            d.push(f);
        }
        return function(e, r) {
            for (var t = "<table>\n<thead>\n<tr>\n", n = e.length, s = 0; s < n; ++s) t += e[s];
            for (t += "</tr>\n</thead>\n<tbody>\n", s = 0; s < r.length; ++s) {
                t += "<tr>\n";
                for (var a = 0; a < n; ++a) t += r[s][a];
                t += "</tr>\n";
            }
            return t += "</tbody>\n</table>\n";
        }(p, d);
    }), e = v.converter._dispatch("tables.after", e, b, v);
}), m.subParser("unescapeSpecialChars", function(e) {
    return e = e.replace(/~E(\d+)E/g, function(e, r) {
        var t = parseInt(r);
        return String.fromCharCode(t);
    });
}), module.exports = m;