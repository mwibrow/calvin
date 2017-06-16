import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkerModeModal } from './talker-mode-modal';

@NgModule({
  declarations: [
    TalkerModeModal,
  ],
  imports: [
    IonicPageModule.forChild(TalkerModeModal),
  ],
  exports: [
    TalkerModeModal
  ]
})
export class TalkerModeModalPageModule {}
