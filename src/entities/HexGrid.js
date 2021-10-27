import Entity from "./Entity";
import Vector from "../utils/Vector";
import Hex from "../utils/Hex";
import HexCell from "./HexCell";

/**
 *
 */
export default class HexGrid extends Entity {
    constructor(options) {

        super(options);

        const defaults = {
            cellPadding: 0,
            cellRadius: 0,
            columns: 15,
            rows: 10,
            cells: [],
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]])
        ));

        this.build(this.columns, this.rows);

    }

    build(columns, rows) {
        this.cells = [];
        for (let r = 0; r < rows; r++) {
            let offset = Math.floor(r / 2);
            for (let q = -offset; q < columns - offset; q++) {
                this.cells.push(
                    new HexCell({
                        hex: new Hex(q, r, -q - r),
                        radius: this.cellRadius
                    })
                );
            }
        }
    }

    /**
     * Draw a hexagon at each of the coordinate from the origin
     * 
     * @param {*} ctx 
     */
    draw(ctx) {
        for (let cell of this.cells) {
            cell.draw(ctx);
        }
    }

    /**
     * Loop through each and determine if we need to color or highlight it
     * @param {*} context 
     */
    update(context) {
        for (let cell of this.cells) {
            cell.update(context, this);
        }
    }
}
