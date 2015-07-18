/// <reference path="../ref.ts" />
class Spawner {
    timer: Timer;
    level: Level;
    game: Game;
    counter: number = 0;
    zombieCounter: number;
    activeDoor: Door;
    doors: Door[];

    constructor() {
        this.nextWave();
        this.game = Game.getInstance();
        this.level = Game.getInstance().level;
        this.doors = [this.level.doorUp, this.level.doorLeft, this.level.doorRight];
    }

    getRandomDoor() {
        return this.doors[Math.floor(Math.random() * this.doors.length)];
    }

    update() {
    }

    pause() {
        if(this.timer) {
            this.timer.pause();
        }
    }

    resume() {
        if(this.timer) {
            this.timer.resume();
        }
    }

    cancel() {
        if(this.timer) {
            this.timer.cancel();
            this.timer = null;
        }
    }

    nextWave() {
        if(this.timer) {
            l("oh poop");
            return;
        }

        var delay = Math.max(2000, 1000 + this.counter * 5000);
        l("new wave in: " + delay);
        this.timer = new Timer(delay, this.newWave);
        this.timer.resume();
    }

    newWave = () => {
        this.activeDoor = this.getRandomDoor();
        l("door open!");
        this.activeDoor.state = 1;
        this.counter++;
        this.zombieCounter = Math.floor(Math.exp(this.counter) * 0.5);
        l("spawncount: " + this.zombieCounter);
        this.nextZombie();
    }

    nextZombie = () => {
        l("zombies remaining: " + this.zombieCounter);
        this.cancel();
        var pirate = new ZombiePirate(this.activeDoor.x, this.activeDoor.y);
        this.game.entities.push(pirate);
        this.zombieCounter--;
        if(this.zombieCounter == 0) {
            this.timer = new Timer(1000, this.closeDoor);
            this.timer.resume();
        } else {
            this.timer = new Timer(1000, this.nextZombie);
            this.timer.resume();
        }
    }

    closeDoor = () => {
        l("closing door");
        this.activeDoor.state = 0;
        this.cancel();
        this.activeDoor = null;
        if(this.counter < 2) {
            this.nextWave();
        } else {
            l("you win111!");
        }
    }
}