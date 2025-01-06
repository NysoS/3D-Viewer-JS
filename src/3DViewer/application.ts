import { Vector3D } from "../Math/vector.js";
import { MeshLoader } from "./core/Loader/meshLoader.js";
import { Renderer } from "./Graphics/renderer.js";
import { Scene } from "./scene.js";
import { VWindow, VWindowProps } from "./window.js";

class ViewerApplication {
  private window: VWindow;
  private scene: Scene;
  private renderer: Renderer;

  //Scene
  constructor(windowProps: VWindowProps) {
    this.window = new VWindow(windowProps);
    this.renderer = new Renderer(this.window.getContext());
    this.scene = new Scene("2D Viewer", this.renderer);

    MeshLoader.loadFromObj("./resources/monkey.obj").then((mesh) => {
      mesh.transform.position = new Vector3D(0, 0, 1);
      mesh.transform.rotation.z = 180;
      this.scene.addMesh(mesh);
    });
  }

  update(deltaTime: number): void {
    this.scene.update(deltaTime);
  }

  render(): void {
    //Clear
    // console.log("Application render");
    this.window.clear();
    //Draw entities
    if (this.window.getContext()) {
      this.scene.render();
    }
  }
}

export { ViewerApplication };
