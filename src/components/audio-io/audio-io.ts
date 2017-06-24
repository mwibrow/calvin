import { Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'audio-io',
  templateUrl: 'audio-io.html'
})
export class AudioIOComponent {

  private audio: any;
  private webRecorder: WebRecorder;
  private webAudioPlayer: WebAudioPlayer;
  private playing: boolean;
  private recording: boolean;
  @ViewChild('canvas')
  canvas:ElementRef;
  constructor(private me: ElementRef ) {
    this.audio = null;

    this.webRecorder = new WebRecorder();
    this.webAudioPlayer = new WebAudioPlayer();


    this.playing = false;
    this.recording = false;
  }

  ngAfterViewInit() {
    this.audio = this.me.nativeElement.querySelector('audio');

    let WebAudioPlayer = this.webAudioPlayer;

    let visualiser = new WebAudioByteFrequencyVisualiser({
      fftSize: 128,
      smoothingTimeConstant: 0.85
    });

    let canvas = this.canvas.nativeElement;
    let can = canvas.getContext('2d')
    canvas.width = 256;
    canvas.height = 128;
    can.clearRect(0, 0, canvas.width, canvas.height);
    visualiser.visualise = function(buffer) {
       can.clearRect(0, 0, canvas.width, canvas.height);
       can.beginPath();
       can.moveTo(0, canvas.height / 2)
       for (var i=0;i <= 32; i ++) {
         var w = buffer[i] / 2 + 1;
         can.lineTo(128+i*4,  canvas.height / 2 - w / 2);
       }
       for (var i=32;i >=0; i --) {
         var w = buffer[i] / 2 + 1;
         can.lineTo(128+i*4,  canvas.height / 2 + w / 2);
       }
         for (var i=0;i <= 32; i ++) {
         var w = buffer[i] / 2 + 1;
         can.lineTo(128-i*4,  canvas.height / 2 + w / 2);
       }
         for (var i=32;i >=0; i --) {
         var w = buffer[i] / 2 + 1;
         can.lineTo(128-i*4,  canvas.height / 2 - w / 2);
       }

       can.closePath();
      can.fillStyle = 'red';
     can.fill()
    }

    visualiser.initialise(this.webAudioPlayer);
    this.webAudioPlayer.initialise();
    // this.WebAudioPlayer.onInitialise = function(ctx) {
    //   let analyser = ctx.createAnalyser();
    //   analyser.fftSize = 64;
    //   let buffer = new Uint8Array(analyser.frequencyBinCount);
    //   WebAudioPlayer.setAnalyser(analyser);



    //   WebAudioPlayer.setVisualiser(function() {
    //     analyser.getByteTimeDomainData(buffer);
    //     can.clearRect(0, 0, canvas.width, canvas.height);
    //      can.beginPath();
    //      let r =  buffer.reduce((a, b) => Math.max(a, b));
    //      r = (r / 255);
    //     can.arc(64, 64,r * 64, 0, 2 * Math.PI, false);
    //   can.fillStyle = 'green';
    //  can.fill()
    //     //console.log();
    //   }
    // );

    // }


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
    this.webAudioPlayer.loadAudio('assets/audio/emma/ball.wav');
  }

  uiRecordStop() {
    // this.recordStop();
    // this.recording = false;
    // let that = this;
    // window.setTimeout(function(){that.audio.play();}, 2000);
    // this.playStart('assets/audio/emma/ball.wav');
    this.webAudioPlayer.playAudio();
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


class WebAudioPlayer{

  context: AudioContext;
  buffer: AudioBuffer;
  playing: boolean;
  source: AudioBufferSourceNode;
  nodes: Array<AudioNode>;
  onInitialise: any;
  onPlay: any;
  onStop: any;
  onEnded: any;
  constructor() {
    this.context = null;
    this.buffer = null;
    this.playing = false;
    this.nodes = new Array<AudioNode>();
    this.onInitialise = null;
    this.onPlay = null;
    this.onStop = null;
    this.onEnded = null;
  }

  initialise() {
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
    this.onInitialise && this.onInitialise(this.context)
  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  loadAudio(url: string, cb?: any) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    let that: WebAudioPlayer= this;
    request.onload = function() {
      that.context.decodeAudioData(request.response, function(buffer) {
        that.buffer = buffer;
        if (cb) {
          cb(buffer);
        }
      }, function (e) { that.raise(e, 'Error decoding audio data')});
    }
    request.send();
  }

  addNode(node: AudioNode) {
    this.nodes.push(node);
  }

  playBuffer(buffer: AudioBuffer) {
    this.stopAudio();
    this.buffer = buffer;
    this.playAudio();
  }

  playUrl(url: string) {
    this.stopAudio();
    let that: WebAudioPlayer = this;
    this.loadAudio(url, function() {
      that.playAudio();
    })
  }

  playAudio() {
    let i: number, node: AudioNode;
    if (this.buffer) {

      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      node = this.source;
      for (i = 0; i < this.nodes.length; i ++) {
        node.connect(this.nodes[i]);
        node = this.nodes[i];
      }
      node.connect(this.context.destination);
      var that = this;
      this.source.onended = function() {
        that.playing = false;
        that.onEnded && that.onEnded();
      }
      this.playing = true;
      this.onPlay && this.onPlay();
      this.source.start(0);
    }
  }

  stopAudio() {
    if (this.source && this.playing) {
      this.source.stop();
      this.onStop && this.onStop();
      this.playing = false;
    }
  }
}


class WebAudioByteFrequencyVisualiser {

  analyser: AnalyserNode;
  buffer: Uint8Array;
  visualise: any;
  running: boolean;
  analyserProperties: any;

  constructor(analyserProperties?: any) {
    this.analyser = this.buffer = this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;

  }

  initialise(player: WebAudioPlayer) {
    player.onInitialise = (context) => this._initialise(context, player);
  }

  _initialise(context, player: WebAudioPlayer) {
    let property: any;
    player.onPlay = () => this.start();
    player.onStop = () => this.stop();
    player.onEnded = () => this.stop();
    this.analyser = player.context.createAnalyser()

    for (property in this.analyserProperties) {
      if (this.analyserProperties.hasOwnProperty(property)) {
        this.analyser[property] = this.analyserProperties[property];
      }
    }
    let filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 250;
    filter.Q.value = 0.;
    player.addNode(filter);
    player.addNode(this.analyser);
    this.buffer = new Uint8Array(this.analyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
  }

  _visualise(event: any) {
    this.analyser.getByteFrequencyData(this.buffer);
    this.visualise && this.visualise(this.buffer);
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


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


    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: true, video: false})
        .then((s) => {
           this.initSuccess(s)
      })
        .catch((err) => {
          this.initFail(err);
        })

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
