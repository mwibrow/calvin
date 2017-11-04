import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { Events, Range } from 'ionic-angular';
import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures } from './animation'
import { VocalTractGestures, parseVowelDescriptions  } from './vocal-tract-gestures';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { AnimationFrameRequestProvider } from '../../providers/animation-frame-request/animation-frame-request';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html',
  providers: [AudioProvider]
})
export class VocalTractAnimationComponent {

  text: string;
  vocalTract: any;
  uri: string;

  svg: any;
  range: any;
  rangeMin: number;
  rangeMax: number;
  frame: number;
  gestures: VocalTractGestures;
  speed: number;

  player: AudioPlayer;
  animation: string;
  @ViewChild('animationRange') animationRange: Range;
  @ViewChild('svgContainer') svgContainer: any;

  lipUpperRotationCenter: Geometry.Point;
  lipLowerRotationCenter: Geometry.Point;
  jawRotationCenter: Geometry.Point;
  velumRotationCenter: Geometry.Point;

  constructor(public elementRef: ElementRef, public audio: AudioProvider,
    public animationFrameRequest: AnimationFrameRequestProvider,
    public events: Events) {

    this.vocalTract = {};

    this.rangeMin = 0;
    this.rangeMax = 175;
    this.range = {
      min: `${this.rangeMin}`,
      max: `${this.rangeMax + 1}`
    }
    this.speed = 2;
    this.player = audio.player;
    this.player.initialise();

  }

  setAnimation(animation: string, uri?: string) {
    this.animation = animation;
    this.uri = uri;
  }

  ngAfterViewInit() {
    //this.setupVocalTract()
  }

  svgInserted(e) {
    this.setupVocalTract();
    this.events.publish('svg:loaded');
  }

  ready() {
    return !!this.svg
  }

  setupVocalTract() {
    let i: number, paths: any, path: any, name: string, group: any;
    this.svg = this.elementRef.nativeElement.querySelector('svg')

    this.svg.querySelectorAll('g').forEach(
      g => g.setAttribute('style', 'opacity: 0;'));

    group = this.svg.querySelector('g[id="foreground"')
    if (group) {
      this.svg.removeChild(group);
    }

    group = document.createElementNS(SVG_NAMESPACE, 'g');
    group.setAttribute('id', 'foreground')
    this.svg.appendChild(group);

    this.vocalTract = {};
    paths = this.svg.querySelectorAll('path');
    for (i = 0; i < paths.length; i ++) {
      path = document.createElementNS(SVG_NAMESPACE, 'path');
      group.appendChild(path);
      path.setAttribute('id', paths[i].getAttribute('id'));
      path.setAttribute('class', paths[i].getAttribute('class'));
      path.setAttribute('d', paths[i].getAttribute('d'));
      if (/tongue-.*/.test(path.getAttribute('id'))) {
        path.setAttribute('style', 'opacity:0;');
      }
      this.vocalTract[path.getAttribute('id')] = Geometry.SvgPath.fromPathNode(path);
      this.vocalTract[path.getAttribute('id')].parentSvg = this.svg;
    }
  }

  resetVocalTract() {
    if (this.svg) this.setupVocalTract();
  }

  setupVowelAnimation(description: string) {

    this.resetVocalTract();
    let vowels = parseVowelDescriptions(description);

    switch (vowels.length) {
      case 1:
        this.setupMonophthong(vowels[0]);
        break;
      case 2:
        this.setupDiphthong(vowels);
        break;
      default:
        console.error(`Cannot current animate ${vowels.length} vowels`)
    }
  }

  setupMonophthong(vowel) {
    this.gestures = new VocalTractGestures(this.vocalTract);
    let tongueTarget = this.gestures.getTongueTarget(vowel.front, vowel.open);
    let n: number = Math.floor(this.rangeMax * 0.2);
    let howWide = (vowel.open + 1) / 3 + 0.25;

    this.gestures.addJawOpen(0, n, howWide);
    this.gestures.addJawOpened(n + 1, this.rangeMax - n - 1, howWide);
    this.gestures.addJawClose(this.rangeMax - n, this.rangeMax, howWide);

    if (vowel.rounded) {
      this.gestures.addLipRounding(0, n);
      this.gestures.addLipRounded(n + 1, this.rangeMax - n - 1);
      this.gestures.addLipUnrounding(this.rangeMax - n, this.rangeMax);
    }

    this.gestures.addVocalFoldVibration(n, this.rangeMax - n);
    if (!vowel.nasal) {
      this.gestures.addVelumRaise(0, n);
      this.gestures.addVelumRaised(n + 1, this.rangeMax - n - 1);
      this.gestures.addVelumLower(this.rangeMax - n, this.rangeMax);
    }

    this.gestures.addTongueMovement(0, n, this.gestures.getTongueTarget(0, 0), tongueTarget)
    this.gestures.addTongueMovement(n + 1, this.rangeMax - n - 1, tongueTarget, tongueTarget)
    this.gestures.addTongueMovement(this.rangeMax - n, this.rangeMax, tongueTarget, this.gestures.getTongueTarget(0, 0))
  }

  setupDiphthong(vowels) {
    this.gestures = new VocalTractGestures(this.vocalTract);
    let tongueTarget1 = this.gestures.getTongueTarget(vowels[0].front, vowels[0].open);
    let tongueTarget2 = this.gestures.getTongueTarget(vowels[1].front, vowels[1].open);

    let n: number = Math.floor(this.rangeMax * 0.2);
    let p: number = Math.floor((n + this.rangeMax) / 3)
    let q: number = Math.floor((2 * this.rangeMax - n) / 3)
    let howWide1 = (vowels[0].open + 1) / 3;
    let howWide2 = (vowels[1].open + 1) / 3;
    this.gestures.addJawMovement(0, p, 0, howWide1);
    this.gestures.addJawMovement(p + 1, q, howWide1, howWide2);
    this.gestures.addJawClose(q + 1, this.rangeMax, howWide2);

    if (vowels[0].rounded) {
      this.gestures.addLipRounding(0, p);
      if (vowels[1].rounded) {
        this.gestures.addLipRounded(p + 1, q);
        this.gestures.addLipUnrounding(q + 1, this.rangeMax);
      } else {
        this.gestures.addLipUnrounding(p + 1, q);
        this.gestures.addLipUnrounded(q + 1, this.rangeMax);
      }
    } else {
      this.gestures.addLipUnrounded(0, p);
      if (vowels[1].rounded) {
        this.gestures.addLipRounding(p + 1, q);
        this.gestures.addLipUnrounding(q + 1, this.rangeMax);
      } else {
        this.gestures.addLipUnrounded(p + 1, this.rangeMax);
      }
    }

    this.gestures.addVocalFoldVibration(n, this.rangeMax - n);

    this.gestures.addVelumRaise(0, n);
    this.gestures.addVelumRaised(n + 1, this.rangeMax - n - 1);
    this.gestures.addVelumLower(this.rangeMax - n, this.rangeMax);

    this.gestures.addTongueMovement(0, p, this.gestures.getTongueTarget(0, 0), tongueTarget1)
    this.gestures.addTongueMovement(p + 1, q, tongueTarget1, tongueTarget2)
    this.gestures.addTongueMovement(q + 1, this.rangeMax, tongueTarget2, this.gestures.getTongueTarget(0, 0))
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
    this.rangeChange({ value: this.animationRange.value });
    this.animationFrameRequest.requestAnimationFrame((ev) => this._playAnimation(ev));
    if (this.uri) {
      this.player.playUrl(this.uri);
    }
  }

  _playAnimation(event: any) {
    this.frame += this.speed;
    this.animationRange.setValue(this.frame);
    this.rangeChange({ value: this.animationRange.value });
    if (this.frame < this.range.max) {
      this.animationFrameRequest.requestAnimationFrame((ev) => this._playAnimation(ev));
    } else {
      this.frame = this.range.max;
      this.animationRange.setValue(this.frame);
      this.rangeChange({ value: this.animationRange.value });
    }
  }

}


@Directive({
  selector: '[animation]' // Attribute selector
})
export class AnimationDirective {

  @Input('animation') animation: string;
  constructor(public vocalTractAnimation: VocalTractAnimationComponent) {}

  ngOnInit(){
    this.vocalTractAnimation.setAnimation(this.animation);
  }

}