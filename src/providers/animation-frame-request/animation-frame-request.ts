import { Injectable } from "@angular/core";

@Injectable()
export class AnimationFrameRequestProvider {
  public static getInstance() {
    return AnimationFrameRequestProvider.instance;
  }

  private static instance: AnimationFrameRequestProvider = new AnimationFrameRequestProvider();
  private callbacks: any[];
  private running: boolean;

  public constructor() {
    this.callbacks = [];
    this.running = false;
  }
  public isRunning() {
    return this.running;
  }

  public requestAnimationFrame(callback: any) {
    this.callbacks.push(callback);
    this.start();
  }

  private doCallbacks(timestamp: any) {
    let currentCallbacks: any[] = this.callbacks;
    let i: number;
    this.callbacks = [];
    for (i = 0; i < currentCallbacks.length; i++) {
      currentCallbacks[i](this, timestamp);
    }
    if (this.running) {
      window.requestAnimationFrame((timestamp) => this.doCallbacks(timestamp));
    }
  }

  public start() {
    if (!this.running) {
      this.running = true;
      window.requestAnimationFrame((timestamp) => this.doCallbacks(timestamp));
    }
  }

  public stop() {
    this.running = false;
    this.callbacks = [];
  }
}
