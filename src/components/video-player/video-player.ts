import { Component, ElementRef } from '@angular/core';

/**
 * Generated class for the VideoPlayerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-player',
  templateUrl: 'video-player.html'
})
export class VideoPlayerComponent {

  private video: any;
  src: String;
  constructor(private me: ElementRef) {
    this.video = this.me.nativeElement.querySelector('video');
  }

  setVideo(video: string) {
    this.video.src = video;
    console.log(`Setting video source "${video}"`);
  }

}
