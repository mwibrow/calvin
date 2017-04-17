import { NgModule } from '@angular/core';
import { IonicModule, NavParams } from 'ionic-angular';
import { VideoPlayerPage } from './video-player-page';

@NgModule({
  declarations: [
    VideoPlayerPage,
  ],
  exports: [
    VideoPlayerPage
  ]
})
export class VideoPlayerPageModule {

  constructor (
    navParams: NavParams
  ){

  }

}
