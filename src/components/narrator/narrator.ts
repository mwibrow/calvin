import { Component, ElementRef } from '@angular/core';
import { AudioProvider } from '../../providers/audio/audio';

import * as Meyda from 'meyda';

@Component({
  selector: 'narrator',
  templateUrl: 'narrator.html',
  providers: [ AudioProvider ]
})
export class NarratorComponent {

  text: string;
  svg: any;
  inset: boolean;
  currentGroupId: string;
  lastGroupId: string;
  visualiser: SpeechVisualiser;
  allGroupIds: Array<string>;
  groupIds: Array<string>;
  groups: any;
  value: number;
  lastValue: number;
  silenceCount: number;
  heightWeights: Float32Array;
  backWeights: Float32Array;
  constructor(public elementRef: ElementRef, public audio: AudioProvider) {
     this.elementRef.nativeElement.querySelector('svg');
     this.inset = false;
     this.lastGroupId = '';
     this.allGroupIds = ['neutral', 'small', 'medium', 'large', 'small-rounded', 'medium-rounded', 'large-rounded'];
    this.groupIds = ['small', 'medium', 'large', 'small-rounded', 'medium-rounded', 'large-rounded'];
     this.audio.getAudioPlayer();
     this.visualiser = new SpeechVisualiser({
       fftSize: 128,
       smoothingTimeConstant: 0.85
     });
     this.groups = {};
     this.value = this.lastValue = 0;
    this.silenceCount = 0;

    this.heightWeights = new Float32Array([
      1.104270, 0.120389, 0.271996, 0.246571, 0.029848, -0.489273, -0.734283,
      -0.796145, -0.441830, -0.033330, 0.415667, 0.341943, 0.380445, 0.260451,
      0.092989, -0.161122, -0.173544, -0.015523, 0.251668, 0.022534, 0.054093,
      0.005430, -0.035820, -0.057551, 0.161558
    ]);
    this.backWeights = new Float32Array([
      0.995437, 0.540693, 0.121922, -0.585859, -0.443847, 0.170546, 0.188879,
      -0.306358, -0.308599, -0.212987, 0.012301, 0.574838, 0.681862, 0.229355,
      -0.222245, -0.222203, -0.129962, 0.329717, 0.142439, -0.132018, 0.103092,
      0.052337, -0.034299, -0.041558, 0.141547
    ]);
  }

  getInset() {
    if (this.inset) {
      return "inset";
    }
  }

   ngOnInit() {
    let i: number, svgGroup: any, svgGroups: Array<any>, id: string;

    svgGroups = this.elementRef.nativeElement.querySelectorAll('g[svg-label]');
    for (i = 0; i < svgGroups.length; i++) {

      svgGroup = svgGroups[i];
      id = svgGroup.getAttribute('id')
      this.groups[id] = svgGroup;
    }
    console.log(this.groups)
    for (i = 0; i < this.allGroupIds.length; i++) {
        this.hideGroup(this.allGroupIds[i]);
    }

    this.currentGroupId = 'neutral';
    this.showGroup('neutral');
   }

   showGroup(group:string) {
    this.groups[group].setAttribute('class', '');
   }

   hideGroup(group:string) {
     this.groups[group].setAttribute('class', 'hidden');
   }


  ngAfterViewInit() {
    let that: any = this;
    this.visualiser.visualise = (elapsed, timeBuffer, freqBuffer) => this.updateSpeaker(elapsed, timeBuffer, freqBuffer);
    this.visualiser.onStop = () => this.stopSpeaker();

    this.visualiser.initialise(this.audio.audioPlayer);
    //this.audio.audioPlayer.onInitialise.add(() => this.play());
    this.audio.audioPlayer.initialise();

  }

  updateSpeaker(elapsed: number, timeBuffer: Float32Array, frequencyBuffer: Float32Array) {

      let mfcc: Float32Array;
      let i: number, n: number, height: number, back: number;
      let id: string;

      n = Math.floor(Math.random() * this.groupIds.length);

      this.lastValue = this.value;
      this.value = Math.sqrt(
        timeBuffer.reduce(function(seq, value){return seq + value ** 2;}) / timeBuffer.length) || 0.0;
      this.value = Math.floor(this.value * 30);

      mfcc = Meyda.extract('mfcc', timeBuffer);

      height = 0;
      back = 0;
      for (i = 0; i < mfcc.length; i ++) {
        height += mfcc[i] * this.heightWeights[i];
        back += mfcc[i] * this.backWeights[i];
      }

      back = Math.floor(back / 100);
      height = Math.floor(height/ 100);

      id = ['small', 'medium', 'large'][2 - height]
      if (back === 2 && (height !== 1)) {
        id += '-rounded';
      }

      if (this.value > 0 && this.value !== this.lastValue) {
         this.silenceCount = 0;
        this.lastGroupId = this.currentGroupId;
        this.currentGroupId = id;//this.groupIds[n];
        if (this.currentGroupId !== this.lastGroupId) {
          this.showGroup(this.currentGroupId);
          this.hideGroup(this.lastGroupId);
        }
      } else {
        this.silenceCount = this.silenceCount + 1;
        if (this.silenceCount > 15 && this.currentGroupId !== 'neutral') {
          this.lastGroupId = this.currentGroupId;
          this.currentGroupId = 'neutral';
          this.showGroup(this.currentGroupId);

          this.hideGroup(this.lastGroupId);
        }
      }

  }

  stopSpeaker() {
    this.lastGroupId = this.currentGroupId;
    this.currentGroupId = 'neutral';
    this.showGroup(this.currentGroupId);
    if (this.lastGroupId !== this.currentGroupId) {
      this.hideGroup(this.lastGroupId);
    }

  }

  play(cb?: any) {
    if (cb) {
      this.audio.audioPlayer.onEnded.add(() => cb());
    }
    this.audio.audioPlayer.playUrl('assets/audio/chloe.wav');
  }
}


class SpeechVisualiser {


  visualise: any;
  running: boolean;
  analyserProperties: any;

  timeAnalyser: AnalyserNode;
  timeBuffer: Float32Array;

  frequencyAnalyser: AnalyserNode;
  frequencyBuffer: Float32Array;

  startTime: number;

  onStop: any;
  constructor(analyserProperties?: any) {
    this.timeAnalyser = this.frequencyAnalyser = null;
    this.timeBuffer = this.frequencyBuffer = null;
    this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;
    this.startTime = 0;

    this.onStop = null;
  }

  initialise(player: any) {
    player.onInitialise.add((context) => this._initialise(context, player));
  }

  _initialise(context, player: any) {

    let property: any;
    player.onStart.add(() => this.start());
    player.onStop.add(() => this.stop());
    player.onEnded.add(() => this.stop());

    this.timeAnalyser = player.context.createAnalyser();
    this.timeBuffer = new Float32Array(2048);

    player.addNode(this.timeAnalyser);

    this.frequencyAnalyser = player.context.createAnalyser()
    this.frequencyAnalyser.fftSize = 32;

    this.frequencyAnalyser.smoothingTimeConstant = 0.8;

    let filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    player.addNode(filter);
    filter.connect(this.frequencyAnalyser);

    this.frequencyBuffer = new Float32Array(this.frequencyAnalyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    this.startTime = (new Date()).getTime();
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
    this.onStop && this.onStop()
  }

  _visualise(event: any) {
    this.timeAnalyser.getFloatTimeDomainData(this.timeBuffer);
    this.frequencyAnalyser.getFloatFrequencyData(this.frequencyBuffer);
    this.visualise && this.visualise(
      (new Date()).getTime() - this.startTime,
      this.timeBuffer,
      this.frequencyBuffer
    );
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


}

class KeyFrames {
  frames: Array<KeyFrame>;
  index: 0;
  constructor() {
    this.frames = new Array<KeyFrame>();
    this.index = 0;
  }

  initialise() {
    let i: number, time: number = 0;
    for (i = 0; i < this.frames.length; i ++) {
      this.frames[i].start = time;
      time + this.frames[i].duration;
      this.frames[i].end = time;
    }
    this.index = 0;
  }

  getCurrentFrame() {
    return this.frames[this.index];
  }

  update(time) {
    while (this.index < this.frames.length - 1 && time < this.frames[this.index].end) {
      this.index ++;
    }
  }

}

class KeyFrame {

  start: number;
  end: number;
  constructor(public name:string, public duration: number) {}
}