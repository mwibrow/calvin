import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoComponent } from './logo';

@NgModule({
  declarations: [
    LogoComponent,
  ],
  imports: [
    IonicPageModule.forChild(LogoComponent),
  ],
  exports: [
    LogoComponent
  ]
})
export class LogoComponentModule {}
