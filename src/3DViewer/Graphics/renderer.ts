import { Mat4 } from "../../Math/matrix.js";

class Renderer {
  public context: CanvasRenderingContext2D;
  public projection: Mat4;

  constructor(
    ctx: CanvasRenderingContext2D,
    projection: Mat4 = Mat4.identity()
  ) {
    this.context = ctx;
    this.projection = projection;
  }
}

export { Renderer };
