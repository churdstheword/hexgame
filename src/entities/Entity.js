import Vector from "../utils/Vector";

/**
 * Abstract Class Entity
 */
export default class Entity {
    constructor(options) {

        if (this.constructor == 'Entity') {
            throw new Error("Abstract classes can't be instantiated.")
        }

        const defaults = {
            position: new Vector(0, 0)
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]])
        ));

    }

    update(state) {
        // Do Nothing
    }

    draw(ctx) {
        // Do Nothing
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

}