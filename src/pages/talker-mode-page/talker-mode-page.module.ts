import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TalkerModePage } from './talker-mode-page';

@NgModule({
  declarations: [
    TalkerModePage,
  ],
  imports: [
    IonicPageModule.forChild(TalkerModePage),
  ],
  exports: [
    TalkerModePage
  ]
})
export class TalkerModePageModule {}
