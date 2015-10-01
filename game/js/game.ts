/// <reference path="ref.ts" />


declare var PF;

class Game {
	context: any;
	static instance: Game;
	player: Player;
	lastDeltaUpdate: number;
	deltaTime: number;
	controls: Controls;
	level: Level;
	entities: any[] = [];
	spawner: Spawner;
	entityIndex: number = 0;

	constructor(context) {
		this.context = context;
        if(Game.instance){
            throw new Error("Error: Instantiation failed: Use Game.getInstance() instead of new.");
        }
        Game.instance = this;
        this.start();
    }

    public static getInstance():Game {
        return Game.instance;
    }
	public static getGridsFor(x,y) {
		return new Grid(Math.floor(x / Game.getInstance().level.tileWidth), Math.floor(y / Game.getInstance().level.tileHeight));
	}
    public static getDeltaTime():number {
		return Game.getInstance().deltaTime;
    }

    getEntityIndex() {
		return this.entityIndex++;
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

		this.entities.forEach(entity  => {
			entity.update();
			entity.render();
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