import { Component } from '@angular/core';

/**
 * Generated class for the TrapeziumComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'trapezium',
  templateUrl: 'trapezium.html'
})
export class TrapeziumComponent {

  text: string;

  constructor() {
    console.log('Hello TrapeziumComponent Component');
    this.text = 'Hello World';
  }

}
