import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VocalTractAnimationComponent } from './vocal-tract-animation';

@NgModule({
  declarations: [
    VocalTractAnimationComponent,
  ],
  imports: [
    IonicPageModule.forChild(VocalTractAnimationComponent),
  ],
  exports: [
    VocalTractAnimationComponent
  ]
})
export class VocalTractAnimationComponentModule {}
