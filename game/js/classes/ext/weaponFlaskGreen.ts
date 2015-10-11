/// <reference path="../../ref.ts" />

class FlaskGreen extends SpriteEntity {
	image: any;
	state: number = 0;
	x: number = 0;
	y: number = 0;
	throwspeed: number = 5;
	direction: string;
	renderSlowdown: number = 2;
	renderTick: number = 0;
	falloff: number = 0;
	falloffSpeed: number = 0.014;
	isFalling: boolean = true;
	hasCollided: boolean = false;
	constructor() {
        super();
	}

	init() {
		// Set Sprite
		var image : any = new Image();
		image.src = "images/flask-green.png";
		this.sprite = new Sprite(32, 32, image);
		
		this.sprite.frameSpeed = 12;
		
		this.sprite.tick = 1;
		this.sprite.x = Game.getInstance().player.sprite.x;
		this.sprite.y = Game.getInstance().player.sprite.y;
		this.sprite.setGrids();

		// Set AnimationStates for Sprite
		this.sprite.addState(new AnimationState("throw-up", [[1,1],[1,2],[1,3]]));
		this.sprite.addState(new AnimationState("throw-down", [[2,1],[2,2],[2,3]]));
		this.sprite.addState(new AnimationState("throw-left",[[3,3],[3,2],[3,1]]));
		this.sprite.addState(new AnimationState("throw-right", 	[[4,1],[4,2],[4,3]]));

		this.sprite.addState(new AnimationState("hit", [[1,4],[1,5]]));
		this.sprite.addState(new AnimationState("impact", [[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]]));
		
		this.direction = Game.getInstance().player.direction;
		this.sprite.setState("throw-" + this.direction);
		
	}

	checkCollision() {
		if(this.hasCollided) {
			return;
		}

		// Collision for map
		if(this.direction == 'down') {
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x, this.sprite.y + this.throwspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y + this.throwspeed, nextGrid);
			if(collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'up') {
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x, this.sprite.y - this.throwspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x, this.sprite.y - this.throwspeed, nextGrid);
			if (collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'left') {
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x - this.throwspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x - this.throwspeed, this.sprite.y, nextGrid);
			if(collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'right') {
			var nextGrid: Grid = Game.getGridsFor(this.sprite.x + this.throwspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(this.sprite.x + this.throwspeed, this.sprite.y, nextGrid);
			if(collided) {
				this.hasCollided = true;
			}
		}

		// Entity collision
		if(this.direction == 'down') {
			var collided: boolean = Game.getInstance().level.checkEntityCollision(this.sprite.x, this.sprite.y + this.throwspeed);
			if(collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'up') {
			var collided: boolean = Game.getInstance().level.checkEntityCollision(this.sprite.x, this.sprite.y - this.throwspeed);
			if (collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'left') {
			var collided: boolean = Game.getInstance().level.checkEntityCollision(this.sprite.x - this.throwspeed, this.sprite.y);
			if(collided) {
				this.hasCollided = true;
			}
		} else if (this.direction == 'right') {
			var collided: boolean = Game.getInstance().level.checkEntityCollision(this.sprite.x + this.throwspeed, this.sprite.y);
			if(collided) {
				this.hasCollided = true;
			}
		}	

		if(this.hasCollided) {
			this.sprite.setState('hit');
		}
	}

	update() {
		this.checkCollision();
		if (this.direction == 'down') {
			if(this.isFalling) {
				if(!this.hasCollided) {
					this.sprite.y += this.throwspeed;
				}
				this.sprite.y += this.falloff;
			}
		} else if (this.direction == 'up') {
			if(this.isFalling) {
				if(!this.hasCollided) {
					this.sprite.y -= this.throwspeed;
				}
				this.sprite.y += this.falloff;
			}
		} else if (this.direction == 'left') {
			if(this.isFalling) {
				if(!this.hasCollided) {
					this.sprite.x -= this.throwspeed;
				}
				this.sprite.y += this.falloff;
			}
		} else if (this.direction == 'right') {
			if(this.isFalling) {
				if(!this.hasCollided) {
					this.sprite.x += this.throwspeed;
				}
				this.sprite.y += this.falloff;
			}
		}
		this.falloffSpeed += this.falloffSpeed / 20;
		this.falloff += this.falloffSpeed;
	
		super.update();
	}

	render() {
		if (this.sprite.loop == 1) {
			if(this.sprite.currentState.name == "impact") {
				this.destroy();
				return;
			} else {
				this.sprite.setState("impact");
				this.isFalling = false;
			}
		}
		super.render();
	}

	use() {
		var flask: FlaskGreen = new FlaskGreen();
		flask.init();
		Game.getInstance().entities.push(flask);
	}
}