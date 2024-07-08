// import Entity from '../entities/Entity';

// export default class Scene {

//     entities: Array<Entity>;

//     constructor() {
//         this.entities = [];
//     }

//     start() {
//         this.frameid = window.requestAnimationFrame(this.gameTick.bind(this));
//     }

//     tick(timestamp: number) {
//         if (this.state.status == "paused") {
//             cancelAnimationFrame(this.frameid);
//         }
//     }

//     update(timestamp: number) {
//         for (let entity of this.entities) {
//             entity.update(this.state);
//         }
//     }

//     draw() {
//         for (let entity of this.entities) {
//             entity.draw(this.context);
//         }
//     }

// }