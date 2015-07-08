/// <reference path="ref.ts" />
var ZombiePirate = (function () {
    function ZombiePirate() {
        this.health = 10;
        this.walkspeed = 2;
        this.pathTick = 0;
        this.pathIndex = 0;
        this.path = [];
        this.pathSize = 0;
        // Set Sprite
        var image = new Image();
        image.src = "images/zombie-pirate.png";
        this.sprite = new Sprite(32, 48, image);
        this.sprite.x = 9 * 32;
        this.sprite.y = 14 * 32;
        this.sprite.setGrids();
        // Set AnimationStates for Sprite
        this.sprite.addState(new AnimationState("walkDown", [[1, 1], [1, 2], [1, 3]]));
        this.sprite.addState(new AnimationState("walkLeft", [[2, 1], [2, 2], [2, 3]]));
        this.sprite.addState(new AnimationState("walkRight", [[3, 1], [3, 2], [3, 3]]));
        this.sprite.addState(new AnimationState("walkUp", [[4, 1], [4, 2], [4, 3]]));
        this.sprite.addState(new AnimationState("standDown", [[1, 2]]));
        this.sprite.addState(new AnimationState("standLeft", [[2, 2]]));
        this.sprite.addState(new AnimationState("standRight", [[3, 2]]));
        this.sprite.addState(new AnimationState("standUp", [[4, 2]]));
        this.sprite.setState("walkDown");
        this.pathFinder = new Pathfinder();
        this.updatePath();
    }
    ZombiePirate.prototype.updatePath = function () {
        var targetGrid = Game.getGridsFor(Game.getInstance().player.sprite.x, Game.getInstance().player.sprite.y);
        this.currentGrid = Game.getGridsFor(this.sprite.x, this.sprite.y);
        this.path = this.pathFinder.getPath(this.currentGrid, targetGrid);
        this.pathSize = this.path.length;
        this.pathIndex = 0;
        l('this.path');
        l(this.path);
        this.pathTargetGrid = new Grid(this.path[this.pathIndex].x, this.path[this.pathIndex].y);
        l('this.pathTargetGrid');
        l(this.pathTargetGrid);
    };
    ZombiePirate.prototype.update = function () {
        //l('update');
        if (this.pathTick % 2 == 0 && this.pathIndex < this.pathSize) {
            //l('tick');
            if (this.sprite.x < this.pathTargetGrid.x * 32) {
                this.sprite.x += 1;
            }
            if (this.sprite.x > this.pathTargetGrid.x * 32) {
                this.sprite.x -= 1;
            }
            if (this.sprite.y < this.pathTargetGrid.y * 32) {
                this.sprite.y += 1;
            }
            if (this.sprite.y > this.pathTargetGrid.y * 32) {
                this.sprite.y -= 1;
            }
            if (this.currentGrid.x == this.pathTargetGrid.x && this.currentGrid.y == this.pathTargetGrid.y && this.sprite.x % 32 == 0 && this.sprite.y % 32 == 0) {
                this.pathIndex++;
                this.currentGrid = this.sprite.getGrids();
                this.pathTargetGrid = new Grid(this.path[this.pathIndex].x, this.path[this.pathIndex].y);
                if (this.pathIndex == this.pathSize) {
                }
            }
            //l([this.path[this.pathIndex][0] * 32, this.path[this.pathIndex][1] * 32]);
            //this.sprite.x = this.path[this.pathIndex][0] * 32;
            //this.sprite.y = this.path[this.pathIndex][1] * 32;
            //l('After');
            //l([this.sprite.x / 32, this.sprite.y / 32]);
            //this.pathIndex++;
            //this.currentState.nextFrame();
            this.pathTick = 0;
        }
        this.pathTick++;
        this.sprite.update();
    };
    ZombiePirate.prototype.render = function () {
        this.pathFinder.render();
        this.sprite.render();
    };
    return ZombiePirate;
})();
var Grid = (function () {
    function Grid(x, y) {
        this.setXY(x, y);
    }
    Grid.prototype.setXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Grid;
})();
var Player = (function () {
    function Player() {
        this.health = 100;
        this.walkspeed = 3;
        // Set Sprite
        var image = new Image();
        image.src = "images/originals/player.png";
        this.sprite = new Sprite(32, 48, image);
        this.sprite.x = 12 * 32;
        this.sprite.y = 10 * 32;
        this.sprite.setGrids();
        // Set AnimationStates for Sprite
        this.sprite.addState(new AnimationState("walkDown", [[1, 1], [1, 2], [1, 3]]));
        this.sprite.addState(new AnimationState("walkLeft", [[2, 1], [2, 2], [2, 3]]));
        this.sprite.addState(new AnimationState("walkRight", [[3, 1], [3, 2], [3, 3]]));
        this.sprite.addState(new AnimationState("walkUp", [[4, 1], [4, 2], [4, 3]]));
        this.sprite.addState(new AnimationState("standDown", [[1, 2]]));
        this.sprite.addState(new AnimationState("standLeft", [[2, 2]]));
        this.sprite.addState(new AnimationState("standRight", [[3, 2]]));
        this.sprite.addState(new AnimationState("standUp", [[4, 2]]));
        this.sprite.setState("standDown");
    }
    Player.prototype.update = function () {
        if (this.sprite.currentState.name == "walkDown") {
            this.walk('down');
        }
        if (this.sprite.currentState.name == "walkUp") {
            this.walk('up');
        }
        if (this.sprite.currentState.name == "walkLeft") {
            this.walk('left');
        }
        if (this.sprite.currentState.name == "walkRight") {
            this.walk('right');
        }
        this.sprite.update();
    };
    Player.prototype.walk = function (direction) {
        if (direction == 'down') {
            var nextGrid = Game.getGridsFor(this.sprite.x, this.sprite.y + this.walkspeed);
            var collided = Game.getInstance().level.checkCollision(nextGrid);
            if (!collided) {
                this.sprite.y += this.walkspeed;
            }
        }
        else if (direction == 'up') {
            var nextGrid = Game.getGridsFor(this.sprite.x, this.sprite.y - this.walkspeed);
            var collided = Game.getInstance().level.checkCollision(nextGrid);
            if (!collided) {
                this.sprite.y -= this.walkspeed;
            }
        }
        else if (direction == 'left') {
            var nextGrid = Game.getGridsFor(this.sprite.x - this.walkspeed, this.sprite.y);
            var collided = Game.getInstance().level.checkCollision(nextGrid);
            if (!collided) {
                this.sprite.x -= this.walkspeed;
            }
        }
        else if (direction == 'right') {
            var nextGrid = Game.getGridsFor(this.sprite.x + this.walkspeed, this.sprite.y);
            var collided = Game.getInstance().level.checkCollision(nextGrid);
            if (!collided) {
                this.sprite.x += this.walkspeed;
            }
        }
        this.sprite.setGrids();
    };
    return Player;
})();
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
    };
    return AnimationState;
})();
var Sprite = (function () {
    function Sprite(width, height, image) {
        this.states = [];
        this.tick = 0;
        this.x = 0;
        this.y = 0;
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
    Sprite.prototype.addState = function (state) {
        this.states.push(state);
    };
    Sprite.prototype.setState = function (name) {
        var _this = this;
        this.states.forEach(function (state) {
            if (state.getName() == name) {
                _this.currentState = state;
            }
        });
    };
    Sprite.prototype.render = function () {
        var frame = this.currentState.frames[this.currentState.currentFrame];
        var framey = frame[0] * this.height - this.height;
        var framex = frame[1] * this.width - this.width;
        this.context.drawImage(this.image, framex, framey, this.width, this.height, this.x, this.y, this.width, this.height);
    };
    Sprite.prototype.update = function () {
        if (this.tick % 10 == 0) {
            this.currentState.nextFrame();
            this.tick = 0;
        }
        this.tick++;
    };
    return Sprite;
})();
var Controls = (function () {
    function Controls() {
        this.UpPressed = false;
        this.LeftPressed = false;
        this.DownPressed = false;
        this.RightPressed = false;
    }
    Controls.prototype.update = function (event) {
        this.updatePressed(event);
        this.checkForState(event);
        // Keyup
        if (event.key == "ArrowRight" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkRight') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standRight');
            }
        }
        else if (event.key == "ArrowLeft" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkLeft') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standLeft');
            }
        }
        else if (event.key == "ArrowUp" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkUp') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standUp');
            }
        }
        else if (event.key == "ArrowDown" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkDown') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standDown');
            }
        }
    };
    Controls.prototype.updatePressed = function (event) {
        if (event.key == "ArrowDown" && event.type == 'keyup') {
            this.DownPressed = false;
        }
        if (event.key == "ArrowUp" && event.type == 'keyup') {
            this.UpPressed = false;
        }
        if (event.key == "ArrowLeft" && event.type == 'keyup') {
            this.LeftPressed = false;
        }
        if (event.key == "ArrowLeft" && event.type == 'keyup') {
            this.LeftPressed = false;
        }
        if (event.key == "ArrowRight" && event.type == 'keyup') {
            this.RightPressed = false;
        }
        if (event.key == "ArrowDown" && event.type == 'keydown') {
            this.DownPressed = true;
        }
        if (event.key == "ArrowUp" && event.type == 'keydown') {
            this.UpPressed = true;
        }
        if (event.key == "ArrowLeft" && event.type == 'keydown') {
            this.LeftPressed = true;
        }
        if (event.key == "ArrowLeft" && event.type == 'keydown') {
            this.LeftPressed = true;
        }
        if (event.key == "ArrowRight" && event.type == 'keydown') {
            this.RightPressed = true;
        }
    };
    Controls.prototype.checkForState = function (event) {
        // Movement
        if (this.DownPressed && Game.getInstance().player.sprite.currentState.name != 'walkDown') {
            Game.getInstance().player.sprite.setState('walkDown');
            return true;
        }
        else if (this.UpPressed && Game.getInstance().player.sprite.currentState.name != 'walkUp') {
            Game.getInstance().player.sprite.setState('walkUp');
            return true;
        }
        else if (this.LeftPressed && Game.getInstance().player.sprite.currentState.name != 'walkLeft') {
            Game.getInstance().player.sprite.setState('walkLeft');
            return true;
        }
        else if (this.RightPressed && Game.getInstance().player.sprite.currentState.name != 'walkRight') {
            Game.getInstance().player.sprite.setState('walkRight');
            return true;
        }
        return false;
    };
    return Controls;
})();
var Door = (function () {
    function Door(x, y) {
        this.state = 0;
        this.x = 0;
        this.y = 0;
        this.x = x * 32;
        this.y = y * 32;
        this.image = new Image();
        this.image.src = "images/door.png";
    }
    return Door;
})();
var Level = (function () {
    function Level(tileWidth, tileHeight, tilesX, tilesY) {
        this.doorUp = new Door(16, 4);
        this.doorLeft = new Door(6, 19);
        this.doorRight = new Door(25, 19);
        this.image = new Image();
        this.image.src = "images/lab.png";
        this.layer2 = new Image();
        this.layer2.src = "images/lab-layer-2.png";
        this.debugimage = new Image();
        this.debugimage.src = "images/grid-red.png";
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tilesX = tilesX;
        this.tilesY = tilesY;
        this.collision = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        l('--start--');
        l(this.collision[9][14]);
        l(this.collision[10][14]);
        l(this.collision[11][14]);
        l(this.collision[12][14]);
        l(this.collision[13][14]);
        l(this.collision[14][14]);
        l(this.collision[15][14]);
        l(this.collision[16][14]);
        l(this.collision[17][14]);
        l(this.collision[18][14]);
        l(this.collision[19][14]);
        l(this.collision[20][14]);
        l('--end--');
    }
    Level.prototype.render = function () {
        Game.getInstance().context.drawImage(this.image, 0, 0);
        Game.getInstance().context.drawImage(this.doorUp.image, this.doorUp.state * 32, 0, 32, 32, this.doorUp.x, this.doorUp.y, 32, 32);
    };
    Level.prototype.renderLayer = function () {
        Game.getInstance().context.drawImage(this.layer2, 0, 0);
        Game.getInstance().context.drawImage(this.doorLeft.image, this.doorLeft.state * 32, 0, 32, 32, this.doorLeft.x, this.doorLeft.y, 32, 32);
        Game.getInstance().context.drawImage(this.doorRight.image, this.doorRight.state * 32, 0, 32, 32, this.doorRight.x, this.doorRight.y, 32, 32);
    };
    Level.prototype.checkCollision = function (grid) {
        var gridType = this.collision[grid.x + 1][grid.y + 1];
        if (gridType == 1) {
            return true;
        }
        return false;
    };
    Level.prototype.debug = function () {
        for (var x = 0; x <= 31; x++) {
            for (var y = 0; y <= 23; y++) {
                if (this.collision[x][y] != 2) {
                    Game.getInstance().context.drawImage(this.debugimage, x * 32, y * 32);
                }
            }
        }
    };
    return Level;
})();
var Game = (function () {
    function Game(context) {
        var _this = this;
        this.zombiepirates = [];
        this.update = function () {
            var now = Date.now();
            _this.deltaTime = (now - _this.lastDeltaUpdate) / 1000;
            if (_this.deltaTime > 1)
                _this.deltaTime = 0;
            _this.lastDeltaUpdate = now;
            _this.player.update();
            _this.level.render();
            _this.player.sprite.render();
            _this.zombiepirates.forEach(function (pirate) {
                pirate.update();
                pirate.render();
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
    Game.prototype.start = function () {
        this.level = new Level(32, 32, 32, 24);
        this.player = new Player();
        this.zombiepirates.push(new ZombiePirate());
        this.controls = new Controls();
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
