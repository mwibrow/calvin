import { Component, ViewChild, Directive, Input, NgZone, ElementRef } from '@angular/core';
/**
 * Generated class for the VideoPlayerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'video-player',
  templateUrl: 'video-player.html'
})
export class VideoPlayerComponent {

  src: string;
  playing: boolean;
  @ViewChild('videoPlayer') video: ElementRef;
  @ViewChild('source') source: ElementRef;
  constructor(public zone: NgZone) {
    this.playing = false;
    console.log('Hello VideoPlayerComponent Component');

  }

  ngOnInit() {
    this.video.nativeElement.addEventListener('ended', () => this.stop());
    this.video.nativeElement.controls = false;
  }
  setSrc(src) {
    this.video.nativeElement.setAttribute('src', src);
  }

  getSrc() {
    return this.src;
  }

  play() {
    this.playing = true
    this.video.nativeElement.muted = false;
    setTimeout(() => this.video.nativeElement.play(), 1000);
  }

  stop() {
    this.video.nativeElement.pause();
    this.video.nativeElement.currentTime = 0;
    this.playing = false;
  }


}

@Directive({
  selector: '[video-src]' // Attribute selector
})
export class VideoSrcDirective {
  @Input('video-src') videoSrc: string;
  constructor(public videoPlayer: VideoPlayerComponent) {}
  ngOnInit() {
    this.videoPlayer.setSrc(this.videoSrc);
  }
}