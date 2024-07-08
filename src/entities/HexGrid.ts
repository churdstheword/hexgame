import Entity from "./Entity";
import Vector from "../utils/Vector";
import Hex from "../utils/Hex";
import HexCell from "./HexCell";
import type { GameState } from "../core/Game"

interface HexGridOptions {
    position: Vector,
    cellRadius: number,
    columns: number,
    rows: number,
}

export default class HexGrid extends Entity {

    public cellPadding: number;
    public cellRadius: number;
    public columns: number;
    public rows: number;
    public cells: Array<HexCell>;

    constructor(options: HexGridOptions) {
        super({ position: options.position });

        this.cellPadding = 0;
        this.cellRadius = options.cellRadius;
        this.columns = options.columns;
        this.rows = options.rows;
        this.cells = [];

        this.build(this.columns, this.rows);

    }

    public build(columns: number, rows: number) {
        this.cells = [];
        for (let r = 0; r < rows; r++) {
            let offset = Math.floor(r / 2);
            for (let q = -offset; q < columns - offset; q++) {
                this.cells.push(
                    new HexCell({
                        position: this.position,
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
    public draw(ctx: CanvasRenderingContext2D) {
        for (let cell of this.cells) {
            cell.draw(ctx);
        }
    }

    /**
     * Loop through each and determine if we need to color or highlight it
     * @param {*} context 
     */
    public update(state: GameState, parent?: Entity) {
        for (let cell of this.cells) {
            cell.update(state, this);
        }
    }
}
