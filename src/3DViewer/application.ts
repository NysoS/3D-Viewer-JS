import { MeshLoader } from "./core/Loader/meshLoader.js";
import { Renderer } from "./Graphics/renderer.js";
import { InputManager } from "./InputManager.js";
import { Scene } from "./scene.js";
import { VWindow, VWindowProps } from "./window.js";

class ViewerApplication {
  private window: VWindow;
  private scene: Scene;
  private renderer: Renderer;
  private inputManager: InputManager;

  //Scene
  constructor(windowProps: VWindowProps) {
    this.window = new VWindow(windowProps);
    this.renderer = new Renderer(this.window.getContext());
    this.inputManager = new InputManager();

    this.scene = new Scene("2D Viewer", this.renderer, this.inputManager);

    // MeshLoader.loadFromObj("./resources/monkey.obj").then((mesh) => {
    //   mesh.transform.position = new Vector3D(0, 0, 0);
    //   mesh.transform.rotation.z = 180;
    //   this.scene.addMesh(mesh);

    //   let info_vertices = document.getElementById("info-vertice");
    //   if (info_vertices) {
    //     info_vertices.innerText = `${mesh.getVertex().length} vertices`;
    //   }

    //   let info_triangle = document.getElementById("info-triangle");
    //   if (info_triangle) {
    //     info_triangle.innerText = `${mesh.getIndices().length} triangles`;
    //   }
    // });
    this.loadObject();
  }

  update(deltaTime: number): void {
    this.scene.update(deltaTime);
  }

  render(): void {
    //Clear
    this.inputManager.pool();

    this.window.clear();
    //Draw entities
    if (this.window.getContext()) {
      this.scene.render();
    }
  }

  loadObject(): void {
    document.getElementById("upload-file")?.addEventListener("change", (e) => {
      let target = e.target;

      if (!target) return;

      if (target instanceof HTMLInputElement === false) {
        return;
      }

      if (!target.files || target.files?.length <= 0) {
        return;
      }

      const file = target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (reder) => {
          if (!reder.target) return;

          const content = reder.target.result;
          if (content instanceof ArrayBuffer === true || content === null)
            return;

          MeshLoader.loadFromArray(content.split("\n")).then((mesh) => {
            this.scene.addMesh(mesh);
            console.log(mesh);

            let info_vertices = document.getElementById("info-vertice");
            if (info_vertices) {
              info_vertices.innerText = `${mesh.getVertex().length} vertices`;
            }

            let info_triangle = document.getElementById("info-triangle");
            if (info_triangle) {
              info_triangle.innerText = `${mesh.getIndices().length} triangles`;
            }
          });
        };

        reader.readAsText(file);
      }
    });
  }
}

export { ViewerApplication };
