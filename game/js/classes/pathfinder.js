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
        if (currentGrid[0] == targetGrid[0] && currentGrid[1] == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] - 1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] - 1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] + 1 == targetGrid[0] && currentGrid[1] + 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] + 1 == targetGrid[0] && currentGrid[1] - 1 == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] - 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) {
            onTarget = true;
        }
        if (currentGrid[0] + 1 == targetGrid[0] && currentGrid[1] == targetGrid[1]) {
            onTarget = true;
        }
        if (onTarget) {
            path.push([currentGrid[0], currentGrid[1]]);
            return path;
        }
        // Random the first way
        firstX = !!Math.floor(Math.random() * 2);
        firstX = true;
        if (leftOfTarget && aboveTarget) {
            l('leftOfTarget && aboveTarget');
            if (firstX) {
                var nextGrid = [currentGrid[0] + 1, currentGrid[1]];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] + 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] - 1, nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1]];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] + 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
            }
            else {
                var nextGrid = [currentGrid[0], currentGrid[1] + 1];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1] - 2] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] + 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1] - 1];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0] + 2][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] + 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] - 1, nextGrid[1]]);
                    }
                }
            }
        }
        else if (onLineX && aboveTarget) {
            l('onLineX && aboveTarget');
            var nextGrid = [currentGrid[0], currentGrid[1] + 1];
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1] - 2] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] + 1];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1]]);
                }
            }
        }
        else if (onLineX && !aboveTarget) {
            l('onLineX && !aboveTarget');
            var nextGrid = [currentGrid[0], currentGrid[1] - 1];
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1] - 2] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] - 1];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1]]);
                }
            }
        }
        else if (!leftOfTarget && onLineX) {
            l('leftOfTarget && onLineX');
            var nextGrid = [currentGrid[0], currentGrid[1] - 1];
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] + 1];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1]]);
                }
            }
        }
        else if (leftOfTarget && onLineX) {
            l('leftOfTarget && onLineX');
            var nextGrid = [currentGrid[0], currentGrid[1] + 1];
            for (var yLoop = 1; yLoop <= 3; yLoop++) {
                if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                    path.push([nextGrid[0], nextGrid[1]]);
                    nextGrid = [nextGrid[0], nextGrid[1] - 1];
                }
                else {
                    path.push([nextGrid[0], nextGrid[1]]);
                }
            }
        }
        else if (leftOfTarget && !aboveTarget) {
            l('leftOfTarget && !aboveTarget');
            if (firstX) {
                var nextGrid = [currentGrid[0] + 1, currentGrid[1]];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] + 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] - 1, nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1] - 1];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] - 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
            }
            else {
                var nextGrid = [currentGrid[0], currentGrid[1] - 1];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] - 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1]];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0] + 2][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] + 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] - 1, nextGrid[1]]);
                    }
                }
            }
        }
        else if (!leftOfTarget && aboveTarget) {
            l('!leftOfTarget && aboveTarget');
            if (firstX) {
                var nextGrid = [currentGrid[0] - 1, currentGrid[1]];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] - 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] + 1, nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1]];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] + 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
            }
            else {
                var nextGrid = [currentGrid[0], currentGrid[1] + 1];
                for (var yLoop = 1; yLoop <= 3; yLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0], nextGrid[1] + 1];
                    }
                    else {
                        path.push([nextGrid[0], nextGrid[1]]);
                    }
                }
                nextGrid = [nextGrid[0], nextGrid[1]];
                for (var xLoop = 1; xLoop <= 3; xLoop++) {
                    if (Game.getInstance().level.collision[nextGrid[0]][nextGrid[1]] == 2) {
                        path.push([nextGrid[0], nextGrid[1]]);
                        nextGrid = [nextGrid[0] - 1, nextGrid[1]];
                    }
                    else {
                        path.push([nextGrid[0] + 1, nextGrid[1]]);
                    }
                }
            }
        }
        else if (!leftOfTarget && !aboveTarget) {
            l('!leftOfTarget && !aboveTarget');
        }
        return path;
    };
    return Pathfinder;
})();
