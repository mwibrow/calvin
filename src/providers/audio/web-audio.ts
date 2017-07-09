
import { v4 } from 'uuid';

export class CallbackCollection {
  callbacks: any;

  constructor() {
    this.callbacks = {};
  }

  add(callback: any, name?:string) {
    name = name || v4()
    this.callbacks[name] = callback;
  }

  remove(name: string) {
    if (this.callbacks.hasOwnProperty(name)) {
      delete this.callbacks[name];
    }
  }

  removeAll() {
    this.callbacks = {};
  }

  do(...args: any[]) {
    let callback: any;
    for (callback in this.callbacks) {
      if (this.callbacks.hasOwnProperty(callback)) {
        this.callbacks[callback](...args);
      }
    }
  }
}

export interface WebAudioIO {

  context: AudioContext;
  nodes: Array<AudioNode>;

  onInitialise: CallbackCollection;
  onStart: CallbackCollection;
  onStop: CallbackCollection;
  onEnded: CallbackCollection;

  running: boolean;

  initialise();
  start();
  stop();
  addNode(node: AudioNode);

}


export class WebAudioPlayer implements WebAudioIO{

  context: AudioContext;
  buffer: AudioBuffer;
  running: boolean;
  source: AudioBufferSourceNode;
  nodes: Array<AudioNode>;
  onInitialise: CallbackCollection;
  onLoad: CallbackCollection;
  onStart: CallbackCollection;
  onStop: CallbackCollection;
  onEnded: CallbackCollection;
  constructor(context: AudioContext) {
    this.context = context;
    this.buffer = null;
    this.running = false;
    this.nodes = new Array<AudioNode>();
    this.onInitialise = new CallbackCollection();
    this.onLoad = new CallbackCollection();
    this.onStart = new CallbackCollection();
    this.onStop = new CallbackCollection();
    this.onEnded = new CallbackCollection();

    this.onLoad.add(() => this.playAudio());
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
    //this.context = new AudioContext();
    this.onInitialise && this.onInitialise.do(this.context)
  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  loadAudio(url: string) {
    var request = new XMLHttpRequest();
    request.addEventListener('error', (e) => function(e) {
      console.log(e);
    });
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    let that: WebAudioPlayer= this;
    request.onload = function() {
      that.context.decodeAudioData(request.response, function(buffer) {
        that.buffer = buffer;
        that.onLoad && that.onLoad.do(buffer);
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

  playUri(uri: string) {
    this.playUrl(uri);
  }

  playUrl(url: string) {
    this.stopAudio();

    this.loadAudio(url);
  }

  playAudio() {
    let i: number;
    if (this.buffer) {
      if (this.source) {
        this.source.disconnect(this.context.destination);
          for (i = 0; i < this.nodes.length; i ++) {
            this.source.disconnect(this.nodes[i]);
          }
      }
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      for (i = 0; i < this.nodes.length; i ++) {
        this.source.connect(this.nodes[i]);
      }
      this.source.connect(this.context.destination);
      var that = this;
      this.source.onended = function() {
        that.running = false;
        that.onEnded && that.onEnded.do();
      }
      this.running = true;
      this.onStart && this.onStart.do();
      this.source.start(0);
    }
  }


  stopAudio() {
    if (this.source && this.running) {
      this.source.stop();
      this.onStop && this.onStop.do();
      this.running = false;
    }
  }

  start() { this.playAudio(); }
  stop() { this.stopAudio(); }

}



const WORKER_PATH: string = 'assets/js/audioWorker.js';

export class WebAudioRecorder implements WebAudioIO {

  nodes: Array<AudioNode>;
  context: AudioContext;
  streamSource: MediaStreamAudioSourceNode;
  recordBuffer: AudioBuffer;
  settings: any;
  onInitialise: CallbackCollection;
  onStart: CallbackCollection;
  onStop: CallbackCollection;
  onEnded: CallbackCollection;
  onMessage: any;
  worker: Worker;
  running: boolean;
  monitor: boolean;
  scriptNode: ScriptProcessorNode;
  timeout: any;

  constructor(context: AudioContext) {
    this.settings = {
      bufferSize: 2048,
      channels: 1
    };
    this.running = false;

    this.onInitialise = new CallbackCollection();
    this.onStart = new CallbackCollection();
    this.onStop = new CallbackCollection();
    this.onEnded = new CallbackCollection();
    this.onMessage = null;
    this.scriptNode = null;
    this.streamSource = null;
    this.worker = null
    this.nodes = new Array<AudioNode>();
    this.monitor = false;
    this.context = context;
    this.timeout = null;
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
    //this.context = new AudioContext();
    this.scriptNode = this.context.createScriptProcessor(
      this.settings.bufferSize,
      this.settings.channels,
      this.settings.channels);
    this.streamSource = this.context.createMediaStreamSource(stream);
    this.onInitialise && this.onInitialise.do(this.context)
  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  addNode(node: AudioNode) {
    this.nodes.push(node);
  }

  monitorAudio() {
    this.monitor = true;
    this.recordAudio();
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
    this.running = true;
    this.scriptNode.onaudioprocess = (event) => this.processAudio(event);
    this.streamSource.connect(this.scriptNode);
    // This shouldn't be necessary.
    this.scriptNode.connect(this.context.destination);
    for (i = 0; i < this.nodes.length; i ++) {
      this.streamSource.connect(this.nodes[i]);
    }
    this.onStart && this.onStart.do();
  }

  start(timeout?: number) {
    this.recordAudio();
    if (timeout) {
      this.timeout = setTimeout(()=> this.stop(), timeout * 1000);
    }
  }

  stop() {
    this.running = false;
    this.timeout && clearTimeout(this.timeout);
    if (!this.monitor) {
      this.getAudioBuffers();
    }
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
    this.onEnded && this.onEnded.do();
  }

  processMessage(message) {
    this.onMessage && this.onMessage(message.data);
  }

  processAudio(event) {
    if (!this.running || this.monitor) return;

    this.worker.postMessage({
      command: 'record',
      buffer: [
        event.inputBuffer.getChannelData(0)
      ]
    });
  }
}


