import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectTalkerPage } from './select-talker';

@NgModule({
  declarations: [
    SelectTalkerPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectTalkerPage),
  ],
})
export class SelectTalkerPageModule {}
