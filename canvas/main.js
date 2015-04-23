var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var object = (function () {
    function object(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
    }
    return object;
})();
var SimpleParticle = (function () {
    function SimpleParticle(x, y) {
        this.color_r = 255;
        this.color_g = 10;
        this.color_b = 10;
        this.alive = true;
        this.alpha = 1;
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = -30 + Math.random() * 10;
        this.direction = -3 + Math.random() * 6;
        this.gravity = 0.92;
        this.energy = 20;
    }
    SimpleParticle.prototype.GetColor = function () {
        return "rgba(" + this.color_r + "," + this.color_g + "," + this.color_b + ", " + this.alpha + ")";
    };
    SimpleParticle.prototype.Update = function () {
        if (this.alive) {
            this.x += this.direction;
            this.y += this.speed;
            this.speed += this.gravity;
            if (this.energy <= 0) {
                this.energy = 0;
            }
            else {
                this.energy -= 0.25;
            }
            // Energy based size
            this.color_g += 4;
            this.alpha -= 0.01;
            if (this.alpha < 0) {
                this.alpha = 0;
            }
            this.size = this.energy;
            if (this.speed <= -50) {
                this.alive = false;
            }
        }
    };
    return SimpleParticle;
})();
var PSystem = (function (_super) {
    __extends(PSystem, _super);
    function PSystem(ctx, canvas) {
        _super.call(this, ctx, canvas);
        this.started = false;
        this.tracking = false;
        this.particles = new Array();
    }
    PSystem.prototype.Start = function () {
        // Setup
        this.Render();
    };
    PSystem.prototype.Render = function () {
        var _this = this;
        this.particles.push(new SimpleParticle(this.x, this.y));
        this.particles.push(new SimpleParticle(this.x, this.y));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i in this.particles) {
            this.particles[i].Update();
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.particles[i].GetColor();
            this.ctx.fill();
        }
        requestAnimationFrame(function () { return _this.Render(); });
    };
    PSystem.prototype.SetPosition = function (event) {
        if (this.tracking) {
            var x = event.x;
            var y = event.y;
            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;
            this.x = x;
            this.y = y;
            if (!this.started) {
                this.started = true;
                this.Start();
            }
        }
    };
    PSystem.prototype.SetTrack = function (track) {
        if (track != false) {
            this.tracking = true;
            this.SetPosition(track);
        }
        else {
            this.tracking = false;
        }
    };
    return PSystem;
})(object);
var FireParticle = (function () {
    function FireParticle(x, y) {
        this.color_r = 255;
        this.color_g = 10;
        this.color_b = 10;
        this.alive = true;
        this.alpha = 1;
        this.changeDirection = false;
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = -10 + Math.random() * 2;
        this.direction = -3 + Math.random() * 6;
        this.energy = 20;
    }
    FireParticle.prototype.GetColor = function () {
        return "rgba(" + this.color_r + "," + this.color_g + "," + this.color_b + ", " + this.alpha + ")";
    };
    FireParticle.prototype.Update = function () {
        if (this.alive) {
            if (Math.floor(Math.random() * 100) == 99) {
                this.changeDirection = true;
                this.directionSteps = 50;
                this.targetDirection = this.direction * -1;
                this.deltaDirection = this.targetDirection / 50;
            }
            if (this.changeDirection) {
                this.direction += this.deltaDirection;
                this.directionSteps--;
                if (this.directionSteps == 0) {
                    this.changeDirection = false;
                }
            }
            this.x += this.direction;
            this.y += this.speed;
            if (this.energy <= 0) {
                this.energy = 0;
            }
            else {
                this.energy -= 0.25;
            }
            // Energy based size
            this.color_g += 4;
            if (this.color_g > 255) {
                this.color_g = 255;
            }
            this.alpha -= 0.01;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.alive = false;
            }
            this.size = this.energy;
        }
    };
    return FireParticle;
})();
var FSystem = (function (_super) {
    __extends(FSystem, _super);
    function FSystem(ctx, canvas) {
        _super.call(this, ctx, canvas);
        this.started = false;
        this.tracking = false;
        this.particles = new Array();
    }
    FSystem.prototype.Start = function () {
        // Setup
        this.Render();
    };
    FSystem.prototype.Render = function () {
        var _this = this;
        this.particles.push(new FireParticle(this.x, this.y));
        this.particles.push(new FireParticle(this.x, this.y));
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i in this.particles) {
            this.particles[i].Update();
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.particles[i].GetColor();
            this.ctx.fill();
        }
        requestAnimationFrame(function () { return _this.Render(); });
    };
    FSystem.prototype.SetPosition = function (event) {
        if (this.tracking) {
            var x = event.x;
            var y = event.y;
            x -= this.canvas.offsetLeft;
            y -= this.canvas.offsetTop;
            this.x = x;
            this.y = y;
            if (!this.started) {
                this.started = true;
                this.Start();
            }
        }
    };
    FSystem.prototype.SetTrack = function (track) {
        if (track != false) {
            this.tracking = true;
            this.SetPosition(track);
        }
        else {
            this.tracking = false;
        }
    };
    return FSystem;
})(object);
function init() {
    var canv = document.createElement("canvas");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    document.body.appendChild(canv);
    var ctx = canv.getContext("2d");
    var particles;
    canv.addEventListener("mousedown", function () { return particles.SetTrack(event); }, false);
    canv.addEventListener("mousemove", function () { return particles.SetPosition(event); }, false);
    canv.addEventListener("mouseup", function () { return particles.SetTrack(false); }, false);
    particles = new PSystem(ctx, canv);
    /*    canv.addEventListener("mousedown", () => particles.SetTrack(event), false);
            canv.addEventListener("mousemove", () => particles.SetPosition(event), false);
            canv.addEventListener("mouseup", () => particles.SetTrack(false), false);
    
            particles = new FSystem(ctx, canv)
    */
}
init();
