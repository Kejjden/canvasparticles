/// <reference path="../../ref.ts" />
var Sprite = (function () {
    function Sprite(width, height, image) {
        this.states = [];
        this.tick = 0;
        this.frameSpeed = 10;
        this.x = 0;
        this.y = 0;
        this.loop = 0;
        this.pushQueue = [];
        this.context = Game.getInstance().context;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    Sprite.prototype.setGrids = function () {
        this.gridX = Math.floor(this.x / Game.getInstance().level.tileWidth);
        this.gridY = Math.floor(this.y / Game.getInstance().level.tileHeight);
    };
    Sprite.prototype.getGrids = function () {
        return Game.getGridsFor(this.x, this.y);
    };
    Sprite.prototype.pushState = function (name) {
        var _this = this;
        var stateToPush = this.getState(name);
        stateToPush.frames.forEach(function (frame) {
            _this.pushQueue.push(frame);
        });
    };
    Sprite.prototype.getState = function (name) {
        var ret;
        this.states.forEach(function (state) {
            if (state.getName() == name) {
                ret = state;
            }
        });
        return ret;
    };
    Sprite.prototype.addState = function (state) {
        this.states.push(state);
    };
    Sprite.prototype.setState = function (name) {
        var _this = this;
        this.states.forEach(function (state) {
            if (state.getName() == name) {
                _this.currentState = state;
                _this.loop = 0;
            }
        });
    };
    Sprite.prototype.render = function () {
        var frame = this.currentState.frames[this.currentState.currentFrame];
        if (this.pushQueue.length) {
            l('have pushQueue');
            frame = this.pushQueue[0];
        }
        var framey = frame[0] * this.height - this.height;
        var framex = frame[1] * this.width - this.width;
        this.context.drawImage(this.image, framex, framey, this.width, this.height, this.x, this.y, this.width, this.height);
    };
    Sprite.prototype.update = function () {
        if (this.tick % this.frameSpeed == 0) {
            var nextFrame = this.currentState.nextFrame();
            if (nextFrame == 0) {
                this.loop++;
            }
            if (this.pushQueue.length) {
                this.pushQueue.shift();
            }
            this.tick = 0;
        }
        this.tick++;
    };
    return Sprite;
})();
