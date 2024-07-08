
import Vector from './Vector';

export default class HexMath {

    // /**
    //  * Determines if a point lies within the set of vertices of a polygon
    //  *
    //  * @param Vector[] vertices
    //  * @param Vector point
    //  * @returns boolean
    //  * @link http://alienryderflex.com/polygon/
    //  */
    static pointInPoly(vertices: Array<Vector>, point: Vector) {
        const x = point.x;
        const y = point.y;

        let inside = false
        for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x,
                yi = vertices[i].y
            const xj = vertices[j].x,
                yj = vertices[j].y

            const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
            if (intersect) inside = !inside
        }

        return inside
    }

}