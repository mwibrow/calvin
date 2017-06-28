import { Injectable } from '@angular/core';

import { WebAudioIO, WebAudioPlayer, WebAudioRecorder } from './web-audio';

@Injectable()
export class AudioProvider {

  private audioPlayer: WebAudioIO;
  private audioRecorder: WebAudioIO;
  constructor() {
    this.audioPlayer = null;
    this.audioRecorder = null;
  }


  getAudioPlayer() {
    if (!this.audioPlayer) {
      this.audioPlayer = new WebAudioPlayer();
    }
    return this.audioPlayer;
  }

  getAudioRecorder() {
    if (!this.audioRecorder) {
      this.audioRecorder = new WebAudioRecorder();
    }
    return this.audioRecorder;
  }

}
