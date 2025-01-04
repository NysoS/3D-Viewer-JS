import { Mat4 } from "../Math/matrix.js";
import { Vector3D, Vector4D } from "../Math/vector.js";
import { Camera } from "./camera.js";
import { GraphicsWrapper } from "./Graphics/graphicsWrappers.js";
import { Renderer } from "./Graphics/renderer.js";
import { Cube } from "./primitives/cube.js";

class Scene {
  private name: string;
  //   private gameObjects: any[];

  private viewportMatrix;
  private cameraMatrix;

  private cube: Cube;
  private camera: Camera;
  private origin: Vector4D = new Vector4D();

  private renderer: Renderer;

  constructor(name: string, renderer: Renderer) {
    this.name = name;

    this.viewportMatrix = Mat4.projection();
    this.cameraMatrix = Mat4.identity();

    this.camera = new Camera();
    this.camera.transformMat = Mat4.translate(new Vector3D(0, 0, -5));
    this.cube = new Cube();

    this.renderer = renderer;
    this.renderer.projection = this.viewportMatrix;
  }

  update(deltaTime: number): void {
    this.cube.update(deltaTime);
  }

  render() {
    GraphicsWrapper.draw(this.cube, this.renderer);
  }
}

export { Scene };
