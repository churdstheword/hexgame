"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Events {
    events;
    constructor() {
        this.events = {};
    }
    on(name, callback) {
        if (!this.events.hasOwnProperty(name)) {
            this.events[name] = [];
        }
        this.events[name].push({ name: name, callback: callback });
    }
    off(name, callback) {
        if (this.events.hasOwnProperty(name)) {
            const events = [];
            for (const event of this.events[name]) {
                if (event.callback !== callback) {
                    events.push(event);
                }
            }
            this.events[name] = events;
        }
    }
    trigger(name, ...args) {
        if (this.events.hasOwnProperty(name)) {
            for (const event of this.events[name]) {
                event.callback.apply(this, args);
            }
        }
    }
}
exports.default = Events;
