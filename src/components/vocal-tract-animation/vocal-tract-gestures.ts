import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures }  from './animation';



const lipUpperRotationCenter = new Geometry.Point(85, 170);
const lipLowerRotationCenter = new Geometry.Point(90, 230);
const jawRotationCenter = new Geometry.Point(280, 140);
const velumRotationCenter = new Geometry.Point(260, 140);


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

  addLipUnrounded(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addLipRounding(start, end);
    action = this.lipUpper.gestures[this.lipUpper.gestures.length - 1].action;
    action.setEasing(new Easings.In());
    action = this.lipLower.gestures[this.lipLower.gestures.length - 1].action;
    action.setEasing(new Easings.In());
  }

  addJawMovement(start: number, end: number, fromWide: number=0, toWide:number=1, howWide: number=1) {
    let gesture: Gesture, action: Actions.BaseAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
      new Geometry.Vector(-8 * howWide, 4 * howWide), -8 * howWide, jawRotationCenter);
    action.addPath(this.vocalTractPaths['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
    action.addPath(this.vocalTractPaths['teeth-lower']);
    action.addPath(this.vocalTractPaths['gum-lower']);
    //action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,32), Geometry.seq(40,50));//, Geometry.seq(10,32));
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(13,32));
    action.setEasing(new Easings.Range(fromWide, toWide));
    gesture.setAction(action);
    this.jaw.appendGesture(gesture);
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

  // addTongueMovement(start: number, end: number, startPosition: string, endPosition?: string) {

  //   endPosition = endPosition || startPosition;
  //   let startPath = this.vocalTractPaths[`tongue-${startPosition}`];
  //   let endPath = this.vocalTractPaths[`tongue-${endPosition}`];

  //   let action = new Actions.MorphBetweenAction(
  //     this.getTongueMovementPoints(startPath),
  //     this.getTongueMovementPoints(endPath)
  //   );
  //    action.canHaveParent = false;
  //   action.addPoints(this.vocalTractPaths['tongue'],
  //     this.getTongueMovementPoints(this.vocalTractPaths['tongue']));
  //   let gesture: Gesture = new Gesture(start, end);
  //   gesture.setAction(action);
  //   this.tongue.appendGesture(gesture);
  // }

  addTongueMovement(start: number, end: number, startTongue: Geometry.SvgPath, endTongue?: Geometry.SvgPath) {

        endTongue = endTongue || startTongue;

        let action = new Actions.MorphBetweenAction(
          this.getTongueMovementPoints(startTongue),
          this.getTongueMovementPoints(endTongue)
        );
         action.canHaveParent = false;
        action.addPoints(this.vocalTractPaths['tongue'],
          this.getTongueMovementPoints(this.vocalTractPaths['tongue']));
        let gesture: Gesture = new Gesture(start, end);
        gesture.setAction(action);
        this.tongue.appendGesture(gesture);
      }

  getTongueMovementPoints(path: Geometry.SvgPath) {
    return path.getPoints(Geometry.seq(0,12), Geometry.seq(32,50));
  }


  getTongueTarget(front: number, open: number): Geometry.SvgPath {
    /**
     * front: -1 = back, 0 = central, 1 = front
     * open: -1 = close, 0 = mid, 1 = open
     */
    let morph = Geometry.SvgPath.morph;

    let tonguePositions: Array<Array<Geometry.SvgPath>> = [
      [
        this.vocalTractPaths['tongue-whod'],
        morph(this.vocalTractPaths['tongue-heed'], this.vocalTractPaths['tongue-whod'], 0.5),
        this.vocalTractPaths['tongue-heed']
      ],
      [
        morph(this.vocalTractPaths['tongue-whod'], this.vocalTractPaths['tongue-hard'], 0.5),
        this.vocalTractPaths['tongue-neutral'],
        morph(this.vocalTractPaths['tongue-heed'], this.vocalTractPaths['tongue-had'], 0.5)
      ],
      [
        this.vocalTractPaths['tongue-hard'],
        morph(this.vocalTractPaths['tongue-had'], this.vocalTractPaths['tongue-hard'], 0.5),
        this.vocalTractPaths['tongue-had']
      ]
    ];

    if (open < -1) open = -1;
    if (open > 1) open = 1;
    if (front < -1) front = -1;
    if (front > 1) front = 1

    let i, j, ii, jj;

    open += 1;
    front += 1;
    i = Math.floor(open);
    j = Math.floor(front);
    ii = i === 2 ? 2 : i + 1;
    jj = j === 2 ? 2 : j + 1;

    return morph(
      morph(tonguePositions[i][j], tonguePositions[ii][j], open - i),
      morph(tonguePositions[i][jj], tonguePositions[ii][jj], open - i),
      front - j);
  }

  tongueTargetFromVowel(spec: string) {
    // let position = vowelSpec(spec);
    // return this.getTongueTarget(position.front, position.open);
  }

  setupMonophthong(vowel) {
    // let tongueTarget = this.getTongueTarget(vowel.front, vowel.open);
  }
}



export const parseVowelDescriptions = (description: string) => {
  return description.split(';').map(v => parseVowelDescription(v))
}

export const parseVowelDescription = (spec: string) => {

  let tokens = spec.replace(/\s+/, ' ').toLowerCase().split(' ');
  let front: number, open: number, rounded: boolean, nasal: boolean = false;

  front = open = 0;
  for (let i: number = 0; i < tokens.length; i ++) {
    switch (tokens[i]) {
      case 'front':
        front = 1;
        break;
      case 'near-front':
        front = 0.5;
        break;
      case 'central':
        front = 0;
        break;
      case 'near-back':
        front = -0.5;
        break;
      case 'back':
        front = -1;
        break;
      case 'close':
        open = -1;
        break;
      case 'near-close':
        open = -0.666;
        break;
      case 'close-mid':
        open = -0.333;
        break;
      case 'mid':
        open = 0;
        break;
      case 'open-mid':
        open = 0.333;
        break;
      case 'near-open':
        open = 0.666;
        break;
      case 'open':
        open = 1;
        break;
      case 'rounded':
        rounded = true;
        break;
      case 'unrounded':
        rounded = false;
        break;
    }
  }
  return {front: front, open: open, rounded: rounded, nasal: nasal};
}




