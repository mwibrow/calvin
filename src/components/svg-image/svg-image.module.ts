import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvgImage } from './svg-image';
@NgModule({
  declarations: [
    SvgImage,
  ],
  imports: [
    IonicPageModule.forChild(SvgImage),
  ],
  exports: [
    SvgImage
  ]
})
export class SvgImagesModule {}
