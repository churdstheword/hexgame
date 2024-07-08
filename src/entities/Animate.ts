import Entity from "./Entity";
import Vector from "../utils/Vector";
import type { GameState } from "../core/Game"

interface AnimateOptions {
    position: Vector
}

export default class Animate extends Entity {

    public img: HTMLImageElement;
    public frame: number;
    public nextFrame: number;
    public framePos: number;

    constructor(options: AnimateOptions) {
        super({ position: options.position });
        this.frame = 0;
        this.nextFrame = 0;
        this.framePos = 0;
        this.img = new Image();
        this.load();
    }

    public load() {

        var xhr = new XMLHttpRequest();
        let url = './assets/img/megaman.png';
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';

        // Process the response when the request is ready.
        xhr.onload = (e: ProgressEvent) => {
            if (xhr.status == 200) {
                let blob = xhr.response;
                this.img.src = window.URL.createObjectURL(blob);
            }
        };

        xhr.send();
    }

    public update(state: GameState, parent?: Entity) {

    }

    public draw(ctx: CanvasRenderingContext2D) {

        let height = 24;

        let frames = [
            [66, 1, 24, 24],
            [91, 1, 16, 24],
            [108, 1, 21, 24],
            [91, 1, 16, 24]
        ];

        this.frame++;

        if (this.img.complete) {

            if (this.frame >= this.nextFrame) {
                this.framePos = (this.framePos + 1) % 4;
                this.nextFrame = this.frame + 15;
            }

            let i = this.framePos;
            ctx.drawImage(this.img,
                frames[i][0], frames[i][1], frames[i][2], frames[i][3],
                this.position.x, this.position.y, frames[i][2], frames[i][3],
            );

        }

    }

}