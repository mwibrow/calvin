import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectKeywordPage } from './select-keyword';

@NgModule({
  declarations: [
    SelectKeywordPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectKeywordPage),
  ],
})
export class SelectKeywordPageModule {}
