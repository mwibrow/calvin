import { Geometry } from './geometry';


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
    for (i = 0; i < this.gestures.length; i ++) {
      if ((frame >= this.gestures[i].start) && (frame < this.gestures[i].end)) {
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

export class VocalTractGestures {

  frame: 0;
  velum: Gestures;
  lipUpper: Gestures;
  epiglottis: Gestures;
  vocalFolds: Gestures;
  jaw: Gestures;
  lipLower: Gestures;
  tongue: Gestures;

  constructor() {
    this.velum = new Gestures();
    this.lipUpper = new Gestures();
    this.epiglottis = new Gestures();
    this.vocalFolds = new Gestures();
    this.jaw = new Gestures();
    this.lipLower = new Gestures();
    this.tongue = new Gestures();
    this.frame = 0;
  }

  setT(frame) {
    this.velum.setT(frame);
    this.lipUpper.setT(frame);
    this.epiglottis.setT(frame);
    this.vocalFolds.setT(frame);
    this.jaw.setT(frame);
    this.lipLower.setT(frame);
    this.tongue.setT(frame);
  }

  act() {
    let childGesture: Gesture, parentGesture: Gesture;
    this.velum.act();
    this.lipUpper.act();
    this.epiglottis.act();
    this.vocalFolds.act();
    this.jaw.act();
    childGesture = this.lipLower.currentGesture();
    if (childGesture) {
      parentGesture = this.jaw.currentGesture();
      parentGesture && childGesture.setParent(parentGesture);
    }
    this.lipLower.act();
    childGesture = this.tongue.currentGesture();
    if (childGesture) {
      parentGesture = this.jaw.currentGesture();
      parentGesture && childGesture.setParent(parentGesture);
    }
    this.tongue.act();
  }

  update() {
    this.velum.update();
    this.lipUpper.update();
    this.epiglottis.update();
    this.vocalFolds.update();
    this.jaw.update();
    this.lipLower.update();
    this.tongue.update();
  }

}

export namespace Actions {

export class BaseAction {
  parent: BaseAction;
  paths: Array<Geometry.SvgPath>;
  easing: Easings.BaseEasing;
  pathPoints: Array<Geometry.Points>;
  savedPoints: Array<Geometry.Points>;
  points: Array<Geometry.Points>;
  t: number;

  constructor() {
    this.parent = null;
    this.paths = new Array<Geometry.SvgPath>();
    this.easing = new Easings.Linear();
    this.pathPoints = new Array<Geometry.Points>();
    this.savedPoints = new Array<Geometry.Points>();
    this.points = new Array<Geometry.Points>();
    this.t = 0;
  }

  setParent(action: BaseAction) {
    this.parent = action;
  }

  setT(t: number) {
    this.t = t;
    console.log(`Setting t: ${t}`);
  }

  addPath(path: Geometry.SvgPath, ...indices: Array<number[]>) {
    let points: Geometry.Points ;
    this.paths.push(path);
    points = path.getPoints(...indices);
    this.pathPoints.push(points);
    this.savedPoints.push(points.copy());
    this.points.push(points.copy());
  }

  preAct() {}

  resetPoints() {
    let i:  number;
    for (i = 0; i < this.points.length; i ++) {
      this.points[i] = this.savedPoints[i].copy();
      if (this.parent) {
        this.points[i].apply((x) => this.parent.actOn(x))
      }
    }
  }

  act() {}

  actOn(point: Geometry.Point): Geometry.Point {
    return point;
  }

  update() {
    let i:  number;
    for (i = 0; i < this.paths.length; i ++) {
      this.paths[i].update();
    }
  }
}


export class TranslateAndRotateAroundAction extends BaseAction {

  _shift: Geometry.Vector;
  _angle: number;
  _around: Geometry.Point;
  constructor(private shift: Geometry.Vector, private angle: number, private around: Geometry.Point) {
    super();
    this._shift = this.shift.copy();
    this._angle = this.angle;
    this._around = this.around.copy();
  }

  setT(t: number) {
    this.t = this.easing.ease(t);
    this.angle = this.t * this._angle;
    this.shift = this._shift.scale(t, false);
  }

  resetPoints() {
    super.resetPoints();
    if (this.parent) {
      this.around = this.parent.actOn(this._around);
      this.shift = this.parent.actOn(this.shift);
    }
  }
  act() {
    let i: number, j: number;
    let point: Geometry.Point;
    this.resetPoints();
    //this.around.translate(this.shift);
    for (i = 0; i < this.points.length; i ++) {
      for (j = 0; j < this.points[i].length(); j ++) {
        point = this.actOn(this.points[i].get(j));
        this.pathPoints[i].get(j).update(point);
      }
    }
  }

  actOn(point: Geometry.Point) {
    return point.translate(this.shift, false).rotateAround(this.angle, this.around, false);
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
    for (i = 0; i < this.points.length; i ++) {
      for (j = 0; j < this.points[i].length(); j ++) {
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

export namespace Transforms {

  export class BaseTransform {

    t: number;
    constructor(public interpolatable=true) {
      this.t = 0;
    }

    setT(t: number) {
      if (this.interpolatable) {
        this.t = t;
        this.interpolate();
      }
    }

    interpolate() {}

    act(){};

    actOn(point: Geometry.Point): Geometry.Point {
      return point;
    }
  }

  export class TranslateTransform extends BaseTransform {

    _point: Geometry.Point;

    constructor(public point: Geometry.Point, interpolatable=true) {
      super(interpolatable);
      this._point = this.point.copy();
    }

    interpolate() {
      this.point = new Geometry.Point(this.t * this._point.x, this.t * this._point.y);
    }

    actOn(point: Geometry.Point): Geometry.Point {
      return new Geometry.Point(point.x + this.point.x, point.y + this.point.y);
    }
  }

  export class RotateTransform extends BaseTransform {

    _angle: number;
    cosAngle: number;
    sinAngle: number;
    constructor(public angle: number, interpolatable=true) {
      super(interpolatable);
      this._angle = this.angle;
      this.cosAngle = Math.cos(this.angle);
      this.sinAngle = Math.sin(this.angle);
    }

    interpolate() {
      this.angle =  this.t * this._angle;
      this.cosAngle = Math.cos(this.angle);
      this.sinAngle = Math.sin(this.angle);
    }

    actOn(point: Geometry.Point): Geometry.Point {
      return new Geometry.Point(
        point.x * this.cosAngle - point.y * this.sinAngle,
        point.x * this.sinAngle + point.y * this.cosAngle);
    }
  }


}

export namespace Easings {

export class BaseEasing {
  ease(t: number): number { return t };
}

export class Linear extends BaseEasing {
  ease(t: number): number { return t; }
}

export class ReverseLinear extends BaseEasing {
  ease(t: number): number { return 1 - t; }
}

export class Reverse extends BaseEasing {
    easing: BaseEasing;
    constructor(easing: BaseEasing) {
        super();
        this.easing = easing;
    }
    ease(t: number): number {
        return this.easing.ease(1. - t);
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
    return this.controls[0] * (u ** 3) +
      this.controls[1] * (u ** 2) * t * 3 +
      this.controls[2] * u * (t ** 2) * 3 +
      this.controls[3] * (t ** 3);
  }
}

}

