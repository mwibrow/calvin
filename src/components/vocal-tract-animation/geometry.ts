import * as svgParse from 'svg-path-parser';

export module Geometry {



export class Point {

  constructor(public x: number, public y: number) {}

  copy(): Point {
    return new Point(this.x, this.y);
  }

  toSvg(): string {
    return `${this.x},${this.y}`;
  }

  scale(factor: number, inPlace=true) {
    if (inPlace) {
      this.x *= factor;
      this.y *= factor;
    } else {
      return new Point(this.x * factor, this.y * factor);
    }
  }

  translate(point: Point, inPlace=true) {
    if (inPlace) {
      this.x += point.x;
      this.y += point.y;
    } else {
      return new Point(this.x + point.x, this.y + point.y);
    }
  }

  rotate(angle: number, inPlace=true) {
    let cosAngle: number, sinAngle: number, x: number, y:number;
    cosAngle = Math.cos(Math.PI / 180 * angle);
    sinAngle = Math.sin(Math.PI / 180 * angle);
    x = this.x * cosAngle - this.y * sinAngle;
    y = this.x * sinAngle + this.y * cosAngle;
    if (inPlace) {
      this.x = x;
      this.y = y;
    } else {
      return new Point(x, y);
    }
  }

  neg(inPlace=true) {
    if (inPlace) {
      this.x = -this.x;
      this.y = -this.y;
    } else {
      return new Point(-this.x, -this.y);
    }
  }

  rotateAround(angle: number, point: Point, inPlace=true) {
    let tmpPoint = this.copy();
    tmpPoint.x -= point.x;
    tmpPoint.y -= point.y;
    tmpPoint.rotate(angle);
    tmpPoint.x += point.x;
    tmpPoint.y += point.y;
    if (inPlace) {
      this.x = tmpPoint.x;
      this.y = tmpPoint.y;
    } else {
      return tmpPoint;
    }
  }

  static pointAtTime(t: number, p: Point, q:Point) {
    return new Point(p.x * (1 - t) + q.x * t, p.y * (1 - t) + q.y * t);
  }

  show(svgElement: any) {
    let newpath: any = document.createElementNS('http://www.w3.org/2000/svg','circle');
    newpath.setAttributeNS(null, 'cx', `${this.x}`);
    newpath.setAttributeNS(null, 'cy', `${this.y}`);
    newpath.setAttributeNS(null, 'r', '4');
    svgElement.appendChild(newpath);
  }

  update(point: Point) {
    this.x = point.x;
    this.y = point.y;
  }
}

export class Vector extends Point {

  translate(point: Point, inPlace=true) {
    if (!inPlace) {
      return new Vector(this.x, this.y);
    }
  }
}


class SvgPoint extends Point {

  svgNode: any;

  constructor(x: number, y: number) {
    super(x, y);
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg','circle');
  }

  addToSvg(svgElement: any) {
    svgElement.appendChild(this.svgNode);
  }

  update() {
    this.svgNode.setAttribute('cx', `${this.x}`);
    this.svgNode.setAttribute('cy', `${this.y}`);
  }

}

export class Points {
  points: Array<Point>;
  constructor(points?: Array<Point>) {
    if (points) {
      this.points = points;
    } else {
      this.points = new Array<Point>();
    }
  }

  append(point: Point) {
    this.points.push(point);
  }

  appendPoints(points: Array<Point>) {
    this.points = this.points.concat(points);
  }

  get(i: number): Point {
    return this.points[i];
  }

  copy(): Points {
    let points: Points = new Points();
    this.points.forEach((x) => points.append(x.copy()));
    return points;
  }

  length(): number {
    return this.points.length;
  }

  apply(callback) {
    for (let i: number = 0; i < this.points.length; i ++) {
      this.points[i] = callback(this.points[i]);
    }
  }

  update(points: Points) {
    for (let i: number = 0; i < this.points.length; i ++) {
      this.points[i].update(points.points[i]);
    }
  }
}

class Path {

  segments: Array<PathSegment>;
  constructor() {
    this.segments = new Array<PathSegment>();
  }

  copy(): Path {
    let path: Path = new Path();
    for (let i = 0; i < this.segments.length; i++) {
      path.segments.push(this.segments[i].copy())
    }
    return path;
  }

  append(segment: PathSegment) {
    let segmentCount: number = this.segments.length;
    if (segmentCount > 0) {
      segment.from = this.segments[segmentCount - 1].to.copy();
    } else {
      if (!segment.from) {
        segment.from = segment.to.copy();
      }
    }
    this.segments.push(segment);
  }


  toSvg() {
    return this.segments.map(function(segment) {
      return segment.toSvg();
    }).join(' ');
  }

  getPoints(...indices: any[]): Points {
    let i: number, j: number;
    let allPoints: Array<Point> = new Array<Point>();
    let points: Array<Point> = new Array<Point>();
    for (i = 0; i < this.segments.length; i++) {
      allPoints = allPoints.concat(this.segments[i].getPoints());
    }

    if (indices.length) {
        for (i = 0; i < indices.length; i ++ ) {
            for (j = 0; j < indices[i].length; j ++) {
                points.push(allPoints[indices[i][j]]);
            }
        }
    } else {
        points = allPoints;
    }
    return new Points(points);
  }

  static fromSvg(svgString: string): Path {
    let svgSegment: any, i: number, lastPoint: Point = null;
    let svgSegments: Array<any> = svgParse(svgString);
    let path: Path = new Path();
    let segment: PathSegment;

    for (i = 0; i < svgSegments.length; i++) {
      svgSegment = svgSegments[i];
      switch(svgSegment.code) {
        case 'M':
          segment = new MoveToSegment(null, new Point(svgSegment.x, svgSegment.y));
          break;
        case 'L':
          segment = new LineToSegment(null, new Point(svgSegment.x, svgSegment.y));
          break;
        case 'C':
          segment = new CurveToSegment(null,
            new Point(svgSegment.x1, svgSegment.y1),
            new Point(svgSegment.x2, svgSegment.y2),
            new Point(svgSegment.x, svgSegment.y));
          break;
        case 'Z':
           segment = new ClosePathSegment(null,
             new Point(svgSegment.x, svgSegment.y));
          break;
        default:
          console.error(`Invalid segment code ${svgSegment.code}`);
      }
      path.append(segment);
    }
    return path;
  }
}


class PathSegment {

  command: string;
  from: Point;
  fromSupport: Point;
  toSupport: Point;
  to: Point;

  constructor() {
    this.command = '';
    this.from = null;
    this.fromSupport = null;
    this.toSupport = null;
    this.to = null;
  }

  getPoints(): Array<Point> {
    let points: Array<Point> = new Array<Point>();
    if (this.from) points.push(this.from);
    if (this.fromSupport) points.push(this.fromSupport);
    if (this.toSupport) points.push(this.toSupport);
    if (this.to) points.push(this.to);
    return points;
  }

  toSvg(): string {
    if (this.fromSupport && this.toSupport) {
      return `${this.command} ${this.fromSupport.toSvg()} ${this.toSupport.toSvg()} ${this.to.toSvg()}`;
    } else {
      return `${this.command} ${this.to.toSvg()}`;
    }
  }

  copy(): PathSegment {
    let pathSegment: PathSegment;
    switch (this.command) {
      case 'M':
        pathSegment = new MoveToSegment(this.from, this.to);
      break;
      case 'L':
        pathSegment = new LineToSegment(this.from, this.to);
      break;
      case 'Z':
        pathSegment = new ClosePathSegment(this.from, this.to);
      break;
      case 'C':
        pathSegment = new CurveToSegment(this.from, this.fromSupport, this.toSupport, this.to);
      break;
    }
    return pathSegment;
  }
}

class MoveToSegment extends PathSegment {

  constructor(from: Point, to: Point) {
    super();
    this.command = 'M';
    this.from = from;
    this.to = to;
  }
}

class LineToSegment extends PathSegment {

  constructor(from: Point, to: Point) {
    super();
    this.command = 'L';
    this.from = from;
    this.to = to;
  }
}

class ClosePathSegment extends PathSegment {

  constructor(from: Point, to: Point) {
    super();
    this.command = 'Z';
    this.from = from;
    this.to = to;
  }

  toSvg(): string {
    return this.command;
  }
}

class CurveToSegment extends PathSegment {

  constructor(from: Point, fromSupport: Point, toSupport: Point, to: Point) {
    super();
    this.command = 'C';
    this.from = from;
    this.fromSupport = fromSupport;
    this.toSupport = toSupport;
    this.to = to;
  }
}


export class SvgPath extends Path {

  domNode: any;
  showPathConstruction: boolean;
  parentSvg: any;
  constructor() {
    super();
    this.domNode = null;
    this.showPathConstruction = false;
    this.parentSvg = null;
  }

  copySegments(): SvgPath {
    let path: SvgPath = new SvgPath();
    for (let i = 0; i < this.segments.length; i++) {
      path.segments.push(this.segments[i].copy())
    }
    path.domNode = null;
    path.parentSvg = null;
    return path;
  }

  update() {
    let d: string = this.toSvg();
    this.domNode.setAttribute('d', d);

    if (this.showPathConstruction && this.parentSvg) {
      this.drawPathConstruction()
    }
  }

  drawPathConstruction() {

    // let i: number, j: number, points: Point[], path: any;
    // for (i = 0; i < this.segments.length; i ++) {
    //   points = this.segments[i].getPoints()
    //   for (j = 0; j < 1; j ++) {
    //     path = document.createElementNS('http://www.w3.org/2000/svg','circle');
    //     path.setAttribute('cx', `${points[j].x}px`);
    //     path.setAttribute('cy', `${points[j].y}px`);
    //     path.setAttribute('r', '2');
    //     path.setAttribute('fill', 'black');
    //     this.parentSvg.appendChild(path);
    //   }
    // }
  }

  static fromPathNode(domNode: any): SvgPath {
    let svgPath: SvgPath = new SvgPath();
    svgPath.segments = Path.fromSvg(domNode.getAttribute('d')).segments;
    svgPath.domNode = domNode;
    return svgPath;
  }
}

export function seq(from: number,to?: number) :Array<number> {
    if (!to) {
        to = from;
        from = 0;
    }
    let n: number = to - from;
    return Array.from(new Array(n),(val, index) => index + from);
}


export function sequence(...indices: Array<number>[]) {
    let i: number, j: number, numbers: Array<number>;
    numbers = []
    if (indices.length) {
        for (i = 0; i < indices.length; i ++ ) {
            for (j = 0; j < indices[i].length; j ++) {
                numbers.push(indices[i][j]);
            }
        }
    }
    return sequence;
}


}

