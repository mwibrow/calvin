import { Injectable } from '@angular/core';

import { WebAudioIO, WebAudioPlayer, WebAudioRecorder } from './web-audio';

@Injectable()
export class AudioProvider {

  public audioPlayer: WebAudioPlayer;
  public audioRecorder: WebAudioRecorder;
  public context;
  constructor() {
    this.audioPlayer = null;
    this.audioRecorder = null;
    this.context = new AudioContext();
  }


  getAudioPlayer() {
    if (!this.audioPlayer) {
      this.audioPlayer = new WebAudioPlayer(this.context);
    }
    return this.audioPlayer;
  }

  getAudioRecorder() {
    if (!this.audioRecorder) {
      this.audioRecorder = new WebAudioRecorder(this.context);
    }
    return this.audioRecorder;
  }

}
