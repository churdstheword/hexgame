import Entity from "../Entity";

export default class Debug extends Entity {
    constructor(options) {

        super(options)

        const defaults = {
            label: '',
            value: '',
            callback: null
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]]))
        );

    }

    update(state) {
        if (typeof this.callback == "function") {
            this.value = this.callback.call();
        }
    }

    draw(ctx) {
        ctx.font = 'px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.toString(), this.position.x, this.position.y);
    }

    toString() {
        return `${this.label}: ${this.value}`;
    }

}