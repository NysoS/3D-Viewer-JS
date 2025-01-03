import { Mat4 } from "../../Math/matrix.js";
import { Vector2D, Vector3D, Vector4D } from "../../Math/vector.js";

class Cube {
  private vertexArray: any[] = [];

  private transformMat: Mat4 = Mat4.translate(new Vector3D(0, 0, -2));
  private rotation: number = 0;

  constructor() {
    this.vertexArray.push(
      new Vector3D(-1, -1, 1),
      new Vector3D(-1, 1, 1),
      new Vector3D(1, 1, 1),
      new Vector3D(1, -1, 1),

      new Vector3D(-1, -1, -1),
      new Vector3D(-1, 1, -1),
      new Vector3D(1, 1, -1),
      new Vector3D(1, -1, -1)
    );
  }

  update(deltaTime: number): void {
    // console.log(deltaTime);

    this.rotation += deltaTime * 55;
  }

  draw(ctx: CanvasRenderingContext2D, mat: Mat4, projection: Mat4): void {
    for (let vertexI = 0; vertexI < this.vertexArray.length; ++vertexI) {
      let vertexValue = this.vertexArray[vertexI];

      if (vertexValue.z < 0) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "green";
      }

      let model = Mat4.multiply(
        this.transformMat,
        Mat4.rotation(new Vector3D(this.rotation, 0, 0))
      );
      let matModel = Mat4.multiply(mat, model);

      let vertexPosition = Mat4.multiplyVector4(
        matModel,
        new Vector4D(vertexValue.x, vertexValue.y, vertexValue.z, 1)
      );

      if (vertexPosition.w <= 0 || Math.abs(vertexPosition.w) < 1) {
        continue;
      }

      let vp2D = new Vector2D(
        vertexPosition.x / vertexPosition.w,
        vertexPosition.y / vertexPosition.w
      );

      let depth = vertexPosition.z / vertexPosition.w;

      ctx.beginPath();
      ctx.arc(
        vp2D.x * 100,
        vp2D.y * 100,
        5 / Math.abs(depth),
        0,
        2 * Math.PI,
        true
      );
      ctx.fill();
    }
  }
}

export { Cube };
