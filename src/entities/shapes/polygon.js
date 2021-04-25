import Vector from "../../utils/Vector";
import Entity from "../entity";

/**
 * Abstract Class Polygon
 */
export default class Polygon extends Entity {
    constructor(position, radius, degrees) {
        super(position)
        if (this.constructor == 'Polygon') {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.r = radius;
        this.θ = degrees * (Math.PI / 180);
    }

    getVertices(sides) {
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