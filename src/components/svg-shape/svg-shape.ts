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
  @Input('preserveAspectRatio') preserveAspectRatio: string = 'xMidYMid';
  @Input('click') click: any;
  @Input('rotate') rotate: string = '0';
  constructor() {
    console.log('Hello SvgShapeComponent Component');

  }

  getMatrix() {
    let cosAngle: number, sinAngle: number;
    cosAngle = Math.cos(Number.parseFloat(this.rotate) / 180 * Math.PI);
    sinAngle = Math.sin(Number.parseFloat(this.rotate) / 180 * Math.PI);
    let a, b, c, d, x, y;
    a = cosAngle;
    b = sinAngle;
    c = -sinAngle;
    d = cosAngle;
    x = 0;
    y = 0;
    return `matrix(${a}, ${b}, ${c}, ${d}, ${x}, ${y})`;
  }

}
