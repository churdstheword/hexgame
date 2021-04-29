import Vector from "../utils/Vector.js";

export default class HexCell {
    constructor(hex, size) {
        this.hex = hex;
        this.size = size;

        this.state = {
            center: new Vector(0, 0),
            fillColor: "#FFFFFF",
        };
    }

    update(state, parent) {
        if (state.client.frameCount % 5 == 0) {
            // Calculate the vector of the cell's center
            let x = this.size * (Math.sqrt(3) * this.hex.q + (Math.sqrt(3) / 2) * this.hex.r);
            let y = this.size * (3 / 2) * this.hex.r;
            this.state.center = parent.position.add(new Vector(x, y));
        }

        // Determine if the mouse pointer is inside the cell, if so, color the cell
        let vertices = this.getVertices(this.state.center);
        let point = new Vector(state.mouse.input.cursorX, state.mouse.input.cursorY);
        this.state.color = this.pointInPoly(vertices, point) ? "#28d45e" : "#FFFFFF";
    }

    draw(ctx) {
        // Use the vertices to draw the hexagon
        ctx.beginPath();
        ctx.fillStyle = this.state.color;
        for (let vertex of this.getVertices(this.state.center)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    getVertices(center) {
        let vertices = [];
        const baseVector = new Vector(this.size, 0);
        for (var i = 0; i < 6; i++) {
            let vertex = center.add(baseVector.rotate(i * ((2 * Math.PI) / 6) + 30 * (Math.PI / 180)));
            vertices.push(vertex);
        }
        return vertices;
    }

    /**
     * Determines if a point lies within the set of vertices of a polygon
     *
     * @param Vector[] vertices
     * @param Vector point
     * @returns boolean
     */
    pointInPoly(vertices, point) {
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
