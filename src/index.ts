import { ViewerApplication } from "./3DViewer/application.js";
import { VWindowProps } from "./3DViewer/window.js";

const windowProps: VWindowProps = {
  width: 800,
  height: 700,
  title: "3D Viewer",
};
const application = new ViewerApplication(windowProps);

function loop(): void {
  //input

  //Update

  //Renderer
  application.render();

  requestAnimationFrame(loop);
}

loop();
