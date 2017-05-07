import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvgAnimation } from './svg-animation';

@NgModule({
  declarations: [
    SvgAnimation,
  ],
  imports: [
    IonicPageModule.forChild(SvgAnimation),
  ],
  exports: [
    SvgAnimation
  ]
})
export class SvgAnimationModule {}
