export default class Scene {
    
    constructor() {
        this.entities = [];
    }

    start() {
        this.frameid = window.requestAnimationFrame(this.gameTick.bind(this));
    }

    tick(timestamp) {
        if (this.state.status == "paused") {
            cancelAnimationFrame(this.frameid);
        }
    }

    update(timestamp) {
        for (let entity of this.entities) {
            entity.update(this.state);
        }
    }

    draw() {
        for (let entity of this.entities) {
            entity.draw(this.context);
        }
    }

}