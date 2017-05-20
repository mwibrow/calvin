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
    let center: Geometry.Point = new Geometry.Point(350, 200);
    center.show(this.elementRef.nativeElement.querySelector('svg'));
    let jaw = new RotateAroundGesture(-10, center);
    jaw.paths.push(this.vocalTract['teeth-lower']);
    jaw.paths.push(this.vocalTract['lip-lower']);
    jaw.paths.push(this.vocalTract['gum-lower']);
    jaw.paths.push(this.vocalTract['teeth-lower']);
    jaw.paths.push(this.vocalTract['tongue']);

    jaw.appendPoints(this.vocalTract['teeth-lower'].getPoints());
    jaw.appendPoints(this.vocalTract['gum-lower'].getPoints());
    // jaw.appendPoints(this.vocalTract['teeth-lower'].getPoints());
    jaw.appendPoints(this.vocalTract['tongue'].getPoints(
        Geometry.seq(10,32)
    ));
    jaw.appendPoints(this.vocalTract['lip-lower'].getPoints(
      Geometry.seq(0,24), Geometry.seq(52, 78)
    ));
    jaw.init();
    jaw.act(0);


    this.jaw = jaw;
  }

  setAnimation(animation: string) {
    this.animation = animation;
    console.log(`Setting animation to ${animation}`);
  }

  rangeChange(event) {
    this.jaw.act(event.ratio);
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
  act(t) {};
}


class RotateAroundGesture extends Gesture {

  around: Geometry.Point;
  angle: number;

  constructor(angle: number, around: Geometry.Point) {
    super();
    this.angle = angle;
    this.around = around;
  }

  act(t) {
    let i: number, angle: number;
    let point: Geometry.Point;
    angle = t * this.angle;
    for (i = 0; i < this.points.length; i ++) {
      point = this.savedPoints[i].rotateAround(angle, this.around, false);
      this.points[i].x = point.x;
      this.points[i].y = point.y;
    }
    this.update();
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