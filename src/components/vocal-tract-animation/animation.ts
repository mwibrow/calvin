/* tslint:disable */
import { Geometry } from "./geometry";

export class Gesture {
  start: number;
  end: number;
  parent: Gesture;
  action: Actions.BaseAction;
  t: number;
  active: boolean;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.parent = null;
    this.t = 0;
    this.active = false;
  }

  setAction(action: Actions.BaseAction) {
    this.action = action;
  }

  setParent(gesture: Gesture) {
    this.parent = gesture;
    this.action.setParent(gesture.action);
  }

  setT(frame: number) {
    if (frame < this.start) {
      this.t = 0;
      this.active = false;
    } else {
      if (frame >= this.end) {
        this.t = 1;
        this.active = false;
      } else {
        this.t = (frame - this.start) / (this.end - this.start);
        this.active = true;
      }
    }
    this.action.setT(this.t);
  }

  act() {
    this.active && this.action.act();
  }

  update() {
    this.active && this.action.update();
  }
}

export class Gestures {
  gestures: Array<Gesture>;
  index: number;
  start: number;
  end: number;
  constructor() {
    this.gestures = new Array<Gesture>();
    this.index = 0;
    this.start = this.end = 0;
  }

  length() {
    return this.gestures.length;
  }
  appendGesture(gesture: Gesture) {
    this.gestures.push(gesture);
    if (this.end < gesture.end) {
      this.end = gesture.end;
    }
  }

  currentGesture(): Gesture {
    if (this.index < this.gestures.length) {
      if (this.gestures[this.index].active) {
        return this.gestures[this.index];
      }
    }
    return null;
  }

  updateIndex(frame) {
    // Ooo this is inefficient.
    let i: number;
    for (i = 0; i < this.gestures.length; i++) {
      if (frame >= this.gestures[i].start && frame <= this.gestures[i].end) {
        this.index = i;
        return;
      }
    }
    this.index = this.gestures.length;
  }

  setT(frame) {
    this.updateIndex(frame);
    if (this.index < this.gestures.length) {
      this.gestures[this.index].setT(frame);
    }
  }

  act() {
    if (this.index < this.gestures.length) {
      this.gestures[this.index].act();
    }
  }

  update() {
    if (this.index < this.gestures.length) {
      this.gestures[this.index].update();
    }
  }
}

export namespace Actions {
  export class BaseAction {
    parent: BaseAction;
    canHaveParent: boolean;
    paths: Array<Geometry.SvgPath>;
    easing: Easings.BaseEasing;
    pathPoints: Array<Geometry.Points>;
    savedPoints: Array<Geometry.Points>;
    points: Array<Geometry.Points>;
    t: number;

    constructor() {
      this.parent = null;
      this.canHaveParent = true;
      this.paths = new Array<Geometry.SvgPath>();
      this.easing = new Easings.Linear();
      this.pathPoints = new Array<Geometry.Points>();
      this.savedPoints = new Array<Geometry.Points>();
      this.points = new Array<Geometry.Points>();
      this.t = this.easing.ease(0);
    }

    setEasing(easing: Easings.BaseEasing) {
      this.easing = easing;
      this.t = this.easing.ease(0);
    }
    setParent(action: BaseAction) {
      if (this.canHaveParent) {
        this.parent = action;
      }
    }

    setT(t: number) {
      this.t = this.easing.ease(t);
    }

    addPath(path: Geometry.SvgPath, ...indices: Array<number[]>) {
      let points: Geometry.Points;
      this.paths.push(path);
      points = path.getPoints(...indices);
      this.pathPoints.push(points);
      this.savedPoints.push(points.copy());
      this.points.push(points.copy());
    }

    addPoints(path: Geometry.SvgPath, points: Geometry.Points) {
      this.paths.push(path);
      this.pathPoints.push(points);
      this.savedPoints.push(points.copy());
      this.points.push(points.copy());
    }

    preAct() {}

    resetPoints() {
      let i: number;
      for (i = 0; i < this.points.length; i++) {
        this.points[i] = this.savedPoints[i].copy();
        if (this.parent) {
          this.points[i].apply((x) => this.parent.actOn(x));
        }
      }
    }

    act() {}

    actOn(point: Geometry.Point, ...any): Geometry.Point {
      return point;
    }

    update() {
      let i: number, j: number;
      for (i = 0; i < this.paths.length; i++) {
        this.paths[i].update();
      }
    }
  }

  export class MorphAction extends BaseAction {
    constructor(private targetPoints: Geometry.Points) {
      super();
    }

    resetPoints() {
      super.resetPoints();
    }
    act() {
      let i: number, j: number;
      let point: Geometry.Point;
      this.resetPoints();
      for (i = 0; i < this.points.length; i++) {
        for (j = 0; j < this.points[i].length(); j++) {
          point = this.actOn(this.points[i].get(j), this.targetPoints.get(j));
          this.pathPoints[i].get(j).update(point);
        }
      }
    }

    actOn(source: Geometry.Point, target: Geometry.Point) {
      return Geometry.Point.pointAtTime(this.t, source, target);
    }
  }

  export class MorphBetweenAction extends BaseAction {
    constructor(
      private source: Geometry.Points,
      private target: Geometry.Points
    ) {
      super();
    }

    resetPoints() {
      super.resetPoints();
    }

    act() {
      let i: number, j: number;
      let point: Geometry.Point, q: Geometry.Point;
      this.resetPoints();
      for (i = 0; i < this.points.length; i++) {
        for (j = 0; j < this.points[i].length(); j++) {
          point = this.actOn(this.source.get(j), this.target.get(j));
          this.pathPoints[i].get(j).update(point);
        }
      }
    }

    actOn(source: Geometry.Point, target: Geometry.Point) {
      return Geometry.Point.pointAtTime(this.t, source, target);
    }
  }

  export class TranslateAndRotateAroundAction extends BaseAction {
    _shift: Geometry.Vector;
    _angle: number;
    _around: Geometry.Point;
    constructor(
      private shift: Geometry.Vector,
      private angle: number,
      private around: Geometry.Point
    ) {
      super();
      this._shift = this.shift.copy();
      this._angle = this.angle;
      this._around = this.around.copy();
    }

    setT(t: number) {
      this.t = this.easing.ease(t);
    }

    resetPoints() {
      super.resetPoints();
      if (this.parent) {
        this.around = this.parent.actOn(this._around);
        //this.shift = this.parent.actOn(this._shift);
        this.shift = this._shift.copy();
      } else {
        this.around = this._around.copy();
        this.shift = this._shift.copy();
      }
    }
    act() {
      let i: number, j: number;
      let point: Geometry.Point;
      this.resetPoints();
      this.angle = this.t * this._angle;
      this.shift = this.shift.scale(this.t, false);
      this.around = this.around.translate(this.shift, false);
      for (i = 0; i < this.points.length; i++) {
        for (j = 0; j < this.points[i].length(); j++) {
          point = this.actOn(this.points[i].get(j));
          this.pathPoints[i].get(j).update(point);
        }
      }
    }

    actOn(point: Geometry.Point) {
      return point
        .translate(this.shift, false)
        .rotateAround(this.angle, this.around, false);
    }
  }

  export class TranslateAction extends BaseAction {
    _shift: Geometry.Vector;
    constructor(private shift: Geometry.Vector) {
      super();
      this._shift = this.shift.copy();
    }

    setT(t: number) {
      this.t = this.easing.ease(t);
    }

    resetPoints() {
      super.resetPoints();
      if (this.parent) {
        this.shift = this.parent.actOn(this._shift.copy());
      } else {
        this.shift = this._shift.copy();
      }
    }

    act() {
      let i: number, j: number;
      let point: Geometry.Point;
      this.resetPoints();
      this.shift = this.shift.scale(this.t, false);
      for (i = 0; i < this.points.length; i++) {
        for (j = 0; j < this.points[i].length(); j++) {
          point = this.actOn(this.points[i].get(j));
          this.pathPoints[i].get(j).update(point);
        }
      }
    }

    actOn(point: Geometry.Point) {
      return point.translate(this.shift, false);
    }
  }

  export class RotateAroundAction extends BaseAction {
    _angle: number;
    _around: Geometry.Point;
    constructor(private angle: number, private around: Geometry.Point) {
      super();
      this._angle = this.angle;
      this._around = this.around;
    }

    setT(t: number) {
      this.t = this.easing.ease(t);
      this.angle = this.t * this._angle;
    }

    resetPoints() {
      super.resetPoints();
      if (this.parent) {
        this.around = this.parent.actOn(this._around);
      }
    }
    act() {
      let i: number, j: number;
      let point: Geometry.Point;
      this.resetPoints();
      for (i = 0; i < this.points.length; i++) {
        for (j = 0; j < this.points[i].length(); j++) {
          point = this.actOn(this.points[i].get(j));
          this.pathPoints[i].get(j).update(point);
        }
      }
    }

    actOn(point: Geometry.Point) {
      return point.rotateAround(this.angle, this.around, false);
    }
  }
}

export namespace Easings {
  export class BaseEasing {
    ease(t: number): number {
      return t;
    }
  }

  export class Out {
    ease(t: number): number {
      return 1.0;
    }
  }

  export class In {
    ease(t: number): number {
      return 0.0;
    }
  }

  export class Function {
    constructor(public func) {}
    ease(t: number): number {
      return this.func(t);
    }
  }

  export class Linear extends BaseEasing {
    ease(t: number): number {
      return t;
    }
  }

  export class Range extends BaseEasing {
    constructor(public min: number, public max: number) {
      super();
    }

    ease(t: number): number {
      return this.min * (1 - t) + this.max * t;
    }
  }

  export class ReverseLinear extends BaseEasing {
    ease(t: number): number {
      return 1 - t;
    }
  }

  export class Reverse extends BaseEasing {
    easing: BaseEasing;
    constructor(easing: BaseEasing) {
      super();
      this.easing = easing;
    }
    ease(t: number): number {
      return this.easing.ease(1 - t);
    }
  }

  export class CubicBezier extends BaseEasing {
    controls: number[];
    constructor(...controls: number[]) {
      super();
      this.controls = controls;
    }

    ease(t: number): number {
      let u: number = 1 - t;
      return (
        this.controls[0] * u ** 3 +
        this.controls[1] * u ** 2 * t * 3 +
        this.controls[2] * u * t ** 2 * 3 +
        this.controls[3] * t ** 3
      );
    }
  }
}
