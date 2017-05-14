import { Component } from '@angular/core';

/**
 * Generated class for the StackItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'stack-item',
  templateUrl: 'stack-item.html'
})
export class StackItemComponent {

  text: string;

  constructor() {
    console.log('Hello StackItemComponent Component');
    this.text = 'Hello World';
  }

}
