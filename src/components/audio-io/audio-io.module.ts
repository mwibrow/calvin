import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioIOComponent } from './audio-io';

@NgModule({
  declarations: [
    AudioIOComponent,
  ],
  imports: [
    IonicPageModule.forChild(AudioIOComponent),
  ],
  exports: [
    AudioIOComponent
  ]
})
export class AudioIoComponentModule {}
