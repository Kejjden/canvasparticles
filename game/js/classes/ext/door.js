var Door = (function () {
    function Door(x, y) {
        this.state = 0;
        this.x = 0;
        this.y = 0;
        this.x = x * 32;
        this.y = y * 32;
        this.image = new Image();
        this.image.src = "images/door.png";
    }
    return Door;
})();
