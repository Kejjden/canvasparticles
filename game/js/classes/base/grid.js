var Grid = (function () {
    function Grid(x, y) {
        this.setXY(x, y);
    }
    Grid.prototype.setXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Grid;
})();
