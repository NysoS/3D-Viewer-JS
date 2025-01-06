class OBJParser {
  static async readfile(filename: string): Promise<any> {
    return new Promise((resolve) => {
      let rawFile = new XMLHttpRequest();
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          const values = rawFile.responseText;
          resolve(values.split("\n"));
        }
      };
      rawFile.open("GET", filename, true);
      rawFile.send();
    });
  }
}

export { OBJParser };
