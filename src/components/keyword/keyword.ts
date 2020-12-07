import { Component, Directive, Input, NgZone } from "@angular/core";

import p5 from "p5";
import "p5/lib/addons/p5.sound";

import {
  AudioProvider,
  AudioPlayer,
  AudioRecorder,
} from "../../providers/audio/audio";

@Component({
  selector: "keyword",
  templateUrl: "keyword.html",
})
export class KeywordComponent {
  player: AudioPlayer;
  recorder: AudioRecorder;
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
  sound: p5.SoundFile;

  @Input("selected") selected: boolean = false;
  @Input("selectable") selectable: boolean;
  @Input("siblings") siblings: KeywordComponent[];
  constructor(public audio: AudioProvider) {
    this.player = audio.player;

    this.player.initialise();
    this.recorder = null;
    this.recording = false;
    this.uri = "";
    this.audioBuffer = null;
    this.controls = false;
    this.canPlay = false;
    this.canPlayKeyword = true;
    this.canRecord = true;
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.onEndedId = "";

    this.sound = null;
  }

  setUri(uri: string) {
    this.uri = uri;
    this.canPlay = false;
  }

  setControls(controls: boolean) {
    this.controls = controls;
    if (this.controls) {
      if (this.recorder === null) {
        this.recorder = this.audio.recorder;
        this.recorder.initialise();
      }
    }
  }

  getBuffer() {
    // this.audioBuffer = this.recorder.recordBuffer;
    this.zone.run(() => {
      this.canPlay = true;
      this.recording = false;
      this.canPlayKeyword = true;
    });
  }

  playKeyword() {
    if (this.uri) {
      if (this.selectable) {
        if (this.siblings) {
          this.siblings.map((sibling) => (sibling.selected = false));
        }
        this.selected = !this.selected;
      }
      this.player.playUrl(this.uri).catch((err) => {
        global.console.error("AN ERROR OCCURED");
      });
    }
  }

  playRecording() {
    if (this.recorder.sound) {
      this.canRecord = false;
      this.player
        .playSound(this.recorder.sound)
        .then(() => (this.canRecord = true));
    }
  }

  startRecording() {
    this.recording = true;
    this.canPlayKeyword = this.canPlay = false;
    this.recorder.record(5.0).then(() => {
      this.canPlayKeyword = this.canPlay = true;
      this.recording = false;
    });
  }

  stopRecording() {
    this.recorder.stop();
    this.canPlayKeyword = this.canPlay = true;
    this.recording = false;
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
  selector: "[keyword-controls]", // Attribute selector
})
export class KeywordControlsDirective {
  constructor(public keywordComponent: KeywordComponent) {}
  ngOnInit() {
    this.keywordComponent.setControls(true);
  }
}

@Directive({
  selector: "[keyword-uri]", // Attribute selector
})
export class KeywordUriDirective {
  @Input("keyword-uri") keywordUri: string;
  constructor(public keywordComponent: KeywordComponent) {}

  ngOnInit() {
    this.keywordComponent.setUri(this.keywordUri);
  }
}
