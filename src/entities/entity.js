/**
 * Abstract Class Entity
 */
export default class Entity {
    constructor(position) {
        if (this.constructor == 'Entity') {
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.position = position;
    }

    update(state) {
        // Do Nothing
    }

    draw(ctx) {
        // Do Nothing
    }

}