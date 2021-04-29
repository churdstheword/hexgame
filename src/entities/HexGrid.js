import Entity from "./entity";
import Vector from "../utils/Vector";
import Hex from "../utils/Hex";
import HexCell from "./HexCell";

/**
 *
 */
export default class HexGrid extends Entity {
    constructor(position, size) {
        super(position);
        this.size = size;

        this.state = {
            width: 20,
            height: 15,
            cells: [],
        };

        // Build a map for debugging
        for (let r = 0; r < this.state.height; r++) {
            let offset = Math.floor(r / 2);
            for (let q = -offset; q < this.state.width - offset; q++) {
                this.state.cells.push(new HexCell(new Hex(q, r, -q - r), size));
            }
        }
    }

    draw(ctx) {
        // Draw a hexagon at each of the coordinate from the origin
        for (let cell of this.state.cells) {
            cell.draw(ctx);
        }
    }

    update(state) {
        // Loop through each and determine if we need to color or highlight it
        for (let cell of this.state.cells) {
            cell.update(state, this);
        }
    }
}
