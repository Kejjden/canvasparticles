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