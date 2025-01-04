import { Mat4 } from "../../Math/matrix.js";
import { Transform } from "../../Math/transform.js";

class Mesh {
  protected vertexArray: any[] = [];
  public transform: Transform = new Transform();

  protected transformMat: Mat4 = Mat4.identity();
  protected rotation: number = 0;

  constructor() {}

  getVertex(): any[] {
    return this.vertexArray;
  }
}

export { Mesh };
