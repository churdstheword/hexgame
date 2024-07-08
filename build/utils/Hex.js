"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hex {
    q;
    r;
    s;
    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
    }
    toString() {
        return `q:${this.q}|r:${this.r}|s:${this.s}`;
    }
}
exports.default = Hex;
