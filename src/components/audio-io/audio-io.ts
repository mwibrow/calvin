import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'audio-io',
  templateUrl: 'audio-io.html'
})
export class AudioIOComponent {

  private audio: any;
  private webRecorder: WebRecorder;
  private webPlayer: WebPlayer;
  private playing: boolean;
  private recording: boolean;
  constructor(private me: ElementRef ) {
    this.audio = null;

    this.webRecorder = new WebRecorder();
    this.webPlayer = new WebPlayer();
    this.playing = false;
    this.recording = false;
  }

  ngAfterViewInit() {
    this.audio = this.me.nativeElement.querySelector('audio');



    console.log(this.audio)
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
        console.log('Playing audio');
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

  uiRecordStart() {
    //this.recordStart();
    this.webPlayer.loadAudio('assets/audio/emma/ball.wav');
  }

  uiRecordStop() {
    // this.recordStop();
    // this.recording = false;
    // let that = this;
    // window.setTimeout(function(){that.audio.play();}, 2000);
    // this.playStart('assets/audio/emma/ball.wav');
    this.webPlayer.playAudio();
  }
  recordStart() {
    if (!this.playing && !this.recording) {
      this.recording = true;
      console.log('Starting recording');
      this.webRecorder.startRecording();
    }
  }

  recordStop() {
    if (!this.playing && this.recording) {
      console.log('Stopping recording');
      this.webRecorder.stopRecording();
      this.recording = false;
    }
  }

}

class WebPlayer {

  config: any;
  context: AudioContext;
  buffer: AudioBuffer;
  analyser: any;
  analyserBuffer: Float32Array;
  playing: boolean;
  constructor() {
    this.config = {};
    this.context = null;
    this.buffer = null;
    this.analyser = null;
    this.playing = false;
    this.initialise();
  }

  initialise(config?: any) {

    if (config) {
      this.config = config;
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then((stream) => {
           this.initialiseSuccess(stream)
      })
        .catch((err) => {
          this.raise(err, 'Error occured while excuting getUserMedia');
        })
    }
  }

  initialiseSuccess(stream) {
    this.context = new AudioContext();
    let mediaStreamSource: any = this.context.createMediaStreamSource(stream);

  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  loadAudio(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    let that: WebPlayer = this;
    request.onload = function() {
      that.context.decodeAudioData(request.response, function(buffer) {
        that.buffer = buffer;
      }, function (e) { that.raise(e, 'Error decoding audio data')});
    }
    request.send();
  }

  setAnalyser(analyser: AnalyserNode) {
    this.analyser = analyser;
  }

  playAudio() {
    if (this.buffer) {
      var source = this.context.createBufferSource();

      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyserBuffer = new Float32Array(this.analyser.frequencyBinCount);
      source.buffer = this.buffer;
      source.connect(this.analyser);
      this.analyser.connect(this.context.destination);
      var that = this;

      source.onended = function() {
        that.playing = false;
      }
      this.playing = true;
      source.start(0);
      window.requestAnimationFrame((e) => this._visualiser(this, e));
    }
  }

  _visualiser(me, event) {
    me.analyser.getFloatFrequencyData(me.analyserBuffer);
    console.log(me.analyserBuffer);
    if (me.playing) {
      window.requestAnimationFrame((e) => this._visualiser(this, e));
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

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then((s) => {
           this.initSuccess(s)
      })
        .catch((err) => {
          this.initFail(err);
        })
    //  if (navigator.getUserMedia) {
    //   navigator.getUserMedia({audio: true},
    //      function(s){that.initSuccess(s)},
    //      function(e){that.initFail(e)});
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
    console.log(e)
  }

  startRecording() {
    this.setUp();

  }

  stopRecording() {
    let that: WebRecorder = this;
    this.recorder.stop();
    this.recorder.exportWAV(function(s) {

      that.audio.src = window.URL.createObjectURL(s);
      that.audio.load();
      that.recorder.clear();
    }, {});
  }
}

class Recorder {
  WORKER_PATH:string = '../../assets/js/recorderWorker.js';
  context: any;
  node: any;
  worker: any;
  analyser: any;
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
    this.analyser = this.context.createAnalyser();
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
    source.connect(this.analyser);
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
