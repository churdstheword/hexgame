import Entity from "../entity";

export default class Debug extends Entity {
    constructor(position, label, field) {
        super(position)
        this.field = field;
        this.label = label;
        this.value = '';
    }

    update(state) {
        this.value = state[this.field];
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