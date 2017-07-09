import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeywordComponent } from './keyword';

@NgModule({
  declarations: [
    KeywordComponent,
  ],
  imports: [
    IonicPageModule.forChild(KeywordComponent),
  ],
  exports: [
    KeywordComponent
  ]
})
export class KeywordComponentModule {}
