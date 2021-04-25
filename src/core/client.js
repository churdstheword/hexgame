import { generateCanvas } from '../utils/utils.canvas.js';
import Vector from '../utils/Vector.js';
import Hexagon from '../entities/shapes/hexagon.js';
import Triangle from '../entities/shapes/triangle.js';
import Square from '../entities/shapes/square.js';
import Debug from '../entities/text/debug.js';


export default class Client {

	constructor(x, y, fps, container) {

		this.x = x;
		this.y = y
		this.cwidth = 800
		this.cheight = 600;

		this.fps = fps;
		this.frameCount = 0;
		this.lastFPSUpdate = 0
		this.framesThisSecond = 0

		this.viewport = generateCanvas(this.cwidth, this.cheight);
		this.context = this.viewport.getContext('2d');

		container.insertBefore(this.viewport, container.firstChild);

	}

	init() {

		this.tick = 1000 / this.fps;
		this.nextGameTick = new Date().getTime();

		this.entities = [];
		this.entities[0] = new Hexagon(new Vector(100, 100), 100, 0);
		this.entities[1] = new Triangle(new Vector(250, 250), 50, 15);
		this.entities[2] = new Square(new Vector(350, 100), 75, 25);
		this.entities[3] = new Debug(new Vector(10,30), 'FPS', 'curFPS');
		this.entities[4] = new Debug(new Vector(10,50), 'Frames', 'frameCount');

		this.loop();
	}

	loop() {

		this.frameid = window.requestAnimationFrame(this.loop.bind(this));

		let t1 = new Date().getTime()

		if (t1 > this.nextGameTick) {
			this.nextGameTick += this.tick;
			this.frameCount++
			this.update(t1);
			this.draw();
		}

		if (this.gameState == 'paused') {
			cancelAnimationFrame(this.frameid);
		}

	}

	update(timestamp) {

		// Measure how many frames were rendering each loop 
		if (timestamp > this.lastFPSUpdate + 1000) {
			this.curFPS = this.framesThisSecond;
			this.lastFPSUpdate = timestamp;
			this.framesThisSecond = 0;
		} else {
			this.framesThisSecond++;
		}

		// Update all the entities
		for(let entity of this.entities) {
			entity.update(this);
		}

	}

	draw() {

		// Clear the canvas
		this.context.clearRect(0, 0, this.cwidth, this.cheight)

		// Draw all the entities
		for(let entity of this.entities) {
			entity.draw(this.context);
		}

	}

}
