import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Renderer from "./Renderer/Renderer.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Renderer: new Renderer({
    x: -67.3140368252887,
    y: -87.11908971992597,
    direction: -0.4502412706318579,
    costumeNumber: 2,
    size: 1000000000,
    visible: false,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
