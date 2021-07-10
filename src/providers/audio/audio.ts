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

  startAudio(elements?: HTMLElement[], callback?: () => void) {
    return new Promise((resolve, reject) => {
      p5.prototype
        .userStartAudio(elements, callback)
        .then(() => {
          this.player.initialise();
          this.recorder.initialise();
        })
        .catch(() => {
          reject();
        });
    });
  }
}

class AudioDevice {
  public sound: p5.SoundFile;
  public running: boolean = false;

  isRunning(): boolean {
    return this.running;
  }

  getContext(): AudioContext {
    return p5.prototype.getAudioContext();
  }

  resumeAudio(): void {
    const context: AudioContext = this.getContext();
    if (context.state !== "running") {
      context.resume();
    }
  }
}

export class AudioPlayer extends AudioDevice {

  private sounds;
  constructor() {
    super();
    this.sounds = {};
  }

  initialise(): void {
    return null;
  }

  loadUrl(url: string) {
    return new Promise((resolve, reject) => {
      if (this.sounds[url]) {
        this.sound = this.sounds[url];
        resolve(undefined);
      } else {
        this.sound = new p5.SoundFile(url, resolve, reject);
        this.sounds[url] = this.sound;
      }
    });
  }

  playing() {
    return this.running;
  }

  play() {
    this.resumeAudio();
    return new Promise((resolve, reject) => {
      if (!this.sound) {
        if (resolve) {
          resolve(undefined);
        }
        return;
      }
      this.running = true;
      this.sound.playMode("restart");
      this.sound.onended(() => {
        this.running = false;
        if (resolve) {
          resolve(undefined);
        }
      });
      this.sound.play();
    });
  }

  playSound(sound: p5.SoundFile) {
    this.sound = sound;
    return this.play();
  }

  playUrl(url: string) {
    return new Promise((resolve, reject) => {
      this.loadUrl(url)
        .then(() => this.play().then(() => resolve(undefined)))
        .catch((e) => reject(e));
    });
  }

  stop() {
    if (this.sound && this.running) {
      this.sound.stop();
      this.running = false;
    }
  }
}

export class AudioRecorder extends AudioDevice {
  private timeout: any;
  recorder: p5.SoundRecorder;

  constructor() {
    super();
    this.running = false;
    this.timeout = null;
    this.sound = new p5.SoundFile(undefined);
  }

  initialise() {
    const mic = new p5.AudioIn();
    mic.start();
    this.recorder = new p5.SoundRecorder();
    this.recorder.setInput(mic);
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
        resolve(undefined);
      });
      this.timeout = setTimeout(() => {
        this.stop();
      }, timeout * 1000);
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
