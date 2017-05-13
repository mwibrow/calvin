import { Component } from '@angular/core';

/**
 * Generated class for the LogoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'logo',
  templateUrl: 'logo.html'
})
export class LogoComponent {

  text: string;

  constructor() {
    console.log('Hello LogoComponent Component');
    this.text = 'Hello World';
  }

}
