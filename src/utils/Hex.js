
export default class Hex {

    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    toString() {
        return `q:${this.q}|r:${this.r}|s:${this.s}`;
    }

}
