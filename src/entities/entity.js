import Vector from "../utils/Vector";

/**
 * Abstract Class Entity
 */
export default class Entity {
    constructor(position) {
        if (this.constructor == 'Entity') {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.position = position;

        this.state = {
            position: position,
            velocity: new Vector(0,0),
            acceleration: new Vector(0,0),
        }

    }

    update(state) {
        // Do Nothing
    }

    draw(ctx) {
        // Do Nothing
    }

}