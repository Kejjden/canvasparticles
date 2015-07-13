/// <reference path="../ref.ts" />
class Pathfinder {
	mode: string = "stupid";
	debugimage: any;
	path: any[];
	pf: any;
	collision: any[][];
	pathSize: number;
	pathIndex: number;

	constructor() {
		this.debugimage = new Image();
		this.debugimage.src = "images/grid-green.png";
		this.collision = Game.getInstance().level.collision;

	}
	next(): any {
		this.pathIndex++;
		if(this.path.length == this.pathIndex) {
			return false;
		} 
		var grid: Grid = new Grid(this.path[this.pathIndex][0], this.path[this.pathIndex][1]);
		return grid;
		
	}
	getCurrent() {
		return new Grid(this.path[this.pathIndex][0], this.path[this.pathIndex][1]);
	}
	getPath(currentGrid:any, targetGrid:any) {
		this.pf = new PF.Grid(32,24);
		for (var x = 0; x <= 31; x++) {         
			for (var y = 0; y <= 23; y++) {         
				if(this.collision[y][x] == 1) {
					this.pf.setWalkableAt(x, y, false);
				}
        	}  
        }  
		var finder = new PF.AStarFinder();
		this.path = finder.findPath(currentGrid.x, currentGrid.y, targetGrid.x, targetGrid.y, this.pf);

		this.pathSize = this.path.length;
		this.pathIndex = 0;

		return this.path;
	}

	render() {
		this.path.forEach(pathgrid => { 

			Game.getInstance().context.drawImage(
				this.debugimage,
				pathgrid[0] * 32,
				pathgrid[1] * 32
				
		);
		});
	}
}