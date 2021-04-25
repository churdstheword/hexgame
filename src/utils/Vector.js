/**
 * 2D Vector Library
 */
export default class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y
        )
    }

    subtract(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y
        );
    }

    scale(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }

    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }

    cross(v) {
        return new Vector(
            this.y * v.x - this.x * v.y,
            this.x * v.y - this.y * v.x
        )
    }

    unit() {
        return this.scale(Math.inv(this.magnitude()))
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    max() {
        return Math.max(this.x, this.y);
    }

    min() {
        return Math.min(this.x, this.y);
    }

    rotate(theta) {
        return new Vector(
            this.x * Math.cos(theta) - this.y * Math.sin(theta),
            this.x * Math.sin(theta) + this.y * Math.cos(theta)
        )
    }

    equals(v) {
        return this.x == v.x && this.y == v.y;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }

    toArray() {
        return [this.x, this.y];
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    get length() {
        return Math.sqrt(this.dot(this));
    }

}