import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VowelTrainer } from './vowel-trainer';

@NgModule({
  declarations: [
    VowelTrainer,
  ],
  imports: [
    IonicPageModule.forChild(VowelTrainer),
  ],
  exports: [
    VowelTrainer
  ]
})
export class VowelTrainerModule {}
