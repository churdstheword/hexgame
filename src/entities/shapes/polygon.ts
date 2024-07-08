import Vector from "../../utils/Vector";
import Entity from "../Entity";
import { GameState } from "../../core/Game";

interface PolygonOptions {
    position: Vector,
    θ: number,
    r: number,
}

export default class Polygon extends Entity {

    θ: number;
    r: number;

    constructor(options: PolygonOptions) {
        super({ position: options.position });
        this.r = options.r;
        this.θ = options.θ;
    }

    public update(state: GameState, parent?: Entity) {
        //
    }

    public getVertices(sides: number) {
        const vectors = [];
        const initVector = new Vector(this.r, 0);
        for (var i = 0; i < sides; i++) {
            let vertex = this.position.add(
                initVector.rotate(i * (2 * Math.PI / sides) + this.θ)
            );
            vectors.push(vertex);
        }
        return vectors;
    }

}