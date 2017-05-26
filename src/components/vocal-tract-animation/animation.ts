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

export abstract class Easing {
  abstract ease(t: number);
}

export class Linear extends Easing {
  ease(t: number) { return t; }
}

export class ReverseLinear extends Easing {
  ease(t: number) { return 1 - t; }
}

export class CubicBezier extends Easing {

  controls: number[];
  constructor(...controls: number[]) {
    super();
    this.controls = controls;
  }

  ease(t: number) {
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
  easing: Easings.Easing;

  constructor() {
    this.points = new Array<Geometry.Point>();
    this.savedPoints = new Array<Geometry.Point>();
    this.paths = new Array<Geometry.SvgPath>();
    this.easing = new Easings.Linear();
  }

  init() {
    let i: number;
    this.savedPoints = new Array<Geometry.Point>();
    console.log(this.points)
    for (i = 0; i < this.points.length; i ++) {
      this.savedPoints.push(this.points[i].copy());
    }
  }

  appendPath(path: Geometry.SvgPath, ...indices: Array<number[]>) {
    this.paths.push(path);
    if (indices) {
      this.points = this.points.concat(path.getPoints(...indices))
    } else {
      this.points = this.points.concat(path.getPoints());
    }
  }

  act(t: number) {}

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
      point = this.savedPoints[i].copy();
      this.points[i].x = point.x + t * this.shift.x;
      this.points[i].y = point.y + t * this.shift.y;
    }
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
      point = this.savedPoints[i].rotateAround(angle, this.around, false);
      this.points[i].x = point.x + t * this.shift.x;
      this.points[i].y = point.y + t * this.shift.y;
    }
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
    t = this.easing.ease(t);
    angle = t * this.angle;
    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].rotateAround(angle, this.around, false);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
  }
}


}

export class Gesture {

  actions: Array<Action.BaseAction>;
  start: number;
  end: number;

  constructor() {
    this.start = this.end = 0;
    this.actions = new Array<Action.BaseAction>();
  }

  init() {
    let i: number;
    for (i = 0; i < this.actions.length; i ++) {
        this.actions[i].init();
      }
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


