import { Component } from '@angular/core';

/**
 * Generated class for the NarratorComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
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
