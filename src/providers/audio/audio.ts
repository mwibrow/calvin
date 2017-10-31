import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as InlineWorker from 'inline-worker';
import * as fs from 'fs';
import * as WavDecoder from 'wav-decoder';
import * as WavEncoder from 'wav-encoder';

@Injectable()
export class AudioProvider {

  private context: AudioContext;
  public readonly player: AudioPlayer;
  public readonly recorder: AudioRecorder;

  private static _context: AudioContext = new AudioContext();

  constructor() {
    this.context = this.getContext();
    this.player = new AudioPlayer(this.context);
    this.recorder = new AudioRecorder(this.context);
  }

  initialise() {
    this.player.initialise();
    this.recorder.initialise();
  }

  getContext() {
    return AudioProvider._context;
  }

  stop() {
    if (this.player.isRunning()) {
      this.player.stop()
    }
    if (this.recorder.isRunning()) {
      this.recorder.stop();
      this.recorder.quit();
    }
  }
}


class AudioEventHandler {

  private handlers: any;

  constructor() {
    this.handlers = {};
  }

  on(event: string, handler?:any) {
    let handle: string = handler.toString();
    if (!this.handlers.hasOwnProperty(event)) {
      this.handlers[event] = {};
    }
    this.handlers[event][handle] = handler;
    return this;
  }

  emit(event: string, ...args:any[]) {
    let handle: string;
    if (this.handlers.hasOwnProperty(event)) {
      for (handle in this.handlers[event]) {
        if (this.handlers[event].hasOwnProperty(handle)) {
          this.handlers[event][handle](this, ...args);
        }
      }
      delete this.handlers[event];
    }
  }
}

// tslint:disable-next-line
const raise = (err, msg='') => {
    console.error(msg);
    console.log(err);
}

const readWav = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer);
    });
  });
};

export class AudioPlayer extends AudioEventHandler {

  private context: AudioContext;
  private nodes: Array<AudioNode>;
  private buffer: AudioBuffer;
  private source: AudioBufferSourceNode;
  private running: boolean;
  private initialised: boolean;

  constructor(context: AudioContext) {
    super();
    this.context = context;
    this.nodes = new Array<AudioNode>();
  }

  initialise() {
    return new Promise((resolve, reject) => {
      if (this.initialised) {
        resolve();
      }
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
          .then((stream) => {
            this.initialiseSuccess(stream);
            resolve();
        })
          .catch((err) => {
            this.initialised = false;
            reject({
              message: 'Unable to initailise audio',
              error: err});
          })
      } else {
        this.initialised = false;
        reject({
          message: 'Audio unsupported on this device',
          error: null
        });
      }
    });
  }

  initialiseSuccess(stream) {
    this.initialised = true;
    this.emit('init');
  }

  loadWav(wavFile: string) {
    return new Promise((resolve, reject) => {
      readWav(wavFile).then((fileBuffer) => {
        return WavDecoder.decode(fileBuffer);
      }).then((audioData) => {
          this.buffer = this.context.createBuffer(
            audioData.numberOfChannels,
            audioData.length,
            audioData.sampleRate);
          for (let i: number = 0; i < audioData.numberOfChannels; i ++) {
            this.buffer.copyToChannel(audioData.channelData[i], 0);
          }
          this.emit('load');
          resolve();
      });
    });
  }

  addNode(node: AudioNode) {
    this.nodes.push(node);
  }

  loadUrl(url: string) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.addEventListener('error', (e) => function(e) {
        console.log(e);
      });
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () =>
        this.context.decodeAudioData(request.response, (buffer) => {
          this.buffer = buffer;
          resolve();
        },
        (e) => reject(e))
      request.send();
    });
  }

  loadBuffer(buffer: AudioBuffer) {
    this.stop();
    this.buffer = buffer;
  }

  playing() {
    return this.running;
  }

  isRunning() {
    return this.running;
  }

  play() {
    return new Promise((resolve, reject) => {
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

        this.source.onended = () => {
          this.running = false;
          this.emit('ended');
          resolve();
        }
        this.running = true;
        this.emit('start');
        this.source.start(0);
      }
    });
  }

  playBuffer(buffer: AudioBuffer) {
    this.loadBuffer(buffer);
    return this.play();
  }

  playUrl(url: string) {
    return new Promise((resolve, reject) => {
      this.loadUrl(url)
        .then(() => this.play().then(() => resolve()))
        .catch((e) => reject(e))
    })
  }

  playTone(frequency: number, duration: number, amplitude=Math.SQRT1_2, numberOfChannels=1, sampleRate=44100, rampLength=0.050) {
    let length: number, buffer: AudioBuffer, i: number, omega: number, samples: Array<number>;
    length = Math.floor(duration * sampleRate);
    buffer = this.context.createBuffer(numberOfChannels, length, sampleRate);

    samples = new Array<number>(length);
    omega = 2.0 * Math.PI * frequency / sampleRate;
    for (i = 0; i < length; i ++) {
      samples[i] = amplitude * Math.sin(i * omega);
    }
    rampLength = Math.floor(sampleRate * rampLength);
    for (i = 0; i < rampLength; i ++) {
      samples[i] *= i / rampLength;
      samples[length - i] *= i / rampLength;
    }

    for (i = 0; i < numberOfChannels; i ++) {
      buffer.copyToChannel(new Float32Array(samples), i, 0);
    }
    this.loadBuffer(buffer);
    return this.play();
  }

  stop() {
    if (this.source && this.running) {
      this.source.stop();
      this.running = false;
      this.emit('stop');
    }
  }
}


export class AudioRecorder extends AudioEventHandler {

  private context: AudioContext;
  private nodes: Array<AudioNode>;

  streamSource: MediaStreamAudioSourceNode;
  recordBuffer: AudioBuffer;
  settings: any;

  onMessage: any;
  worker: Worker;
  running: boolean;
  monitor: boolean;
  scriptNode: ScriptProcessorNode;
  timeout: any;

  private initialised: boolean;

  constructor(context: AudioContext) {
    super();
    this.settings = {
      bufferSize: 2048,
      channels: 1
    };
    this.running = false;

    this.onMessage = null;
    this.scriptNode = null;
    this.streamSource = null;
    this.worker = null
    this.nodes = new Array<AudioNode>();
    this.monitor = false;
    this.context = context;
    this.timeout = null;
    this.initialised = false;
  }

  initialise() {
    return new Promise((resolve, reject) => {
      if (this.initialised) {
        resolve();
      }
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({audio: true, video: false})
          .then((stream) => {
            this.initialiseSuccess(stream);
            resolve();
        })
          .catch((err) => {
            this.initialised = false;
            reject({
              message: 'Unable to initailise audio',
              error: err});
          })
      } else {
        this.initialised = false;
        reject({
          message: 'Audio unsupported on this device',
          error: null
        });
      }
    });
  }

  initialiseSuccess(stream) {

    this.initialised = true;
    this.scriptNode = this.context.createScriptProcessor(
      this.settings.bufferSize,
      this.settings.channels,
      this.settings.channels);
    this.streamSource = this.context.createMediaStreamSource(stream);
    this.emit('init');
  }

  addNode(node: AudioNode) {
    this.nodes.push(node);
  }

  clearNodes() {
    this.nodes = new Array<AudioNode>();
  }

  monitorAudio() {
    this.monitor = true;
    this.recordInit();
  }

  isRunning() {
    return this.running;
  }

  private recordInit() {
    this.worker = getAudioWorker();
    this.worker.onmessage = (message) => this.processMessage(message);
    this.onMessage = () => this.recordStart();
    this.worker.postMessage({
      command: 'initialise',
      settings: {
        sampleRate: this.context.sampleRate
      }
    });
  }

  private recordStart() {
    let i: number;
    this.running = true;
    this.scriptNode.onaudioprocess = (event) => this.processAudio(event);
    this.streamSource.connect(this.scriptNode);
    // This shouldn't be necessary.
    this.scriptNode.connect(this.context.destination);
    for (i = 0; i < this.nodes.length; i ++) {
      this.streamSource.connect(this.nodes[i]);
    }
    this.emit('start');
  }

  record(timeout?: number) {
    return new Promise((resolve, reject) => {
      this.recordInit();
      if (timeout) {
        this.timeout = setTimeout(() => this.stop().then(() => resolve()), timeout * 1000);
      }})
  }

  stop() {
    this.running = false;
    this.timeout && clearTimeout(this.timeout);
    this.emit('stop');
    if (!this.monitor) {
      return new Promise((resolve, reject) => {
        this.getAudioBuffers().then(() => resolve());
      });
    }
  }

  quit() {
    if (this.worker) {
      this.worker.terminate();
    }
  }

  clear(){
    this.onMessage = null;
    this.worker.postMessage({ command: 'clear' });
  }

  private getAudioBuffers() {
    let self: any = this;
    return new Promise((resolve, reject) => {
      const setRecordBuffer = (buffer) => {
        self.recordBuffer = self.context.createBuffer(
          buffer.length,
          buffer[0].length,
          self.context.sampleRate);
        for (let i: number = 0; i < buffer.length; i ++) {
          self.recordBuffer.copyToChannel(buffer[i], i, 0);
        }
        self.worker.terminate();
        resolve();
      };
      self.onMessage = (buffer) => setRecordBuffer(buffer);
      self.worker.postMessage({
        command: 'getBuffers'
      });
    });
  }

  // tslint:disable-next-line
  private setRecordBuffer(buffer: Array<Float32Array>) {
    let i: number;
    this.recordBuffer = this.context.createBuffer(
      buffer.length,
      buffer[0].length,
      this.context.sampleRate);
    for (i = 0; i < buffer.length; i ++) {
      this.recordBuffer.copyToChannel(buffer[i], i, 0);
    }
    this.worker.terminate();
    this.emit('ended');
  }

  private processMessage(message) {
    this.onMessage && this.onMessage(message.data);
  }

  private processAudio(event) {
    if (!this.running || this.monitor) return;
    this.worker.postMessage({
      command: 'record',
      buffer: [
        event.inputBuffer.getChannelData(0)
      ]
    });
  }

  saveWav(wavFile: string) {
    return new Promise((resolve, reject) => {
      let channelData: Array<Float32Array> = new Array<Float32Array>();
      for (let i: number = 0; i < this.recordBuffer.numberOfChannels; i ++) {
        channelData.push(new Float32Array(this.recordBuffer.length));
        this.recordBuffer.copyFromChannel(channelData[i], i, 0);
      }
      let audioData: any = {
        sampleRate: this.context.sampleRate,
        channelData: channelData
      }

      WavEncoder.encode(audioData).then((fileBuffer) => {
        fs.writeFileSync(wavFile, new Buffer(fileBuffer));
        resolve();
      });
    });
  }
}

/* tslint:disable */
const getAudioWorker = () => {
  let self: any = {};
  let worker: Worker = new InlineWorker(function(self){
//
// Begin worker code...

var channelCount = 1;
var buffers = [];
var frameCount = 0;
var sampleRate = 44100;


self.onmessage = function(event){
    var command = event.data.command;
    var success, buffers;
    switch (command) {
        case 'initialise':
            success = self.initialise(event.data.settings || {});
            self.postMessage(success);
            break;
        case 'clear':
            success = self.clear();
            self.postMessage(success);
            break;
        case 'record':
            self.record(event.data.buffer);
            break;
        case 'getBuffers':
            buffers = self.getBuffers();
            self.postMessage(buffers);
            break;
        default:
            console.error("Unknown function '" + command + "' in audioWorker");
    }
}

function initialise(settings) {
    self.channelCount = settings.channelCount || self.channelCount;
    self.sampleRate = settings.sampleRate || self.sampleRate;
    self.clear();
    return true;
}

function record(inputBuffer) {
    for (var i = 0; i < self.channelCount; i++) {
        self.buffers[i].push(inputBuffer[i]);
    }
    self.frameCount += inputBuffer[0].length;
    return true;
}

function clear(){
    self.buffers = [];
    for (var i = 0; i < self.channelCount; i++) {
        self.buffers.push([]);
    }
    self.frameCount = 0;
    return true;
}

function flattenBuffer(buffer, frameCount){
    var i, offset, flattenedBuffer;
    flattenedBuffer = new Float32Array(frameCount);
    offset = 0;
    for (i = 0; i < buffer.length; i++){
        flattenedBuffer.set(buffer[i], offset);
        offset += buffer[i].length;
    }
    return flattenedBuffer;
}

function interleave(buffers){
    var i, j, k, frameCount, interleaved;
    for (i = 0; i < buffers.length; i ++) {
        frameCount += buffers[i].length;
    }
    interleaved = new Float32Array(frameCount);

    i = j = 0;
    while (i < frameCount) {
        for (k = 0; k < buffers.length; k ++) {
            interleaved[i ++] = buffers[k][j];
        }
        j ++;
    }
    return interleaved;
}

function getBuffers() {
    var i;
    var buffers = [];
    for (i = 0; i < self.channelCount; i ++) {
        buffers.push(flattenBuffer(self.buffers[i], self.frameCount));
    };
    return buffers;
}

// ...end worker code.
//
  }, self);
  return worker;
}

export class Visualiser {

    public analyser: AnalyserNode;
    public data: Uint8Array;
    private visualise: boolean;
    public onvisualise: any;
    public frameRate: number = 1;
    private _frame;
    constructor(public audioContext: AudioContext, analyserParams?: any) {
      let params = Object.assign({
          fftSize: 512,
          bufferSize: 512,
          bufferType: Uint8Array,
      }, analyserParams || {});

      this.analyser = audioContext.createAnalyser();
      this.analyser.fftSize = params.fftSize;
      this.data = new params.bufferType(params.bufferSize);
      this.visualise = true;
      this.onvisualise = null;
    }

    initialise() {

    }
    public start() {
      this.visualise = true;
      this._frame = 0;
      requestAnimationFrame(() => this.analyse());
    }

    public stop() {
      this.visualise = false;
    }

    private analyse() {
      this._frame = (this._frame + 1) % this.frameRate;
      this.analyser.getByteFrequencyData(this.data);
      if (this._frame === 0) this.onvisualise && this.onvisualise(this.data);
      this.visualise && requestAnimationFrame(() => this.analyse())
    }
  }
