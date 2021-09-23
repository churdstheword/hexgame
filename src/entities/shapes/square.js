import Vector from "../../utils/Vector";
import Polygon from "./polygon";

/**
 * 
 */
export default class Square extends Polygon {

    constructor(options) {
        super(options);

        const defaults = {
            sides: 4,
        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]]))
        );
    }

    update(state) {


        // this.θ = (this.θ - (Math.PI / 60)) % (2 * Math.PI);


        const movements = [];
        let velocity = 1;

        if (state.keyboard.input.LEFT) {
            movements.push(new Vector(velocity * -1, 0));
        }

        if (state.keyboard.input.RIGHT) {
            movements.push(new Vector(velocity, 0));
        }

        if (state.keyboard.input.UP) {
            movements.push(new Vector(0, velocity * -1));
        }

        if (state.keyboard.input.DOWN) {
            movements.push(new Vector(0, velocity));
        }

        const nextMove = movements.reduce((prev, current) => {
            return prev.add(current);
        }, new Vector(0, 0));

        this.position = this.position.add(nextMove);

        // if (state.client.frameCount % 5 == 0) {
        //     if (this.position.x < 100) {
        //         this.position = this.position.add(new Vector(5, 0));
        //     } else {
        //         this.position = new Vector(20, 20);
        //     }
        // }

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#a1b2c3";
        for (let vertex of this.getVertices(this.sides)) {
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

}
