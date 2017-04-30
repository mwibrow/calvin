import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Introduction } from './introduction';

@NgModule({
  declarations: [
    Introduction,
  ],
  imports: [
    IonicPageModule.forChild(Introduction),
  ],
  exports: [
    Introduction
  ]
})
export class IntroductionModule {}
