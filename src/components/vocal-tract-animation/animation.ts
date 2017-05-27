import { Geometry } from './geometry';



export class Animation {

  timeline: Timeline;
  name: string;
  frame: number;
  speed: number;
  duration: number;

  constructor(name: string) {
    this.name = name;
    this.timeline = new Timeline();
    this.frame = 0;
    this.duration = 0;
    this.speed = 5;
  }

  init() {
    this.timeline.init();
    this.frame = 0;
  }

  addGesture(gesture: Gesture) {
    this.timeline.addGesture(gesture);
    this.duration = this.timeline.getDuration();
  }

  animate(frame) {
    this.init();
    this.frame = 0;
    window.requestAnimationFrame((event) => this._animate(event));
  }

  _animate(event) {
    this.frame += this.speed;
    if (this.frame > this.duration) {
      this.frame = this.duration;
    }
    this.timeline.animate(this.frame);
    if (this.frame < this.duration) {
      window.requestAnimationFrame((event) => this._animate(event));
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

export namespace Action {

export class BaseAction {

  points: Array<Geometry.Point>;
  savedPoints: Array<Geometry.Point>;
  paths: Array<Geometry.SvgPath>;
  easing: Easings.BaseEasing;
  children: Array<BaseAction>;
  parent: BaseAction;

  constructor() {
    this.points = new Array<Geometry.Point>();
    this.savedPoints = new Array<Geometry.Point>();
    this.paths = new Array<Geometry.SvgPath>();
    this.easing = new Easings.Linear();
    this.children = new Array<BaseAction>();
    this.parent = null;
  }

  init() {
    let i: number;
    this.savedPoints = new Array<Geometry.Point>();
    console.log(this.points)
    for (i = 0; i < this.points.length; i ++) {
      this.savedPoints.push(this.points[i].copy());
    }
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  hasParent(): boolean {
    return this.parent !== null;
  }

  appendPath(path: Geometry.SvgPath, ...indices: Array<number[]>) {
    // this.paths.push(path);
    // if (indices) {
    //   this.points = this.points.concat(path.getPoints(...indices))
    // } else {
    //   this.points = this.points.concat(path.getPoints());
    // }
  }

  appendPoints(...points: Geometry.Point[]) {
    this.points = this.points.concat(points);
  }

  act(t: number) {}

  actOn(point: Geometry.Point, t: number): Geometry.Point {
    return point.copy();
  }

  action(t: number) {
    t = this.easing.ease(t);
    let i: number;
    let tmpPoints: Array<Geometry.Point> = new Array<Geometry.Point>();
    if (this.hasParent) {
      for (i = 0; i < this.points.length; i ++) {
        tmpPoints.push(this.parent.actOn(this.points[i], t));
      }
    }
  }
  update() {
    let i: number = 0;
    for (i = 0; i < this.paths.length; i ++) {
      this.paths[i].update();
    }
  }
}





export class TranslationAction extends BaseAction {

  shift: Geometry.Point;

  constructor(shift: Geometry.Point) {
    super();
    this.shift = shift;
  }

  act(t: number) {
    let i: number;
    let point: Geometry.Point;
    for (i = 0; i < this.points.length; i ++) {
      point = this.actOn(this.savedPoints[i].copy(), t);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
  }

  actOn(point: Geometry.Point, t=1): Geometry.Point {
    t = this.easing.ease(t);
    let tmpPoint: Geometry.Point = point.copy();
    tmpPoint.x = point.x + t * this.shift.x;
    tmpPoint.y = point.y + t * this.shift.y;
    return tmpPoint
  }
}

export class TranslateAndRotateAroundAction extends BaseAction {

  shift: Geometry.Point;
  around: Geometry.Point;
  angle: number;
  constructor(shift: Geometry.Point, angle: number, around: Geometry.Point) {
    super();
    this.shift = shift;
    this.angle = angle;
    this.around = around;
  }


  act(t: number) {
    let i: number, angle: number;
    let point: Geometry.Point;
    t = this.easing.ease(t);
    angle = t * this.angle;
    for (i = 0; i < this.points.length; i ++) {
      point = this.actOn(this.savedPoints[i], t);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
  }

  actOn(point: Geometry.Point, t=1): Geometry.Point {
    let angle: number;
    let tmpPoint: Geometry.Point;
    t = this.easing.ease(t);
    angle = t * this.angle;
    tmpPoint = point.rotateAround(angle, this.around, false);
    tmpPoint.x += t * this.shift.x;
    tmpPoint.y += t * this.shift.y;
    return tmpPoint;

  }
}

export class OscillateYAction extends BaseAction {


  amplitude: number;
  period: number;
  constructor(amplitude: number, period: number) {
    super();
    this.amplitude = amplitude;
    this.period = period;
  }


  act(t: number) {
    let i: number;
    let point: Geometry.Point;

    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].copy();
      this.points[i].y = point.y + this.amplitude * Math.sin(2 * Math.PI * t / this.period);

    }
  }
}


export class RotateAroundAction extends BaseAction {
  around: Geometry.Point;
  angle: number;

  constructor(angle: number, around: Geometry.Point) {
    super();
    this.angle = angle;
    this.around = around;
  }

  act(t: number) {
    let i: number, angle: number;
    let point: Geometry.Point;
    for (i = 0; i < this.points.length; i ++) {
      point = this.actOn(this.points[i], t);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
  }

  actOn(point: Geometry.Point, t=1): Geometry.Point {
     t = this.easing.ease(t);
     let angle: number = t * this.angle;
     return point.rotateAround(angle, this.around, false);
  }
}


}

export class Gesture {

  actions: Array<Action.BaseAction>;
  start: number;
  end: number;
  children: Array<Gesture>;
  constructor() {
    this.start = this.end = 0;
    this.actions = new Array<Action.BaseAction>();
    this.children = new Array<Gesture>();
  }

  init() {
    let i: number;
    for (i = 0; i < this.actions.length; i ++) {
        this.actions[i].init();
      }
  }

  addChild(child: Gesture) {
    this.children.push(child);
  }
  hasChildren(): boolean {
    return this.children.length > 0;
  }
  addAction(action: Action.BaseAction) {
    this.actions.push(action);
  }

  animate(time: number) {
    let i: number, t: number;
    if ((time >= this.start) && (time < this.end)) {
      t = (time - this.start) / (this.end - this.start);

      for (i = 0; i < this.actions.length; i ++) {
        this.actions[i].act(t);
        this.actions[i].update();
      }
    }
  }
}




export class Timeline {

  gestures: Array<Gesture>;
  start: number;
  end: number;

  constructor() {
    this.gestures = new Array<Gesture>();
    this.start = this.end = 0
  }

  init() {
    let i: number;
    for (i = 0; i < this.gestures.length; i ++) {
      this.gestures[i].init();
    }
  }

  addGesture(gesture: Gesture) {
    this.gestures.push(gesture);
    if (gesture.end > this.end) {
      this.end = gesture.end;
    }
  }

  getDuration(): number {
    return this.end - this.start;
  }

  animate(frame) {
    let i: number;
    for (i = 0; i < this.gestures.length; i ++) {
      this.gestures[i].animate(frame);
    }
  }

}


