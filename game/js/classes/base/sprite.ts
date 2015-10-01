/// <reference path="../../ref.ts" />

class Sprite {
	context: any;
	width: number;
	height: number;
	image: string;
	states: AnimationState[] = [];
	currentState: AnimationState;
	tick: number = 0;
	frameSpeed: number = 10;
	x: number = 0;
	y: number = 0;
	loop: number = 0;
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
			if (state.getName() == name) {
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
				this.loop = 0;
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
        if(this.tick%this.frameSpeed == 0) {
			var nextFrame:number = this.currentState.nextFrame();

			if(nextFrame == 0) {
				this.loop++;
			}

			if(this.pushQueue.length) {
				this.pushQueue.shift();
			}
			this.tick = 0;
        }
        this.tick++;
    }
}