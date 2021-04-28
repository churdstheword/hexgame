import Entity from "./entity";
import Hexagon from "./shapes/hexagon";
import Vector from "../utils/Vector";
import Hex from "../utils/Hex";

/**
 *
 */
export default class HexGrid extends Entity {
    constructor(position, size) {
        super(position);
        this.size = size;
        
        let width = 20;
        let height = 15;
        this.map = [];
        for (let r = 0; r < height; r++) {
            let offset = Math.floor(r/2);
            for(let q = -offset; q < width - offset; q++) {
                this.map.push(new Hex(q, r, -q-r));
            }
        }
            
    }

    draw(ctx) {
        // Draw a hexagon at each of the coordinate from the origin
        for (let hex of this.map) {
            // Convert the Hex coord into a Vector
            let x = this.size * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r);
            let y = this.size * (3 / 2) * hex.r;
            // Make a hexagon and draw it

            const hexagon = new Hexagon(this.position.add(new Vector(x, y)), this.size, 30);
            
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            hexagon.draw(ctx);
            ctx.fill();
        }
    }

    update(state) {


    }
}
