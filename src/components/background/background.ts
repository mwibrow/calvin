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
  @Input('pattern') pattern = 'circles';
  svgPath: string = '';
  constructor() {}

  ngOnInit() {
    this.makePattern(this.pattern);
  }

  getApsectRatio() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / Math.max(document.documentElement.clientHeight, window.innerHeight || 0) || 1;
  }

  makePattern(pattern: string) {
    switch (pattern) {
      case 'horizontal-lines':
        this.svgPath = this.horizontalLines();
        break;
      case 'circles':
        this.svgPath = this.circles();
        break;
      case 'squares':
        this.svgPath = this.squares();
        break;
      case 'stars':
        this.svgPath = this.stars();
        break;
      case 'triangles':
        this.svgPath = this.triangles();
        break;
      case 'diamonds':
        this.svgPath = this.diamonds();
        break;
      case 'hearts':
        this.svgPath = this.hearts();
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

  diamonds() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, w: number, h: number;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2;
        h = w *  aspectRatio;

        x = (j + Math.random()) * hFactor;
        y = (i + Math.random()) * vFactor;
        d.push(`M ${x} ${y} L ${x + w / 2} ${y + h / 2} L ${x} ${y + h} L ${x - w / 2} ${y + h / 2} Z`);
      }
    }
    return d.join(' ');
  }

  hearts() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, w: number, h: number;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2;
        h = w *  aspectRatio;

        x = (j + Math.random()) * hFactor;
        y = (i + Math.random()) * vFactor;
        d.push(`M ${x} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x + w / 2} ${y} C ${x + w / 2} ${y + h / 3} ${x + w / 4} ${y + h / 4} ${x} ${y + h * 2 / 3} C ${x - w / 4} ${y + h / 4} ${x - w / 2} ${y + h / 3} ${x - w / 2} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x} ${y} Z`);
      }
    }
    return d.join(' ');
  }

  circles() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, rx: number, ry: number;
    const z: number = .55191496;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        ry = Math.random() * 5;
        rx = ry / aspectRatio;
        x = (j + Math.random()) * hFactor;
        y = (i + Math.random()) * vFactor;
        d.push(`M ${x + rx} ${y}` +
          `C ${x + rx * 1} ${y + ry * z} ${x + rx * z} ${y + ry * 1} ${x + rx * 0} ${y + ry * 1} ` +
          `C ${x - rx * z} ${y + ry * 1} ${x - rx * 1} ${y + ry * z} ${x - rx * 1} ${y + ry * 0} ` +
          `C ${x - rx * 1} ${y - ry * z} ${x - rx * z} ${y - ry * 1} ${x - rx * 0} ${y - ry * 1} ` +
          `C ${x + rx * z} ${y - ry * 1} ${x + rx * 1} ${y - ry * z} ${x + rx * 1} ${y + ry * 0} Z`);
      }
    }
    return d.join(' ');
  }

  squares() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, w: number, h: number;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2;
        h = w *  aspectRatio;

        x = (j + Math.random()) * hFactor;
        y = (i + Math.random()) * vFactor;
        d.push(`M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`);
      }
    }
    return d.join(' ');
  }

  triangles() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, w: number, h: number;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals * aspectRatio;
    const vFactor: number = height / intervals;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2;
        h = w * aspectRatio;
        x = (j + Math.random()) * hFactor;
        y = (i + Math.random()) * vFactor;
        d.push(`M ${x} ${y} L ${x + w} ${y} L ${x + w / 2} ${y - h} Z`);
      }
    }
    return d.join(' ');
  }

  stars(points: number = 5) {
    const aspectRatio = this.getApsectRatio();
    let centerX: number, centerY: number,
      radiusX: number, radiusY: number,
      rotation: number, i: number, j: number, k: number,
      x: number, y: number, angle: number;
    let d: Array<string> = [];
    for (i = 0; i < 10; i ++) {
      for (j = 0; j < 10; j ++) {
        centerX = (i + .5 + Math.random() * 2 - 1) * 10;
        centerY = (j + .5 + Math.random() * 2 - 1) * 10;
        radiusX = 1 + Math.random() * 2;
        radiusY = radiusX * aspectRatio;
        rotation = Math.random() * Math.PI * 2;
        for (k = 0; k < points * 2; k ++) {
          angle = Math.PI / points * k + rotation;
          x = centerX + Math.cos(angle) * radiusX * (k % 2 ? 1 : .5);
          y = centerY + Math.sin(angle) * radiusY * (k % 2 ? 1 : .5);
          d.push(`${k === 0 ? 'M' : 'L'} ${x} ${y}`);
        }
        d.push('Z')
      }
    }
    return d.join(' ');
  }
}
