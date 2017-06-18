import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkerSelectModal } from './talker-select-modal';

@NgModule({
  declarations: [
    TalkerSelectModal,
  ],
  imports: [
    IonicPageModule.forChild(TalkerSelectModal),
  ],
  exports: [
    TalkerSelectModal
  ]
})
export class TalkerSelectModalPageModule {}
