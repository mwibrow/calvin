import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackgroundComponent } from './background';

@NgModule({
  declarations: [
    BackgroundComponent,
  ],
  imports: [
    IonicPageModule.forChild(BackgroundComponent),
  ],
  exports: [
    BackgroundComponent
  ]
})
export class BackgroundComponentModule {}
