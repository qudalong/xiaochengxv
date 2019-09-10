module.exports = function(n) {
    n.Bar = function(t, e) {
        return e.type = "bar", new n(t, e);
    };
};