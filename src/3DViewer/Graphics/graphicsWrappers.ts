import { Mat4 } from "../../Math/matrix.js";
import { Vector2D, Vector4D } from "../../Math/vector.js";
import { Mesh } from "../primitives/mesh.js";
import { Renderer } from "./renderer.js";

type vertexShaderData = {
  position?: Vector2D;
  color?: string;
  depth?: number;
};

class GraphicsWrapper {
  static draw(mesh: Mesh, renderer: Renderer) {
    let vertexShaders = this.vertexShader(mesh, renderer.projection);

    this.rasterization(renderer.context, vertexShaders);
  }

  static vertexShader(mesh: Mesh, projection: Mat4): vertexShaderData[] {
    let vertexShaders: vertexShaderData[] = [];

    let modelMesh = Mat4.getModel(mesh.transform);
    let modelProjection = Mat4.multiply(projection, modelMesh);

    let vertexArray = mesh.getVertex();

    for (let i = 0; i < vertexArray.length; ++i) {
      let vertex = vertexArray[i];
      let vertexShader: vertexShaderData = {};

      if (vertex.z < 0) {
        vertexShader.color = "red";
      } else {
        vertexShader.color = "green";
      }

      let vertexPosition = Mat4.multiplyVector4(
        modelProjection,
        new Vector4D(vertex.x, vertex.y, vertex.z, 1)
      );

      if (vertexPosition.w <= 0 || Math.abs(vertexPosition.w) < 1) {
        continue;
      }

      vertexShader.position = new Vector2D(
        vertexPosition.x / vertexPosition.w,
        vertexPosition.y / vertexPosition.w
      );

      vertexShader.depth = vertexPosition.z / vertexPosition.w;
      vertexShaders.push(vertexShader);
    }

    return vertexShaders;
  }

  static rasterization(
    context: CanvasRenderingContext2D,
    vertexShaderData: vertexShaderData[]
  ): void {
    for (let i = 0; i < vertexShaderData.length; ++i) {
      let vertexShader: vertexShaderData = vertexShaderData[i];
      if (
        !vertexShader.position ||
        !vertexShader.depth ||
        !vertexShader.color
      ) {
        continue;
      }

      console.log(vertexShader.depth);

      context.fillStyle = vertexShader.color;
      context.beginPath();
      context.arc(
        vertexShader.position.x * 100,
        vertexShader.position.y * 100,
        2 / Math.abs(vertexShader.depth),
        0,
        2 * Math.PI,
        true
      );
      context.fill();
    }
  }
}

export { GraphicsWrapper };
