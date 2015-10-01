/// <reference path="../../ref.ts" />
var Controls = (function () {
    function Controls() {
        this.UpPressed = false;
        this.LeftPressed = false;
        this.DownPressed = false;
        this.RightPressed = false;
    }
    Controls.prototype.update = function (event) {
        this.updatePressed(event);
        this.checkForState(event);
        // Keyup
        if (event.key == "ArrowRight" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkRight') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standRight');
            }
        }
        else if (event.key == "ArrowLeft" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkLeft') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standLeft');
            }
        }
        else if (event.key == "ArrowUp" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkUp') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standUp');
            }
        }
        else if (event.key == "ArrowDown" && event.type == 'keyup' && Game.getInstance().player.sprite.currentState.name == 'walkDown') {
            if (!this.checkForState(event)) {
                Game.getInstance().player.sprite.setState('standDown');
            }
        }
        // Basic Attack
        if (event.key == " " && event.type == 'keyup') {
            Game.getInstance().player.attack();
        }
    };
    Controls.prototype.updatePressed = function (event) {
        if (event.key == "ArrowDown" && event.type == 'keyup') {
            this.DownPressed = false;
        }
        if (event.key == "ArrowUp" && event.type == 'keyup') {
            this.UpPressed = false;
        }
        if (event.key == "ArrowLeft" && event.type == 'keyup') {
            this.LeftPressed = false;
        }
        if (event.key == "ArrowLeft" && event.type == 'keyup') {
            this.LeftPressed = false;
        }
        if (event.key == "ArrowRight" && event.type == 'keyup') {
            this.RightPressed = false;
        }
        if (event.key == "ArrowDown" && event.type == 'keydown') {
            this.DownPressed = true;
        }
        if (event.key == "ArrowUp" && event.type == 'keydown') {
            this.UpPressed = true;
        }
        if (event.key == "ArrowLeft" && event.type == 'keydown') {
            this.LeftPressed = true;
        }
        if (event.key == "ArrowLeft" && event.type == 'keydown') {
            this.LeftPressed = true;
        }
        if (event.key == "ArrowRight" && event.type == 'keydown') {
            this.RightPressed = true;
        }
    };
    Controls.prototype.checkForState = function (event) {
        // Movement
        if (this.DownPressed && Game.getInstance().player.sprite.currentState.name != 'walkDown') {
            Game.getInstance().player.sprite.setState('walkDown');
            return true;
        }
        else if (this.UpPressed && Game.getInstance().player.sprite.currentState.name != 'walkUp') {
            Game.getInstance().player.sprite.setState('walkUp');
            return true;
        }
        else if (this.LeftPressed && Game.getInstance().player.sprite.currentState.name != 'walkLeft') {
            Game.getInstance().player.sprite.setState('walkLeft');
            return true;
        }
        else if (this.RightPressed && Game.getInstance().player.sprite.currentState.name != 'walkRight') {
            Game.getInstance().player.sprite.setState('walkRight');
            return true;
        }
        return false;
    };
    return Controls;
})();
