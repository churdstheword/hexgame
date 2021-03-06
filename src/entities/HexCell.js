import Entity from "./Entity";
import Vector from "../utils/Vector.js";
import HexMath from "../utils/Math.js";

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
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]])
        ));

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
        let point = state.mouse.getMousePosition();

        let pointInPoly = HexMath.pointInPoly(vertices, point);

        if (pointInPoly) {
            if (this.lastMouseButtonState == true && state.mouse.input.button.LEFT == false) {
                this.selected = !this.selected;
            }

            this.lastMouseButtonState = state.mouse.input.button.LEFT;
        }

        let isSelected = this.selected;

        if (pointInPoly && isSelected) {
            this.color = "#3C5BC3";
        } else if (pointInPoly && !isSelected) {
            this.color = "#C1993E";
        } else if (isSelected) {
            this.color = "#637CCF";
        } else {
            this.color = "#CDAD65"
        }

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

}
