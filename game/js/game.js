/// <reference path="ref.ts" />
var Game = (function () {
    function Game(context) {
        var _this = this;
        this.entities = [];
        this.entityIndex = 0;
        this.update = function () {
            var now = Date.now();
            _this.deltaTime = (now - _this.lastDeltaUpdate) / 1000;
            if (_this.deltaTime > 1)
                _this.deltaTime = 0;
            _this.lastDeltaUpdate = now;
            _this.spawner.update();
            _this.level.render();
            _this.entities.sort(function (a, b) {
                if (a instanceof SpriteEntity && b instanceof SpriteEntity) {
                    var ay = a.sprite ? a.sprite.y : 0;
                    var by = b.sprite ? b.sprite.y : 0;
                    if (ay > by) {
                        return 1;
                    }
                    if (ay < by) {
                        return -1;
                    }
                }
                return 0;
            });
            _this.entities.forEach(function (entity) {
                entity.update();
                entity.render();
            });
            _this.level.renderLayer();
            _this.level.debug();
            requestAnimationFrame(_this.update);
        };
        this.context = context;
        if (Game.instance) {
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }
        Game.instance = this;
        this.start();
    }
    Game.getInstance = function () {
        return Game.instance;
    };
    Game.getGridsFor = function (x, y) {
        return new Grid(Math.floor(x / Game.getInstance().level.tileWidth), Math.floor(y / Game.getInstance().level.tileHeight));
    };
    Game.getDeltaTime = function () {
        return Game.getInstance().deltaTime;
    };
    Game.prototype.getEntityIndex = function () {
        return this.entityIndex++;
    };
    Game.prototype.start = function () {
        this.level = new Level(32, 32, 32, 24);
        this.player = new Player();
        this.entities.push(this.player);
        this.controls = new Controls();
        this.spawner = new Spawner();
        document.addEventListener("keydown", function (event) { return Game.getInstance().controls.update(event); });
        document.addEventListener("keyup", function (event) { return Game.getInstance().controls.update(event); });
        this.update();
    };
    return Game;
})();
var canvas = document.getElementById("canvas");
canvas.width = 32 * 32;
canvas.height = 24 * 32;
var ctx = canvas.getContext("2d");
var game = new Game(ctx);
function l(something) {
    console.log(something);
}
