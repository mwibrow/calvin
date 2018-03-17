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
    const width = this.getWidth()
    function line(x, y, size) {
      let lx: number, ly: number
      const d: Array<string> = [];
      const thickness = size / 10
      d.push(`M 0 ${y}`);
      for (let j = 0; j <= 10; j++) {
        lx = width / 10 * j;
        ly = y + thickness * (1 - Math.random());
        d.push(`L ${lx} ${ly}`);
      }
      for (let j = 10; j >= 0; j--) {
        lx = width / 10 * j;
        ly = y - thickness * (1 - Math.random());
        d.push(`L ${lx} ${ly}`);
      }
      d.push('Z');
      return d.join(' ');
    }
    return this.drawOnGrid(line, { ySteps: 10 });
  }

  drawOnGrid(draw: Function, options: any = {}) {
    const steps = options.steps || 0
    const xSteps = options.xSteps || steps
    const ySteps = options.ySteps || steps

    const width = this.getWidth();
    const height = this.getHeight();
    const defaultSize = Math.sqrt(width * width + height * height) / 12.5;
    const path: Array<string> = [];

    let i: number, j: number, x: number, y: number, size: number;
    for (i = 0; i <= ySteps; i++) {
      for (j = 0; j <= xSteps; j++) {
        size = defaultSize;
        x = j / xSteps * width;
        y = i / ySteps * height;
        if (options.randomize) {
          x = x + rand() * size / 2;
          y = y + rand() * size / 2;
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
    return this.drawOnGrid(diamond, { steps: 10, randomize: true })
  }

  hearts() {
    function heart(x, y, size) {
      const w = size;
      const h = size;
      return `M ${x} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x + w / 2} ${y} C ${x + w / 2} ${y + h / 3} ${x + w / 4} ${y + h / 4} ${x} ${y + h * 2 / 3} C ${x - w / 4} ${y + h / 4} ${x - w / 2} ${y + h / 3} ${x - w / 2} ${y} A ${w / 4} ${h / 4} 0 0 1 ${x} ${y} Z`
    }
    return this.drawOnGrid(heart, { steps: 10, randomize: true })
  }

  circles() {
    function circle(x, y, size) {
      const rx = size / 2;
      const ry = size / 2;
      const z = .55191496;
      return `M ${x + rx} ${y}` +
          `C ${x + rx * 1} ${y + ry * z} ${x + rx * z} ${y + ry * 1} ${x + rx * 0} ${y + ry * 1} ` +
          `C ${x - rx * z} ${y + ry * 1} ${x - rx * 1} ${y + ry * z} ${x - rx * 1} ${y + ry * 0} ` +
          `C ${x - rx * 1} ${y - ry * z} ${x - rx * z} ${y - ry * 1} ${x - rx * 0} ${y - ry * 1} ` +
          `C ${x + rx * z} ${y - ry * 1} ${x + rx * 1} ${y - ry * z} ${x + rx * 1} ${y + ry * 0} Z`;
    }
    return this.drawOnGrid(circle, { steps: 10, randomize: true })
  }

  squares() {
    function square(x, y, size) {
      const w = size / 3;
      const h = size / 3;
      return `M ${x - w} ${y - h} L ${x + w} ${y - h} L ${x + w} ${y + h} L ${x - w} ${y + h} Z`;
    }
    return this.drawOnGrid(square, { steps: 10, randomize: true })
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
    function star(x, y, size) {
      const d: Array<string> = [];
      const points = 5;
      const rotation = Math.PI * rand();
      for (let k: number = 0; k < points * 2; k++) {
        let angle = Math.PI / points * k + rotation;
        let radius = size / 2 * (k % 2 ? 1 : .5);
        d.push(`${k === 0 ? 'M' : 'L'} ${x + Math.cos(angle) * radius} ${y + Math.sin(angle) * radius}`)
      }
      d.push('Z');
      return d.join(' ');
    }
    return this.drawOnGrid(star, { steps: 10, randomize: true })
  }
}
