module.exports = function(s) {
    var m = s.helpers, i = m.noop;
    s.LinearScaleBase = s.Scale.extend({
        handleTickRangeOptions: function() {
            var i = this, e = i.options.ticks;
            if (e.beginAtZero) {
                var n = m.sign(i.min), a = m.sign(i.max);
                n < 0 && a < 0 ? i.max = 0 : 0 < n && 0 < a && (i.min = 0);
            }
            void 0 !== e.min ? i.min = e.min : void 0 !== e.suggestedMin && (i.min = Math.min(i.min, e.suggestedMin)), 
            void 0 !== e.max ? i.max = e.max : void 0 !== e.suggestedMax && (i.max = Math.max(i.max, e.suggestedMax)), 
            i.min === i.max && (i.max++, e.beginAtZero || i.min--);
        },
        getTickLimit: i,
        handleDirectionalChanges: i,
        buildTicks: function() {
            var i = this, e = i.options.ticks, n = i.getTickLimit(), a = {
                maxTicks: n = Math.max(2, n),
                min: e.min,
                max: e.max,
                stepSize: m.getValueOrDefault(e.fixedStepSize, e.stepSize)
            }, t = i.ticks = s.Ticks.generators.linear(a, i);
            i.handleDirectionalChanges(), i.max = m.max(t), i.min = m.min(t), e.reverse ? (t.reverse(), 
            i.start = i.max, i.end = i.min) : (i.start = i.min, i.end = i.max);
        },
        convertTicksToLabels: function() {
            var i = this;
            i.ticksAsNumbers = i.ticks.slice(), i.zeroLineIndex = i.ticks.indexOf(0), s.Scale.prototype.convertTicksToLabels.call(i);
        }
    });
};