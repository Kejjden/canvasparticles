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

	update(event) {
		// Movement
		if(event.key == "ArrowDown" && event.type == 'keydown' && Game.getInstance().player.sprite.currentState.name != 'walkDown') {
			Game.getInstance().player.sprite.setState('walkDown');
		} else if(event.key == "ArrowUp" && event.type == 'keydown' && Game.getInstance().player.sprite.currentState.name != 'walkUp') {
			Game.getInstance().player.sprite.setState('walkUp');
		} else if(event.key == "ArrowLeft" && event.type == 'keydown' && Game.getInstance().player.sprite.currentState.name != 'walkLeft') {
			Game.getInstance().player.sprite.setState('walkLeft');
		} else if(event.key == "ArrowRight" && event.type == 'keydown' && Game.getInstance().player.sprite.currentState.name != 'walkRight') {
			Game.getInstance().player.sprite.setState('walkRight');
		} // Keyup
		else if(event.key == "ArrowRight" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkRight') {
			Game.getInstance().player.sprite.setState('standRight');
		} else if(event.key == "ArrowLeft" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkLeft') {
			Game.getInstance().player.sprite.setState('standLeft');
		} else if(event.key == "ArrowUp" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkUp') {
			Game.getInstance().player.sprite.setState('standUp');
		} else if(event.key == "ArrowDown" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkDown') {
			Game.getInstance().player.sprite.setState('standDown');
		}


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

	constructor(tileWidth, tileHeight, tilesX, tilesY) {
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
	}
	renderLayer() {
		Game.getInstance().context.drawImage(
			this.layer2,
			0,
			0
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
        this.controls = new Controls();
        document.addEventListener("keydown", this.controls.update);
        document.addEventListener("keyup", this.controls.update);
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