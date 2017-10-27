import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExampleWordPage } from './example-word';

@NgModule({
  declarations: [
    ExampleWordPage,
  ],
  imports: [
    IonicPageModule.forChild(ExampleWordPage),
  ],
})
export class ExampleWordPageModule {}
