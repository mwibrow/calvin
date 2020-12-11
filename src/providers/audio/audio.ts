import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import p5 from "p5";
import "p5/lib/addons/p5.sound";

@Injectable()
export class AudioProvider {
  public readonly context: AudioContext;
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
      this.player.stop();
    }
    if (this.recorder.isRunning()) {
      this.recorder.stop();
    }
  }
}

class AudioEventHandler {
  private handlers: any;

  constructor() {
    this.handlers = {};
  }

  on(event: string, handler?: any) {
    let handle: string = handler.toString();
    if (!this.handlers.hasOwnProperty(event)) {
      this.handlers[event] = {};
    }
    this.handlers[event][handle] = handler;
    return this;
  }

  emit(event: string, ...args: any[]) {
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

export class AudioPlayer extends AudioEventHandler {
  private context: AudioContext;
  private running: boolean;
  private initialised: boolean;

  private sound: p5.SoundFile;

  constructor(context: AudioContext) {
    super();
    this.context = context;
  }

  initialise() {
    return new Promise((resolve, reject) => {
      if (this.initialised) {
        resolve();
      }
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: false })
          .then((stream) => {
            this.initialiseSuccess(stream);
            resolve();
          })
          .catch((err) => {
            this.initialised = false;
            reject({
              message: "Unable to initailise audio",
              error: err,
            });
          });
      } else {
        this.initialised = false;
        reject({
          message: "Audio unsupported on this device",
          error: null,
        });
      }
    });
  }

  initialiseSuccess(_stream: MediaStream) {
    this.initialised = true;
    this.emit("init");
  }

  loadUrl(url: string) {
    return new Promise((resolve, reject) => {
      this.sound = new p5.SoundFile(url, resolve, reject);
    });
  }

  playing() {
    return this.running;
  }

  isRunning() {
    return this.running;
  }

  play() {
    this.context.resume();
    return new Promise((resolve, reject) => {
      if (!this.sound) {
        if (resolve) {
          resolve();
        }
        return;
      }
      this.running = true;
      this.emit("start");
      this.sound.play();
      this.sound.onended(() => {
        this.running = false;
        this.emit("ended");
        if (resolve) {
          resolve();
        }
      });
    });
  }

  playSound(sound: p5.SoundFile) {
    this.sound = sound;
    return this.play();
  }

  playUrl(url: string) {
    return new Promise((resolve, reject) => {
      this.loadUrl(url)
        .then(() => this.play().then(() => resolve()))
        .catch((e) => reject(e));
    });
  }

  stop() {
    if (this.sound && this.running) {
      this.sound.stop();
      this.running = false;
      this.emit("stop");
    }
  }
}

export class AudioRecorder extends AudioEventHandler {
  private context: AudioContext;
  running: boolean;
  timeout: any;

  sound: p5.SoundFile;
  mic: p5.AudioIn;
  recorder: p5.SoundRecorder;

  private initialised: boolean;

  constructor(context: AudioContext) {
    super();
    this.running = false;
    this.context = context;
    this.timeout = null;
    this.initialised = false;
    this.mic = null;
    this.sound = new p5.SoundFile(undefined);
    this.recorder = null;
  }

  initialise() {
    return new Promise((resolve, reject) => {
      if (this.initialised) {
        resolve();
      }
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true, video: false })
          .then((stream) => {
            this.initialiseSuccess(stream);
            resolve();
          })
          .catch((err) => {
            this.initialised = false;
            reject({
              message: "Unable to initailise audio",
              error: err,
            });
          });
      } else {
        this.initialised = false;
        reject({
          message: "Audio unsupported on this device",
          error: null,
        });
      }
    });
  }

  initialiseSuccess(_stream: MediaStream) {
    this.initialised = true;
    this.mic = new p5.AudioIn();
    this.mic.start();
    this.recorder = new p5.SoundRecorder();
    this.recorder.setInput(this.mic);
    this.emit("init");
  }

  isRunning() {
    return this.running;
  }

  record(timeout?: number) {
    this.context.resume();
    p5.getAudioContext();
    return new Promise((resolve, reject) => {
      this.running = true;
      this.recorder.record(this.sound, timeout, () => {
        this.running = false;
        this.emit("stop");
      });
    });
  }

  stop() {
    this.recorder.stop();
  }

  private stopped() {
    this.emit("stop");
    this.running = false;
  }
}
