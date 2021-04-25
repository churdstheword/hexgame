import Polygon from "./polygon";

/**
 * 
 */
export default class Hexagon extends Polygon {

    constructor(position, radius, degrees = 0) {
        super(position, radius, degrees)
        this.sides = 6;
    }

    update(state) {
        this.θ = (this.θ - (Math.PI / 120)) % (2 * Math.PI);
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
