import Entity from "../Entity";
import Vector from "../../utils/Vector";
import type { GameState } from "../../core/Game"

interface DebugOptions {
    position: Vector,
    label: string,
    callback: Function,
}

export default class Debug extends Entity {

    public label: string;
    public value: string;
    public callback: Function;

    constructor(options: DebugOptions) {
        super({ position: options.position });
        this.label = options.label;
        this.value = 'test';
        this.callback = options.callback;
    }

    public update(state: GameState, parent?: Entity) {
        if (!this.callback) return;
        this.value = this.callback.call(this, state, parent);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = 'px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.toString(), this.position.x, this.position.y);
    }

    toString() {
        return `${this.label}: ${this.value}`;
    }

}