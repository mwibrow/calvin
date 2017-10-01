import { Component } from '@angular/core';

/**
 * Generated class for the BackgroundComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'background',
  templateUrl: 'background.html'
})
export class BackgroundComponent {

  text: string;

  constructor() {
    console.log('Hello BackgroundComponent Component');
    this.text = 'Hello World';
  }

}
