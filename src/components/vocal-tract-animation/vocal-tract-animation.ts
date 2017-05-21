import { Component, ElementRef } from '@angular/core';

import { Geometry } from './geometry';


@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html'
})

export class VocalTractAnimationComponent {

  text: string;
  elementRef: ElementRef;
  vocalTract: any;
  animation: string;
  articulators: any;
  jaw: any;
  velum: any;
  larynx: any;
  articulator: any;
  constructor(public me: ElementRef) {
    console.log('Hello VocalTractAnimation Component');
    this.text = 'Hello World';
    this.elementRef = me;
    this.vocalTract = {};
    this.animation = null;
    this.articulators = {};
  }

  ngOnInit() {
    let i: number, svgPath: any, svgPaths: Array<any>;


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


    // let center: Geometry.Point = new Geometry.Point(85, 170);
    // center.show(this.elementRef.nativeElement.querySelector('svg'));

    // this.articulator = new RotateAroundGesture(30, center);
    // this.articulator.paths.push(this.vocalTract['lip-upper']);
    // this.articulator.appendPoints(
    //   this.vocalTract['lip-upper'].getPoints(
    //     Geometry.seq(17, 32)
    //   )
    // );
    let center: Geometry.Point = new Geometry.Point(90, 230);
    center.show(this.elementRef.nativeElement.querySelector('svg'));

    this.articulator = new RotateAroundAction(-30, center);
    this.articulator.appendPath(this.vocalTract['lip-lower'],
        Geometry.seq(0, 9), Geometry.seq(68, 78)
      );
    //this.articulator.init()
    this.jaw = new Gesture();
    this.jaw.addAction(this.articulator);
    this.jaw.addAction(this.larynx);
    this.jaw.start = 0;
    this.jaw.end = 100;
    this.jaw.init();
  }

  setAnimation(animation: string) {
    this.animation = animation;
    console.log(`Setting animation to ${animation}`);
  }

  rangeChange(event) {
    this.jaw.animate(event.value);
  }

}


class VocalTractAnimation {

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

  appendPath(path: Geometry.SvgPath, ...indices: number[]) {
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



class Timeline {
  gestures: Array<Gesture>;

  animation(frame) {
    let i: number;
    for (i = 0; i < this.gestures.length; i ++) {
      this.gestures[i].animate(frame);
    }
  }

}