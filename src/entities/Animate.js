import Entity from "./Entity";
import Vector from "../utils/Vector";

export default class Animate extends Entity {

    constructor(options) {
        super(options);

        const defaults = {

        };

        Object.assign(this, defaults, Object.fromEntries(
            Object.keys(defaults).filter(key => key in options).map(key => [key, options[key]])
        ));

        this.img = new Image();
        this.load();
    }

    load() {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/src/assets/img/megaman.png', true);

        xhr.responseType = 'blob';

        // Process the response when the request is ready.
        xhr.onload = e => {
            let that = e.target;
            if (that.status == 200) {
                let blob = that.response;
                this.img.src = window.URL.createObjectURL(blob);
            }
        };

        xhr.send();
    }

    update(state, parent) {

        
    }

    draw(ctx) {

        let height = 24;

        let frame = this.frame ?? 0;
        let nextFrame = this.nextFrame ?? 0;
        let framePos = this.framePos ?? 0;

        let frames = [
            [66, 1, 24, 24],
            [91, 1, 16, 24],
            [108, 1, 21, 24],
            [91, 1, 16, 24]
        ];

        frame++;

        if (this.img.complete) {
            
            if(frame >= nextFrame) {
                framePos = (framePos + 1) % 4;
                nextFrame = frame + 15;
            }

            let i = framePos;
            ctx.drawImage(this.img, 
                frames[i][0], frames[i][1], frames[i][2], frames[i][3],
                this.position.x, this.position.y, frames[i][2], frames[i][3],
            );
            
        }

        this.framePos = framePos;
        this.frame = frame;
        this.nextFrame = nextFrame;

    }

}