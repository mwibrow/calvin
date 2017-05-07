import { Component } from '@angular/core';
import * as svgParse from 'svg-path-parser';

/**
 * Generated class for the SvgAnimation component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'svg-animation',
  templateUrl: 'svg-animation.html'
})
export class SvgAnimation {

  text: string;
  paths: Array<Path>;
  points: Array<Points>
  constructor() {
    console.log('Hello SvgAnimation Component');
    this.text = 'Hello World';
  }

}


class Point {
  x: number;
  y: number;
  xSaved: number;
  ySaved: number;
  constructor(x: number, y: number) {
    this.xSaved = this.x = x;
    this.ySaved = this.y = y;
  }

  copy(): Point {
    return new Point(this.x, this.y);
  }
  save() {
    this.xSaved = this.x;
    this.ySaved = this.y;
  }

  restore() {
    this.x = this.xSaved;
    this.y = this.ySaved;
  }

  toSvg(): string {
    return `${this.x},${this.y}`;
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
}


class Points {
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
    this.points.concat(points);
  }
}

class Path {

  segments: Array<PathSegment>;
  constructor() {
    this.segments = new Array<PathSegment>();
  }

  append(segment: PathSegment) {
    let segmentCount: number = this.segments.length;
    if (segmentCount > 1) {
      segment.from = this.segments[segmentCount - 2].to;
    }
    this.segments.push(segment);
  }

  toSvg() {
    return this.segments.map(function(segment) {
      return segment.toSvg();
    }).join(' ');
  }

  static fromSvg(svgString: string): Path {
    let svgSegment: any, i: number, lastPoint: Point = null;
    let svgSegments: Array<any> = svgParse(svgString);
    let path: Path = new Path();
    let segment: PathSegment;

    for (i = 0; i < svgSegments.length; i++) {
      svgSegment = svgSegments[i];
      switch(svgSegment.code.toLowerCase()) {
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

  toSvg(): string {
    if (this.fromSupport && this.toSupport) {
      return `${this.command} ${this.fromSupport.toSvg()} ${this.toSupport.toSvg()} ${this.to.toSvg()}`;
    } else {
      return `${this.command} ${this.to.toSvg()}`;
    }
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
