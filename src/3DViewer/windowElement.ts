class VWindowElement {
  private canvas: HTMLCanvasElement;
  private context: any;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.context = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getContext(): CanvasRenderingContext2D {
    return this.context;
  }
}

export { VWindowElement };
