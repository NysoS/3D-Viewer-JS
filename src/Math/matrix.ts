import { Vector3D } from "./vector.js";

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

    // mat.matrice[0][0] = 1;
    // mat.matrice[1][1] = 1;
    // mat.matrice[2][2] = 1;
    // mat.matrice[3][3] = 1;

    return mat;
  }

  static projection(): Mat4 {
    let mat = this.identity();

    mat.matrice[0][0] = 1 / ((800 / 700) * Math.tan(35));
    mat.matrice[1][1] = 1 / Math.tan(35);
    mat.matrice[2][2] = (0.1 + 100) / (0.1 - 100);
    mat.matrice[3][2] = -1;
    mat.matrice[2][3] = (2 * 0.1 * 100) / (0.1 - 100);

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

  static multiplyVector(mat: Mat4, vect: Vector3D): Vector3D {
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

    console.log(vect, vector);

    return vector;
  }
}

export { Mat4 };
