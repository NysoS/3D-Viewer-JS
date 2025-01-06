import { Mat4 } from "../../Math/matrix.js";
import { Transform } from "../../Math/transform.js";
import { Vector3D } from "../../Math/vector.js";

class Mesh {
  protected vertexArray: Vector3D[] = [];
  public transform: Transform = new Transform();

  protected transformMat: Mat4 = Mat4.identity();
  protected rotation: number = 0;

  constructor() {}

  getVertex(): any[] {
    return this.vertexArray;
  }

  setVertex(vertex: any[]): void {
    this.vertexArray = vertex;
  }

  update(deltaTime: number): void {
    // this.transform.rotation.x += deltaTime * 55;
    this.transform.rotation.y += deltaTime * 35;
  }
}

export { Mesh };
