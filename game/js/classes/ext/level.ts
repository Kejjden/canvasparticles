/// <reference path="../../ref.ts" />

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