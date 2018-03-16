import { Component, ElementRef, ViewChild, Input } from '@angular/core';

function rand() {
  return Math.random() * 2 - 1
}

function rnd(min: number = 0, max: number = 0) {
  const mn = Math.min(min, max)
  const mx = Math.max(min, max)
  return Math.random() * (mx - mn) + mn
}
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
  @ViewChild('backgroundSvg') svg: ElementRef;
  svgPath: string = '';
  constructor() {}

  ngOnInit() {
    this.makePattern(this.pattern);
  }

  ngAfterViewInit() {
    this.setViewBox(this.getWidth(), this.getHeight());
  }

  setViewBox(width: number, height: number) {
    this.svg.nativeElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }
  getApsectRatio() {
    return this.getWidth() / (this.getHeight() || 1);
  }

  getWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  getHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  }

  getViewBox() {
    return `0 0 ${this.getWidth()} ${this.getHeight()}`
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

  pathOnGrid(steps: number, draw: Function, options: any = {}) {
    let i: number, j: number, x: number, y: number, size: number;
    const width = this.getWidth();
    const height = this.getHeight();
    const defaultSize = Math.sqrt(width * width + height * height) / 12.5;
    const path: Array<string> = [];
    for (i = 0; i <= steps; i ++) {
      for (j = 0; j <= steps; j ++) {
        size = defaultSize;
        x = i * width / steps;
        y = j * height / steps;
        if (options.randomize) {
          x = x + rand() * size;
          y = y + rand() * size;
          size = rnd(0.5, 1) * size;
        }
        path.push(draw(x, y, size))
      }
    }
    return path.join(' ')
  }


  diamonds() {
    function diamond(x, y, size) {
      return `M ${x} ${y - size / 2} L ${x + size / 2} ${y} L ${x} ${y + size / 2} L ${x - size / 2} ${y} Z`;
    }
    return this.pathOnGrid(10, diamond, { randomize: true })
  }

  hearts() {
    function heart(x, y, size) {
      const w = size;
      const h = size;
      return `M ${x} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x + w / 2} ${y} C ${x + w / 2} ${y + h / 3} ${x + w / 4} ${y + h / 4} ${x} ${y + h * 2 / 3} C ${x - w / 4} ${y + h / 4} ${x - w / 2} ${y + h / 3} ${x - w / 2} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x} ${y} Z`
    }
    return this.pathOnGrid(10, heart, { randomize: true })
  }

  circles() {
    const aspectRatio = this.getApsectRatio();
    let i: number, j: number, x: number, y: number, rx: number, ry: number;
    const z: number = .55191496;
    const intervals: number = 10, width: number = 100, height: number = 100;
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    const scale = 2;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        ry = Math.random() * 2.5 * scale;
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
    const scale = 1.5;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2 * scale;
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
    const hFactor: number = width / intervals;
    const vFactor: number = height / intervals;
    const scale = 1.75;
    let d: Array<string> = [];
    for (i = 0; i < intervals; i ++) {
      for (j = 0; j < intervals; j ++) {
        w = Math.random() * hFactor / 2 * scale;
        h = w * aspectRatio * Math.sin(Math.PI / 3);
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
    const scale = 1.5;
    let d: Array<string> = [];
    for (i = 0; i < 10; i ++) {
      for (j = 0; j < 10; j ++) {
        centerX = (i + .5 + Math.random() * 2 - 1) * 10;
        centerY = (j + .5 + Math.random() * 2 - 1) * 10;
        radiusX = (1 + Math.random() * 2) * scale;
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
