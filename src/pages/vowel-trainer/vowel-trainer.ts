import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VowelTrainerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vowel-trainer',
  templateUrl: 'vowel-trainer.html',
})
export class VowelTrainerPage {

  static state: any = {
    video: 'video',
    audio: 'audio',
    animation: 'animation',
    recording: 'recording'
  };
  private currentState: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentState = VowelTrainerPage.state.recording;
  }

  isAudio() {
    return this.currentState === VowelTrainerPage.state.audio;
  }

  showAudio() {
    this.currentState = VowelTrainerPage.state.audio;
  }

  isRecording() {
    return this.currentState === VowelTrainerPage.state.recording;
  }

  showRecording() {
    this.currentState = VowelTrainerPage.state.recording;
  }

  isVideo() {
    return this.currentState === VowelTrainerPage.state.video;
  }

  showVideo() {
    this.currentState = VowelTrainerPage.state.video;
  }

  isAnimation() {
    return this.currentState === VowelTrainerPage.state.animation;
  }

  showAnimation() {
    return this.currentState =VowelTrainerPage.state.animation;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VowelTrainerPage');
  }

}
