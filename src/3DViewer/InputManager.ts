type Events = { name: string; event: any };

class InputManager {
  events: Map<string, Function> = new Map();
  poolEvent: Map<string, any> = new Map();

  constructor() {
    // document.getElementById("cam-rot")?.addEventListener("input", (event) => {
    //   if (this.events.get("mousemove") && !this.poolEvent.has("mousemove")) {
    //     this.poolEvent.set("mousemove", event);
    //   }
    // });
  }

  bindEvent(name: string, callback: Function): void {
    this.events.set(name, callback);
  }

  pool(): void {
    this.poolEvent.forEach((args, event) => {
      let cb = this.events.get(event);
      if (cb) {
        cb(args);
      }
      this.poolEvent.delete(event);
    });
  }
}

export { InputManager };
