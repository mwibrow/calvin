import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import p5 from "p5";
import "p5/lib/addons/p5.sound";

@Injectable()
export class AudioProvider {
  public readonly player: AudioPlayer;
  public readonly recorder: AudioRecorder;

  constructor() {
    this.player = new AudioPlayer();
    this.recorder = new AudioRecorder();
  }

  initialise() {
    this.player.initialise();
    this.recorder.initialise();
  }

  getContext() {
    // @ts-ignore
    return p5.prototype.getAudioContext();
  }

  stop() {
    if (this.player.isRunning()) {
      this.player.stop();
    }
    if (this.recorder.isRunning()) {
      this.recorder.stop();
    }
  }

  startAudio(elements?: HTMLElement[], callback?: () => void): Promise<void> {
    // @ts-ignore
    return p5.prototype.userStartAudio(elements, callback);
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

  getContext(): AudioContext {
    // @ts-ignore
    return p5.prototype.getAudioContext();
  }

  startAudio(elements?: HTMLElement[], callback?: () => void): Promise<void> {
    // @ts-ignore
    return p5.prototype.userStartAudio(elements, callback);
  }

  resumeAudio(): void {
    const context: AudioContext = this.getContext();
    if (context.state !== "running") {
      context.resume();
    }
  }

}

export class AudioPlayer extends AudioEventHandler {

  private running: boolean;
  private initialised: boolean;

  private sound: p5.SoundFile;

  constructor() {
    super();
    this.running = false;
    this.initialised = false;
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
    this.resumeAudio();
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

  running: boolean;
  private timeout: any;
  sound: p5.SoundFile;
  mic: p5.AudioIn;
  recorder: p5.SoundRecorder;

  private initialised: boolean;

  constructor() {
    super();
    this.running = false;
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
    this.resumeAudio();
    return new Promise((resolve, reject) => {
      this.running = true;
      this.recorder.record(this.sound, timeout, () => {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.running = false;
        this.emit("stop");
        resolve();
      });
      this.timeout = setTimeout(() => { this.stop(); }, timeout * 1000);
    });
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.recorder.stop();
  }

}
