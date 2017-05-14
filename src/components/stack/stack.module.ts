import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StackComponent } from './stack';

@NgModule({
  declarations: [
    StackComponent,
  ],
  imports: [
    IonicPageModule.forChild(StackComponent),
  ],
  exports: [
    StackComponent
  ]
})
export class StackComponentModule {}
