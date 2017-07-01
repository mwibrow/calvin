import { Component, ElementRef } from '@angular/core';
import { AudioProvider } from '../../providers/audio/audio';
@Component({
  selector: 'narrator',
  templateUrl: 'narrator.html',
  providers: [ AudioProvider ]
})
export class NarratorComponent {

  text: string;
  svg: any;
  currentGroupId: string;
  lastGroupId: string;
  visualiser: SpeechVisualiser;
  allGroupIds: Array<string>;
  groupIds: Array<string>;
  groups: any;
  value: number;
  lastValue: number;
  silenceCount: number;
  constructor(public elementRef: ElementRef, public audio: AudioProvider) {
     this.elementRef.nativeElement.querySelector('svg');

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
    this.visualiser.visualise = (timeBuffer, freqBuffer) => this.updateSpeaker(timeBuffer, freqBuffer);


    this.visualiser.initialise(this.audio.audioPlayer);
    this.audio.audioPlayer.onInitialise.add(() => this.play());
    this.audio.audioPlayer.initialise();

  }

  updateSpeaker(timeBuffer: Float32Array, frequencyBuffer: Float32Array) {
     var buffer = timeBuffer;
      var n = Math.floor(Math.random() * this.groupIds.length);
      this.lastValue = this.value;
      this.value = Math.sqrt(buffer.reduce(function(s,v){return s + v ** 2;}) / buffer.length) || 0.0;

      this.value = Math.floor(this.value * 15);
      //console.log(this.value)
      if (this.value > 0 && this.value !== this.lastValue) {
         this.silenceCount = 0;
        this.lastGroupId = this.currentGroupId;
        this.currentGroupId = this.groupIds[n];
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

  play() {
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

  constructor(analyserProperties?: any) {
    this.timeAnalyser = this.frequencyAnalyser = null;
    this.timeBuffer = this.frequencyBuffer = null;
    this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;
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

    let filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;

    player.addNode(filter);
    filter.connect(this.frequencyAnalyser);

    this.frequencyBuffer = new Float32Array(this.frequencyAnalyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
  }

  _visualise(event: any) {
    this.timeAnalyser.getFloatTimeDomainData(this.timeBuffer);
    this.frequencyAnalyser.getFloatFrequencyData(this.frequencyBuffer);
    this.visualise && this.visualise(this.timeBuffer, this.frequencyBuffer);
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


}