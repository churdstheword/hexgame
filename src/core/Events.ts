
interface Event {
    name: string,
    callback: Function
}

export default class Events {

    events: Record<string, Array<Event>>;

    constructor() {
        this.events = {};
    }

    public on(name: string, callback: Function): void {

        if (!this.events.hasOwnProperty(name)) {
            this.events[name] = [];
        }

        this.events[name].push({ name: name, callback: callback });
    }

    public off(name: string, callback: Function): void {

        if (this.events.hasOwnProperty(name)) {
            const events = [];
            for (const event of this.events[name]) {
                if (event.callback !== callback) {
                    events.push(event)
                }
            }
            this.events[name] = events;
        }
    }

    public trigger(name: string, ...args: Array<any>): void {
        if (this.events.hasOwnProperty(name)) {
            for (const event of this.events[name]) {
                event.callback.apply(this, args);
            }
        }
    }

}