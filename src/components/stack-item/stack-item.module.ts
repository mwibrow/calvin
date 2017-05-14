import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StackItemComponent } from './stack-item';

@NgModule({
  declarations: [
    StackItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(StackItemComponent),
  ],
  exports: [
    StackItemComponent
  ]
})
export class StackItemComponentModule {}
