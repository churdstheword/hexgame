import Vector from "../utils/Vector";
import type { GameState } from "../core/Game"


interface EntityOptions {
    position: Vector
}

export default class Entity {

    public position: Vector;

    constructor(options: EntityOptions) {
        this.position = options.position;
    }

    public update(state: GameState, parent?: Entity) {
        // Do Nothing
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // Do Nothing
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

}