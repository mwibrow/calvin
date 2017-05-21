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
    let center: Geometry.Point = new Geometry.Point(260, 140);
    center.show(this.elementRef.nativeElement.querySelector('svg'));
    this.velum = new TranslateAndRotateAroundGesture(new Geometry.Point(8,-5), -20, center);
    this.velum.paths.push(this.vocalTract['velum']);
    this.velum.appendPoints(this.vocalTract['velum'].getPoints(
      Geometry.seq(8,20)
    ));
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

    this.velum.init();
    // this.jaw = jaw;
  }

  setAnimation(animation: string) {
    this.animation = animation;
    console.log(`Setting animation to ${animation}`);
  }

  rangeChange(event) {
    this.velum.act(event.ratio);
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


namespace Easing {

  export function linear(t) {
    return t;
  }

  export function sine(t) {
    return Math.sin(t * Math.PI);
  }

}



class Gesture {

  start: number;
  duration: number;
  points: Array<Geometry.Point>;
  savedPoints: Array<Geometry.Point>;
  paths: Array<Geometry.SvgPath>;
  easing: any;

  constructor() {
    this.start = this.duration = 0;
    this.points = new Array<Geometry.Point>();
    this.savedPoints = new Array<Geometry.Point>();
    this.paths = new Array<Geometry.SvgPath>();
    this.easing = Easing.linear;
  }

  appendPoint(point: Geometry.Point) {
    this.points.push(point);
  }

  appendPoints(points: Array<Geometry.Point>) {
    this.points = this.points.concat(points);
  }
  init() {
    let i: number;
    //console.log(this.points);
    this.savedPoints = new Array<Geometry.Point>();
    for (i = 0; i < this.points.length; i ++) {
      this.savedPoints.push(this.points[i].copy());
    }
  }

  animate(frame: number) {
    let t: number;
    if ((frame >= this.start) && (frame < this.start + this.duration)) {
      t = this.easing((frame - this.start) / this.duration);
      this.act(t);
      this.update();
    }
  }

  update() {
    let i: number;
    for (i = 0; i < this.paths.length; i ++) {
      this.paths[i].update();
    }
  }
  act(t: number, update=true) {};
}


class RotateAroundGesture extends Gesture {

  around: Geometry.Point;
  angle: number;

  constructor(angle: number, around: Geometry.Point) {
    super();
    this.angle = angle;
    this.around = around;
  }

  act(t: number, update=true) {
    let i: number, angle: number;
    let point: Geometry.Point;
    t = this.easing(t);
    angle = t * this.angle;
    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].rotateAround(angle, this.around, false);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
    update && this.update();
  }
}

class TranslationGesture extends Gesture {

  shift: Geometry.Point;

  constructor(shift: Geometry.Point) {
    super();
    this.shift = shift;
  }

  act(t: number, update=true) {
    let i: number;
    let point: Geometry.Point;
    t = this.easing(t);
    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].copy();
      this.points[i].x = point.x + t * this.shift.x;
      this.points[i].y = point.y + t * this.shift.y;
    }
    update && this.update();
  }
}

class TranslateAndRotateAroundGesture extends Gesture {

  shift: Geometry.Point;
  around: Geometry.Point;
  angle: number;
  constructor(shift: Geometry.Point, angle: number, around: Geometry.Point) {
    super();
    this.shift = shift;
    this.angle = angle;
    this.around = around;
  }


  act(t: number, update=true) {
    let i: number, angle: number;
    let point: Geometry.Point;
    t = this.easing(t);
    angle = t * this.angle;
    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].rotateAround(angle, this.around, false);
      this.points[i].x = point.x + t * this.shift.x;
      this.points[i].y = point.y + t * this.shift.y;
    }
    update && this.update();
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