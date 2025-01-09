import { Mat4 } from "../Math/matrix.js";
import { Transform } from "../Math/transform.js";
import { Vector3D } from "../Math/vector.js";

class Camera {
  public transformMat: Mat4 = Mat4.translate(new Vector3D(0, 0, 0));
  public transform: Transform = new Transform();

  static FOV = 45;

  constructor() {}

  update(deltaTime: number): void {}
}

export { Camera };
