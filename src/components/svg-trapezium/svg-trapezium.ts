import { Component } from '@angular/core';

/**
 * Generated class for the SvgTrapeziumComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'svg-trapezium',
  templateUrl: 'svg-trapezium.html'
})
export class SvgTrapeziumComponent {

  text: string;

  constructor() {
    console.log('Hello SvgTrapeziumComponent Component');
    this.text = 'Hello World';
  }

}
