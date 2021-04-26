import Vector from "../../utils/Vector";
import Polygon from "./polygon";

/**
 * 
 */
export default class Triangle extends Polygon {

    constructor(position, radius, degrees = 0) {
        super(position, radius, degrees)
        this.sides = 3;
    }

    update(state) {
        this.θ = (this.θ + (Math.PI / 30)) % (2 * Math.PI);
        this.r = 30 + 15 * Math.sin((360 / 60) * (state.client.frameCount % 60) * (Math.PI / 180));
        this.position = this.position.add(
            new Vector(2 * Math.sin((state.client.frameCount % 360) * (Math.PI / 180)), 0)
        )
    }

    draw(ctx) {
        ctx.beginPath();
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

}
