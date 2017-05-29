import { Geometry } from './geometry';
import { Easings, Actions, Gesture, Gestures }  from './animation'



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

  addVelumRaise(start: number, end: number) {
    let gesture: Gesture, action: Actions.TranslateAndRotateAroundAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(
        new Geometry.Point(9,-5), -20, velumRotationCenter);
    action.addPath(this.vocalTractPaths['velum'], Geometry.seq(8, 20));
    gesture.setAction(action);
    this.velum.appendGesture(gesture);
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

  addJawOpen(start: number, end: number) {
    let gesture: Gesture, action: Actions.BaseAction;
    gesture = new Gesture(start, end);
    action = new Actions.TranslateAndRotateAroundAction(new Geometry.Vector(-8, 4), -8, jawRotationCenter);
    action.addPath(this.vocalTractPaths['lip-lower'], Geometry.seq(0,24), Geometry.seq(52, 78))
    action.addPath(this.vocalTractPaths['teeth-lower']);
    action.addPath(this.vocalTractPaths['gum-lower']);
    action.addPath(this.vocalTractPaths['tongue'], Geometry.seq(0,32), Geometry.seq(40,50));//, Geometry.seq(10,32));
    gesture.setAction(action);
    this.jaw.appendGesture(gesture);
  }

  addJawClose(start: number, end: number) {
    let action: Actions.BaseAction;
    this.addJawOpen(start, end);
    action = this.jaw.gestures[this.jaw.gestures.length - 1].action;
    action.setEasing(new Easings.Reverse(action.easing));
  }

}




