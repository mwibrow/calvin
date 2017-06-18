import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WordTrainerPage } from './word-trainer';

@NgModule({
  declarations: [
    WordTrainerPage,
  ],
  imports: [
    IonicPageModule.forChild(WordTrainerPage),
  ],
  exports: [
    WordTrainerPage
  ]
})
export class WordTrainerPageModule {}
