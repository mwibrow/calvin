
export class CallbackCollection {
  callbacks: Array<any>;

  constructor() {
    this.callbacks = new Array<any>();
  }

  add(callback: any) {
    this.callbacks.push(callback);
  }

  do(...args: any[]) {
    for (let i: number = 0; i < this.callbacks.length; i ++) {
      this.callbacks[i](...args);
    };
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
  constructor() {
    this.context = null;
    this.buffer = null;
    this.running = false;
    this.nodes = new Array<AudioNode>();
    this.onInitialise = new CallbackCollection();
    this.onLoad = new CallbackCollection();
    this.onStart = new CallbackCollection();
    this.onStop = new CallbackCollection();
    this.onEnded = new CallbackCollection();
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
    this.onInitialise && this.onInitialise.do(this.context)
  }

  raise(err, msg='') {
    console.error();
    console.log(err)
  }

  loadAudio(url: string) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    let that: WebAudioPlayer= this;
    request.onload = function() {
      that.context.decodeAudioData(request.response, function(buffer) {
        that.buffer = buffer;
        this.onLoad && this.onLoad(buffer);
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
    this.onLoad.add(() => this.playAudio());
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



const WORKER_PATH: string = '../../assets/js/audioWorker.js';

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

  constructor() {
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

  start() {
    this.recordAudio();
  }

  stop() {
    this.running = false;
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


