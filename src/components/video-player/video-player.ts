import { Component, Directive, ViewChild, Input, NgZone, ElementRef } from '@angular/core';

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.html'
})
export class VideoPlayerComponent {

  playing: boolean;
  poster: string;
  volume: number;
  @ViewChild('videoPlayer') video: ElementRef;
  @Input('src') src: string;
  @Input('disabled') disabled: string;
  @Input('thumbnail') thumbnail: string;
  constructor(public zone: NgZone) {
    this.playing = false;
    this.poster = '';
  }

  ngOnInit() {
    this.video.nativeElement.addEventListener('ended', () => this.stop());
    this.video.nativeElement.controls = false;
  }

  isDisabled() {
    return this.disabled === 'true';
  }

  load() {
    this.video.nativeElement.load();
  }

  fakeload() {
    console.log('fakeload')
    this.video.nativeElement.play().then(_ => {
      this.video.nativeElement.volume = 0;
      setTimeout(() => {
        this.video.nativeElement.pause();
        this.video.nativeElement.volume = 1;
      }, 100);
    })
  }

  setSrc(src: string) {
    this.src = src;
    this.poster = `${src.split(/\.[a-z0-9]$/)[0]}.jpg`;
  }

  setThumbnail(src: string) {
    this.poster = src;
  }

  play() {
    if (this.isDisabled()) return;
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


// @Directive({
//   selector: '[thumbnail]'
// })
// export class TumbnailDirective {

//   @Input('thumnail') thumbnail: string;
//   constructor(public videoPlayer: VideoPlayerComponent) {}

//   ngOnInit(){
//     this.videoPlayer.setThumbnail(this.thumbnail);
//   }

// }
