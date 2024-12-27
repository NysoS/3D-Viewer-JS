import { Mat4 } from "../Math/matrix.js";
import { Cube } from "./primitives/cube.js";

class Scene {
  private name: string;
  //   private gameObjects: any[];

  private viewportMatrix;
  private cameraMatrix;

  private cube: Cube;

  constructor(name: string) {
    this.name = name;

    this.viewportMatrix = Mat4.projection();
    this.cameraMatrix = Mat4.identity();

    this.cube = new Cube();
  }

  update(deltaTime: number): void {}

  render(context: CanvasRenderingContext2D) {
    // this.gameObjects.forEach((object) => {
    //   object.draw(context);
    // });

    let mat = Mat4.multiply(this.viewportMatrix, this.cameraMatrix); // * model = (transform * rotation * scale)

    this.cube.draw(context, mat);

    // context.fillStyle = "red";
    // context.strokeRect(4, 4, 27, 47);
    // context.fillRect(3, 3, 12, 21);
  }
}

export { Scene };
