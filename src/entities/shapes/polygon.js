import Vector from "../../utils/Vector";
import Entity from "../Entity";

/**
 * Abstract Class Polygon
 */
export default class Polygon extends Entity {

    constructor(options) {
        super(options);

        if (this.constructor == 'Polygon') {
            throw new Error("Abstract classes can't be instantiated.")
        }

        const defaults = {
            r: 10,
            θ: 90 * (Math.PI / 180)
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]])
        ));
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