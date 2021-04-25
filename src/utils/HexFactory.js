import { Hex } from "../entities/hex";

class HexFactory {

    static cube(q, r, s) {
        return new Hex(lr, rr, c);
    }

    static axial(q, r) {
        return new Hex(q, r, (-q - r));
    }

    static vector(v) {
        return new Hex(v[0], v[1], v[2]);
    }

}