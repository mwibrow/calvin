import { Directive, Input } from '@angular/core';
import { VideoPlayerComponent } from '../../components/video-player/video-player';
/**
 * Generated class for the VideoDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[video]' // Attribute selector
})
export class VideoDirective {

  @Input('video') video: string;
  constructor(public videoPlayerComponent: VideoPlayerComponent) {
    console.log('Hello VideoDirective Directive');
  }

   ngOnInit(){
    this.videoPlayerComponent.setVideo(this.video);
  }

}
