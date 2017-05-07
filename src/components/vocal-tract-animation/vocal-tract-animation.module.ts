import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocalTractAnimation } from './vocal-tract-animation';

@NgModule({
  declarations: [
    VocalTractAnimation,
  ],
  imports: [
    IonicPageModule.forChild(VocalTractAnimation),
  ],
  exports: [
    VocalTractAnimation
  ]
})
export class VocalTractAnimationModule {}
