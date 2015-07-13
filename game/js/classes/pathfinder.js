/// <reference path="../ref.ts" />
var Pathfinder = (function () {
    function Pathfinder() {
        this.mode = "stupid";
        this.debugimage = new Image();
        this.debugimage.src = "images/grid-green.png";
        this.collision = Game.getInstance().level.collision;
    }
    Pathfinder.prototype.next = function () {
        this.pathIndex++;
        if (this.path.length == this.pathIndex) {
            return false;
        }
        var grid = new Grid(this.path[this.pathIndex][0], this.path[this.pathIndex][1]);
        return grid;
    };
    Pathfinder.prototype.getCurrent = function () {
        return new Grid(this.path[this.pathIndex][0], this.path[this.pathIndex][1]);
    };
    Pathfinder.prototype.getPath = function (currentGrid, targetGrid) {
        this.pf = new PF.Grid(32, 24);
        for (var x = 0; x <= 31; x++) {
            for (var y = 0; y <= 23; y++) {
                if (this.collision[y][x] == 1) {
                    this.pf.setWalkableAt(x, y, false);
                }
            }
        }
        var finder = new PF.AStarFinder();
        this.path = finder.findPath(currentGrid.x, currentGrid.y, targetGrid.x, targetGrid.y, this.pf);
        this.pathSize = this.path.length;
        this.pathIndex = 0;
        return this.path;
    };
    Pathfinder.prototype.render = function () {
        var _this = this;
        this.path.forEach(function (pathgrid) {
            Game.getInstance().context.drawImage(_this.debugimage, pathgrid[0] * 32, pathgrid[1] * 32);
        });
    };
    return Pathfinder;
})();
