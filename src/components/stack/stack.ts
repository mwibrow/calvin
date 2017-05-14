import { Component } from '@angular/core';

/**
 * Generated class for the StackComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stack',
  templateUrl: 'stack.html'
})
export class StackComponent {

  text: string;

  constructor() {
    console.log('Hello StackComponent Component');
    this.text = 'Hello World';
  }

}
