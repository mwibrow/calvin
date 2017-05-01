import { NgModule } from '@angular/core';
import { Calvin } from './calvin';
import { CalvinWave } from './calvin-wave';
@NgModule({
  declarations: [
    Calvin,
    CalvinWave
  ],
  exports: [
    Calvin,
    CalvinWave
  ]
})
export class CalvinModule {}
