import { Vector3D } from "../../Math/vector.js";
import { Mesh } from "./mesh.js";

class Cube extends Mesh {
  // private vertexArray: any[] = [];

  constructor() {
    super();

    this.transform.position = new Vector3D(0, 0, 2);

    this.vertexArray.push(
      new Vector3D(1, 1, -1),
      new Vector3D(1, -1, -1),
      new Vector3D(1, 1, 1),
      new Vector3D(1, -1, 1),

      new Vector3D(-1, 1, -1),
      new Vector3D(-1, -1, -1),
      new Vector3D(-1, 1, 1),
      new Vector3D(-1, -1, 1)
    );

    this.faces.push(
      [0, 4, 2],
      [4, 6, 2],

      [3, 2, 7],
      [2, 6, 7],

      [7, 6, 5],
      [6, 4, 5],

      [5, 1, 7],
      [1, 3, 7],

      [1, 0, 3],
      [0, 2, 3],

      [5, 4, 1],
      [4, 0, 1]
    );
  }

  update(deltaTime: number): void {
    this.transform.rotation.x += deltaTime * 45;
  }
}

export { Cube };
