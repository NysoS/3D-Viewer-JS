import { VWindow, VWindowProps } from "./window.js";

class ViewerApplication {
  private window: VWindow;

  //Scene
  constructor(windowProps: VWindowProps) {
    this.window = new VWindow(windowProps);
  }

  render(): void {
    //Clear
    console.log("Application render");
    this.window.render();
    //Draw entities
  }
}

export { ViewerApplication };
