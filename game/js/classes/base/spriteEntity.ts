/// <reference path="../../ref.ts" />

class SpriteEntity extends Entity {
	sprite: Sprite;
    entityID: number;
    boundryBox: any[] = [];
    collidable: boolean = false;
    constructor(sprite: Sprite = null) {
        super();
        this.sprite = sprite;
        this.entityID = Game.getInstance().getEntityIndex();
    }
    update() {
        if (this.sprite) {
            this.sprite.update();
        }
    }
    render() {
        if (this.sprite) {
            this.sprite.render();
        }
    }
    destroy() {
        for(var i=0; i < Game.getInstance().entities.length; i++) {
            if(Game.getInstance().entities[i].entityID == this.entityID) {
                Game.getInstance().entities.splice(i, 1);
                return true;                
            }
        };
        return false;
        
        // Remove it from the games render list

    }
}