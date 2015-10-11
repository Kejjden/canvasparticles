/// <reference path="../../ref.ts" />
var Level = (function () {
    function Level(tileWidth, tileHeight, tilesX, tilesY) {
        this.doorUp = new Door(16, 4);
        this.doorLeft = new Door(6, 19);
        this.doorRight = new Door(25, 19);
        this.image = new Image();
        this.image.src = "images/lab.png";
        this.layer2 = new Image();
        this.layer2.src = "images/lab-layer-2.png";
        this.debugimage = new Image();
        this.debugimage.src = "images/grid-red.png";
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tilesX = tilesX;
        this.tilesY = tilesY;
        this.collision = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }
    Level.prototype.render = function () {
        Game.getInstance().context.drawImage(this.image, 0, 0);
        Game.getInstance().context.drawImage(this.doorUp.image, this.doorUp.state * 32, 0, 32, 32, this.doorUp.x, this.doorUp.y, 32, 32);
    };
    Level.prototype.renderLayer = function () {
        Game.getInstance().context.drawImage(this.layer2, 0, 0);
        Game.getInstance().context.drawImage(this.doorLeft.image, this.doorLeft.state * 32, 0, 32, 32, this.doorLeft.x, this.doorLeft.y, 32, 32);
        Game.getInstance().context.drawImage(this.doorRight.image, this.doorRight.state * 32, 0, 32, 32, this.doorRight.x, this.doorRight.y, 32, 32);
    };
    Level.prototype.checkCollision = function (x, y, grid) {
        var _this = this;
        var positions = [
            [x, y],
            [x + 31, y],
            [x, y + 31],
            [x + 31, y + 31],
        ];
        var ret = false;
        positions.forEach(function (position) {
            var grid = Game.getGridsFor(position[0], position[1]);
            var gridType = _this.collision[grid.y][grid.x];
            if (gridType == 1) {
                ret = true;
            }
        });
        return ret;
    };
    Level.prototype.checkEntityCollision = function (x, y) {
        var positions = [
            [x, y],
            [x + 31, y + 31]
        ];
        //var ret: boolean = false;
        Game.getInstance().entities.forEach(function (entity) {
            if (entity.collidable) {
                var entityPositions = [
                    [entity.sprite.x, entity.sprite.y],
                    [entity.sprite.x + entity.boundryBox[0], entity.sprite.y + entity.boundryBox[1]]
                ];
                Game.getInstance().context.beginPath();
                Game.getInstance().context.rect(entity.sprite.x, entity.sprite.y, entity.boundryBox[0], entity.boundryBox[1]);
                Game.getInstance().context.fillStyle = 'yellow';
                Game.getInstance().context.fill();
                Game.getInstance().context.beginPath();
                Game.getInstance().context.rect(positions[0][0], positions[0][1], 31, 31);
                Game.getInstance().context.fillStyle = 'red';
                Game.getInstance().context.fill();
                if (Game.getInstance().level.checkCollisionOverlap(positions[0], positions[1], entityPositions[0], entityPositions[1])) {
                    console.log('COLLISION TO ENTOTY');
                    return true;
                }
            }
        });
        return false;
    };
    Level.prototype.checkCollisionOverlap = function (l1, r1, l2, r2) {
        var ret = true;
        if (r1[0] < l2[0] || l1[0] > r2[0] || r1[1] < l2[1] || l1[1] > r2[1]) {
            ret = false;
        }
        return ret;
    };
    Level.prototype.debug = function () {
        for (var x = 0; x <= 31; x++) {
            for (var y = 0; y <= 23; y++) {
                if (this.collision[y][x] != 0) {
                    Game.getInstance().context.drawImage(this.debugimage, x * 32, y * 32);
                }
            }
        }
    };
    return Level;
})();
