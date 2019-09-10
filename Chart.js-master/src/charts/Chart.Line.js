module.exports = function(t) {
    t.Line = function(e, n) {
        return n.type = "line", new t(e, n);
    };
};