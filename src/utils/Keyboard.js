export default class Keyboard {

    constructor() {

        window.addEventListener("keydown", (event) => this.handleKeyEvent(event, true), false);
        window.addEventListener("keyup", (event) => this.handleKeyEvent(event, false), false);

        this.input = {
            "UP": false,
            "DOWN": false,
            "LEFT": false,
            "RIGHT": false
        };
    }


    handleKeyEvent(event, pressed) {

        if (event.defaultPrevented) {
            return;
        }

        switch (event.key) {
            case "w":
            case "W":
            case "Up":
            case "ArrowUp":
                this.input.UP = pressed;
                break;

            case "s":
            case "S":
            case "Down":
            case "ArrowDown":
                this.input.DOWN = pressed;
                break;

            case "a":
            case "A":
            case "Left":
            case "ArrowLeft":
                this.input.LEFT = pressed;
                break;

            case "d":
            case "D":
            case "Right":
            case "ArrowRight":
                this.input.RIGHT = pressed;
                break;

            default:
                return;
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }

    toString() {
        return Object.keys(this.input).reduce((acc, key) => {
            if (this.input[key] === true) acc.push(key);
            return acc;
        }, []).join(", ");
    }
}