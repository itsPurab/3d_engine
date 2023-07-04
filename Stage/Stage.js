/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.lena = 174.23817943985193;
    this.vars.lenb = 246.40999644703558;
    this.vars.lenc = 174.23817943985193;
    this.vars.peri = 0.0016809933377119621;
    this.vars.incx = -16.280855608954546;
    this.vars.incy = 36.08590850359182;
    this.vars.ind = 102.06636243266831;
    this.vars.aox = 51.03318121633415;
    this.vars.aoy = 123.20499822351778;
    this.vars.box = 51.03318121633415;
    this.vars.boy = -51.03318121633415;
    this.vars.cox = -123.2049982235178;
    this.vars.coy = -51.03318121633415;
    this.vars.td = 0.009076360737671372;
    this.vars.rate = 0.3086582838174551;
    this.vars.focalLength = 240;
    this.vars.camX = -11.366655091500256;
    this.vars.camY = 0;
    this.vars.camZ = -87.74248604499994;
    this.vars.camRotX = 0;
    this.vars.camRotY = 0;
    this.vars.px = [50, 50, -50, -50, -50, 50, 50, 50, -50, -50, -50, 50];
    this.vars.py = [50, -50, -50, -50, 50, 50, 50, -50, -50, -50, 50, 50];
    this.vars.pz = [150, 150, 150, 150, 150, 150, 50, 50, 50, 50, 50, 50];
    this.vars.rgb = [0, 128, 255, 0, 128, 255, 0, 128, 255, 0, 128, 255];

    this.watchers.focalLength = new Watcher({
      label: "focal length",
      style: "slider",
      visible: true,
      value: () => this.vars.focalLength,
      setValue: value => {
        this.vars.focalLength = value;
      },
      step: 1,
      min: 0,
      max: 100,
      x: 245,
      y: -32
    });
  }
}
