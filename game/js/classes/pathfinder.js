/// <reference path="../ref.ts" />
var Pathfinder = (function () {
    function Pathfinder() {
        this.mode = "stupid";
        this.debugimage = new Image();
        this.debugimage.src = "images/grid-green.png";
    }
    Pathfinder.prototype.getPath = function (currentGrid, targetGrid) {
        var leftOfTarget = false;
        var aboveTarget = false;
        var onLineX = false;
        var onLineY = false;
        var onTarget = false;
        var firstX = false;
        var xModifier = 0;
        var yModifier = 0;
        this.path = [];
        //l('Current');
        //l(currentGrid);
        //l('Target');
        //l(targetGrid);
        //l('Path');
        // Start with X
        if (currentGrid.x < targetGrid.x) {
            leftOfTarget = true;
        }
        if (currentGrid.x == targetGrid.x) {
            onLineX = true;
        }
        // Now Y
        if (currentGrid.y < targetGrid.y) {
            aboveTarget = true;
        }
        if (currentGrid.y == targetGrid.y) {
            onLineY = true;
        }
        /*
                if (currentGrid.x == targetGrid.x && currentGrid.y == targetGrid.y) { onTarget = true;}
                if (currentGrid.x == targetGrid.x && currentGrid.y + 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x == targetGrid.x && currentGrid.y - 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x -1 == targetGrid.x && currentGrid.y - 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x -1 == targetGrid.x && currentGrid.y + 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x +1 == targetGrid.x && currentGrid.y + 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x +1 == targetGrid.x && currentGrid.y - 1 == targetGrid.y) { onTarget = true;}
                if (currentGrid.x - 1 == targetGrid.x && currentGrid.y == targetGrid.y) { onTarget = true;}
                if (currentGrid.x + 1 == targetGrid.x && currentGrid.y == targetGrid.y) { onTarget = true;}
        */
        if (onTarget) {
            l('onTarget');
        }
        // Random the first way
        firstX = !!Math.floor(Math.random() * 2);
        firstX = true;
        if (leftOfTarget && aboveTarget) {
            l('leftOfTarget && aboveTarget');
            xModifier = 1;
            yModifier = 1;
        }
        else if (leftOfTarget && !aboveTarget) {
            l('leftOfTarget && !aboveTarget');
            xModifier = 1;
            yModifier = -1;
        }
        else if (!leftOfTarget && aboveTarget) {
            l('!leftOfTarget && aboveTarget');
            xModifier = -1;
            yModifier = 1;
        }
        else if (!leftOfTarget && !aboveTarget) {
            l('!leftOfTarget && !aboveTarget');
            xModifier = -1;
            yModifier = -1;
        }
        if (firstX) {
            var nextGrid = new Grid(currentGrid.x, currentGrid.y);
            for (var xLoop = 1; xLoop <= 10; xLoop++) {
                l(Game.getInstance().level.collision[nextGrid.x][nextGrid.y]);
                if (Game.getInstance().level.collision[nextGrid.x][nextGrid.y] == 2) {
                    this.path.push(new Grid(nextGrid.x, nextGrid.y));
                    nextGrid.setXY(nextGrid.x + xModifier, nextGrid.y);
                }
                else {
                    this.path.push(new Grid(nextGrid.x - xModifier, nextGrid.y));
                }
            }
            nextGrid.setXY(nextGrid.x - xModifier, nextGrid.y + yModifier);
            for (var yLoop = 1; yLoop <= 10; yLoop++) {
                l(Game.getInstance().level.collision[nextGrid.x][nextGrid.y]);
                if (Game.getInstance().level.collision[nextGrid.x][nextGrid.y + 1] == 2) {
                    this.path.push(new Grid(nextGrid.x, nextGrid.y));
                    nextGrid.setXY(nextGrid.x, nextGrid.y + yModifier);
                }
                else {
                    this.path.push(new Grid(nextGrid.x, nextGrid.y - yModifier));
                }
            }
        }
        else {
            var nextGrid = new Grid(currentGrid.x, currentGrid.y);
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid.x][nextGrid.y] == 2) {
                    this.path.push([nextGrid.x, nextGrid.y]);
                    nextGrid.setXY(nextGrid.x, nextGrid.y + yModifier);
                }
                else {
                    this.path.push([nextGrid.x, nextGrid.y - yModifier]);
                }
            }
            //nextGrid = [nextGrid.x + xModifier, nextGrid.y];
            for (var xLoop = 1; xLoop <= 3; xLoop++) {
                if (Game.getInstance().level.collision[nextGrid.x][nextGrid.y] == 2) {
                    this.path.push(nextGrid);
                    nextGrid.setXY(nextGrid.x + xModifier, nextGrid.y);
                }
                else {
                    this.path.push(new Grid(nextGrid.x, nextGrid.y + xModifier));
                }
            }
        }
        return this.path;
    };
    Pathfinder.prototype.render = function () {
        var _this = this;
        this.path.forEach(function (pathgrid) {
            Game.getInstance().context.drawImage(_this.debugimage, pathgrid.x * 32, pathgrid.y * 32);
        });
    };
    return Pathfinder;
})();
