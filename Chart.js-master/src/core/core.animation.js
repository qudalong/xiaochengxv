module.exports = function(n) {
    var t = n.helpers;
    n.defaults.global.animation = {
        duration: 1e3,
        easing: "easeOutQuart",
        onProgress: t.noop,
        onComplete: t.noop
    }, n.Animation = n.Element.extend({
        currentStep: null,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
    }), n.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        request: null,
        addAnimation: function(n, a, t, i) {
            var e = this;
            i || (n.animating = !0);
            for (var o = 0; o < e.animations.length; ++o) if (e.animations[o].chartInstance === n) return void (e.animations[o].animationObject = a);
            e.animations.push({
                chartInstance: n,
                animationObject: a
            }), 1 === e.animations.length && e.requestAnimationFrame();
        },
        cancelAnimation: function(a) {
            var n = t.findIndex(this.animations, function(n) {
                return n.chartInstance === a;
            });
            -1 !== n && (this.animations.splice(n, 1), a.animating = !1);
        },
        requestAnimationFrame: function() {
            var n = this;
            null === n.request && (n.request = t.requestAnimFrame.call(window, function() {
                n.request = null, n.startDigest();
            }));
        },
        startDigest: function() {
            var n = this, a = Date.now(), t = 0;
            1 < n.dropFrames && (t = Math.floor(n.dropFrames), n.dropFrames = n.dropFrames % 1);
            for (var i = 0; i < n.animations.length; ) null === n.animations[i].animationObject.currentStep && (n.animations[i].animationObject.currentStep = 0), 
            n.animations[i].animationObject.currentStep += 1 + t, n.animations[i].animationObject.currentStep > n.animations[i].animationObject.numSteps && (n.animations[i].animationObject.currentStep = n.animations[i].animationObject.numSteps), 
            n.animations[i].animationObject.render(n.animations[i].chartInstance, n.animations[i].animationObject), 
            n.animations[i].animationObject.onAnimationProgress && n.animations[i].animationObject.onAnimationProgress.call && n.animations[i].animationObject.onAnimationProgress.call(n.animations[i].chartInstance, n.animations[i]), 
            n.animations[i].animationObject.currentStep === n.animations[i].animationObject.numSteps ? (n.animations[i].animationObject.onAnimationComplete && n.animations[i].animationObject.onAnimationComplete.call && n.animations[i].animationObject.onAnimationComplete.call(n.animations[i].chartInstance, n.animations[i]), 
            n.animations[i].chartInstance.animating = !1, n.animations.splice(i, 1)) : ++i;
            var e = (Date.now() - a) / n.frameDuration;
            n.dropFrames += e, 0 < n.animations.length && n.requestAnimationFrame();
        }
    };
};