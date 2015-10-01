var Timer = (function () {
    function Timer(delay, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        this.update = function () {
            if (_this.callback) {
                _this.callback(_this);
            }
        };
        this.remaining = delay;
        this.callback = callback;
    }
    Timer.prototype.pause = function () {
        var delta = (new Date().getMilliseconds()) - this.start;
        this.cancel();
        this.remaining -= delta;
    };
    Timer.prototype.resume = function () {
        this.start = new Date();
        this.cancel();
        this.id = window.setTimeout(this.update, this.remaining);
    };
    Timer.prototype.cancel = function () {
        if (this.id) {
            window.clearTimeout(this.id);
            this.id = null;
        }
    };
    return Timer;
})();
