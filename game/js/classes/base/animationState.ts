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

		return this.currentFrame;
	}
}