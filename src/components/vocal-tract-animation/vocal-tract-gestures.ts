import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures }  from './animation';



const lipUpperRotationCenter = new Geometry.Point(85, 170);
const lipLowerRotationCenter = new Geometry.Point(90, 230);
const jawRotationCenter = new Geometry.Point(280, 140);
const velumRotationCenter = new Geometry.Point(260, 140);


const HEED_SVG: string = 'M 152.51721,142.85788 C 131.53447,142.72716 118.99801,171.99808 121.48532,180.72673 C 124.25892,190.46002 139.50914,212.78562 135.94141,218.60352 C 132.61062,224.03502 125.68701,222.94452 122.85938,229.60938 C 127.64298,238.45402 137.69987,265.8246 134.1543,280.60156 C 133.12643,284.36759 130.6133,286.91324 127.34766,288.48633 C 138.37677,286.79074 151.06198,283.60658 162.11719,283.17383 C 185.23499,282.26889 199.41262,286.29295 213.34961,290.75977 C 227.2866,295.22659 255.405,297.48072 263.12695,296.21484 C 263.28009,296.18974 263.39634,296.16033 263.54492,296.13477 C 266.04771,280.41467 271.17141,268.14737 266.20117,250.47461 C 261.23093,232.80185 222.45731,176.39789 202.15589,163.05514 C 181.85447,149.71239 173.49995,142.9886 152.51721,142.85788 Z';


export class VocalTractGestures {

  frame: 0;
  velum: Gestures;
  lipUpper: Gestures;
  epiglottis: Gestures;
  vocalFolds: Gestures;
  jaw: Gestures;
  lipLower: Gestures;
  tongue: Gestures;

  vocalTractPaths: any;


  constructor(vocalTractPaths: any) {
    this.velum = new Gestures();
    this.lipUpper = new Gestures();
    this.epiglottis = new Gestures();
    this.vocalFolds = new Gestures();
    this.jaw = new Gestures();
    this.lipLower = new Gestures();
    this.tongue = new Gestures();
    this.frame = 0;
    this.vocalTractPaths = vocalTractPaths;
  }

  setT(frame) {
    this.velum.setT(frame);
    this.lipUpper.setT(frame);
    this.epiglottis.setT(frame);
    this.vocalFolds.setT(frame);
    this.jaw.setT(frame);
    this.lipLower.setT(frame);
    this.tongue.setT(frame);
  }

  act() {
    let childGesture: Gesture, parentGesture: Gesture;
    this.velum.act();
    this.lipUpper.act();
    this.epiglottis.act();
    this.vocalFolds.act();
    this.jaw.act();
    childGesture = this.lipLower.currentGesture();
    if (childGesture) {
      parentGesture = this.jaw.currentGesture();
      parentGesture && childGesture.setParent(parentGesture);
    }
    this.lipLower.act();
    childGesture = this.tongue.currentGesture();
    if (childGesture) {
      parentGesture = this.jaw.currentGesture();
      parentGesture && childGesture.setParent(parentGesture);
    }
    this.tongue.act();
  }

  update() {
    this.velum.update();
    this.lipUpper.update();
    this.epiglottis.update();
    this.vocalFolds.update();
    this.jaw.update();
    this.lipLower.update();
    this.tongue.update();
  }

  addVocalFoldVibration(start: number, end: number) {
    let gesture: Gesture, action: Actions.TranslateAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAction(new Geometry.Point(0,-3));
    action.addPath(this.vocalTractPaths['larynx'], Geometry.seq(0,4), Geometry.seq(8, 12), Geometry.seq(16, 20));
    action.setEasing(new Easings.Function(function(t){
      if ((t >= 0.9) || (t <= 0.1)) return 0;
      return Math.sin(t * 10 * Math.PI * Math.PI)}));
    gesture.setAction(action);
    this.vocalFolds.appendGesture(gesture);
  }

  addVelumRaise(start: number, end: number) {
    let gesture: Gesture, action: Actions.TranslateAndRotateAroundAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
        new Geometry.Point(9,-5), -20, velumRotationCenter);
    action.addPath(this.vocalTractPaths['velum'], Geometry.seq(8, 20));
    gesture.setAction(action);
    this.velum.appendGesture(gesture);
  }

  addVelumRaised(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addVelumRaise(start, end);
    action = this.velum.gestures[this.velum.gestures.length - 1].action;
    action.setEasing(new Easings.Out());
  }

  addVelumLower(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addVelumRaise(start, end);
    action = this.velum.gestures[this.velum.gestures.length - 1].action;
    action.setEasing(new Easings.Reverse(action.easing));
  }


  addLipRounding(start: number, end: number) {
    let gesture: Gesture, action: Actions.BaseAction;

    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
        new Geometry.Vector(-5,-10), -35, lipLowerRotationCenter);
    action.addPath(this.vocalTractPaths['lip-lower'],
        Geometry.seq(0, 8), Geometry.seq(68, 78)
      );
    gesture.setAction(action);
    this.lipLower.appendGesture(gesture);

    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
        new Geometry.Vector(-5,0), 35, lipUpperRotationCenter);
    action.addPath(this.vocalTractPaths['lip-upper'], Geometry.seq(16, 32));
    gesture.setAction(action);
    this.lipUpper.appendGesture(gesture);
  }

  addLipUnrounding(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addLipRounding(start, end);
    action = this.lipUpper.gestures[this.lipUpper.gestures.length - 1].action;
    action.setEasing(new Easings.Reverse(action.easing));
    action = this.lipLower.gestures[this.lipLower.gestures.length - 1].action;
    action.setEasing(new Easings.Reverse(action.easing));
  }

  addLipRounded(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addLipRounding(start, end);
    action = this.lipUpper.gestures[this.lipUpper.gestures.length - 1].action;
    action.setEasing(new Easings.Out());
    action = this.lipLower.gestures[this.lipLower.gestures.length - 1].action;
    action.setEasing(new Easings.Out());
  }

  addJawOpen(start: number, end: number, howWide=1) {
    let gesture: Gesture, action: Actions.BaseAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
      new Geometry.Vector(-8 * howWide, 4 * howWide), -8 * howWide, jawRotationCenter);
    action.addPath(this.vocalTractPaths['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
    action.addPath(this.vocalTractPaths['teeth-lower']);
    action.addPath(this.vocalTractPaths['gum-lower']);
    //action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,32), Geometry.seq(40,50));//, Geometry.seq(10,32));
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(13,32));
    gesture.setAction(action);
    this.jaw.appendGesture(gesture);
  }

  addJawClose(start: number, end: number, howWide=1) {
    let action: Actions.BaseAction;
    this.addJawOpen(start, end, howWide);
    action = this.jaw.gestures[this.jaw.gestures.length - 1].action;
    action.setEasing(new Easings.Reverse(action.easing));
  }

  addJawOpened(start: number, end: number, howWide=1) {
    let action: Actions.BaseAction;
    this.addJawOpen(start, end, howWide);
    action = this.jaw.gestures[this.jaw.gestures.length - 1].action;
    action.setEasing(new Easings.Out());
  }


  addVowelNeutral(start: number, end: number) {
    let action = new Actions.MorphAction(this.vocalTractPaths['tongue-neutral'].getPoints(Geometry.seq(0,12), Geometry.seq(32,50)).copy());
    action.canHaveParent = false;
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,12), Geometry.seq(32,50));
    action.setEasing(new Easings.Function(function(t){ return 0; }));

    let gesture: Gesture = new Gesture(start, end);
    gesture.setAction(action);
    this.tongue.appendGesture(gesture);
  }

  addVowelHeed(start: number, end: number, reverse:boolean=false) {
    let heed: any;
    heed = this.vocalTractPaths['tongue-whod'];//Geometry.SvgPath.fromSvg(HEED_SVG);
    let action = new Actions.MorphAction(heed.getPoints(Geometry.seq(0,12), Geometry.seq(32,50)));
    action.canHaveParent = false;
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,12), Geometry.seq(32,50));
    if (reverse) {
      action.setEasing(new Easings.Reverse(action.easing));
    }
    let gesture: Gesture = new Gesture(start, end);
    gesture.setAction(action);
    this.tongue.appendGesture(gesture);
  }

  addTongueMovement(start: number, end: number, startPosition: string, endPosition?: string) {

    endPosition = endPosition || startPosition;
    let startPath = this.vocalTractPaths[`tongue-${startPosition}`];
    let endPath = this.vocalTractPaths[`tongue-${endPosition}`];

    let action = new Actions.MorphBetweenAction(
      this.getTongueMovementPoints(startPath),
      this.getTongueMovementPoints(endPath)
    );
     action.canHaveParent = false;
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,12), Geometry.seq(32,50));
    let gesture: Gesture = new Gesture(start, end);
    gesture.setAction(action);
    this.tongue.appendGesture(gesture);
  }

  getTongueMovementPoints(path: Geometry.SvgPath) {
    return path.getPoints(Geometry.seq(0,12), Geometry.seq(32,50));
  }

}




