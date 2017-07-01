import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NarratorComponent } from './narrator';

@NgModule({
  declarations: [
    NarratorComponent,
  ],
  imports: [
    IonicPageModule.forChild(NarratorComponent),
  ],
  exports: [
    NarratorComponent
  ]
})
export class NarratorComponentModule {}
