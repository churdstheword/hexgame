
export default class HexMath {

    /**
     * Determines if a point lies within the set of vertices of a polygon
     *
     * @param Vector[] vertices
     * @param Vector point
     * @returns boolean
     * @link http://alienryderflex.com/polygon/
     */
    static pointInPoly(vertices, point) {
        let inPoly = false;
        let v = vertices;
        let p = point;
        for (let i = 0, j = v.length - 1; i < v.length; i++) {
            let m1 = v[i].y < p.y && v[j].y >= p.y;
            let m2 = v[j].y < p.y && v[i].y >= p.y;
            let m3 = v[i].x <= p.x || v[j].x < p.x;
            if ((m1 || m2) && m3) {
                let n1 = v[i].x;
                let n2 = p.y - v[i].y;
                let n3 = v[j].y - v[i].y;
                let n4 = v[j].x - v[i].x;
                inPoly ^= n1 + (n2 / n3) * n4 < p.x;
            }
            j = i;
        }
        return inPoly;
    }
}