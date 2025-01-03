import { Mat4 } from "../Math/matrix.js";
import { Vector3D } from "../Math/vector.js";

class Camera {
  public transformMat: Mat4 = Mat4.translate(new Vector3D(0, 0, 0));

  constructor() {}

  update(deltaTime: number): void {}
}

export { Camera };
