import { Component, Input } from '@angular/core';

/**
 * Generated class for the SvgShapeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'svg-shape',
  templateUrl: 'svg-shape.html'
})
export class SvgShapeComponent {

  @Input('shape') shape: string = 'rectangle';
  @Input('color') color: string = '#000000';
  @Input('width') width: string = '100';
  @Input('height') height: string = '50';
  @Input('preserveAspectRatio') preserveAspectRatio: string = 'xMidYMid';
  @Input('click') click: any;
  constructor() {
    console.log('Hello SvgShapeComponent Component');

  }



}
