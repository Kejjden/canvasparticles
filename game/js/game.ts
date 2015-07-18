/// <reference path="ref.ts" />


declare var PF;

class Entity {
    update() {}
    render() {}
}

class SpriteEntity extends Entity {
	sprite: Sprite;
    constructor(sprite: Sprite = null) {
        super();
        this.sprite = sprite;
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
}

class ZombiePirate extends SpriteEntity {
	health: number = 10;
	walkspeed: number = 2;
	pathTick: number = 0;
	pathIndex: number = 0;
	path: any[] = [];
	pathSize: number = 0;
	pathFinder: Pathfinder;
	debugimage: any;
	currentGrid: Grid;
	pathTargetGrid: Grid;
	attacking: boolean = false;
	constructor(x: number, y: number) {
        super();
		// Set Sprite
		var image : any = new Image();
		image.src = "images/zombie-pirate.png";
		this.sprite = new Sprite(32, 48, image);
		this.sprite.x = x;
		this.sprite.y = y;
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
		this.sprite.setState("walkDown");
		this.pathFinder = new Pathfinder();
		this.updatePath();
	}

	updatePath() {
		var targetGrid: Grid = Game.getGridsFor(Game.getInstance().player.sprite.x, Game.getInstance().player.sprite.y);
		this.currentGrid = Game.getGridsFor(this.sprite.x, this.sprite.y);
		this.pathFinder.getPath(this.currentGrid, targetGrid);
	}

	checkPlayerCollision():boolean {
		var collision = false;

		var targetGrid: Grid = Game.getGridsFor(Game.getInstance().player.sprite.x, Game.getInstance().player.sprite.y);

		if (this.currentGrid.x == targetGrid.x && this.currentGrid.y == targetGrid.y) { collision == true; }
		if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y == targetGrid.y) { collision == true; }
		if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y == targetGrid.y) { collision == true; }
		if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y + 1== targetGrid.y) { collision == true; }
		if (this.currentGrid.x + 1 == targetGrid.x && this.currentGrid.y - 1== targetGrid.y) { collision == true; }
		if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y - 1== targetGrid.y) { collision == true; }
		if (this.currentGrid.x - 1 == targetGrid.x && this.currentGrid.y + 1== targetGrid.y) { collision == true; }
		if (this.currentGrid.x == targetGrid.x && this.currentGrid.y + 1== targetGrid.y) { collision == true; }
		if (this.currentGrid.x == targetGrid.x && this.currentGrid.y - 1== targetGrid.y) { collision == true; }
		return collision;
	}

	update() {
		if(this.pathTick%2 == 0 && this.pathFinder.pathIndex < this.pathFinder.pathSize) {
			//this.attacking = this.checkPlayerCollision();
			if(this.attacking) {
				l('attacking');
			}
			if(!this.attacking) {
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
				if (this.sprite.x == this.pathFinder.getCurrent().x*32 && this.sprite.y == this.pathFinder.getCurrent().y*32 && this.sprite.x%32 == 0 && this.sprite.y%32 == 0) {
					// New sprite, new state?
					var prevGrid: Grid = this.pathFinder.getCurrent();
					if(this.pathFinder.next()) {
						var nextGrid: Grid = this.pathFinder.getCurrent();
						if (prevGrid.x < nextGrid.x) { this.sprite.setState('walkRight'); }
						else if (prevGrid.x > nextGrid.x) { this.sprite.setState('walkLeft'); }
						else if (prevGrid.y < nextGrid.y) { this.sprite.setState('walkDown'); }
						else if (prevGrid.y > nextGrid.y) { this.sprite.setState('walkUp'); }
					} else {
						this.updatePath();
					}

					this.currentGrid = this.sprite.getGrids();
					//this.pathTargetGrid = new Grid(this.path[this.pathIndex].x, this.path[this.pathIndex].y);
				}
				this.pathTick = 0;
			}

        }
        this.pathTick++;
        super.update();
	}
	render() {
        super.render();
		//this.pathFinder.render();
	}
}
class Grid {
	x: number;
	y: number;
	constructor(x, y) {
		this.setXY(x, y);
	}
	setXY(x,y) {
		this.x = x;
		this.y = y;
	}
}
class Player extends SpriteEntity {
	health: number = 100;
	walkspeed: number = 3;
	attacking: boolean = false;
	debugimage: any;
	direction: string = 'down';
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

		this.sprite.setState("standDown");
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
	}

}

class AnimationState {
	name: string;
	frames: number[];
	currentFrame: number = 0;
	constructor(name, frames) {
		this.name = name;
		this.frames = frames;
	}
	getName() {
		return this.name;
	}
	nextFrame() {
		if(this.frames.length > 1) {
			this.currentFrame++;
		}
		if(this.currentFrame == this.frames.length) {
			this.currentFrame = 0;
		}
	}
}


class Sprite {
	context: any;
	width: number;
	height: number;
	image: string;
	states: AnimationState[] = [];
	currentState: AnimationState;
	tick: number = 0;
	x: number = 0;
	y: number = 0;
	gridX: number;
	gridY: number;
	pushQueue: any[] = [];

	constructor(width, height, image) {
		this.context = Game.getInstance().context;
		this.width = width;
		this.height = height;
		this.image = image;
	}
	setGrids() {
		this.gridX = Math.floor(this.x / Game.getInstance().level.tileWidth);
		this.gridY = Math.floor(this.y / Game.getInstance().level.tileHeight);
	}
	getGrids() {
		return Game.getGridsFor(this.x, this.y);
	}

	pushState(name: string) {
		var stateToPush: AnimationState = this.getState(name);
		stateToPush.frames.forEach(frame => {
			this.pushQueue.push(frame);
		});
	}

	getState(name: string) {
		var ret: AnimationState;
		this.states.forEach(state => {
		    if(state.getName() == name) {
				ret = state;
		    }
		});
		return ret;
	}

	addState(state: AnimationState) {
		this.states.push(state);
	}
	setState(name: string) {
		this.states.forEach(state => {
		    if(state.getName() == name) {
				this.currentState = state;
		    }
		});
	}

	render() {
		var frame: number = this.currentState.frames[this.currentState.currentFrame];
		if(this.pushQueue.length) {
			l('have pushQueue');
			frame = this.pushQueue[0];
		}
		var framey: number = frame[0] * this.height - this.height;
		var framex: number = frame[1] * this.width - this.width;


		this.context.drawImage(
			this.image,
			framex,
			framey,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	update() {
        if(this.tick%10 == 0) {
			this.currentState.nextFrame();
			if(this.pushQueue.length) {
				this.pushQueue.shift();
			}
			this.tick = 0;
        }
        this.tick++;
    }
}
class Controls {

	UpPressed: boolean = false;
	LeftPressed: boolean = false;
	DownPressed: boolean = false;
	RightPressed: boolean = false;
	constructor() {}
	update(event) {
		this.updatePressed(event);
		this.checkForState(event);

 		// Keyup
		if(event.key == "ArrowRight" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkRight') {
			if (!this.checkForState(event)) { Game.getInstance().player.sprite.setState('standRight'); }
		} else if(event.key == "ArrowLeft" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkLeft') {
			if (!this.checkForState(event)) { Game.getInstance().player.sprite.setState('standLeft'); }
		} else if(event.key == "ArrowUp" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkUp') {
			if (!this.checkForState(event)) { Game.getInstance().player.sprite.setState('standUp'); }
		} else if(event.key == "ArrowDown" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkDown') {
			if (!this.checkForState(event)) { Game.getInstance().player.sprite.setState('standDown'); }
		}

		// Basic Attack
		if(event.key == " " && event.type == 'keyup') {
			Game.getInstance().player.attack();
		}
	}

	updatePressed(event: any) {
		if (event.key == "ArrowDown" && event.type == 'keyup') { this.DownPressed = false; }
		if (event.key == "ArrowUp" && event.type == 'keyup') { this.UpPressed = false; }
		if (event.key == "ArrowLeft" && event.type == 'keyup') { this.LeftPressed = false; }
		if (event.key == "ArrowLeft" && event.type == 'keyup') { this.LeftPressed = false; }
		if (event.key == "ArrowRight" && event.type == 'keyup') { this.RightPressed = false; }

		if (event.key == "ArrowDown" && event.type == 'keydown') { this.DownPressed = true; }
		if (event.key == "ArrowUp" && event.type == 'keydown') { this.UpPressed = true; }
		if (event.key == "ArrowLeft" && event.type == 'keydown') { this.LeftPressed = true; }
		if (event.key == "ArrowLeft" && event.type == 'keydown') { this.LeftPressed = true; }
		if (event.key == "ArrowRight" && event.type == 'keydown') { this.RightPressed = true; }

	}

	checkForState(event) {
		// Movement
		if(this.DownPressed && Game.getInstance().player.sprite.currentState.name != 'walkDown') {
			Game.getInstance().player.sprite.setState('walkDown');
			return true;
		} else if(this.UpPressed && Game.getInstance().player.sprite.currentState.name != 'walkUp') {
			Game.getInstance().player.sprite.setState('walkUp');
			return true;
		} else if(this.LeftPressed && Game.getInstance().player.sprite.currentState.name != 'walkLeft') {
			Game.getInstance().player.sprite.setState('walkLeft');
			return true;
		} else if(this.RightPressed && Game.getInstance().player.sprite.currentState.name != 'walkRight') {
			Game.getInstance().player.sprite.setState('walkRight');
			return true;
		}
		return false;
	}
}

class Door {
	image: any;
	state: number = 0;
	x: number = 0;
	y: number = 0;
	constructor(x, y) {
		this.x = x*32;
		this.y = y*32;
		this.image = new Image();
		this.image.src = "images/door.png";
	}
}
class Level {
	image: any;
	layer2: any;
	tileWidth: number;
	tileHeight: number;
	tilesX: number;
	tilesY: number;
	collision: any[][];
	doorUp: Door;
	doorLeft: Door;
	doorRight: Door;
	debugimage: any;


	constructor(tileWidth, tileHeight, tilesX, tilesY) {
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
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
			[1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1],
			[1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		];



	}
	render() {
		Game.getInstance().context.drawImage(
			this.image,
			0,
			0
		);
		Game.getInstance().context.drawImage(
			this.doorUp.image,
			this.doorUp.state * 32, 0,
			32,32,
			this.doorUp.x,
			this.doorUp.y,
			32,32
		);
	}
	renderLayer() {
		Game.getInstance().context.drawImage(
			this.layer2,
			0,
			0
		);
		Game.getInstance().context.drawImage(
			this.doorLeft.image,
			this.doorLeft.state * 32, 0,
			32,32,
			this.doorLeft.x,
			this.doorLeft.y,
			32,32
		);
		Game.getInstance().context.drawImage(
			this.doorRight.image,
			this.doorRight.state * 32, 0,
			32,32,
			this.doorRight.x,
			this.doorRight.y,
			32,32
		);
	}
	checkCollision(x, y, grid) {
		var positions: any[] = [
			[x, y],
			[x+31, y],
			[x, y+31],
			[x+31, y+31],
		];

		var ret: boolean = false;
		positions.forEach(position => {
			var grid: Grid = Game.getGridsFor(position[0], position[1]);
			var gridType = this.collision[grid.y][grid.x];
			if (gridType == 1) {
				ret = true;
			}
		});
		return ret;
	}
	debug() {
		for (var x = 0; x <= 31; x++) {
			for (var y = 0; y <= 23; y++) {
				if(this.collision[y][x] != 0) {
					Game.getInstance().context.drawImage(
						this.debugimage,
						x * 32,
						y * 32
					);
				}
        	}
        }
	}
}

class Game {
	context: any;
	static instance: Game;
	player: Player;
	lastDeltaUpdate: number;
	deltaTime: number;
	controls: Controls;
	level: Level;
	entities: Entity[] = [];
	spawner: Spawner;

	constructor(context) {
		this.context = context;
        if(Game.instance){
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }
        Game.instance = this;


        this.start();
    }

    public static getInstance():Game
    {
        return Game.instance;
    }
	public static getGridsFor(x,y) {
		return new Grid(Math.floor(x / Game.getInstance().level.tileWidth), Math.floor(y / Game.getInstance().level.tileHeight));
	}
    public static getDeltaTime():number
    {
		return Game.getInstance().deltaTime;
    }

    start() {
        this.level = new Level(32, 32, 32, 24);
		this.player = new Player();
        this.entities.push(this.player);
        this.controls = new Controls();
        this.spawner = new Spawner();

        document.addEventListener("keydown", (event) => Game.getInstance().controls.update(event));
        document.addEventListener("keyup", (event) => Game.getInstance().controls.update(event));
		this.update();
    }

	update = () => {
		var now=Date.now();
	    this.deltaTime=(now-this.lastDeltaUpdate)/1000;
	    if(this.deltaTime>1)this.deltaTime=0;
	    this.lastDeltaUpdate=now;

		this.spawner.update();
		this.level.render();

        this.entities.sort((a, b) => {
        	if(a instanceof SpriteEntity && b instanceof SpriteEntity) {
                var ay = a.sprite ? a.sprite.y : 0;
                var by = b.sprite ? b.sprite.y : 0;
                if(ay > by) {
                    return 1;
                }
                if(ay < by) {
                    return -1;
                }
        	}
            return 0;
        });

		this.entities.forEach(pirate  => {
			pirate.update();
			pirate.render();
		});

		this.level.renderLayer();
		this.level.debug();
		requestAnimationFrame(this.update);
	}
}



var canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = 32*32;
canvas.height = 24*32;
var ctx = canvas.getContext("2d");

var game: Game = new Game(ctx);



function l(something:any){
	console.log(something);
}