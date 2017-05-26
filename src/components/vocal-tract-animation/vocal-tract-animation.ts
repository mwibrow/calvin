import { Component, ElementRef, ViewChild} from '@angular/core';
import { Range } from 'ionic-angular';
import { Geometry } from './geometry';


@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html'
})
export class VocalTractAnimationComponent {

  text: string;
  vocalTract: any;
  animation: string;
  articulators: any;
  jaw: any;
  velum: any;
  larynx: any;
  articulator: any;
  upperLip: any;
  svg: any;
  range: any;
  frame: number;
  @ViewChild(Range) animationRange: Range;
  @ViewChild('svgContainer') svgContainer: any;

  upperLipRotationCenter: Geometry.Point;
  lowerLipRotationCenter: Geometry.Point;
  jawRotationCenter: Geometry.Point;

  timeline: Timeline;
  constructor(public elementRef: ElementRef) {
    console.log('Hello VocalTractAnimation Component');
    this.text = 'Hello World';
    this.vocalTract = {};
    this.animation = null;
    this.articulators = {};
    this.svg = this.elementRef.nativeElement.querySelector('svg')
    this.range = {
      lower:0 ,
      upper: 200,
      value: 75
    }
    this.timeline = new Timeline();
  }

  ngOnInit() {
    let i: number, svgPath: any, svgPaths: Array<any>;

    console.log(this.svgContainer.nativeElement.getAttribute('width'));
    svgPaths = this.elementRef.nativeElement.querySelectorAll('path[svg-label]');
    for (i = 0; i < svgPaths.length; i++) {
      svgPath = svgPaths[i];
      this.vocalTract[svgPath.getAttribute('svg-label')] =
        Geometry.SvgPath.fromPathNode(svgPath);
    }
    console.log(this.vocalTract)
    this.larynx = new OscillateYAction(2, 0.05);
    this.larynx.appendPath(this.vocalTract['larynx']);


    // let center: Geometry.Point = new Geometry.Point(260, 140);
    // center.show(this.elementRef.nativeElement.querySelector('svg'));
    // this.velum = new TranslateAndRotateAroundGesture(new Geometry.Point(8,-5), -20, center);
    // this.velum.paths.push(this.vocalTract['velum']);
    // this.velum.appendPoints(this.vocalTract['velum'].getPoints(
    //   Geometry.seq(8,20)
    // ));

    // let center: Geometry.Point = new Geometry.Point(350, 200);
    // center.show(this.elementRef.nativeElement.querySelector('svg'));
    // let jaw = new RotateAroundGesture(-10, center);
    // jaw.paths.push(this.vocalTract['teeth-lower']);
    // jaw.paths.push(this.vocalTract['lip-lower']);
    // jaw.paths.push(this.vocalTract['gum-lower']);
    // jaw.paths.push(this.vocalTract['teeth-lower']);
    // jaw.paths.push(this.vocalTract['tongue']);

    // jaw.appendPoints(this.vocalTract['teeth-lower'].getPoints());
    // jaw.appendPoints(this.vocalTract['gum-lower'].getPoints());
    // // jaw.appendPoints(this.vocalTract['teeth-lower'].getPoints());
    // jaw.appendPoints(this.vocalTract['tongue'].getPoints(
    //     Geometry.seq(10,32)
    // ));
    // jaw.appendPoints(this.vocalTract['lip-lower'].getPoints(
    //   Geometry.seq(0,24), Geometry.seq(52, 78)
    // ));
    // jaw.init();
    // jaw.act(0);

    //this.larynx.init();
    // this.jaw = jaw;

    this.upperLipRotationCenter = new Geometry.Point(85, 170);
    this.lowerLipRotationCenter = new Geometry.Point(90, 230);



    let upperLipShift: Geometry.Point = new Geometry.Point(-3,-3);
    this.upperLip = new TranslateAndRotateAroundAction(upperLipShift, 30, this.upperLipRotationCenter);
    this.upperLip.appendPath(this.vocalTract['lip-upper'],
        Geometry.seq(16, 32)
    );
    let center: Geometry.Point = new Geometry.Point(90, 230);
    center.show(this.elementRef.nativeElement.querySelector('svg'));

    let shift: Geometry.Point = new Geometry.Point(-5,-5);
    this.articulator = new TranslateAndRotateAroundAction(shift, -30, center);
    this.articulator.appendPath(this.vocalTract['lip-lower'],
        Geometry.seq(0, 8), Geometry.seq(68, 78)
      );
    //this.articulator.init()
    this.jaw = new Gesture();
    this.jaw.addAction(this.articulator);
    this.jaw.addAction(this.larynx);
    this.jaw.addAction(this.upperLip);
    this.jaw.start = 0;
    this.jaw.end = 100;
    this.jaw = this.velumCloseGesture(0, 100);
    this.jaw.init();

    this.animationRange.setValue(75);
    this.rangeChange({value: this.animationRange.value});
    //  var evObj = new Event("click", {bubbles: true});
    //  this.animationRange._elementRef.nativeElement.dispatchEvent(evObj);


    this.timeline.addGesture(this.jaw);
    this.timeline.init();
  }

  velumOpenGesture(start, end) {
    let center: Geometry.Point;
    let gesture: Gesture;
    let action: Action;
    center = new Geometry.Point(260, 140);
    gesture = new Gesture();
    action = new TranslateAndRotateAroundAction(new Geometry.Point(8,-5), -20, center);
    action.appendPath(this.vocalTract['velum'], Geometry.seq(8, 20));
    gesture.addAction(action);
    gesture.start = start;
    gesture.end = end;
    return gesture;
  }

  velumCloseGesture(start, end) {

    let gesture: Gesture = this.velumOpenGesture(start, end);
    gesture.actions[0].easing = new Easings.ReverseLinear();
    return gesture;
  }

  setAnimation(animation: string) {
    this.animation = animation;
    console.log(`Setting animation to ${animation}`);
  }

  clickOverlay(event) {
    event.preventDefault();
  }
  rangeChange(event) {
    this.timeline.animate(event.value);
  }

  playAnimation() {
    this.frame = 0;
    this.animationRange.setValue(0);
    this.rangeChange({value: this.animationRange.value});
    let win: any = window;
    let that = this;
    window.requestAnimationFrame((ev) => this._playAnimation(ev));
  }

  _playAnimation(event) {
    this.frame += 5;
    this.animationRange.setValue(this.frame);
    this.rangeChange({value: this.animationRange.value});
    if (this.frame < 100) {

    window.requestAnimationFrame((ev) => this._playAnimation(ev));
    }
  }

animationClick(event) {
  console.log(event)
}
}



class Animation {

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

class Articulator {

  paths: Array<Geometry.SvgPath>;
  points: Array<Geometry.Point>;
  gestures: {
    name: string,
    gesture: Gesture
  };

}


namespace Easings {

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


class Action {

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





class TranslationAction extends Action {

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

class TranslateAndRotateAroundAction extends Action {

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

class OscillateYAction extends Action {


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







class RotateAroundAction extends Action {
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



class Gesture {

  actions: Array<Action>;
  start: number;
  end: number;

  constructor() {
    this.start = this.end = 0;
    this.actions = new Array<Action>();
  }

  init() {
    let i: number;
    for (i = 0; i < this.actions.length; i ++) {
        this.actions[i].init();
      }
  }
  addAction(action: Action) {
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




class Timeline {

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