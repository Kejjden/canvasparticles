

class Timer {
    id: any;
    start: any;
    remaining: any;
    callback: any;

    constructor(delay, callback = null) {
        this.remaining = delay;
        this.callback = callback;
    }

    pause() {
        var delta = (new Date().getMilliseconds()) - this.start;
        this.cancel();
        this.remaining -= delta;
    }

    resume() {
        this.start = new Date();
        this.cancel();
        this.id = window.setTimeout(this.update, this.remaining);
    }

    cancel() {
        if(this.id) {
            window.clearTimeout(this.id);
            this.id = null;
        }
    }

    update = () => {
        if(this.callback) {
            this.callback(this);
        }
    }
}
