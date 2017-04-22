import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeywordPage } from './keyword-page';

@NgModule({
  declarations: [
    KeywordPage,
  ],
  imports: [
    IonicPageModule.forChild(KeywordPage),
  ],
  exports: [
    KeywordPage
  ]
})
export class KeywordPageModule {

}
