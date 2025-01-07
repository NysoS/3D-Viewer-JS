import { Transform } from "./transform.js";
import { Vector3D, Vector4D } from "./vector.js";

class Mat4 {
  matrice: any[][] = [];

  constructor() {
    this.matrice = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }

  static identity(): Mat4 {
    let mat = new Mat4();

    mat.matrice = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    return mat;
  }

  static projection(): Mat4 {
    let mat = this.identity();

    let fov = (45 / 180) * Math.PI;

    mat.matrice[0][0] = 1 / ((1200 / 675) * Math.tan(fov / 2));
    mat.matrice[1][1] = 1 / Math.tan(fov / 2);
    mat.matrice[2][2] = -(0.1 + 1000) / (0.1 - 1000);
    mat.matrice[3][2] = -1;
    mat.matrice[2][3] = (2 * 0.1 * 1000) / (0.1 - 1000);

    return mat;
  }

  static multiply(matA: Mat4, matB: Mat4): Mat4 {
    let mat = this.identity();

    for (let i = 0; i < 4; i++) {
      for (let x = 0; x < 4; x++) {
        mat.matrice[i][x] = 0;
        for (let k = 0; k < 4; k++) {
          mat.matrice[i][x] += matA.matrice[i][k] * matB.matrice[k][x];
        }
      }
    }

    return mat;
  }

  static multiplyVector3(mat: Mat4, vect: Vector3D): Vector3D {
    let vector = new Vector3D();

    vector.x =
      vect.x * mat.matrice[0][0] +
      vect.y * mat.matrice[1][0] +
      vect.z * mat.matrice[2][0] +
      mat.matrice[3][0];
    vector.y =
      vect.x * mat.matrice[0][1] +
      vect.y * mat.matrice[1][1] +
      vect.z * mat.matrice[2][1] +
      mat.matrice[3][1];
    vector.z =
      vect.x * mat.matrice[0][2] +
      vect.y * mat.matrice[1][2] +
      vect.z * mat.matrice[2][2] +
      mat.matrice[3][2];

    return vector;
  }

  static multiplyVector4(mat: Mat4, vect: Vector4D): Vector4D {
    let vector = new Vector4D();

    vector.x =
      vect.x * mat.matrice[0][0] +
      vect.y * mat.matrice[0][1] +
      vect.z * mat.matrice[0][2] +
      vect.w * mat.matrice[0][3];
    vector.y =
      vect.x * mat.matrice[1][0] +
      vect.y * mat.matrice[1][1] +
      vect.z * mat.matrice[1][2] +
      vect.w * mat.matrice[1][3];
    vector.z =
      vect.x * mat.matrice[2][0] +
      vect.y * mat.matrice[2][1] +
      vect.z * mat.matrice[2][2] +
      vect.w * mat.matrice[2][3];
    vector.w =
      vect.x * mat.matrice[3][0] +
      vect.y * mat.matrice[3][1] +
      vect.z * mat.matrice[3][2] +
      vect.w * mat.matrice[3][3];

    return vector;
  }

  static translate(vect: Vector3D): Mat4 {
    let mat = Mat4.identity();

    mat.matrice[0][3] = vect.x;
    mat.matrice[1][3] = -vect.y;
    mat.matrice[2][3] = -vect.z;

    return mat;
  }

  static rotationFromAxisY(angle: number): Mat4 {
    let mat = Mat4.identity();
    let rad = (angle * Math.PI) / 180;

    mat.matrice[0][0] = Math.cos(rad);
    mat.matrice[0][2] = -Math.sin(rad);
    mat.matrice[2][0] = Math.sin(rad);
    mat.matrice[2][2] = Math.cos(rad);

    return mat;
  }

  static rotationFromAxisX(angle: number): Mat4 {
    let mat = new Mat4();
    let rad = (angle * Math.PI) / 180;

    mat.matrice = [
      [1, 0, 0, 0],
      [0, Math.cos(rad), -Math.sin(rad), 0],
      [0, Math.sin(rad), Math.cos(rad), 0],
      [0, 0, 0, 1],
    ];

    return mat;
  }

  static rotationFromAxisZ(angle: number): Mat4 {
    let mat = Mat4.identity();

    let rad = (angle * Math.PI) / 180;

    mat.matrice[0][0] = Math.cos(rad);
    mat.matrice[0][1] = Math.sin(rad);
    mat.matrice[1][0] = -Math.sin(rad);
    mat.matrice[1][1] = Math.cos(rad);

    return mat;
  }

  static rotation(rotation: Vector3D): Mat4 {
    let mat = this.multiply(
      Mat4.rotationFromAxisX(rotation.x),
      Mat4.rotationFromAxisY(rotation.y)
    );
    return this.multiply(mat, Mat4.rotationFromAxisZ(rotation.z));
  }

  static getModel(transform: Transform): Mat4 {
    let translate = Mat4.translate(transform.position);
    let rotation = Mat4.rotation(transform.rotation);

    return Mat4.multiply(translate, rotation);
  }
}

export { Mat4 };
