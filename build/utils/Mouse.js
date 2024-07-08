"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = __importDefault(require("./Vector"));
class Mouse {
    viewport;
    input;
    constructor(viewport) {
        window.addEventListener("mousemove", (event) => this.handleMove(event), false);
        window.addEventListener("mousedown", (event) => this.handleKeyEvent(event, true), false);
        window.addEventListener("mouseup", (event) => this.handleKeyEvent(event, false), false);
        window.addEventListener("contextmenu", (event) => this.handleContextMenu(event), false);
        this.viewport = viewport;
        this.input = {
            button: {
                LEFT: false,
                MIDDLE: false,
                RIGHT: false,
            },
            cursorX: 0,
            cursorY: 0,
        };
    }
    handleKeyEvent(event, pressed) {
        event = event || window.event;
        event.preventDefault();
        if ("which" in event) {
            switch (event.which) {
                case 1:
                    this.input.button.LEFT = pressed;
                    break;
                case 2:
                    this.input.button.MIDDLE = pressed;
                    break;
                case 3:
                    this.input.button.RIGHT = pressed;
            }
        }
        else if ("button" in event) {
            switch (event.button) {
                case 0:
                    this.input.button.LEFT = pressed;
                    break;
                case 1:
                    this.input.button.MIDDLE = pressed;
                    break;
                case 2:
                    this.input.button.RIGHT = pressed;
                    break;
            }
        }
        if (!pressed) {
            // Do something?
        }
    }
    handleMove(event) {
        event = event || window.event;
        event.preventDefault();
        this.input.cursorX = event.clientX;
        this.input.cursorY = event.clientY;
    }
    handleContextMenu(event) {
        event = event || window.event;
        event.preventDefault();
    }
    getMousePosition() {
        let rect = this.viewport.getBoundingClientRect();
        return new Vector_1.default(this.input.cursorX - rect.left, this.input.cursorY - rect.top);
    }
    toString() {
        return JSON.stringify(this.input);
    }
}
exports.default = Mouse;
