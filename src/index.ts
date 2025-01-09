import { ViewerApplication } from "./3DViewer/application.js";
import { VWindowProps } from "./3DViewer/window.js";

const windowProps: VWindowProps = {
  width: 1600,
  height: 920,
  title: "3D Viewer",
};
const application = new ViewerApplication(windowProps);

let lastTime: number = 0;

function loop(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  //input

  //Update
  application.update(deltaTime);

  //Renderer
  application.render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
