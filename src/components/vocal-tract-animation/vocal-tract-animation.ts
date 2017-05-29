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

    svgPaths = this.elementRef.nativeElement.querySelectorAll('path[svg-label]');
    for (i = 0; i < svgPaths.length; i++) {
      svgPath = svgPaths[i];
      this.vocalTract[svgPath.getAttribute('svg-label')] =
        Geometry.SvgPath.fromPathNode(svgPath);
    }





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

  }



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
