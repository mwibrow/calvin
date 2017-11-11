import { Component } from '@angular/core';

/**
 * Generated class for the NarratorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'narrator',
  templateUrl: 'narrator.html'
})
export class NarratorComponent {

  text: string;

  constructor() {
    console.log('Hello NarratorComponent Component');
    this.text = 'Hello World';
  }

}
