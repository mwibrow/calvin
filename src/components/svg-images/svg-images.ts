import { Component,Input } from '@angular/core';
import { SafePipe } from '../pipes/safe-pipe';
/**
 * Generated class for the SvgImages component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'svg-image',
  template: `<div></div>`
})
export class SvgImages {

  @Input('svgname') svgName: string;
  src: string;

  constructor() {
    console.log('Hello SvgImages Component');
    console.log(this.svgName);
    this.src = 'Hello World';
  }

}
