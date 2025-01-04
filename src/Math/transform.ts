import { Vector3D } from "./vector.js";

class Transform {
  public position: Vector3D;
  public rotation: Vector3D;

  constructor() {
    this.position = new Vector3D();
    this.rotation = new Vector3D();
  }
}

export { Transform };
