/// <reference path="../ref.ts" />
class Pathfinder {
	mode: string = "stupid";

	getPath(currentGrid:any, targetGrid:any) {
		var leftOfTarget: boolean = false;
		var aboveTarget: boolean = false;
		var onLineX: boolean = false;
		var onLineY: boolean = false;
		var onTarget: boolean = false;
		var firstX: boolean = false;
		var path: any[] = []
		//l('Current');
		//l(currentGrid);
		//l('Target');
		//l(targetGrid);
		//l('Path');
		// Start with X
		if (currentGrid[0] < targetGrid[0]) { leftOfTarget = true; }
		if (currentGrid[0] == targetGrid[0]) { onLineX = true; }
		// Now Y
		if (currentGrid[1] < targetGrid[1]) { aboveTarget = true; }
		if (currentGrid[1] == targetGrid[1]) { onLineY = true; }
		
		if (currentGrid[0] == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] -1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] -1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] +1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] +1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] - 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}
		if (currentGrid[0] + 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}

		if(onTarget) {
			path.push([currentGrid[0], currentGrid[1]]);
			return path;
		}

		// Random the first way
		firstX = !!Math.floor(Math.random() * 2);
		firstX = true;

		if(leftOfTarget && aboveTarget) {
			l('leftOfTarget && aboveTarget');
			if(firstX) {
				var nextGrid: any[] = [currentGrid[0] + 1, currentGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0] + 1, nextGrid[1]];
					} else {
						path.push([nextGrid[0] - 1, nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1]+1];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] + 1];
					} else {
						path.push([nextGrid[0], nextGrid[1]-1]);
					}
				}
			} else {
				var nextGrid: any[] = [currentGrid[0], currentGrid[1]+1];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] + 1];
					} else {
						path.push([nextGrid[0], nextGrid[1] - 1]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1] - 1];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] - 1];
					} else {
						path.push([nextGrid[0], nextGrid[1] + 1]);
					}
				}
			}
		} else if (onLineX && aboveTarget) {
			l('onLineX && aboveTarget');
			var nextGrid: any[] = [currentGrid[0], currentGrid[1]+1];
			for (var yLoop = 1; yLoop <= 3; yLoop++) {
				if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
					path.push([nextGrid[0], nextGrid[1]]);
					nextGrid = [nextGrid[0], nextGrid[1] + 1];
				} else {
					path.push([nextGrid[0], nextGrid[1]]);
				}
			}
			
		} else if (onLineX  && !aboveTarget) {
			l('onLineX && !aboveTarget');
			var nextGrid: any[] = [currentGrid[0], currentGrid[1]-1];
			for (var yLoop = 1; yLoop <= 3; yLoop++) {
				if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
					path.push([nextGrid[0], nextGrid[1]]);
					nextGrid = [nextGrid[0], nextGrid[1] - 1];
				} else {
					path.push([nextGrid[0], nextGrid[1]+1]);
				}
			}
		} else if (!leftOfTarget && onLineX) {
			l('leftOfTarget && onLineX');

			var nextGrid: any[] = [currentGrid[0], currentGrid[1]-1];
			for (var yLoop = 1; yLoop <= 3; yLoop++) {
				if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
					path.push([nextGrid[0], nextGrid[1]]);
					nextGrid = [nextGrid[0], nextGrid[1] + 1];
				} else {
					path.push([nextGrid[0], nextGrid[1]]);
				}
			}
	
		} else if (leftOfTarget && onLineX) {
			l('leftOfTarget && onLineX');
			var nextGrid: any[] = [currentGrid[0], currentGrid[1]+1];
			for (var yLoop = 1; yLoop <= 3; yLoop++) {
				if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
					path.push([nextGrid[0], nextGrid[1]]);
					nextGrid = [nextGrid[0], nextGrid[1] + 1];
				} else {
					path.push([nextGrid[0], nextGrid[1] - 1]);
				}
			}
		} else if (leftOfTarget && !aboveTarget) {
			l('leftOfTarget && !aboveTarget');
			if(firstX) {
				var nextGrid: any[] = [currentGrid[0] + 1, currentGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0] + 1, nextGrid[1]];
					} else {
						path.push([nextGrid[0] - 1, nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1] - 1];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] - 1];
					} else {
						path.push([nextGrid[0], nextGrid[1]]);
					}
				}
			} else {
				var nextGrid: any[] = [currentGrid[0], currentGrid[1]-1];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] - 1];
					} else {
						path.push([nextGrid[0], nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0] + 2][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0] + 1, nextGrid[1]];
					} else {
						path.push([nextGrid[0] - 1, nextGrid[1]]);
					}
				}
			}
		}  else if (!leftOfTarget && aboveTarget) {
			l('!leftOfTarget && aboveTarget');
			if(firstX) {
				var nextGrid: any[] = [currentGrid[0] - 1, currentGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0] - 1, nextGrid[1]];
					} else {
						path.push([nextGrid[0] + 1, nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1]];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] + 1];
					} else {
						path.push([nextGrid[0], nextGrid[1]]);
					}
				}
			} else {
				var nextGrid: any[] = [currentGrid[0], currentGrid[1]+1];
				for (var yLoop = 1; yLoop <= 3; yLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0], nextGrid[1] + 1];
					} else {
						path.push([nextGrid[0], nextGrid[1]]);
					}
				}
				nextGrid = [nextGrid[0], nextGrid[1]];
				for (var xLoop = 1; xLoop <= 3; xLoop++) {
					if(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
						path.push([nextGrid[0], nextGrid[1]]);
						nextGrid = [nextGrid[0] - 1, nextGrid[1]];
					} else {
						path.push([nextGrid[0] + 1, nextGrid[1]]);
					}
				}
			}
			
		} else if (!leftOfTarget && !aboveTarget) {
			l('!leftOfTarget && !aboveTarget');
			
		}

		return path;
	}
}