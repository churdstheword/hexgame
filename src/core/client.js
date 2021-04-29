import { generateCanvas } from "../utils/utils.canvas.js";
import Vector from "../utils/Vector.js";
import Hexagon from "../entities/shapes/hexagon.js";
import Triangle from "../entities/shapes/triangle.js";
import Square from "../entities/shapes/square.js";
import Debug from "../entities/text/debug.js";
import Keyboard from "../utils/Keyboard.js";
import HexGrid from "../entities/HexGrid.js";
import Mouse from "../utils/Mouse.js";

export default class Client {
    constructor(w, h, fps, container) {
        this.config = {
            width: w,
            height: h,
            targetFps: fps,
        };

        this.state = {
            status: "running",
            client: {
                curFPS: 0,
                frameCount: 0,
                lastFPSUpdate: 0,
                framesThisSecond: 0,
                tick: 1000 / fps,
                nextGameTick: new Date().getTime(),
            },
            entities: [],
            keyboard: new Keyboard(),
            mouse: new Mouse(),
        };

        this.viewport = generateCanvas(this.config.width, this.config.height);
        this.context = this.viewport.getContext("2d");
        container.insertBefore(this.viewport, container.firstChild);
    }

    init() {
        this.state.entities = [];
        //this.state.entities.push(new Hexagon(new Vector(100, 100), 100, 0));
        //this.state.entities.push(new Triangle(new Vector(250, 250), 50, 15));
        //this.state.entities.push(new Square(new Vector(350, 100), 75, 25));

        this.state.entities.push(
            new Debug(new Vector(10, 30), "FPS", () => {
                return this.state.client.curFPS;
            })
        );
        this.state.entities.push(
            new Debug(new Vector(10, 50), "Frames", () => {
                return this.state.client.frameCount;
            })
        );
        this.state.entities.push(
            new Debug(new Vector(10, 70), "keysPressed", () => {
                return this.state.keyboard.toString();
            })
        );
        this.state.entities.push(
            new Debug(new Vector(10, 90), "mouse", () => {
                return this.state.mouse.toString();
            })
        );

        this.state.entities.push(new HexGrid(new Vector(25, 120), 15));

        this.loop();
    }

    loop() {
        this.frameid = window.requestAnimationFrame(this.loop.bind(this));

        let time = new Date().getTime();

        if (time > this.state.client.nextGameTick) {
            this.state.client.nextGameTick += this.state.client.tick;
            this.state.client.frameCount++;
            this.update(time);
            this.draw();
        }

        if (this.state.status == "paused") {
            cancelAnimationFrame(this.frameid);
        }
    }

    update(timestamp) {
        // Measure how many frames were rendering each loop
        if (timestamp > this.state.client.lastFPSUpdate + 1000) {
            this.state.client.curFPS = this.state.client.framesThisSecond;
            this.state.client.lastFPSUpdate = timestamp;
            this.state.client.framesThisSecond = 0;
        } else {
            this.state.client.framesThisSecond++;
        }

        // Update all the entities
        for (let entity of this.state.entities) {
            entity.update(this.state);
        }
    }

    draw() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.config.width, this.config.height);

        // Draw all the entities
        for (let entity of this.state.entities) {
            entity.draw(this.context);
        }
    }
}
