import Polygon from "./polygon";
import Vector from "../../utils/Vector";
import type { GameState } from "../../core/Game";
import Entity from "../Entity";

interface HexagonOptions {
    position: Vector,
    sides: number,
    r: number,
    θ: number,
}

export default class Hexagon extends Polygon {

    sides: number;

    constructor(options: HexagonOptions) {
        super({
            position: options.position,
            θ: options.θ,
            r: options.r
        });

        this.sides = 6;
    }

    public update(state: GameState, parent?: Entity) {
        this.θ = (this.θ - (Math.PI / 120)) % (2 * Math.PI);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

}
