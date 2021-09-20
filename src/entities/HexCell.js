import Entity from "./entity";
import Vector from "../utils/Vector.js";

export default class HexCell extends Entity {
    constructor(options) {

        super(options);

        const defaults = {
            hex: null,
            radius: null,
            center: new Vector(0, 0),
            fillColor: "#FFFFFF",
            selected: false,
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]]))
        );

    }



    update(state, parent) {

        if (state.client.frameCount % 5 == 0) {
            // Calculate the vector of the cell's center
            let x = this.radius * (Math.sqrt(3) * this.hex.q + (Math.sqrt(3) / 2) * this.hex.r);
            let y = this.radius * (3 / 2) * this.hex.r;
            this.center = parent.position.add(new Vector(x, y));
        }

        // Determine if the mouse pointer is inside the cell, if so, color the cell
        let vertices = this.getVertices(this.center);
        let point = new Vector(state.mouse.input.cursorX, state.mouse.input.cursorY);


        let pointInPoly = this.pointInPoly(vertices, point);

        if (pointInPoly) {
            if (this.lastMouseButtonState == true && state.mouse.input.button.LEFT == false) {
                this.selected = !this.selected;
            }

            this.lastMouseButtonState = state.mouse.input.button.LEFT;
        }

        let isSelected = this.selected;

        if (pointInPoly && isSelected) {
            this.color = "#A020F0";
        } else if (pointInPoly) {
            this.color = "#0000FF";
        } else if (isSelected) {
            this.color = "#FF0000";
        }

    }

    handleInput() {

    }

    draw(ctx) {
        // Use the vertices to draw the hexagon
        ctx.beginPath();
        ctx.fillStyle = this.color;
        for (let vertex of this.getVertices(this.center)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    getVertices(center) {
        let vertices = [];
        const baseVector = new Vector(this.radius, 0);
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
     * @link http://alienryderflex.com/polygon/
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
