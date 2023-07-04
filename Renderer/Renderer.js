/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Renderer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("empty", "./Renderer/costumes/empty.svg", { x: 0, y: 0 }),
      new Costume("large", "./Renderer/costumes/large.svg", {
        x: 329.77477477477487,
        y: 237.26492886328936
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.px = 61.366655091500256;
    this.vars.py = 50;
    this.vars.pz = 137.74248604499994;
    this.vars.camSinX = 0;
    this.vars.camCosX = 1;
    this.vars.camSinY = 0;
    this.vars.camCosY = 1;
    this.vars.x1 = -38.633344908499744;
    this.vars.y1 = -50;
    this.vars.z1 = 137.74248604499994;
    this.vars.x2 = -38.633344908499744;
    this.vars.y2 = 50;
    this.vars.z2 = 137.74248604499994;
    this.vars.x3 = 61.366655091500256;
    this.vars.y3 = 50;
    this.vars.z3 = 137.74248604499994;
    this.vars.i = 5;
    this.vars.lower = 3;
    this.vars.upper = 3;
    this.vars.middle = 3;
    this.vars.currentTriangle = 10;
    this.vars.distances = [
      239.96902837122894,
      238.38489375657105,
      141.55082962819998,
      138.8483358284559
    ];
    this.vars.id = [1, 2, 3, 4];
    this.vars.clippedVertices = [
      -11.912692244132886,
      -50,
      -0.03401570925263586,
      -11.912692244132886,
      50,
      -0.03401570925263586
    ];
    this.vars.visibleVertices = [86.8561418158671, 50, 15.609430790747362];

    this.watchers.clippedVertices = new Watcher({
      label: "Renderer: clipped vertices",
      style: "normal",
      visible: true,
      value: () => this.vars.clippedVertices,
      x: 609,
      y: 174,
      width: null,
      height: null
    });
    this.watchers.visibleVertices = new Watcher({
      label: "Renderer: visible vertices",
      style: "normal",
      visible: true,
      value: () => this.vars.visibleVertices,
      x: 245,
      y: 175,
      width: null,
      height: null
    });
  }

  *fillResolution(ax, ay, bx, by, cx, cy, res) {
    this.stage.vars.lena = Math.sqrt(
      (this.toNumber(bx) - this.toNumber(cx)) *
        (this.toNumber(bx) - this.toNumber(cx)) +
        (this.toNumber(by) - this.toNumber(cy)) *
          (this.toNumber(by) - this.toNumber(cy))
    );
    this.stage.vars.lenb = Math.sqrt(
      (this.toNumber(ax) - this.toNumber(cx)) *
        (this.toNumber(ax) - this.toNumber(cx)) +
        (this.toNumber(ay) - this.toNumber(cy)) *
          (this.toNumber(ay) - this.toNumber(cy))
    );
    this.stage.vars.lenc = Math.sqrt(
      (this.toNumber(ax) - this.toNumber(bx)) *
        (this.toNumber(ax) - this.toNumber(bx)) +
        (this.toNumber(ay) - this.toNumber(by)) *
          (this.toNumber(ay) - this.toNumber(by))
    );
    this.stage.vars.peri =
      1 /
      (this.toNumber(this.stage.vars.lena) +
        this.toNumber(this.stage.vars.lenb) +
        this.toNumber(this.stage.vars.lenc));
    this.stage.vars.incx =
      (this.toNumber(this.stage.vars.lena) * this.toNumber(ax) +
        this.toNumber(this.stage.vars.lenb) * this.toNumber(bx) +
        this.toNumber(this.stage.vars.lenc) * this.toNumber(cx)) *
      this.toNumber(this.stage.vars.peri);
    this.stage.vars.incy =
      (this.toNumber(this.stage.vars.lena) * this.toNumber(ay) +
        this.toNumber(this.stage.vars.lenb) * this.toNumber(by) +
        this.toNumber(this.stage.vars.lenc) * this.toNumber(cy)) *
      this.toNumber(this.stage.vars.peri);
    this.stage.vars.ind = Math.sqrt(
      (this.toNumber(this.stage.vars.lenb) +
        this.toNumber(this.stage.vars.lenc) -
        this.toNumber(this.stage.vars.lena)) *
        (this.toNumber(this.stage.vars.lenc) +
          this.toNumber(this.stage.vars.lena) -
          this.toNumber(this.stage.vars.lenb)) *
        (this.toNumber(this.stage.vars.lena) +
          this.toNumber(this.stage.vars.lenb) -
          this.toNumber(this.stage.vars.lenc)) *
        this.toNumber(this.stage.vars.peri)
    );
    this.stage.vars.aox =
      this.toNumber(this.stage.vars.incx) - this.toNumber(ax);
    this.stage.vars.aoy =
      this.toNumber(this.stage.vars.incy) - this.toNumber(ay);
    this.stage.vars.box =
      this.toNumber(this.stage.vars.incx) - this.toNumber(bx);
    this.stage.vars.boy =
      this.toNumber(this.stage.vars.incy) - this.toNumber(by);
    this.stage.vars.cox =
      this.toNumber(this.stage.vars.incx) - this.toNumber(cx);
    this.stage.vars.coy =
      this.toNumber(this.stage.vars.incy) - this.toNumber(cy);
    if (
      this.compare(this.stage.vars.lena, this.stage.vars.lenb) < 0 &&
      this.compare(this.stage.vars.lena, this.stage.vars.lenc) < 0
    ) {
      this.stage.vars.td = Math.sqrt(
        this.toNumber(this.stage.vars.aox) *
          this.toNumber(this.stage.vars.aox) +
          this.toNumber(this.stage.vars.aoy) *
            this.toNumber(this.stage.vars.aoy)
      );
    } else {
      if (
        this.compare(this.stage.vars.lenb, this.stage.vars.lena) > 0 ||
        this.compare(this.stage.vars.lenb, this.stage.vars.lenc) > 0
      ) {
        this.stage.vars.td = Math.sqrt(
          this.toNumber(this.stage.vars.cox) *
            this.toNumber(this.stage.vars.cox) +
            this.toNumber(this.stage.vars.coy) *
              this.toNumber(this.stage.vars.coy)
        );
      } else {
        this.stage.vars.td = Math.sqrt(
          this.toNumber(this.stage.vars.box) *
            this.toNumber(this.stage.vars.box) +
            this.toNumber(this.stage.vars.boy) *
              this.toNumber(this.stage.vars.boy)
        );
      }
    }
    this.stage.vars.rate =
      (this.toNumber(this.stage.vars.td) * 2 -
        this.toNumber(this.stage.vars.ind)) /
      (this.toNumber(this.stage.vars.td) * 4);
    this.stage.vars.td = 1 + 0;
    this.goto(
      Math.round(this.toNumber(this.stage.vars.incx)),
      Math.round(this.toNumber(this.stage.vars.incy))
    );
    this.penSize = this.toNumber(this.stage.vars.ind);
    this.penDown = true;
    for (
      let i = 0;
      i <
      Math.ceil(
        Math.log10(this.toNumber(res) / this.toNumber(this.stage.vars.ind)) /
          Math.log10(this.toNumber(this.stage.vars.rate))
      );
      i++
    ) {
      this.stage.vars.td =
        this.toNumber(this.stage.vars.td) * this.toNumber(this.stage.vars.rate);
      this.penSize =
        this.toNumber(this.stage.vars.ind) * this.toNumber(this.stage.vars.td);
      this.goto(
        this.toNumber(this.stage.vars.aox) * this.toNumber(this.stage.vars.td) +
          this.toNumber(ax),
        this.toNumber(this.stage.vars.aoy) * this.toNumber(this.stage.vars.td) +
          this.toNumber(ay)
      );
      this.goto(
        this.toNumber(this.stage.vars.box) * this.toNumber(this.stage.vars.td) +
          this.toNumber(bx),
        this.toNumber(this.stage.vars.boy) * this.toNumber(this.stage.vars.td) +
          this.toNumber(by)
      );
      this.goto(
        this.toNumber(this.stage.vars.cox) * this.toNumber(this.stage.vars.td) +
          this.toNumber(cx),
        this.toNumber(this.stage.vars.coy) * this.toNumber(this.stage.vars.td) +
          this.toNumber(cy)
      );
      this.goto(
        this.toNumber(this.stage.vars.aox) * this.toNumber(this.stage.vars.td) +
          this.toNumber(ax),
        this.toNumber(this.stage.vars.aoy) * this.toNumber(this.stage.vars.td) +
          this.toNumber(ay)
      );
    }
    this.penSize = this.toNumber(res);
    this.goto(this.toNumber(ax), this.toNumber(ay));
    this.goto(this.toNumber(bx), this.toNumber(by));
    this.goto(this.toNumber(cx), this.toNumber(cy));
    this.goto(this.toNumber(ax), this.toNumber(ay));
    this.penDown = false;
  }

  *whenGreenFlagClicked() {
    this.costume = "empty";
    this.size = 1000000000;
    this.costume = "large";
    this.visible = false;
    this.stage.vars.focalLength = 240;
    this.stage.vars.camX = 0;
    this.stage.vars.camY = 0;
    this.stage.vars.camZ = 0;
    this.stage.vars.camRotX = 0;
    this.stage.vars.camRotY = 0;
    this.stage.vars.px = [];
    this.stage.vars.py = [];
    this.stage.vars.pz = [];
    this.stage.vars.rgb = [];
    yield* this.add3dTriangleFromToToRgb(
      50,
      50,
      150,
      50,
      -50,
      150,
      -50,
      -50,
      150,
      0,
      128,
      255
    );
    yield* this.add3dTriangleFromToToRgb(
      -50,
      -50,
      150,
      -50,
      50,
      150,
      50,
      50,
      150,
      0,
      128,
      255
    );
    yield* this.add3dTriangleFromToToRgb(
      50,
      50,
      50,
      50,
      -50,
      50,
      -50,
      -50,
      50,
      0,
      128,
      255
    );
    yield* this.add3dTriangleFromToToRgb(
      -50,
      -50,
      50,
      -50,
      50,
      50,
      50,
      50,
      50,
      0,
      128,
      255
    );
    while (true) {
      this.clearPen();
      yield* this.moveCamera();
      yield* this.calculateDistances();
      yield* this.sortTriangles();
      yield* this.render();
      yield;
    }
  }

  *render() {
    this.vars.i = 1;
    for (let i = 0; i < this.stage.vars.px.length / 3; i++) {
      this.vars.currentTriangle =
        (this.toNumber(this.itemOf(this.vars.id, this.vars.i - 1)) - 1) * 3 + 1;
      this.vars.x1 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.currentTriangle) + -1
      );
      this.vars.y1 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.currentTriangle) + -1
      );
      this.vars.z1 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.currentTriangle) + -1
      );
      this.vars.x2 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.currentTriangle)
      );
      this.vars.y2 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.currentTriangle)
      );
      this.vars.z2 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.currentTriangle)
      );
      this.vars.x3 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.currentTriangle) + 1
      );
      this.vars.y3 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.currentTriangle) + 1
      );
      this.vars.z3 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.currentTriangle) + 1
      );
      this.warp(this.setPenColorToRGB)(
        this.itemOf(
          this.stage.vars.rgb,
          this.toNumber(this.vars.currentTriangle) + -1
        ),
        this.itemOf(
          this.stage.vars.rgb,
          this.toNumber(this.vars.currentTriangle)
        ),
        this.itemOf(
          this.stage.vars.rgb,
          this.toNumber(this.vars.currentTriangle) + 1
        )
      );
      this.warp(this.fill3dTriangleFromToTo)(
        this.vars.x1,
        this.vars.y1,
        this.vars.z1,
        this.vars.x2,
        this.vars.y2,
        this.vars.z2,
        this.vars.x3,
        this.vars.y3,
        this.vars.z3
      );
      this.vars.i++;
    }
  }

  *setPToXYZ(x, y, z) {
    this.vars.px = x;
    this.vars.py = y;
    this.vars.pz = z;
  }

  *calculateTrigValues() {
    this.vars.camCosX = Math.cos(
      this.degToRad(this.toNumber(this.stage.vars.camRotX))
    );
    this.vars.camSinX = Math.sin(
      this.degToRad(this.toNumber(this.stage.vars.camRotX))
    );
    this.vars.camCosY = Math.cos(
      this.degToRad(this.toNumber(this.stage.vars.camRotY))
    );
    this.vars.camSinY = Math.sin(
      this.degToRad(this.toNumber(this.stage.vars.camRotY))
    );
  }

  *moveCamera() {
    this.stage.vars.camRotX +=
      (this.toNumber(this.keyPressed("up arrow")) -
        this.toNumber(this.keyPressed("down arrow"))) *
      3;
    this.stage.vars.camRotY +=
      (this.toNumber(this.keyPressed("right arrow")) -
        this.toNumber(this.keyPressed("left arrow"))) *
      3;
    this.warp(this.calculateTrigValues)();
    if (this.keyPressed("w")) {
      this.stage.vars.camX += 5 * this.toNumber(this.vars.camSinY);
      this.stage.vars.camZ += 5 * this.toNumber(this.vars.camCosY);
    }
    if (this.keyPressed("s")) {
      this.stage.vars.camX += -5 * this.toNumber(this.vars.camSinY);
      this.stage.vars.camZ += -5 * this.toNumber(this.vars.camCosY);
    }
    if (this.keyPressed("a")) {
      this.stage.vars.camX += -5 * this.toNumber(this.vars.camCosY);
      this.stage.vars.camZ += 5 * this.toNumber(this.vars.camSinY);
    }
    if (this.keyPressed("d")) {
      this.stage.vars.camX += 5 * this.toNumber(this.vars.camCosY);
      this.stage.vars.camZ += -5 * this.toNumber(this.vars.camSinY);
    }
    this.stage.vars.camY +=
      5 *
      (this.toNumber(this.keyPressed("e")) -
        this.toNumber(this.keyPressed("q")));
  }

  *fill3dTriangleFromToTo(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    this.warp(this.transformPointXYZ)(x1, y1, z1);
    this.vars.x1 = this.vars.px;
    this.vars.y1 = this.vars.py;
    this.vars.z1 = this.vars.pz;
    this.warp(this.transformPointXYZ)(x2, y2, z2);
    this.vars.x2 = this.vars.px;
    this.vars.y2 = this.vars.py;
    this.vars.z2 = this.vars.pz;
    this.warp(this.transformPointXYZ)(x3, y3, z3);
    this.vars.x3 = this.vars.px;
    this.vars.y3 = this.vars.py;
    this.vars.z3 = this.vars.pz;
    if (
      this.compare(this.vars.z1, 1) > 0 ||
      this.compare(this.vars.z2, 1) > 0 || this.compare(this.vars.z3, 1) > 0
    ) {
      if (
        this.compare(this.vars.z1, 1) > 0 &&
        this.compare(this.vars.z2, 1) > 0 && this.compare(this.vars.z3, 1) > 0
      ) {
        this.warp(this.fillResolution)(
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.x1) / this.toNumber(this.vars.z1)),
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.y1) / this.toNumber(this.vars.z1)),
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.x2) / this.toNumber(this.vars.z2)),
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.y2) / this.toNumber(this.vars.z2)),
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.x3) / this.toNumber(this.vars.z3)),
          this.toNumber(this.stage.vars.focalLength) *
            (this.toNumber(this.vars.y3) / this.toNumber(this.vars.z3)),
          1
        );
      } else {
        this.vars.visibleVertices = [];
        this.vars.clippedVertices = [];
        if (this.compare(this.vars.z1, 0) > 0) {
          this.vars.visibleVertices.push(this.vars.x1);
          this.vars.visibleVertices.push(this.vars.y1);
          this.vars.visibleVertices.push(this.vars.z1);
        } else {
          this.vars.clippedVertices.push(this.vars.x1);
          this.vars.clippedVertices.push(this.vars.y1);
          this.vars.clippedVertices.push(this.vars.z1);
        }
        if (this.compare(this.vars.z2, 0) > 0) {
          this.vars.visibleVertices.push(this.vars.x2);
          this.vars.visibleVertices.push(this.vars.y2);
          this.vars.visibleVertices.push(this.vars.z2);
        } else {
          this.vars.clippedVertices.push(this.vars.x2);
          this.vars.clippedVertices.push(this.vars.y2);
          this.vars.clippedVertices.push(this.vars.z2);
        }
        if (this.compare(this.vars.z3, 0) > 0) {
          this.vars.visibleVertices.push(this.vars.x3);
          this.vars.visibleVertices.push(this.vars.y3);
          this.vars.visibleVertices.push(this.vars.z3);
        } else {
          this.vars.clippedVertices.push(this.vars.x3);
          this.vars.clippedVertices.push(this.vars.y3);
          this.vars.clippedVertices.push(this.vars.z3);
        }
        if (this.vars.visibleVertices.length === 3) {
          this.warp(this.zClipTriangleCaseB)(
            this.itemOf(this.vars.clippedVertices, 0),
            this.itemOf(this.vars.clippedVertices, 1),
            this.itemOf(this.vars.clippedVertices, 2),
            this.itemOf(this.vars.clippedVertices, 3),
            this.itemOf(this.vars.clippedVertices, 4),
            this.itemOf(this.vars.clippedVertices, 5),
            this.itemOf(this.vars.visibleVertices, 0),
            this.itemOf(this.vars.visibleVertices, 1),
            this.itemOf(this.vars.visibleVertices, 2)
          );
        } else {
          if (this.vars.visibleVertices.length === 6) {
            this.warp(this.zClipTriangleCaseA)(
              this.itemOf(this.vars.clippedVertices, 0),
              this.itemOf(this.vars.clippedVertices, 1),
              this.itemOf(this.vars.clippedVertices, 2),
              this.itemOf(this.vars.visibleVertices, 0),
              this.itemOf(this.vars.visibleVertices, 1),
              this.itemOf(this.vars.visibleVertices, 2),
              this.itemOf(this.vars.visibleVertices, 3),
              this.itemOf(this.vars.visibleVertices, 4),
              this.itemOf(this.vars.visibleVertices, 5)
            );
          }
        }
      }
    }
  }

  *transformPointXYZ(x, y, z) {
    this.warp(this.setPToXYZ)(
      this.toNumber(x) - this.toNumber(this.stage.vars.camX),
      this.toNumber(y) - this.toNumber(this.stage.vars.camY),
      this.toNumber(z) - this.toNumber(this.stage.vars.camZ)
    );
    this.warp(this.setPToXYZ)(
      this.toNumber(this.vars.px) * this.toNumber(this.vars.camCosY) -
        this.toNumber(this.vars.pz) * this.toNumber(this.vars.camSinY),
      this.vars.py,
      this.toNumber(this.vars.px) * this.toNumber(this.vars.camSinY) +
        this.toNumber(this.vars.pz) * this.toNumber(this.vars.camCosY)
    );
    this.warp(this.setPToXYZ)(
      this.vars.px,
      this.toNumber(this.vars.py) * this.toNumber(this.vars.camCosX) -
        this.toNumber(this.vars.pz) * this.toNumber(this.vars.camSinX),
      this.toNumber(this.vars.py) * this.toNumber(this.vars.camSinX) +
        this.toNumber(this.vars.pz) * this.toNumber(this.vars.camCosX)
    );
  }

  *add3dTriangleFromToToRgb(x1, y1, z1, x2, y2, z2, x3, y3, z3, r, g, b) {
    this.stage.vars.px.push(x1);
    this.stage.vars.py.push(y1);
    this.stage.vars.pz.push(z1);
    this.stage.vars.px.push(x2);
    this.stage.vars.py.push(y2);
    this.stage.vars.pz.push(z2);
    this.stage.vars.px.push(x3);
    this.stage.vars.py.push(y3);
    this.stage.vars.pz.push(z3);
    this.stage.vars.rgb.push(r);
    this.stage.vars.rgb.push(g);
    this.stage.vars.rgb.push(b);
  }

  *calculateDistances() {
    this.vars.distances = [];
    this.vars.i = 1;
    for (let i = 0; i < this.stage.vars.px.length / 3; i++) {
      this.vars.x1 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.i) + -1
      );
      this.vars.y1 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.i) + -1
      );
      this.vars.z1 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.i) + -1
      );
      this.vars.x2 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.i)
      );
      this.vars.y2 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.i)
      );
      this.vars.z2 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.i)
      );
      this.vars.x3 = this.itemOf(
        this.stage.vars.px,
        this.toNumber(this.vars.i) + 1
      );
      this.vars.y3 = this.itemOf(
        this.stage.vars.py,
        this.toNumber(this.vars.i) + 1
      );
      this.vars.z3 = this.itemOf(
        this.stage.vars.pz,
        this.toNumber(this.vars.i) + 1
      );
      this.warp(this.setPToXYZ)(
        (this.toNumber(this.vars.x1) +
          (this.toNumber(this.vars.x2) + this.toNumber(this.vars.x3))) /
          3,
        (this.toNumber(this.vars.y1) +
          (this.toNumber(this.vars.y2) + this.toNumber(this.vars.y3))) /
          3,
        (this.toNumber(this.vars.z1) +
          (this.toNumber(this.vars.z2) + this.toNumber(this.vars.z3))) /
          3
      );
      this.warp(this.setPToXYZ)(
        this.toNumber(this.vars.px) - this.toNumber(this.stage.vars.camX),
        this.toNumber(this.vars.py) - this.toNumber(this.stage.vars.camY),
        this.toNumber(this.vars.pz) - this.toNumber(this.stage.vars.camZ)
      );
      this.vars.distances.push(
        Math.sqrt(
          this.toNumber(this.vars.px) * this.toNumber(this.vars.px) +
            (this.toNumber(this.vars.py) * this.toNumber(this.vars.py) +
              this.toNumber(this.vars.pz) * this.toNumber(this.vars.pz))
        )
      );
      this.vars.i += 3;
    }
  }

  *addLayer(i, id) {
    this.vars.lower = 0;
    this.vars.upper = this.vars.distances.length;
    while (!!(this.compare(this.vars.lower, this.vars.upper) < 0)) {
      this.vars.middle = Math.floor(
        (this.toNumber(this.vars.lower) + this.toNumber(this.vars.upper)) / 2
      );
      if (
        this.compare(
          i,
          this.itemOf(
            this.vars.distances,
            this.itemOf(this.vars.id, this.toNumber(this.vars.middle)) - 1
          )
        ) < 0
      ) {
        this.vars.lower = this.toNumber(this.vars.middle) + 1;
      } else {
        this.vars.upper = this.vars.middle;
      }
    }
    this.vars.id.splice(this.toNumber(this.vars.lower), 0, id);
  }

  *sortTriangles() {
    this.vars.id = [];
    this.vars.i = 1;
    for (let i = 0; i < this.vars.distances.length; i++) {
      this.warp(this.addLayer)(
        this.itemOf(this.vars.distances, this.vars.i - 1),
        this.vars.i
      );
      this.vars.i++;
    }
  }

  *setPenColorToRGB(r, g, b) {
    this.penColor = Color.num(
      this.toNumber(r) * 65536 + (this.toNumber(g) * 256 + this.toNumber(b))
    );
  }

  *zClipTriangleCaseA(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    this.vars.z1 =
      (this.toNumber(z2) - 1) / (this.toNumber(z2) - this.toNumber(z1));
    this.vars.x1 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(x2) -
        (this.toNumber(x2) - this.toNumber(x1)) * this.toNumber(this.vars.z1));
    this.vars.y1 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(y2) -
        (this.toNumber(y2) - this.toNumber(y1)) * this.toNumber(this.vars.z1));
    this.vars.z2 =
      (this.toNumber(z3) - 1) / (this.toNumber(z3) - this.toNumber(z1));
    this.vars.x2 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(x3) -
        (this.toNumber(x3) - this.toNumber(x1)) * this.toNumber(this.vars.z2));
    this.vars.y2 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(y3) -
        (this.toNumber(y3) - this.toNumber(y1)) * this.toNumber(this.vars.z2));
    this.warp(this.fillResolution)(
      this.vars.x1,
      this.vars.y1,
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(x2) / this.toNumber(z2)),
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(y2) / this.toNumber(z2)),
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(x3) / this.toNumber(z3)),
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(y3) / this.toNumber(z3)),
      1
    );
    this.warp(this.fillResolution)(
      this.vars.x1,
      this.vars.y1,
      this.vars.x2,
      this.vars.y2,
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(x3) / this.toNumber(z3)),
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(y3) / this.toNumber(z3)),
      1
    );
  }

  *zClipTriangleCaseB(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    this.vars.z1 =
      (this.toNumber(z3) - 1) / (this.toNumber(z3) - this.toNumber(z1));
    this.vars.x1 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(x3) -
        (this.toNumber(x3) - this.toNumber(x1)) * this.toNumber(this.vars.z1));
    this.vars.y1 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(y3) -
        (this.toNumber(y3) - this.toNumber(y1)) * this.toNumber(this.vars.z1));
    this.vars.z2 =
      (this.toNumber(z3) - 1) / (this.toNumber(z3) - this.toNumber(z2));
    this.vars.x2 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(x3) -
        (this.toNumber(x3) - this.toNumber(x2)) * this.toNumber(this.vars.z2));
    this.vars.y2 =
      this.toNumber(this.stage.vars.focalLength) *
      (this.toNumber(y3) -
        (this.toNumber(y3) - this.toNumber(y2)) * this.toNumber(this.vars.z2));
    this.warp(this.fillResolution)(
      this.vars.x1,
      this.vars.y1,
      this.vars.x2,
      this.vars.y2,
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(x3) / this.toNumber(z3)),
      this.toNumber(this.stage.vars.focalLength) *
        (this.toNumber(y3) / this.toNumber(z3)),
      1
    );
  }
}
