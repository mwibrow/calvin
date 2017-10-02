import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeywordTrainerPage } from './keyword-trainer';

@NgModule({
  declarations: [
    KeywordTrainerPage,
  ],
  imports: [
    IonicPageModule.forChild(KeywordTrainerPage),
  ],
})
export class KeywordTrainerPageModule {}
