import Canvas from "../utils/Canvas.js";
import Keyboard from "../utils/Keyboard.js";
import Mouse from "../utils/Mouse.js";

export default class Game {

    constructor(w, h, fps, container) {

        this.config = {
            width: w,
            height: h,
            targetFps: fps,
        };

        this.viewport = Canvas.generateCanvas(this.config.width, this.config.height);
        this.context = this.viewport.getContext("2d");
        container.insertBefore(this.viewport, container.firstChild);

        this.state = {
            status: "running",
            client: {
                curFPS: 0,
                frameCount: 0,
                lastFPSUpdate: 0,
                framesThisSecond: 0,
                tick: 1000 / fps,
                lastGameTick: 0,
                nextGameTick: 0,
            },
            entities: [],
            keyboard: new Keyboard(),
            mouse: new Mouse(this.viewport),
        };

    }

    init() {
        this.state.entities = [];
        this.frameid = window.requestAnimationFrame(this.gameTick.bind(this));
    }

    gameTick(timestamp) {

        if (this.state.status == "paused") {
            cancelAnimationFrame(this.frameid);
        }

        if (timestamp > this.state.client.nextGameTick) {
            this.state.client.nextGameTick += this.state.client.tick;
            this.state.client.frameCount++;
            this.update(timestamp);
            this.draw();
        }

        this.state.client.lastGameTick = timestamp;
        this.frameid = window.requestAnimationFrame(this.gameTick.bind(this));

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

    appendTo() {
        // @TODO
    }
}
