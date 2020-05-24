import { Component, ViewChild, Input, NgZone, ElementRef } from "@angular/core";

@Component({
  selector: "video-player",
  templateUrl: "video-player.html",
})
export class VideoPlayerComponent {
  playing: boolean;
  @ViewChild("videoPlayer") video: ElementRef;
  @Input("src") src: string;
  @Input("disabled") disabled: string;
  constructor(public zone: NgZone) {
    this.playing = false;
  }

  ngOnInit() {
    this.video.nativeElement.addEventListener("ended", () => this.stop());
    this.video.nativeElement.controls = false;
  }

  isDisabled() {
    return this.disabled === "true";
  }

  setSrc(src: string) {
    this.src = src;
  }

  play() {
    if (this.isDisabled()) {
      return;
    }
    this.playing = true;
    this.video.nativeElement.muted = false;
    setTimeout(() => this.video.nativeElement.play(), 1000);
  }

  stop() {
    this.video.nativeElement.pause();
    this.video.nativeElement.currentTime = 0;
    this.playing = false;
  }
}
