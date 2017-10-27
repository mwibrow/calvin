import { Component } from '@angular/core';

/**
 * Generated class for the SvgArrowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'svg-arrow',
  templateUrl: 'svg-arrow.html'
})
export class SvgArrowComponent {

  text: string;

  constructor() {
    console.log('Hello SvgArrowComponent Component');
    this.text = 'Hello World';
  }

}
