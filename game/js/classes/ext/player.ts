/// <reference path="../../ref.ts" />

class Player extends SpriteEntity {
	health: number = 100;
	walkspeed: number = 3;
	attacking: boolean = false;
	debugimage: any;
	direction: string = 'down';
	weapon: any;

	constructor() {
        super();
		this.debugimage = new Image();
		this.debugimage.src = "images/grid-green.png";
		// Set Sprite
		var image : any = new Image();
		image.src = "images/originals/player.png";
		this.sprite = new Sprite(32, 48, image);
		this.sprite.x = 12 * 32;
		this.sprite.y = 8 * 32;
		this.sprite.setGrids();
		// Set AnimationStates for Sprite
		this.sprite.addState(new AnimationState("walkDown", [[1,1],[1,2],[1,3]]));
		this.sprite.addState(new AnimationState("walkLeft", [[2,1],[2,2],[2,3]]));
		this.sprite.addState(new AnimationState("walkRight",[[3,1],[3,2],[3,3]]));
		this.sprite.addState(new AnimationState("walkUp", 	[[4,1],[4,2],[4,3]]));

		this.sprite.addState(new AnimationState("standDown", [[1,2]]));
		this.sprite.addState(new AnimationState("standLeft", [[2,2]]));
		this.sprite.addState(new AnimationState("standRight",[[3,2]]));
		this.sprite.addState(new AnimationState("standUp",	 [[4,2]]));
		this.sprite.addState(new AnimationState("standUp",	 [[4,2]]));

		this.sprite.addState(new AnimationState("meleeAttackdown", 	[[5,1],[5,2]]));
		this.sprite.addState(new AnimationState("meleeAttackleft", 	[[6,1],[6,2]]));
		this.sprite.addState(new AnimationState("meleeAttackright",	[[7,1],[7,2]]));
		this.sprite.addState(new AnimationState("meleeAttackup", 	[[8,1],[8,2]]));

		this.sprite.setState("standDown");

		this.weapon = new FlaskGreen();
	}



	update() {
		if (this.sprite.currentState.name == "walkDown")	{ this.walk('down');}
		if (this.sprite.currentState.name == "walkUp")		{ this.walk('up');}
		if (this.sprite.currentState.name == "walkLeft")	{ this.walk('left');}
		if (this.sprite.currentState.name == "walkRight")	{ this.walk('right');}
		super.update();
	}

	walk(direction) {

		if(direction == 'down') {
			this.direction = 'down';
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x, this.sprite.y + this.walkspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y + this.walkspeed, nextGrid);
			if(!collided) {
				this.sprite.y += this.walkspeed;
			}
		} else if (direction == 'up') {
			this.direction = 'up';
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x, this.sprite.y - this.walkspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y - this.walkspeed, nextGrid);
			if (!collided) {
				this.sprite.y -= this.walkspeed;
			}
		} else if (direction == 'left') {
			this.direction = 'left';
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x - this.walkspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x - this.walkspeed, this.sprite.y, nextGrid);
			if(!collided) {
				this.sprite.x -= this.walkspeed;
			}
		} else if (direction == 'right') {
			this.direction = 'right';
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x + this.walkspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x + this.walkspeed, this.sprite.y, nextGrid);
			if(!collided) {
				this.sprite.x += this.walkspeed;
			}
		}
		this.sprite.setGrids();
	}

	attack() {
		this.attacking = true;
		this.sprite.pushState('meleeAttack' + this.direction);
		this.weapon.use();
	}

}
