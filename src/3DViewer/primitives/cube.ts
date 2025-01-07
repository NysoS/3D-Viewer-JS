import { Vector3D } from "../../Math/vector.js";
import { Mesh } from "./mesh.js";

class Cube extends Mesh {
  // private vertexArray: any[] = [];

  constructor() {
    super();

    this.transform.position = new Vector3D(0, 0, 2);

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
    // this.transform.rotation.x += deltaTime * 45;
  }
}

export { Cube };
