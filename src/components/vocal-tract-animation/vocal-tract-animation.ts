import { Component, ElementRef, ViewChild} from '@angular/core';
import { Range } from 'ionic-angular';
import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures}  from './animation'
import { VocalTractGestures} from './vocal-tract-gestures';
@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html'
})
export class VocalTractAnimationComponent {

  text: string;
  vocalTract: any;

  svg: any;
  range: any;
  frame: number;
  gestures: VocalTractGestures;
  speed: number;

  @ViewChild('animationRange') animationRange: Range;
  @ViewChild('svgContainer') svgContainer: any;

  lipUpperRotationCenter: Geometry.Point;
  lipLowerRotationCenter: Geometry.Point;
  jawRotationCenter: Geometry.Point;
  velumRotationCenter: Geometry.Point;

  constructor(public elementRef: ElementRef) {
    console.log('Hello VocalTractAnimation Component');
    this.text = 'Hello World';
    this.vocalTract = {};

    this.svg = this.elementRef.nativeElement.querySelector('svg')
    this.range = {
      min: "0",
      max: "100"
    }
    this.speed = 5;
  }

  setAnimation(animation: string) {

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




    this.lipUpperRotationCenter = new Geometry.Point(85, 170);
    this.lipLowerRotationCenter = new Geometry.Point(90, 230);
    this.jawRotationCenter = new Geometry.Point(280, 140);
    this.velumRotationCenter = new Geometry.Point(260, 140);


    let gesture: Gesture;
    this.gestures = new VocalTractGestures(this.vocalTract);

    this.gestures.addJawOpen(0, 50);
    this.gestures.addJawClose(50, 100);
    this.gestures.addLipRounding(0, 50);
    this.gestures.addLipUnrounding(50, 100);
    this.gestures.addVelumRaise(0, 20);
    this.gestures.addVelumRaised(20, 80);
    this.gestures.addVelumLower(80, 100);
    // let action: Actions.BaseAction;
    // gesture = new Gesture(0, 100);
    // action = new Actions.RotateAroundAction(-35, this.lipLowerRotationCenter);
    //   action = new Actions.TranslateAndRotateAroundAction(new Geometry.Vector(-5,-10), -35, this.lipLowerRotationCenter);
    // action.addPath(this.vocalTract['lip-lower'],
    //     Geometry.seq(0, 8), Geometry.seq(68, 78)
    //   );
    // gesture.setAction(action);
    // this.gestures.lipLower.appendGesture(gesture);

    // gesture = new Gesture(0, 100);
    // action = new Actions.TranslateAndRotateAroundAction(new Geometry.Vector(-5,0), 35, this.lipUpperRotationCenter);
    // action.addPath(this.vocalTract['lip-upper'], Geometry.seq(16, 32));
    // gesture.setAction(action);
    // this.gestures.lipUpper.appendGesture(gesture);

    // gesture = new Gesture(25, 75);
    // action = new Actions.TranslateAndRotateAroundAction(new Geometry.Vector(-8, 4), -8, this.jawRotationCenter);
    // action.addPath(this.vocalTract['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
    // action.addPath(this.vocalTract['teeth-lower']);
    // action.addPath(this.vocalTract['gum-lower']);
    // action.addPath(this.vocalTract['tongue'], Geometry.seq(10,32));
    // gesture.setAction(action);

    // this.gestures.jaw.appendGesture(gesture);

    //   let center: Geometry.Point;

    // center = new Geometry.Point(260, 140);
    // gesture = new Gesture(50,100);
    // action = new Actions.TranslateAndRotateAroundAction(new Geometry.Point(9,-5), -20, center);
    // action.addPath(this.vocalTract['velum'], Geometry.seq(8, 20));
    // gesture.setAction(action);
    // this.gestures.velum.appendGesture(gesture);

    // console.log(this.gestures)
    //this.lowerLip.setParent(this.jaw);
  }

  // lipRoundingGesture(start, end) {
  //   let upperLipAction: Action.TranslateAndRotateAroundAction;
  //   let lowerLipAction: Action.TranslateAndRotateAroundAction;
  //   let gesture: Gesture;
  //   upperLipAction = new Action.TranslateAndRotateAroundAction(new Geometry.Point(-3,-3), 30, this.lipUpperRotationCenter);
  //    upperLipAction.appendPath(this.vocalTract['lip-upper'],
  //       Geometry.seq(16, 32)
  //   );

  //   lowerLipAction = new Action.TranslateAndRotateAroundAction(new Geometry.Point(-5,-5), -30, this.lipLowerRotationCenter);
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
  //   action.appendPoints(this.lipLowerRotationCenter);
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




  clickOverlay(event) {
    event.preventDefault();
  }
  rangeChange(event) {
    //this.timeline.animate(event.value)
    this.gestures.setT(event.value);
    this.gestures.act();
    this.gestures.update();
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
    this.frame += this.speed;
    this.animationRange.setValue(this.frame);
    this.rangeChange({value: this.animationRange.value});
    if (this.frame < this.range.max) {
      window.requestAnimationFrame((ev) => this._playAnimation(ev));
    } else {
      this.frame = this.range.max;
      this.animationRange.setValue(this.frame);
      this.rangeChange({value: this.animationRange.value});
    }
  }

}
