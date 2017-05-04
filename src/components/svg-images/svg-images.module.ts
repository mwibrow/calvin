import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvgImages } from './svg-images';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    SvgImages,
    HttpModule
  ],
  imports: [
    IonicPageModule.forChild(SvgImages),
  ],
  exports: [
    SvgImages
  ]
})
export class SvgImagesModule {}
