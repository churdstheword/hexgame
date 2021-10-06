export default class Events {

    constructor() {
        this.events = {};
    }

    on(name, callback) {

        if (!this.events.hasOwnProperty(name)) {
            this.events[name] = [];
        }

        this.events[name].push(callback);

    }

    off(name, callback) {

        if (this.events.hasOwnProperty(name)) {
            const events = [];
            for (const handler of this.events[name]) {
                if (callback !== handler) {
                    events.push(handler)
                }
            }
            this.events = events;
        }

    }

    trigger(name, ...args) {

        if (this.events.hasOwnProperty(name)) {
            for (const callback of this.events.name) {
                callback.apply(this, args);
            }
        }

    }

}