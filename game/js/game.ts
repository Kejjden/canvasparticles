class ZombiePirate {
	sprite: Sprite;
	health: number = 10;
	walkspeed: number = 2;
	pathTick: number = 0;
	pathIndex: number = 0;
	path: any[] = [];
	constructor() {
		// Set Sprite
		var image : any = new Image();
		image.src = "images/zombie-pirate.png";
		this.sprite = new Sprite(32, 48, image);
		this.sprite.x = 4 * 32;
		this.sprite.y = 4 * 32;
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
		this.updatePath();
	}

	updatePath() {
		this.path = [];
		var targetGrid: any = this.sprite.getGridsFor(Game.getInstance().player.sprite.x, Game.getInstance().player.sprite.y);
		var currentGrid: any = this.sprite.getGridsFor(this.sprite.x, this.sprite.y);
		var leftOfTarget: boolean = false;
		var aboveTarget: boolean = false;
		var firstX: boolean = false;
		//l('Current');
		//l(currentGrid);
		//l('Target');
		//l(targetGrid);
		//l('Path');
		// Start with X
		if (currentGrid[0] < targetGrid[0]) { leftOfTarget = true; }
		// Now Y
		if (currentGrid[1] < targetGrid[1]) { aboveTarget = true; }
		// Random the first way
		firstX = !!Math.floor(Math.random() * 2);
		firstX = true;

		if(leftOfTarget && aboveTarget) {
			if(firstX) {
				var nextGrid: any[] = [currentGrid[0] + 1, currentGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						this.path.push([nextGrid[0], nextGrid[1]]);
						//l(nextGrid);
						nextGrid = [nextGrid[0] + 1, nextGrid[1]];
					} else {
						this.path.push([nextGrid[0] - 1, nextGrid[1]]);
						//l([nextGrid[0] - 1, nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1]];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1] - 1] == 2) {
						this.path.push([nextGrid[0], nextGrid[1]]);
						//l('Free space');
						//l(nextGrid);
						nextGrid = [nextGrid[0], nextGrid[1] + 1];
					} else {
						this.path.push([nextGrid[0], nextGrid[1]]);
						//l('Blocked');
						//l([nextGrid[0], nextGrid[1]]);
					}
				}
			} /*else {

			}*/
		} else if (leftOfTarget && !aboveTarget) {

		} else if (!leftOfTarget && aboveTarget) {
			
		} else if (!leftOfTarget && !aboveTarget) {
			
		}

		
	}

	update() {
		//l('update');
		if(this.pathTick%2 == 0 && this.pathIndex < 6) {
			//l('tick');
			var current: any = this.sprite.getGrids();
			var target: any = [this.path[this.pathIndex][0], this.path[this.pathIndex][1]];


			if (current[0] < target[0]) { 
				this.sprite.x += 1; 
				//var dummy: any = this.sprite.getGridsFor(this.sprite.x - 16, this.sprite.y);

			}
			if (current[1] < target[1]) { 
				this.sprite.y += 1; 
			}
			if (current[0] == target[0]) {
				l('new target');
				this.pathIndex++;		 
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
	}
	render() {

	}
}
class Player {
	sprite: Sprite;
	health: number = 100;
	walkspeed: number = 3;

	constructor() {
		// Set Sprite
		var image : any = new Image();
		image.src = "images/originals/player.png";
		this.sprite = new Sprite(32, 48, image);
		this.sprite.x = 12 * 32;
		this.sprite.y = 10 * 32;
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
		this.sprite.setState("standDown");
	}

	update() {
		if (this.sprite.currentState.name == "walkDown")	{ this.walk('down');}
		if (this.sprite.currentState.name == "walkUp")		{ this.walk('up');}
		if (this.sprite.currentState.name == "walkLeft")	{ this.walk('left');}
		if (this.sprite.currentState.name == "walkRight")	{ this.walk('right');}
		this.sprite.update();
	}

	walk(direction) {

		if(direction == 'down') {
			var nextGrid: any[] = this.sprite.getGridsFor(this.sprite.x, this.sprite.y + this.walkspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(nextGrid);
			if(!collided) {
				this.sprite.y += this.walkspeed;
			}
		} else if (direction == 'up') {
			var nextGrid: any[] = this.sprite.getGridsFor(this.sprite.x, this.sprite.y - this.walkspeed);
			var collided: boolean = Game.getInstance().level.checkCollision(nextGrid);
			if (!collided) {
				this.sprite.y -= this.walkspeed;
			}
		} else if (direction == 'left') {
			var nextGrid: any[] = this.sprite.getGridsFor(this.sprite.x - this.walkspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(nextGrid);
			if(!collided) {
				this.sprite.x -= this.walkspeed;
			}
		} else if (direction == 'right') {
			var nextGrid: any[] = this.sprite.getGridsFor(this.sprite.x + this.walkspeed, this.sprite.y);
			var collided: boolean = Game.getInstance().level.checkCollision(nextGrid);
			if(!collided) {
				this.sprite.x += this.walkspeed;
			}
		}
		this.sprite.setGrids();
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
		return this.getGridsFor(this.x, this.y);
	}
	getGridsFor(x,y) {
		return [
			Math.floor(x / Game.getInstance().level.tileWidth),
			Math.floor(y / Game.getInstance().level.tileHeight)
		]
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

	constructor(tileWidth, tileHeight, tilesX, tilesY) {
		this.doorUp = new Door(16, 4);
		this.doorLeft = new Door(6, 19);
		this.doorRight = new Door(25, 19);
		this.image = new Image();
		this.image.src = "images/lab.png";
		this.layer2 = new Image();
		this.layer2.src = "images/lab-layer-2.png";
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tilesX = tilesX;
		this.tilesY = tilesY;
		this.collision = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,1,0],
			[0,0,1,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,2,2,2,2,2,2,1,1,1,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
			[0,0,1,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,1,0],
			[0,0,1,2,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,1,0],
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
	checkCollision(grid) {
		var gridType = this.collision[grid[1]+1][grid[0]+1];
		if (gridType == 1) {
			return true;
		}
		return false;
	}
	debug() {
		for (var x = 0; x <= 31; x++) {         
			for (var y = 0; y <= 23; y++) {         
				Game.getInstance().context.fillStyle = "blue";
				Game.getInstance().context.font = "bold 16px Arial";
				Game.getInstance().context.fillText(this.collision[y][x], x*32, y*32);
				//l([x, y]);
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
	zombiepirates: ZombiePirate[] = [];

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

    public static getDeltaTime():number
    {
		return Game.getInstance().deltaTime;
    }

    start() {
        this.level = new Level(32, 32, 32, 24);
		this.player = new Player();
		this.zombiepirates.push(new ZombiePirate());
        this.controls = new Controls();

        document.addEventListener("keydown", (event) => Game.getInstance().controls.update(event));
        document.addEventListener("keyup", (event) => Game.getInstance().controls.update(event));
		this.update();
    }
    
	update = () => {
		var now=Date.now();
	    this.deltaTime=(now-this.lastDeltaUpdate)/1000;
	    if(this.deltaTime>1)this.deltaTime=0;
	    this.lastDeltaUpdate=now;
		this.player.update();

		this.level.render();
		this.player.sprite.render();

		this.zombiepirates.forEach(pirate  => {
			pirate.update();
			pirate.sprite.render();
		});

		this.level.renderLayer();
		//this.level.debug();
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