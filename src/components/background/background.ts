import { Component, Input } from '@angular/core';

/**
 * Generated class for the BackgroundComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'background',
  templateUrl: 'background.html'
})
export class BackgroundComponent {

  @Input('color') color: string = 'black';
  @Input('image') image: string = '';
  @Input('pattern') pattern = '';
  svgPath: string = '';
  constructor() {}

  ngOnInit() {
    this.makePattern(this.pattern);
  }

  makePattern(pattern: string) {
    switch (pattern) {
      case 'horizontal-lines':
        this.svgPath = this.horizontalLines();
        break;
      default:
        this.svgPath = '';
    }
  }

  horizontalLines() {
    let i: number, j: number, x: number, y: number;
    const intervals: number = 10, width: number = 100, height: number = 100, thickness: number = 1;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      y = (i + 0.5) * vFactor + thickness * (1 - Math.random());
      d.push(`M 0 ${y}`);
      for (j = 0; j <= intervals; j ++) {
        x = (j + 0.5) * hFactor + Math.random() * 2 - 1;
        y = (i + 0.5) * vFactor + thickness * (1 - Math.random());
        d.push(`L ${x} ${y}`);
      }
      for (j = intervals; j >= -1; j --) {
        x = (j + 0.5) * hFactor + Math.random() * 2 - 1;
        y = (i + 0.5) * vFactor - thickness * (1 - Math.random());
        d.push(`L ${x} ${y}`);
      }
      d.push('Z');
    }
    return d.join(' ');
  }
}
