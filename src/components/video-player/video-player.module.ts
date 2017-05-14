import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoPlayerComponent } from './video-player';

@NgModule({
  declarations: [
    VideoPlayerComponent,
  ],
  imports: [
    IonicPageModule.forChild(VideoPlayerComponent),
  ],
  exports: [
    VideoPlayerComponent
  ]
})
export class VideoPlayerComponentModule {}
