import { Mat4 } from "../Math/matrix.js";
import { Vector3D } from "../Math/vector.js";
import { Camera } from "./camera.js";
import { GraphicsWrapper } from "./Graphics/graphicsWrappers.js";
import { Renderer } from "./Graphics/renderer.js";
import { InputManager } from "./InputManager.js";
import { Cube } from "./primitives/cube.js";
import { Mesh } from "./primitives/mesh.js";

class Scene {
  private name: string;
  private meshs: Mesh[] = [];

  private viewportMatrix;
  private cameraMatrix;

  private cube: Cube;
  private camera: Camera;

  private renderer: Renderer;

  constructor(name: string, renderer: Renderer, inputManager: InputManager) {
    this.name = name;

    this.camera = new Camera();
    this.camera.transform.position = new Vector3D(0, 0, 1);
    this.cube = new Cube();

    this.renderer = renderer;

    this.bindInput();
  }

  update(deltaTime: number): void {
    // this.cube.update(deltaTime);
    this.meshs.forEach((mesh) => {
      mesh.update(deltaTime);
    });
  }

  render() {
    this.viewportMatrix = Mat4.projection();
    this.cameraMatrix = Mat4.identity();

    this.renderer.projection = Mat4.multiply(
      this.viewportMatrix,
      Mat4.getModel(this.camera.transform)
    );
    // GraphicsWrapper.draw(this.cube, this.renderer);
    this.meshs.forEach((mesh) => {
      GraphicsWrapper.draw(mesh, this.renderer);
    });
  }

  addMesh(mesh: Mesh): void {
    this.meshs.push(mesh);
  }

  bindInput(): void {
    let camrot = document.getElementById("cam-pos-z");
    camrot?.addEventListener("input", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;

      this.camera.transform.position.z = parseFloat(target.value) * 0.1;
    });

    let fov = document.getElementById("fov");
    fov?.addEventListener("input", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;
      Camera.FOV = parseInt(target.value);
    });

    //MODEL//
    document.getElementById("model-rot-x")?.addEventListener("input", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;
      this.meshs[0].transform.rotation.x = parseFloat(target.value);
    });

    document.getElementById("model-rot-y")?.addEventListener("input", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;
      this.meshs[0].transform.rotation.y = parseFloat(target.value);
    });

    document.getElementById("model-rot-z")?.addEventListener("input", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;
      this.meshs[0].transform.rotation.z = parseFloat(target.value);
    });

    document
      .getElementById("model-speed-rot-x")
      ?.addEventListener("input", (e) => {
        let target = this.isHtmlEvent(e);
        if (!target) return;
        this.meshs[0].rotationSpeed.x = parseInt(target.value);
      });

    document
      .getElementById("model-speed-rot-y")
      ?.addEventListener("input", (e) => {
        let target = this.isHtmlEvent(e);
        if (!target) return;
        this.meshs[0].rotationSpeed.y = parseInt(target.value);
      });

    document
      .getElementById("model-speed-rot-z")
      ?.addEventListener("input", (e) => {
        let target = this.isHtmlEvent(e);
        if (!target) return;

        this.meshs[0].rotationSpeed.z = parseInt(target.value);
      });

    document.getElementById("model-reset")?.addEventListener("click", () => {
      let mesh = this.meshs[0];
      mesh.rotationSpeed = new Vector3D();
      mesh.transform.rotation = new Vector3D();
    });

    document.getElementById("render-dot")?.addEventListener("change", (e) => {
      let target = this.isHtmlEvent(e);
      if (!target) return;

      GraphicsWrapper.DOT_RENDERER = target.checked;
    });

    document
      .getElementById("render-triangle")
      ?.addEventListener("change", (e) => {
        let target = this.isHtmlEvent(e);
        if (!target) return;

        GraphicsWrapper.TRIANGLES_RENDERER = target.checked;
      });

    document.getElementById("render")?.addEventListener("wheel", (e) => {
      if (e instanceof WheelEvent) {
        this.camera.transform.position.z += e.deltaY * 0.01;
      }
    });
  }

  private isHtmlEvent(event): HTMLInputElement | undefined {
    let target = event.target;

    if (!target) return;

    if (target instanceof HTMLInputElement === false) {
      return;
    }

    return target;
  }
}

export { Scene };
