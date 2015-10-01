var AnimationState = (function () {
    function AnimationState(name, frames) {
        this.currentFrame = 0;
        this.name = name;
        this.frames = frames;
    }
    AnimationState.prototype.getName = function () {
        return this.name;
    };
    AnimationState.prototype.nextFrame = function () {
        if (this.frames.length > 1) {
            this.currentFrame++;
        }
        if (this.currentFrame == this.frames.length) {
            this.currentFrame = 0;
        }
        return this.currentFrame;
    };
    return AnimationState;
})();
