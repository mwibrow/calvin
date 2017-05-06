import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioIO } from './audio-io';

@NgModule({
  declarations: [
    AudioIO,
  ],
  imports: [
    IonicPageModule.forChild(AudioIO),
  ],
  exports: [
    AudioIO
  ]
})
export class AudioIOModule {}
