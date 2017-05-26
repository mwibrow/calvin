import { Component, ElementRef, ViewChild} from '@angular/core';
import { Range } from 'ionic-angular';
import { Geometry } from './geometry';
import { Action, Gesture, Timeline, Animation, Easings }  from './animation'

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
    this.larynx = new Action.OscillateYAction(2, 0.05);
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
    this.upperLip = new Action.TranslateAndRotateAroundAction(upperLipShift, 30, this.upperLipRotationCenter);
    this.upperLip.appendPath(this.vocalTract['lip-upper'],
        Geometry.seq(16, 32)
    );
    let center: Geometry.Point = new Geometry.Point(90, 230);
    center.show(this.elementRef.nativeElement.querySelector('svg'));

    let shift: Geometry.Point = new Geometry.Point(-5,-5);
    this.articulator = new Action.TranslateAndRotateAroundAction(shift, -30, center);
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
    let action: Action.TranslateAndRotateAroundAction;
    center = new Geometry.Point(260, 140);
    gesture = new Gesture();
    action = new Action.TranslateAndRotateAroundAction(new Geometry.Point(8,-5), -20, center);
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



