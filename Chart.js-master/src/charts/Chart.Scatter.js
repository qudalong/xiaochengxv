module.exports = function(l) {
    l.defaults.scatter = {
        hover: {
            mode: "single"
        },
        scales: {
            xAxes: [ {
                type: "linear",
                position: "bottom",
                id: "x-axis-1"
            } ],
            yAxes: [ {
                type: "linear",
                position: "left",
                id: "y-axis-1"
            } ]
        },
        tooltips: {
            callbacks: {
                title: function() {
                    return "";
                },
                label: function(t) {
                    return "(" + t.xLabel + ", " + t.yLabel + ")";
                }
            }
        }
    }, l.controllers.scatter = l.controllers.line, l.Scatter = function(t, e) {
        return e.type = "scatter", new l(t, e);
    };
};