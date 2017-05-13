import { Component } from '@angular/core';

/**
 * Generated class for the VocalTractAnimationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'vocal-tract-animation',
  templateUrl: 'vocal-tract-animation.html'
})
export class VocalTractAnimationComponent {

  text: string;

  constructor() {
    console.log('Hello VocalTractAnimationComponent Component');
    this.text = 'Hello World';
  }

}
