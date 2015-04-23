class object {
	ctx: any;
	canvas: any;
	x:number;
	y:number;
	constructor(ctx:any, canvas:any) {
		this.ctx = ctx;
		this.canvas = canvas;
	}
}

class SimpleParticle {
	x:number;
	y:number;
	size: number;
	speed: number;
	color_r: number = 255;
	color_g: number = 10;
	color_b: number = 10;
	gravity: number;
	direction: number;
	energy: number;
	alive: boolean = true;
	alpha: number = 1;
	constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
		this.size = 20;
		this.speed = -30 + Math.random() * 10;
		this.direction = -3 + Math.random() * 6;
		this.gravity = 0.92;
		this.energy = 20;
	}

	GetColor() {
		return "rgba(" + this.color_r + "," + this.color_g + "," + this.color_b + ", " + this.alpha + ")";
	}

	Update() {
		if(this.alive) {
			this.x += this.direction;
			this.y += this.speed;
			this.speed += this.gravity;
			if(this.energy <= 0) {
				this.energy = 0;
			} else {
				this.energy -= 0.25;
			}
			// Energy based size

			this.color_g += 4;
			this.alpha -= 0.01;
			if(this.alpha < 0) {
				this.alpha = 0;
			}
			this.size = this.energy;

			if(this.speed <= -50) {
				this.alive = false;
			}
		}
	}

}

class PSystem extends object {
	started:boolean = false;
	tracking:boolean = false;
	private particles: Array<SimpleParticle> = new Array<SimpleParticle>();
	constructor(ctx:any, canvas:any) {
		super(ctx, canvas);
	}
	public Start() {
		// Setup
		this.Render();
	}

	public Render() {
		this.particles.push(new SimpleParticle(this.x, this.y));
		this.particles.push(new SimpleParticle(this.x, this.y));
			
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		for (var i in this.particles) {	
			this.particles[i].Update();
			this.ctx.beginPath();
			this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI, false);
			this.ctx.fillStyle = this.particles[i].GetColor();
			this.ctx.fill();
		}
	    requestAnimationFrame(() => this.Render());
	}

	public SetPosition(event) {
		if(this.tracking) {
			var x = event.x;
			var y = event.y;

			x -= this.canvas.offsetLeft;
			y -= this.canvas.offsetTop;
			this.x = x;
			this.y = y;
			if(!this.started) {
				this.started = true;
				this.Start();
			}
		}
	}
	public SetTrack(track:any) {
		if(track != false) {
			this.tracking = true;
			this.SetPosition(track);
		} else {
			this.tracking = false;
		}
	}
}

class FireParticle {
	x:number;
	y:number;
	size: number;
	speed: number;
	color_r: number = 255;
	color_g: number = 10;
	color_b: number = 10;
	direction: number;
	directionSteps: number;
	targetDirection: number;
	deltaDirection: number;
	energy: number;
	alive: boolean = true;
	alpha: number = 1;
	changeDirection: boolean = false;
	constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
		this.size = 20;
		this.speed = -10 + Math.random() * 2;
		this.direction = -3 + Math.random() * 6;
		this.energy = 20;
	}

	GetColor() {
		return "rgba(" + this.color_r + "," + this.color_g + "," + this.color_b + ", " + this.alpha + ")";
	}

	Update() {
		if(this.alive) {
			if(Math.floor(Math.random() * 100) == 99) {
				this.changeDirection = true;
				this.directionSteps = 50;
				this.targetDirection = this.direction * -1;
				this.deltaDirection = this.targetDirection / 50;
			}

			if(this.changeDirection) {
				this.direction += this.deltaDirection;
				this.directionSteps--;
				if(this.directionSteps == 0) {
					this.changeDirection = false;
				}

			}
			this.x += this.direction;
			this.y += this.speed;
			if(this.energy <= 0) {
				this.energy = 0;
			} else {
				this.energy -= 0.25;
			}
			// Energy based size

			this.color_g += 4;
			if(this.color_g > 255) {
				this.color_g = 255;
			}
			this.alpha -= 0.01;
			if(this.alpha <= 0) {
				this.alpha = 0;
				this.alive = false;
			}
			this.size = this.energy;
		}
	}
}

class FSystem extends object {
	started:boolean = false;
	tracking:boolean = false;
	private particles: Array<FireParticle> = new Array<FireParticle>();
	constructor(ctx:any, canvas:any) {
		super(ctx, canvas);
	}
	public Start() {
		// Setup
		this.Render();
	}

	public Render() {
		this.particles.push(new FireParticle(this.x, this.y));
		this.particles.push(new FireParticle(this.x, this.y));
			
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		for (var i in this.particles) {	
			this.particles[i].Update();
			this.ctx.beginPath();
			this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI, false);
			this.ctx.fillStyle = this.particles[i].GetColor();
			this.ctx.fill();
		}
	    requestAnimationFrame(() => this.Render());
	}

	public SetPosition(event) {
		if(this.tracking) {
			var x = event.x;
			var y = event.y;

			x -= this.canvas.offsetLeft;
			y -= this.canvas.offsetTop;
			this.x = x;
			this.y = y;
			if(!this.started) {
				this.started = true;
				this.Start();
			}
		}
	}
	public SetTrack(track:any) {
		if(track != false) {
			this.tracking = true;
			this.SetPosition(track);
		} else {
			this.tracking = false;
		}
	}
}


function init() {
    var canv = document.createElement("canvas");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    document.body.appendChild(canv);
    var ctx = canv.getContext("2d");
    var particles;
    canv.addEventListener("mousedown", () => particles.SetTrack(event), false);
    canv.addEventListener("mousemove", () => particles.SetPosition(event), false);
    canv.addEventListener("mouseup", () => particles.SetTrack(false), false);

    particles = new PSystem(ctx, canv);
    
/*    canv.addEventListener("mousedown", () => particles.SetTrack(event), false);
        canv.addEventListener("mousemove", () => particles.SetPosition(event), false);
        canv.addEventListener("mouseup", () => particles.SetTrack(false), false);

        particles = new FSystem(ctx, canv)
*/
}

init();