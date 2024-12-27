import { Scene } from "./scene.js";
import { VWindow, VWindowProps } from "./window.js";

class ViewerApplication {
  private window: VWindow;
  private scene: Scene;

  //Scene
  constructor(windowProps: VWindowProps) {
    this.window = new VWindow(windowProps);
    this.scene = new Scene("2D Viewer");
  }

  render(): void {
    //Clear
    console.log("Application render");
    this.window.clear();
    //Draw entities
    this.scene.render(this.window.getContext());
  }
}

export { ViewerApplication };
