/// <reference path="../ref.ts" />
var Pathfinder = (function () {
    function Pathfinder() {
        this.mode = "stupid";
    }
    Pathfinder.prototype.getPath = function (currentGrid, targetGrid) {
        var leftOfTarget = false;
        var aboveTarget = false;
        var onLineX = false;
        var onLineY = false;
        var onTarget = false;
        var firstX = false;
        var path = [];
        var xModifier = 0;
        var yModifier = 0;
        //l('Current');
        //l(currentGrid);
        //l('Target');
        //l(targetGrid);
        //l('Path');
        // Start with X
        if (currentGrid[0] < targetGrid[0]) {
            leftOfTarget = true;
        }
        if (currentGrid[0] == targetGrid[0]) {
            onLineX = true;
        }
        // Now Y
        if (currentGrid[1] < targetGrid[1]) {
            aboveTarget = true;
        }
        if (currentGrid[1] == targetGrid[1]) {
            onLineY = true;
        }
        /*
                if (currentGrid[0] == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] -1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] -1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] +1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] +1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] - 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}
                if (currentGrid[0] + 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) { onTarget = true;}
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
            var nextGrid = [currentGrid[0], currentGrid[1]];
            for (var xLoop = 1; xLoop <= 10; xLoop++) {
                l(Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]]);
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0] + xModifier, nextGrid[1]];
                }
                else {
                    path.push([nextGrid[0] - xModifier, nextGrid[1]]);
                }
            }
        }
        else {
            var nextGrid = [currentGrid[0], currentGrid[1] + yModifier];
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] + yModifier];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1] - yModifier]);
                }
            }
            //nextGrid = [nextGrid[0] + xModifier, nextGrid[1]];
            for (var xLoop = 1; xLoop <= 3; xLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] - xModifier];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1] + xModifier]);
                }
            }
        }
        l(path);
        return path;
    };
    return Pathfinder;
})();
