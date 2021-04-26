import Entity from "../entity";

export default class Debug extends Entity {
    constructor(position, label, field) {
        super(position)
        this.field = field;
        this.label = label;
        this.value = '';
    }

    update(state) {
        if (typeof this.field == "function") {
            this.value = this.field.call();
        }
    }

    draw(ctx) {
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(this.toString(), this.position.x, this.position.y);
    }

    toString() {
        return `${this.label}: ${this.value}`;
    }

}