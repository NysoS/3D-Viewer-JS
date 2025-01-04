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
    // this.gameObjects.forEach((object) => {
    //   object.draw(context);
    // });

    // context.fillStyle = "blue";

    // let mat = Mat4.multiply(this.viewportMatrix, this.camera.transformMat); // * model = (transform * rotation * scale)

    // let gizmo = Mat4.multiplyVector4(mat, this.origin);

    // context.beginPath();
    // context.arc(
    //   gizmo.x / gizmo.w,
    //   gizmo.y / gizmo.w,
    //   1 * Math.abs(gizmo.z),
    //   0,
    //   2 * Math.PI,
    //   true
    // );
    // context.fill();

    // context.fillStyle = "red";
    // context.fillRect(gizmo.x / gizmo.w, gizmo.y / gizmo.w - 1, 100, 2);

    // context.fillStyle = "green";
    // context.fillRect(gizmo.x / gizmo.w, gizmo.y / gizmo.w - 1, 2, 100);

    // context.fillStyle = "blue";
    // context.fillRect(
    //   gizmo.z / gizmo.w,
    //   gizmo.z / gizmo.w - 1,
    //   gizmo.x / gizmo.w,
    //   gizmo.y / gizmo.w
    // );

    // context.fillStyle = "blue";
    // context.beginPath();
    // context.arc(0, 0, 10, 0, 2 * Math.PI, true);
    // context.fill();

    //context, this.viewportMatrix, this.camera.transformMat
    // this.cube.draw(
    //   this.renderer.context,
    //   this.viewportMatrix,
    //   this.camera.transformMat
    // );

    GraphicsWrapper.draw(this.cube, this.renderer);

    // context.fillStyle = "red";
    // context.strokeRect(4, 4, 27, 47);
    // context.fillRect(3, 3, 12, 21);
  }
}

export { Scene };
