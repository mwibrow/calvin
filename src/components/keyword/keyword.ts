import { Component, Directive, Input, NgZone } from '@angular/core';
import { AudioProvider } from '../../providers/audio/audio'
import { v4 } from 'uuid';

@Component({
  selector: 'keyword',
  templateUrl: 'keyword.html'
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
  canRecord: boolean;
  zone: NgZone;
  onEndedId: string;
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
    this.canRecord = true;
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.onEndedId = '';
  }

  setUri(uri: string) {
    this.uri = uri;
    this.canPlay = false;
  }

  setControls(controls: boolean) {
    this.controls = controls;
    if (this.controls) {
      if (this.recorder === null) {
        this.recorder = this.audio.getAudioRecorder();
        this.recorder.initialise();
        this.recorder.onEnded.removeAll();
      }
    }
  }

  getBuffer() {
    this.audioBuffer = this.recorder.recordBuffer;
    this.recorder.onEnded.remove(this.onEndedId);
    this.zone.run(() => {
      this.canPlay = true;
      this.recording = false;
      this.canPlayKeyword = true;
    });
  }

  playKeyword() {
    if (this.uri) {
      this.player.playUri(this.uri);
    }
  }

  playRecording() {
    if (this.audioBuffer) {
      this.player.playBuffer(this.audioBuffer);
    }
  }

  startRecording() {
    this.recording = true;
    this.canPlayKeyword = this.canPlay = false;
    this.onEndedId = v4();
    this.recorder.onEnded.add(() => this.getBuffer(), this.onEndedId);
    this.recorder.start(5.0);
  }

  stopRecording() {
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

@Directive({
  selector: '[keyword-controls]' // Attribute selector
})
export class KeywordControlsDirective {
  constructor(public keywordComponent: KeywordComponent) {}
  ngOnInit() {
    this.keywordComponent.setControls(true);
  }
}


@Directive({
  selector: '[keyword-uri]' // Attribute selector
})
export class KeywordUriDirective {
  @Input('keyword-uri') keywordUri: string;
   constructor(public keywordComponent: KeywordComponent) {}

  ngOnInit() {
    this.keywordComponent.setUri(this.keywordUri);
  }
}
