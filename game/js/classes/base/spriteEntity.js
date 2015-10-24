/// <reference path="../../ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SpriteEntity = (function (_super) {
    __extends(SpriteEntity, _super);
    function SpriteEntity(sprite) {
        if (sprite === void 0) { sprite = null; }
        _super.call(this);
        this.boundryBox = [];
        this.collidable = false;
        this.damageable = false;
        this.sprite = sprite;
        this.entityID = Game.getInstance().getEntityIndex();
    }
    SpriteEntity.prototype.update = function () {
        if (this.sprite) {
            this.sprite.update();
        }
    };
    SpriteEntity.prototype.render = function () {
        if (this.sprite) {
            this.sprite.render();
        }
    };
    SpriteEntity.prototype.destroy = function () {
        for (var i = 0; i < Game.getInstance().entities.length; i++) {
            if (Game.getInstance().entities[i].entityID == this.entityID) {
                Game.getInstance().entities.splice(i, 1);
                return true;
            }
        }
        ;
        return false;
        // Remove it from the games render list
    };
    return SpriteEntity;
})(Entity);
