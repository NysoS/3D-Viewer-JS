import { Vector3D } from "../../../Math/vector.js";
import { Mesh } from "../../primitives/mesh.js";
import { OBJParser } from "../Parsers/parser.js";

class MeshLoader {
  static async loadFromObj(filename: string): Promise<Mesh> {
    const objData = await OBJParser.readfile(filename);

    let mesh = new Mesh();
    let vertices: Vector3D[] = [];
    objData.forEach((raw: string) => {
      if (raw.startsWith("v ")) {
        let v = raw.replace("v", "").trim().split(" ");
        vertices.push(
          new Vector3D(parseFloat(v[0]), parseFloat(v[1]), parseFloat(v[2]))
        );
      }
    });

    mesh.setVertex(vertices);
    return mesh;
  }
}

export { MeshLoader };
