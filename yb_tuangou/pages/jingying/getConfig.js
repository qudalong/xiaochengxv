Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, i, t) {
    return {
        chartConfig: {
            type: "line",
            data: {
                labels: i,
                datasets: [ {
                    label: "",
                    backgroundColor: "rgba(191, 243, 255, 0.498039)",
                    borderColor: "rgb(109, 209, 255)",
                    pointBackgroundColor: "#ffffff",
                    pointHitRadius: 35,
                    borderWidth: 1,
                    data: t
                } ]
            },
            options: {
                legend: {
                    displayFixed: !1
                },
                layout: {
                    padding: {
                        left: 25,
                        bottom: 9,
                        right: 50
                    }
                },
                scaleBeginAtZero: !0,
                responsive: !0,
                title: {
                    display: !1,
                    text: ""
                },
                tooltips: {
                    displayColors: !0,
                    mode: "x",
                    callbacks: {
                        title: function(e) {
                            return "数值:" + e[0].yLabel;
                        },
                        label: function(e) {
                            return console.log(e), "";
                        }
                    }
                },
                scales: {
                    xAxes: [ {
                        display: !0,
                        gridLines: {},
                        scaleLabel: {
                            display: !1,
                            labelString: ""
                        },
                        ticks: {
                            maxTicksLimit: 15,
                            fontColor: "#9E9E9E",
                            fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Arial, Helvetica, sans-serif"
                        }
                    } ],
                    yAxes: [ {
                        display: !0,
                        gridLines: {},
                        ticks: {
                            maxTicksLimit: 4,
                            fontColor: "#9E9E9E",
                            beginAtZero: !0
                        },
                        scaleLabel: {
                            display: !1,
                            labelString: ""
                        }
                    } ]
                }
            }
        },
        canvasConfig: e
    };
};