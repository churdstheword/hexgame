
export default class Hex {

    q: number;
    r: number;
    s: number;

    constructor(q: number, r: number, s: number) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    toString(): string {
        return `q:${this.q}|r:${this.r}|s:${this.s}`;
    }

}
