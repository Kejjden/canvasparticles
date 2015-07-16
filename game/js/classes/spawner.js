/// <reference path="../ref.ts" />
var Spawner = (function () {
    function Spawner() {
        var _this = this;
        this.counter = 0;
        this.newWave = function () {
            _this.activeDoor = _this.getRandomDoor();
            console.log("door open!");
            _this.activeDoor.state = 1;
            _this.counter++;
            _this.zombieCounter = Math.floor(Math.exp(_this.counter) * 0.5);
            console.log("spawncount: " + _this.zombieCounter);
            _this.nextZombie();
        };
        this.nextZombie = function () {
            console.log("zombies remaining: " + _this.zombieCounter);
            _this.cancel();
            var pirate = new ZombiePirate(_this.activeDoor.x, _this.activeDoor.y);
            _this.game.zombiepirates.push(pirate);
            _this.zombieCounter--;
            if (_this.zombieCounter == 0) {
                _this.timer = new Timer(1000, _this.closeDoor);
                _this.timer.resume();
            }
            else {
                _this.timer = new Timer(1000, _this.nextZombie);
                _this.timer.resume();
            }
        };
        this.closeDoor = function () {
            console.log("closing door");
            _this.activeDoor.state = 0;
            _this.cancel();
            _this.activeDoor = null;
            if (_this.counter < 5) {
                _this.nextWave();
            }
            else {
                console.log("you win111!");
            }
        };
        this.nextWave();
        this.game = Game.getInstance();
        this.level = Game.getInstance().level;
        this.doors = [this.level.doorUp, this.level.doorLeft, this.level.doorRight];
    }
    Spawner.prototype.getRandomDoor = function () {
        return this.doors[Math.floor(Math.random() * this.doors.length)];
    };
    Spawner.prototype.update = function () {
    };
    Spawner.prototype.pause = function () {
        if (this.timer) {
            this.timer.pause();
        }
    };
    Spawner.prototype.resume = function () {
        if (this.timer) {
            this.timer.resume();
        }
    };
    Spawner.prototype.cancel = function () {
        if (this.timer) {
            this.timer.cancel();
            this.timer = null;
        }
    };
    Spawner.prototype.nextWave = function () {
        if (this.timer) {
            console.log("oh poop");
            return;
        }
        var delay = Math.max(2000, 1000 + this.counter * 5000);
        console.log("new wave in: " + delay);
        this.timer = new Timer(delay, this.newWave);
        this.timer.resume();
    };
    return Spawner;
})();
