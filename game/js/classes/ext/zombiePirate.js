/// <reference path="../../ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ZombiePirate = (function (_super) {
    __extends(ZombiePirate, _super);
    function ZombiePirate(x, y) {
        _super.call(this);
        this.health = 10;
        this.walkspeed = 2;
        this.pathTick = 0;
        this.pathIndex = 0;
        this.path = [];
        this.pathSize = 0;
        this.attacking = false;
        this.collidable = true;
        // Set Sprite
        var image = new Image();
        image.src = "images/zombie-pirate.png";
        this.boundryBox = [32, 48];
        this.sprite = new Sprite(32, 48, image);
        this.sprite.x = x;
        this.sprite.y = y;
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
        this.pathFinder.getPath(this.currentGrid, targetGrid);
    };
    ZombiePirate.prototype.checkPlayerCollision = function () {
        var collision = false;
        var targetGrid = Game.getGridsFor(Game.getInstance().player.sprite.x, Game.getInstance().player.sprite.y);
        if (this.currentGrid.x == targetGrid.x && this.currentGrid.y == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y + 1 == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y - 1 == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y - 1 == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y + 1 == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x == targetGrid.x && this.currentGrid.y + 1 == targetGrid.y) {
            collision == true;
        }
        if (this.currentGrid.x == targetGrid.x && this.currentGrid.y - 1 == targetGrid.y) {
            collision == true;
        }
        return collision;
    };
    ZombiePirate.prototype.update = function () {
        if (this.pathTick % 2 == 0 && this.pathFinder.pathIndex < this.pathFinder.pathSize) {
            //this.attacking = this.checkPlayerCollision();
            if (this.attacking) {
                l('attacking');
            }
            if (!this.attacking) {
                if (this.sprite.x < this.pathFinder.getCurrent().x * 32) {
                    this.sprite.x += 1;
                }
                if (this.sprite.x > this.pathFinder.getCurrent().x * 32) {
                    this.sprite.x -= 1;
                }
                if (this.sprite.y < this.pathFinder.getCurrent().y * 32) {
                    this.sprite.y += 1;
                }
                if (this.sprite.y > this.pathFinder.getCurrent().y * 32) {
                    this.sprite.y -= 1;
                }
                if (this.sprite.x == this.pathFinder.getCurrent().x * 32 && this.sprite.y == this.pathFinder.getCurrent().y * 32 && this.sprite.x % 32 == 0 && this.sprite.y % 32 == 0) {
                    // New sprite, new state?
                    var prevGrid = this.pathFinder.getCurrent();
                    if (this.pathFinder.next()) {
                        var nextGrid = this.pathFinder.getCurrent();
                        if (prevGrid.x < nextGrid.x) {
                            this.sprite.setState('walkRight');
                        }
                        else if (prevGrid.x > nextGrid.x) {
                            this.sprite.setState('walkLeft');
                        }
                        else if (prevGrid.y < nextGrid.y) {
                            this.sprite.setState('walkDown');
                        }
                        else if (prevGrid.y > nextGrid.y) {
                            this.sprite.setState('walkUp');
                        }
                    }
                    else {
                        this.updatePath();
                    }
                    this.currentGrid = this.sprite.getGrids();
                }
                this.pathTick = 0;
            }
        }
        this.pathTick++;
        _super.prototype.update.call(this);
    };
    ZombiePirate.prototype.render = function () {
        _super.prototype.render.call(this);
        //this.pathFinder.render();
    };
    return ZombiePirate;
})(SpriteEntity);
