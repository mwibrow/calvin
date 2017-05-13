import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VowelTrainerPage } from './vowel-trainer';

@NgModule({
  declarations: [
    VowelTrainerPage,
  ],
  imports: [
    IonicPageModule.forChild(VowelTrainerPage),
  ],
  exports: [
    VowelTrainerPage
  ]
})
export class VowelTrainerPageModule {}
