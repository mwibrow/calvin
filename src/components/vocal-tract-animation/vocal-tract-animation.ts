import { Component, ElementRef, ViewChild} from '@angular/core';
import { Range } from 'ionic-angular';
import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures}  from './animation'
import { VocalTractGestures} from './vocal-tract-gestures';
import { AudioProvider } from '../../providers/audio/audio';
import { AnimationFrameRequestProvider } from '../../providers/animation-frame-request/animation-frame-request';


@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html',
  providers: [ AudioProvider ]
})
export class VocalTractAnimationComponent {

  text: string;
  vocalTract: any;
  uri: string;

  svg: any;
  range: any;
  frame: number;
  gestures: VocalTractGestures;
  speed: number;

  player: any;
  animation: string;
  @ViewChild('animationRange') animationRange: Range;
  @ViewChild('svgContainer') svgContainer: any;

  lipUpperRotationCenter: Geometry.Point;
  lipLowerRotationCenter: Geometry.Point;
  jawRotationCenter: Geometry.Point;
  velumRotationCenter: Geometry.Point;

  constructor(public elementRef: ElementRef, public audio: AudioProvider,
    public animationFrameRequest: AnimationFrameRequestProvider) {

    this.vocalTract = {};


    this.range = {
      min: "0",
      max: "100"
    }
    this.speed = 1;
    this.player = audio.getAudioPlayer();
    this.player.initialise();
  }

  setAnimation(animation: string, uri?:string) {
    this.animation = animation;
    this.uri = uri;
  }


  ngOnInit() {
    let i: number, svgPath: any, svgPaths: Array<any>, name: string;
     this.svg = this.elementRef.nativeElement.querySelector('svg')
    svgPaths = this.elementRef.nativeElement.querySelectorAll('path[svg-label]');
    for (i = 0; i < svgPaths.length; i++) {

      svgPath = svgPaths[i];
      svgPath.setAttribute('style', '');

      if (svgPath.getAttribute('svg-label').startsWith('tongue-')) {
        svgPath.setAttribute('style', 'opacity:0;');
      }

      this.vocalTract[svgPath.getAttribute('svg-label')] =
        Geometry.SvgPath.fromPathNode(svgPath);

      this.vocalTract[svgPath.getAttribute('svg-label')].parentSvg = this.svg;

      this.vocalTract['tongue'].showPathConstruction = true;
    }

    let gesture: Gesture;
    this.gestures = new VocalTractGestures(this.vocalTract);

    // this.gestures.addJawOpen(0, 25, 0.25);
    // this.gestures.addJawOpened(26, 75, 0.25);
    // this.gestures.addJawClose(76, 100, 0.25);
    this.gestures.addLipRounding(0, 25);
    this.gestures.addLipRounded(26, 75);
    this.gestures.addLipUnrounding(76, 100);
    this.gestures.addVelumRaise(0, 20);
    this.gestures.addVelumRaised(21, 79);
    this.gestures.addVelumLower(80, 100);
    this.gestures.addVocalFoldVibration(20, 80);
    this.gestures.addTongueMovement(0, 20, 'neutral');
    this.gestures.addTongueMovement(21, 50, 'neutral', 'whod');
    this.gestures.addTongueMovement(21, 50, 'whod');
    this.gestures.addTongueMovement(81, 100, 'whod', 'neutral');
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
    this.animationFrameRequest.requestAnimationFrame((ev) => this._playAnimation(ev));
    if (this.uri) {
      this.player.playUri(this.uri);
    }
  }

  _playAnimation(event:any) {
    this.frame += this.speed;
    this.animationRange.setValue(this.frame);
    this.rangeChange({value: this.animationRange.value});
    if (this.frame < this.range.max) {
      this.animationFrameRequest.requestAnimationFrame((ev) => this._playAnimation(ev));
    } else {
      this.frame = this.range.max;
      this.animationRange.setValue(this.frame);
      this.rangeChange({value: this.animationRange.value});
    }
  }

}
