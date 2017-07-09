import { Component, Directive, Input, NgZone } from '@angular/core';
import { AudioProvider } from '../../providers/audio/audio'

@Component({
  selector: 'keyword',
  templateUrl: 'keyword.html',
  providers: [ AudioProvider ]
})
export class KeywordComponent {

  player: any;
  recorder: any;
  uri: string;
  audioBuffer: AudioBuffer;
  text: string;
  controls: boolean;
  recording: boolean;
  canPlay: boolean;
  canPlayKeyword: boolean;
  zone: NgZone;
  constructor(public audio: AudioProvider) {
    this.player = audio.getAudioPlayer();
    this.player.initialise();
    this.recorder = null;
    this.recording = false;
    this.uri = '';
    this.audioBuffer = null;
    this.controls = false;
    this.canPlay = false;
    this.canPlayKeyword = true;
    this.zone = new NgZone({ enableLongStackTrace: false });

  }

  setControls(controls: boolean) {
    this.controls = controls;
    if (this.controls) {
      if (this.recorder === null) {
        this.recorder = this.audio.getAudioRecorder();
        this.recorder.initialise();
        this.recorder.onEnded.add(() => this.getBuffer() );
      }
    }
  }

  getBuffer() {
    this.audioBuffer = this.recorder.recordBuffer;
    this.zone.run(() => {
        this.canPlay = true;
    })
  }


  canRecord() {
    return !this.isPlaying() && !this.isPlaying();
  }
  hasAudioBuffer() {
    return this.audioBuffer !== null;
  }

  isPlaying() {
    return this.player.running;
  }

  getKeywordContent() {
    return '';
  }

  isRecording() {
    return (this.recorder !== null) && this.recorder.running;
  }

  playKeyword() {
    if (this.uri) {
      this.player.playUri(this.uri);
    }
  }

  playRecording() {
    if (this.audioBuffer) {
      console.log(this.audioBuffer);
      this.player.playBuffer(this.audioBuffer);
    }
  }

  startRecording() {
    this.recording = true;
    this.canPlayKeyword = false;
    this.recorder.start();
  }

  stopRecording() {
    this.recording = false;
    this.canPlayKeyword = true;
    this.recorder.stop();

  }

  toggleRecording() {
    if (this.recorder.running) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

}
