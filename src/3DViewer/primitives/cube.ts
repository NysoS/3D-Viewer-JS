import { Mat4 } from "../../Math/matrix.js";
import { Vector2D, Vector3D } from "../../Math/vector.js";

class Cube {
  private vertexArray: any[] = [];

  constructor() {
    this.vertexArray.push(
      new Vector3D(-3, -3, 1),
      new Vector3D(-3, 3, 1),
      new Vector3D(3, 3, 1),
      new Vector3D(3, -3, 1)
    );
  }

  update(deltaTime: number): void {}

  draw(ctx: CanvasRenderingContext2D, mat: Mat4): void {
    ctx.fillStyle = "red";

    for (let vertexI = 0; vertexI < this.vertexArray.length; ++vertexI) {
      let vertexPosition = Mat4.multiplyVector(mat, this.vertexArray[vertexI]);

      let w = mat.matrice[2][3];
      // console.log(vertexPosition);

      let vp2D = new Vector2D(vertexPosition.x / w, vertexPosition.y / w);

      vp2D.x += 800 * 0.5;
      vp2D.y += 700 * 0.5;
      console.log(vp2D);

      ctx.beginPath();
      ctx.arc(vp2D.x, vp2D.y, 3, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }
}

export { Cube };
