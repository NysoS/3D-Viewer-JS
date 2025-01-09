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
  static DOT_RENDERER: boolean = true;
  static TRIANGLES_RENDERER: boolean = true;

  static draw(mesh: Mesh, renderer: Renderer) {
    let vertexShaders = this.vertexShader(mesh, renderer.projection);

    this.rasterization(renderer.context, vertexShaders, mesh.getIndices());
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

      if (vertexPosition.w < 0.1) {
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
    vertexShaderData: vertexShaderData[],
    faces: number[][]
  ): void {
    if (GraphicsWrapper.DOT_RENDERER) {
      for (let i = 0; i < vertexShaderData.length; ++i) {
        let vertexShader: vertexShaderData = vertexShaderData[i];
        if (
          !vertexShader.position ||
          !vertexShader.depth ||
          !vertexShader.color
        ) {
          continue;
        }

        context.fillStyle = vertexShader.color;
        context.beginPath();
        let pointSize = 1 / Math.abs(vertexShader.depth);

        if (pointSize > 10) {
          pointSize = 10;
        }

        context.arc(
          vertexShader.position.x * 100,
          vertexShader.position.y * 100,
          pointSize,
          0,
          2 * Math.PI,
          true
        );
        context.fill();
      }
    }

    if (GraphicsWrapper.TRIANGLES_RENDERER) {
      for (let i = 0; i < faces.length; i++) {
        context.beginPath();
        let indices = faces[i];

        let firstVertexShader: vertexShaderData = vertexShaderData[indices[0]];

        if (!firstVertexShader || !firstVertexShader.position) {
          return;
        }

        context.moveTo(
          firstVertexShader.position?.x * 100,
          firstVertexShader.position?.y * 100
        );

        for (let x = 1; x < indices.length; x++) {
          let vertexShader: vertexShaderData = vertexShaderData[indices[x]];
          if (!vertexShader) {
            continue;
          }

          if (
            !vertexShader.position ||
            !vertexShader.depth ||
            !vertexShader.color
          ) {
            continue;
          }

          context.lineTo(
            vertexShader.position.x * 100,
            vertexShader.position.y * 100
          );
        }

        context.lineTo(
          firstVertexShader.position.x * 100,
          firstVertexShader.position.y * 100
        );
        context.stroke();
      }
    }
  }
}

export { GraphicsWrapper };
