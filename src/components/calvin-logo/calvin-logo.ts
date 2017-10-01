import { Component } from '@angular/core';

/**
 * Generated class for the CalvinLogoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calvin-logo',
  templateUrl: 'calvin-logo.html'
})
export class CalvinLogoComponent {

  text: string;

  constructor() {
    console.log('Hello CalvinLogoComponent Component');
    this.text = 'Hello World';
  }

}
