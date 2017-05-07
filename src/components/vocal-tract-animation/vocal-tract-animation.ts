import { Component } from '@angular/core';

/**
 * Generated class for the VocalTractAnimation component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html'
})
export class VocalTractAnimation {

  text: string;

  constructor() {
    console.log('Hello VocalTractAnimation Component');
    this.text = 'Hello World';
  }

}
