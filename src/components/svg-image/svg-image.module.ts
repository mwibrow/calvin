import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvgImageComponent } from './svg-image';

@NgModule({
  declarations: [
    SvgImageComponent,
  ],
  imports: [
    IonicPageModule.forChild(SvgImageComponent),
  ],
  exports: [
    SvgImageComponent
  ]
})
export class SvgImageComponentModule {}
