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
      } else if (raw.startsWith("f ")) {
        let f = raw.replace("f", "").trim().split(" ");

        if (f.length === 4) {
          mesh.addFaces([
            parseInt(f[0].split("/")[0]) - 1,
            parseInt(f[1].split("/")[0]) - 1,
            parseInt(f[3].split("/")[0]) - 1,
          ]);

          mesh.addFaces([
            parseInt(f[1].split("/")[0]) - 1,
            parseInt(f[2].split("/")[0]) - 1,
            parseInt(f[3].split("/")[0]) - 1,
          ]);
        } else {
          mesh.addFaces([
            parseInt(f[0].split("/")[0]) - 1,
            parseInt(f[1].split("/")[0]) - 1,
            parseInt(f[2].split("/")[0]) - 1,
          ]);
        }
      }
    });

    mesh.setVertex(vertices);
    return mesh;
  }
}

export { MeshLoader };
