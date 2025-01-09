class VWindowElement {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "render");
    this.canvas.width = width;
    this.canvas.height = height;

    let context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("No context found");
    }

    this.context = context;
    this.context.translate(width / 2, height / 2);

    document.body.appendChild(this.canvas);
  }

  clear(): void {
    this.context.clearRect(
      -this.canvas.width,
      -this.canvas.height,
      this.canvas.width * 2,
      this.canvas.height * 2
    );
  }

  getContext(): CanvasRenderingContext2D {
    return this.context;
  }
}

export { VWindowElement };
