import { VWindowElement } from "./windowElement.js";

type VWindowProps = {
  width: number;
  height: number;
  title: string;
};

class VWindow {
  private width: number;
  private height: number;
  private title: string;

  private windowElement: VWindowElement;

  constructor(props: VWindowProps) {
    this.title = props.title;
    this.height = props.height;
    this.width = props.width;

    this.windowElement = new VWindowElement(props.width, props.height);
  }

  render(): void {}
}

export { VWindow, VWindowProps };
