import { Component, Input } from '@angular/core';

/**
 * Generated class for the SvgTrapeziumComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'svg-trapezium',
  templateUrl: 'svg-trapezium.html'
})
export class SvgTrapeziumComponent {

  @Input('color') color: string;
  constructor() {
    this.color = 'none';
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }

}

