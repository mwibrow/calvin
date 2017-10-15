import { Component } from '@angular/core';

/**
 * Generated class for the HelpComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'help',
  templateUrl: 'help.html'
})
export class HelpComponent {

  text: string;

  constructor() {
    console.log('Hello HelpComponent Component');
    this.text = 'Hello World';
  }

}
