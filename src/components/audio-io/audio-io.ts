import { Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'audio-io',
  templateUrl: 'audio-io.html'
})
export class AudioIOComponent {

  private audio: any;
  private webRecorder: WebAudioRecorder;
  private webAudioPlayer: WebAudioPlayer;
  private playing: boolean;
  private recording: boolean;
  @ViewChild('canvas')
  canvas:ElementRef;
  constructor(private me: ElementRef ) {
    this.audio = null;

    this.webRecorder = new WebAudioRecorder();
    this.webAudioPlayer = new WebAudioPlayer();


    this.playing = false;
    this.recording = false;
  }

  ngAfterViewInit() {
    this.audio = this.me.nativeElement.querySelector('audio');

    let WebAudioPlayer = this.webAudioPlayer;

    let visualiser = new WebAudioFloatFrequencyVisualiser({
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
      let w: number;
       for (var i=0;i <= 48; i ++) {
         w = 128+buffer[i];
         can.lineTo(128+i*2,  canvas.height / 2 - w / 2);
       }
       for (var i=48;i >=0; i --) {
         w = 128+buffer[i];
         can.lineTo(128+i*2,  canvas.height / 2 + w / 2);
       }
         for (var i=0;i <= 48; i ++) {
         w = 128+buffer[i];
         can.lineTo(128-i*2,  canvas.height / 2 + w / 2);
       }
         for (var i=48;i >=0; i --) {
         w = 128+buffer[i];
         can.lineTo(128-i*2,  canvas.height / 2 - w / 2);
       }


       can.closePath();
      can.fillStyle = 'red';
     can.fill()
    }

    visualiser.initialise(this.webRecorder);
    this.webAudioPlayer.initialise();

    this.webRecorder.onEnded = () => this.webAudioPlayer.playBuffer(this.webRecorder.recordBuffer);

    this.webRecorder.initialise();
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
    //this.webAudioPlayer.loadAudio('assets/audio/emma/ball.wav');
    this.webRecorder.recordAudio();
  }

  uiRecordStop() {
    // this.recordStop();
    // this.recording = false;
    // let that = this;
    // window.setTimeout(function(){that.audio.play();}, 2000);
    // this.playStart('assets/audio/emma/ball.wav');
   // this.webAudioPlayer.playAudio();
   this.webRecorder.stop();
  }
  recordStart() {
    if (!this.playing && !this.recording) {
      this.recording = true;
      console.log('Starting recording');
      this.webRecorder.recordAudio();
    }
  }

  recordStop() {
    if (!this.playing && this.recording) {
      console.log('Stopping recording');
      this.webRecorder.stop();
      this.recording = false;
    }
  }

}


class Callback {
  callbacks: Array<any>;
}

interface WebAudioIO {

  context: AudioContext;
  nodes: Array<AudioNode>;

  onInitialise: any;
  onStart: any;
  onStop: any;
  onEnded: any;

  initialise();
  start();
  stop();
  addNode(node: AudioNode);

}


class WebAudioPlayer implements WebAudioIO{

  context: AudioContext;
  buffer: AudioBuffer;
  playing: boolean;
  source: AudioBufferSourceNode;
  nodes: Array<AudioNode>;
  onInitialise: any;
  onStart: any;
  onStop: any;
  onEnded: any;
  constructor() {
    this.context = null;
    this.buffer = null;
    this.playing = false;
    this.nodes = new Array<AudioNode>();
    this.onInitialise = null;
    this.onStart = null;
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
    let i: number;
    if (this.buffer) {

      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      for (i = 0; i < this.nodes.length; i ++) {
        this.source.connect(this.nodes[i]);
      }
      this.source.connect(this.context.destination);
      var that = this;
      this.source.onended = function() {
        that.playing = false;
        that.onEnded && that.onEnded();
      }
      this.playing = true;
      this.onStart && this.start();
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

  start() { this.playAudio(); }
  stop() { this.stopAudio(); }

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

  initialise(player: WebAudioIO) {
    player.onInitialise = (context) => this._initialise(context, player);
  }

  _initialise(context, player: WebAudioIO) {
    let property: any;
    player.onStart = () => this.start();
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
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;
    player.addNode(filter);
    filter.connect(this.analyser);
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

class WebAudioFloatFrequencyVisualiser {

  analyser: AnalyserNode;
  buffer: Float32Array;
  visualise: any;
  running: boolean;
  analyserProperties: any;

  constructor(analyserProperties?: any) {
    this.analyser = this.buffer = this.visualise = null;
    this.running = false;
    this.analyserProperties = analyserProperties;

  }

  initialise(player: WebAudioIO) {
    player.onInitialise = (context) => this._initialise(context, player);
  }

  _initialise(context, player: WebAudioIO) {
    let property: any;
    player.onStart = () => this.start();
    player.onStop = () => this.stop();
   // player.onEnded = () => this.stop();
    this.analyser = player.context.createAnalyser()

    for (property in this.analyserProperties) {
      if (this.analyserProperties.hasOwnProperty(property)) {
        this.analyser[property] = this.analyserProperties[property];
      }
    }
    let filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    filter.Q.value = 0.5;
    player.addNode(filter);
    filter.connect(this.analyser);
    this.buffer = new Float32Array(this.analyser.frequencyBinCount);
  }

  start() {
    this.running = true;
    window.requestAnimationFrame((event) => this._visualise(event));
  }

  stop() {
    this.running = false;
  }

  _visualise(event: any) {
    this.analyser.getFloatFrequencyData(this.buffer);
    this.visualise && this.visualise(this.buffer);
    if (this.running) {
       window.requestAnimationFrame((event) => this._visualise(event));
    }
  };


}


const WORKER_PATH: string = '../../assets/js/audioWorker.js';

class WebAudioRecorder implements WebAudioIO {

  nodes: Array<AudioNode>;
  context: AudioContext;
  streamSource: MediaStreamAudioSourceNode;
  recordBuffer: AudioBuffer;
  settings: any;
  onInitialise: any;
  onStart: any;
  onStop: any;
  onEnded: any;
  onMessage: any;
  worker: Worker;
  recording: boolean;
  scriptNode: ScriptProcessorNode;

  constructor() {
    this.settings = {
      bufferSize: 2048,
      channels: 1
    };
    this.recording = false;

    this.onInitialise = null;
    this.onStart = null;
    this.onStop = null;
    this.onMessage = null;
    this.scriptNode = null;
    this.streamSource = null;
    this.worker = null
    this.nodes = new Array<AudioNode>();
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
    this.scriptNode = this.context.createScriptProcessor(
      this.settings.bufferSize,
      this.settings.channels,
      this.settings.channels);
    this.streamSource = this.context.createMediaStreamSource(stream);
    this.onInitialise && this.onInitialise(this.context)
  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  addNode(node: AudioNode) {
    this.nodes.push(node);
  }

  recordAudio() {
    this.worker = new Worker(WORKER_PATH);
    this.worker.onmessage = (message) => this.processMessage(message);
    this.onMessage = () => this._recordAudio();
    this.worker.postMessage({
      command: 'initialise',
      settings: {
        sampleRate: this.context.sampleRate
      }
    });
  }

  _recordAudio() {
    let i: number;
    this.recording = true;
    this.scriptNode.onaudioprocess = (event) => this.processAudio(event);
    this.streamSource.connect(this.scriptNode);
    // This shouldn't be necessary.
    this.scriptNode.connect(this.context.destination);
    for (i = 0; i < this.nodes.length; i ++) {
      this.streamSource.connect(this.nodes[i]);
    }
    this.onStart && this.onStart();
  }

  start() {
    this.recordAudio();
  }

  stop() {
    this.recording = false;
    this.getAudioBuffers()
  }

  quit() {
    this.worker.terminate();
  }

  clear(){
    this.onMessage = null;
    this.worker.postMessage({ command: 'clear' });
  }

  getAudioBuffers() {
    this.onMessage = (buffer) => this._setRecordBuffer(buffer);
    this.worker.postMessage({
      command: 'getBuffers'
    })
  }

  _setRecordBuffer(buffer: Array<Float32Array>) {
    let i: number;
    this.recordBuffer = this.context.createBuffer(
      buffer.length,
      buffer[0].length,
      this.context.sampleRate);
    for (i = 0; i < buffer.length; i ++) {
      this.recordBuffer.copyToChannel(buffer[i], i, 0);
    }
    this.worker.terminate();
    this.onEnded && this.onEnded();
  }

  processMessage(message) {
    this.onMessage && this.onMessage(message.data);
  }

  processAudio(event) {
    if (!this.recording) return;
    this.worker.postMessage({
      command: 'record',
      buffer: [
        event.inputBuffer.getChannelData(0)
      ]
    });
  }
}

