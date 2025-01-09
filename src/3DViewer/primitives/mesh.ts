import { Mat4 } from "../../Math/matrix.js";
import { Transform } from "../../Math/transform.js";
import { Vector3D } from "../../Math/vector.js";

class Mesh {
  protected vertexArray: Vector3D[] = [];
  protected faces: number[][] = [];
  public transform: Transform = new Transform();

  protected transformMat: Mat4 = Mat4.identity();
  public rotationSpeed: Vector3D = new Vector3D();

  constructor() {}

  getVertex(): any[] {
    return this.vertexArray;
  }

  getIndices(): any[][] {
    return this.faces;
  }

  setVertex(vertex: any[]): void {
    this.vertexArray = vertex;
  }

  addFaces(facesIndices: number[]): void {
    this.faces.push(facesIndices);
  }

  update(deltaTime: number): void {
    this.transform.rotation.x += deltaTime * this.rotationSpeed.x;
    this.transform.rotation.y += deltaTime * this.rotationSpeed.y;
    this.transform.rotation.z += deltaTime * this.rotationSpeed.z;
  }
}

export { Mesh };
