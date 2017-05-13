import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'audio-io',
  template: '<audio></audio>'
})
export class AudioIOComponent {

  private audio: any;
  private webRecorder: WebRecorder;
  private playing: boolean;
  private recording: boolean;
  constructor(private me: ElementRef ) {
    this.audio = null;
    this.webRecorder = new WebRecorder();
    this.playing = false;
    this.recording = false;
  }

  ngAfterViewInit() {
    this.audio = this.me.nativeElement.querySelector('audio');
    this.webRecorder.initialise(this.audio);
  }


  loadAudio(uri: string, cb: (data: any) => void) {
    let that: AudioIOComponent = this;
    this.audio.oncanplaythrough = function() {
      that.audio.oncanplaythrough = null;
      cb(that.audio);
    };
    this.audio.src = uri;
    this.audio.load();
  }

  playStart(uri?: string) {
    if (!this.recording) {
      this.playing = true;
      let that = this;
      this.audio.onended = function(e) {
        that.audio.onended = null;
        that.playing = false;
      };
      if (uri) {
        this.loadAudio(uri, function(a){ a.play(); });
      } else {
        this.audio.play();
      }
    }
  }

  playStop() {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
    }
  }

  rewind() {
    if (!this.playing && !this.recording) {
      this.audio.currentTime = 0;
    }
  }

  recordStart() {
    if (!this.playing && !this.recording) {
      this.recording = true;
      this.webRecorder.startRecording();
    }
  }

  recordStop() {
    if (!this.playing && this.recording) {
      this.webRecorder.stopRecording();
      this.recording = false;
    }
  }

}

class WebRecorder {

  config: any;
  audio: any;
  recorder: any;
  constructor() {
    this.config = {};
    this.audio = null;
    this.recorder = null;
  }

  initialise(audio: any, config?: any) {
    this.audio = audio;
    this.config = config;
  }

  setUp() {
    this.recorder = null;
    let that: WebRecorder = this;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: true},
        function(s){that.initSuccess(s)},
        function(e){that.initFail(e)});
    } else {
      console.log('navigator.getUserMedia not present');
    }
  }

  initSuccess(stream) {
    let context: any = new AudioContext();
    let mediaStreamSource: any = context.createMediaStreamSource(stream);
    this.recorder = new Recorder(mediaStreamSource, this.config);
    this.recorder.record();
  }

  initFail(e) {
    console.error('Error occured while excuting getUserMedia');
  }

  startRecording() {
    this.setUp();

  }

  stopRecording() {
    let that: WebRecorder = this;
    this.recorder.stop();
    this.recorder.exportWAV(function(s) {
      that.audio.src = window.URL.createObjectURL(s);
      that.recorder.clear();
    }, {});
  }
}

class Recorder {
  WORKER_PATH:string = '../../assets/js/recorderWorker.js';
  context: any;
  node: any;
  worker: any;
  recording: boolean;
  config: any;
  currCallback: any;

  constructor(source: any, cfg: any){

    this.config = cfg || {};
    var bufferLen = this.config.bufferLen || 4096;
    this.context = source.context;
    this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
    this.worker = new Worker(this.config.workerPath || this.WORKER_PATH);
    this.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });
    this.recording = false;
    this.currCallback = null;
    var that: any = this;
    this.node.onaudioprocess = function(e){
      if (!that.recording) return;
      that.worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0),
          e.inputBuffer.getChannelData(1)
        ]
      });
    }

    that = this;
    this.worker.onmessage = function(e){
      var blob = e.data;
      that.currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
  };

  exportWAV(callback: any, type?: any){
    this.currCallback = callback || this.config.callback;
    type = type || this.config.type || 'audio/wav';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'exportWAV',
      type: type
    });
  }

  configure (cfg: any){
    for (var prop in cfg){
      if (cfg.hasOwnProperty(prop)){
        this.config[prop] = cfg[prop];
      }
    }
  }

  record() {
    this.recording = true;
  }

  stop(){
    this.recording = false;
  }

  quit() {
    this.worker.terminate();
  }
  clear(){
    this.worker.postMessage({ command: 'clear' });
  }

  getBuffer = function(callback: any) {
    this.currCallback = callback || this.config.callback;
    this.worker.postMessage({ command: 'getBuffer' })
  }

}
