/// <reference path="../../ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.health = 100;
        this.walkspeed = 3;
        this.attacking = false;
        this.direction = 'down';
        this.weaponCooldown = 0;
        this.debugimage = new Image();
        this.debugimage.src = "images/grid-green.png";
        // Set Sprite
        var image = new Image();
        image.src = "images/originals/player.png";
        this.sprite = new Sprite(32, 48, image);
        this.sprite.x = 12 * 32;
        this.sprite.y = 8 * 32;
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
        this.sprite.addState(new AnimationState("standUp", [[4, 2]]));
        this.sprite.addState(new AnimationState("meleeAttackdown", [[5, 1], [5, 2]]));
        this.sprite.addState(new AnimationState("meleeAttackleft", [[6, 1], [6, 2]]));
        this.sprite.addState(new AnimationState("meleeAttackright", [[7, 1], [7, 2]]));
        this.sprite.addState(new AnimationState("meleeAttackup", [[8, 1], [8, 2]]));
        this.sprite.setState("standDown");
        this.weapon = new FlaskGreen();
    }
    Player.prototype.update = function () {
        if (this.weaponCooldown > 0) {
            this.weaponCooldown -= 1;
        }
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
        _super.prototype.update.call(this);
    };
    Player.prototype.walk = function (direction) {
        if (direction == 'down') {
            this.direction = 'down';
            var nextGrid = Game.getGridsFor(this.sprite.x, this.sprite.y + this.walkspeed);
            var collided = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y + this.walkspeed, nextGrid);
            if (!collided) {
                this.sprite.y += this.walkspeed;
            }
        }
        else if (direction == 'up') {
            this.direction = 'up';
            var nextGrid = Game.getGridsFor(this.sprite.x, this.sprite.y - this.walkspeed);
            var collided = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y - this.walkspeed, nextGrid);
            if (!collided) {
                this.sprite.y -= this.walkspeed;
            }
        }
        else if (direction == 'left') {
            this.direction = 'left';
            var nextGrid = Game.getGridsFor(this.sprite.x - this.walkspeed, this.sprite.y);
            var collided = Game.getInstance().level.checkCollision(this.sprite.x - this.walkspeed, this.sprite.y, nextGrid);
            if (!collided) {
                this.sprite.x -= this.walkspeed;
            }
        }
        else if (direction == 'right') {
            this.direction = 'right';
            var nextGrid = Game.getGridsFor(this.sprite.x + this.walkspeed, this.sprite.y);
            var collided = Game.getInstance().level.checkCollision(this.sprite.x + this.walkspeed, this.sprite.y, nextGrid);
            if (!collided) {
                this.sprite.x += this.walkspeed;
            }
        }
        this.sprite.setGrids();
    };
    Player.prototype.attack = function () {
        this.attacking = true;
        this.sprite.pushState('meleeAttack' + this.direction);
        this.weapon.use();
    };
    return Player;
})(SpriteEntity);
