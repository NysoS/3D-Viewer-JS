import { Mat4 } from "../Math/matrix.js";
import { Vector3D } from "../Math/vector.js";
import { Camera } from "./camera.js";
import { GraphicsWrapper } from "./Graphics/graphicsWrappers.js";
import { Renderer } from "./Graphics/renderer.js";
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

  constructor(name: string, renderer: Renderer) {
    this.name = name;

    this.viewportMatrix = Mat4.projection();
    this.cameraMatrix = Mat4.identity();

    this.camera = new Camera();
    this.camera.transformMat = Mat4.translate(new Vector3D(0, 0, -10));
    this.cube = new Cube();

    this.renderer = renderer;
    this.renderer.projection = this.viewportMatrix;
  }

  update(deltaTime: number): void {
    this.cube.update(deltaTime);
    // this.meshs.forEach((mesh) => {
    //   mesh.update(deltaTime);
    // });
  }

  render() {
    GraphicsWrapper.draw(this.cube, this.renderer);
    // this.meshs.forEach((mesh) => {
    //   GraphicsWrapper.draw(mesh, this.renderer);
    // });
  }

  addMesh(mesh: Mesh): void {
    this.meshs.push(mesh);
  }
}

export { Scene };
