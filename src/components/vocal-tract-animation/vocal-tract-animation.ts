import { Component, ElementRef, ViewChild} from '@angular/core';
import { Range } from 'ionic-angular';
import { Geometry } from './geometry';
import { Timeline, Animation, Easings }  from './animation'

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
  lowerLip: any;
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
    // this.larynx = new Action.OscillateYAction(2, 0.05);
    // this.larynx.appendPath(this.vocalTract['larynx']);


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
    this.jawRotationCenter = new Geometry.Point(280, 140);


    // let upperLipShift: Geometry.Point = new Geometry.Point(-3,-3);
    // this.upperLip = new Action.TranslateAndRotateAroundAction(upperLipShift, 30, this.upperLipRotationCenter);
    // this.upperLip.appendPath(this.vocalTract['lip-upper'],
    //     Geometry.seq(16, 32)
    // );
    // let center: Geometry.Point = new Geometry.Point(90, 230);
    // center.show(this.elementRef.nativeElement.querySelector('svg'));

    // let shift: Geometry.Point = new Geometry.Point(-5,-5);
    // this.articulator = new Action.TranslateAndRotateAroundAction(shift, -30, center);
    // this.articulator.appendPath(this.vocalTract['lip-lower'],
    //     Geometry.seq(0, 8), Geometry.seq(68, 78)
    //   );
    // //this.articulator.init()
    // this.jaw = new Gesture();
    // this.jaw.addAction(this.articulator);
    // this.jaw.addAction(this.larynx);
    // this.jaw.addAction(this.upperLip);
    // this.jaw.start = 0;
    // this.jaw.end = 100;
    // this.jaw = this.velumCloseGesture(0, 100);
    // this.jaw.init();

    // this.animationRange.setValue(75);
    // this.rangeChange({value: this.animationRange.value});
    //  var evObj = new Event("click", {bubbles: true});
    //  this.animationRange._elementRef.nativeElement.dispatchEvent(evObj);


    // this.timeline.addGesture(this.jawOpenGesture(0, 50));
    // this.timeline.addGesture(this.jawCloseGesture(50, 100));
    // this.timeline.addGesture(this.lipRoundingGesture(0, 50));

    //this.timeline.init();
       console.log(this.timeline)

    // this.jaw = new RotateAroundAction(30, this.upperLipRotationCenter);
    // this.jaw.setPath(this.vocalTract['lip-upper'],
    //      Geometry.seq(16, 32))
    this.lowerLip = new Gesture(0, 100);

    let action = new RotateAroundAction(-30, this.lowerLipRotationCenter);
    action.setPath(this.vocalTract['lip-lower'],
        Geometry.seq(0, 8), Geometry.seq(68, 78)
      );
    this.lowerLip.setAction(action);

    this.jaw = new Gesture(50, 100);

    action = new RotateAroundAction(-8, this.jawRotationCenter);
    action.setPath(this.vocalTract['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
    this.jaw.setAction(action);
    this.lowerLip.setParent(this.jaw);
  }

  // lipRoundingGesture(start, end) {
  //   let upperLipAction: Action.TranslateAndRotateAroundAction;
  //   let lowerLipAction: Action.TranslateAndRotateAroundAction;
  //   let gesture: Gesture;
  //   upperLipAction = new Action.TranslateAndRotateAroundAction(new Geometry.Point(-3,-3), 30, this.upperLipRotationCenter);
  //    upperLipAction.appendPath(this.vocalTract['lip-upper'],
  //       Geometry.seq(16, 32)
  //   );

  //   lowerLipAction = new Action.TranslateAndRotateAroundAction(new Geometry.Point(-5,-5), -30, this.lowerLipRotationCenter);
  //   lowerLipAction.appendPath(this.vocalTract['lip-lower'],
  //       Geometry.seq(0, 8), Geometry.seq(68, 78)
  //     );

  //   gesture = new Gesture();
  //   gesture.start = start;
  //   gesture.end = end;
  //   gesture.addAction(upperLipAction);
  //   gesture.addAction(lowerLipAction);
  //   return gesture;
  // }
  // velumOpenGesture(start, end) {
  //   let center: Geometry.Point;
  //   let gesture: Gesture;
  //   let action: Action.TranslateAndRotateAroundAction;
  //   center = new Geometry.Point(260, 140);
  //   gesture = new Gesture();
  //   action = new Action.TranslateAndRotateAroundAction(new Geometry.Point(8,-5), -20, center);
  //   action.appendPath(this.vocalTract['velum'], Geometry.seq(8, 20));
  //   gesture.addAction(action);
  //   gesture.start = start;
  //   gesture.end = end;
  //   return gesture;
  // }

  // velumCloseGesture(start, end) {
  //   let gesture: Gesture = this.velumOpenGesture(start, end);
  //   gesture.actions[0].easing = new Easings.Reverse(gesture.actions[0].easing);
  //   return gesture;
  // }

  // jawOpenGesture(start, end) {
  //   let gesture: Gesture, action: Action.TranslateAndRotateAroundAction;
  //   action = new Action.TranslateAndRotateAroundAction(new Geometry.Point(0,12), -8, this.jawRotationCenter);
  //   action.appendPath(this.vocalTract['teeth-lower']);
  //   action.appendPath(this.vocalTract['gum-lower']);
  //   action.appendPath(this.vocalTract['tongue'], Geometry.seq(10,32));
  //   action.appendPath(this.vocalTract['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
  //   action.appendPoints(this.lowerLipRotationCenter);
  //   gesture = new Gesture();
  //   gesture.start = start;
  //   gesture.end = end;
  //   gesture.addAction(action);
  //   return gesture;
  // }

  // jawCloseGesture(start, end) {
  //   let gesture: Gesture = this.jawOpenGesture(start, end);
  //   gesture.actions[0].easing = new Easings.Reverse(gesture.actions[0].easing);
  //   return gesture;
  // }


  setAnimation(animation: string) {
    this.animation = animation;
    console.log(`Setting animation to ${animation}`);
  }

  clickOverlay(event) {
    event.preventDefault();
  }
  rangeChange(event) {
    //this.timeline.animate(event.value)
    let t = event.ratio;
    console.log(t);
    this.jaw.setT(event.value);
    this.jaw.act();
    this.jaw.update();
    this.lowerLip.setT(event.value);
    this.lowerLip.act();
    this.lowerLip.update();
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

class VocalTractTimeline {

  duration: number;

  velum: Timeline;
  lipUpper: Timeline;
  epiglottis: Timeline;
  vocalFolds: Timeline;
  jaw: Gesture;
  lipLower: Gesture;
  teethLower: Gesture;
  gumLower: Gesture;
  tongue: Gesture;


}

class Action {
  parent: Action;
  path: Geometry.SvgPath;
  easing: Easings.BaseEasing;
  pathPoints: Geometry.Points;
  savedPoints: Geometry.Points;
  points: Geometry.Points;
  t: number;

  constructor() {
    this.parent = null;
    this.path = null;
    this.easing = new Easings.Linear();
    this.pathPoints = this.savedPoints = this.points = null;
    this.t = 0;
  }

  setParent(action: Action) {
    this.parent = action;
  }

  setT(t: number) {
    this.t = t;
  }

  setPath(path: Geometry.SvgPath, ...indices: Array<number[]>) {
    let points: Geometry.Points ;
    this.path = path;
    points = path.getPoints(...indices);
    this.pathPoints = path.getPoints(...indices);
    this.savedPoints = this.pathPoints.copy();
    this.points = this.savedPoints.copy();
  }

  preAct() {}

  resetPoints() {
    this.points = this.savedPoints.copy();
    if (this.parent) {
      this.points.apply((x) => this.parent.actOn(x))
    }
  }

  act() {}

  actOn(point: Geometry.Point): Geometry.Point {
    return point;
  }

  update() {
    this.path && this.path.update();
  }
}


class RotateAroundAction extends Action {

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
    let i: number;
    let point: Geometry.Point;
    this.resetPoints();
    for (i = 0; i < this.points.length(); i ++) {
      point = this.actOn(this.points.get(i));
      this.pathPoints.get(i).update(point);
    }
  }

  actOn(point: Geometry.Point) {
    return point.rotateAround(this.angle, this.around, false);
  }
}

class Gesture {
  start: number;
  end: number;
  parent: Gesture;
  action: Action;
  t: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.parent = null;
    this.t = 0;
  }

  setAction(action: Action) {
    this.action = action;
  }
  setParent(gesture: Gesture) {
    this.parent = gesture;
    this.action.setParent(gesture.action);
  }

  setT(frame: number) {
    let t: number;
    if (frame < this.start) {
      this.t = 0;
    } else {
      if (frame >= this.end) {
        this.t = 1;
      } else {
        this.t = (frame - this.start) / (this.end - this.start);
      }
    }
    this.action.setT(this.t);
  }

  act() {
    this.action.act();
  }

  update() {
    this.action.update();
  }


}



