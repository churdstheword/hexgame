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
