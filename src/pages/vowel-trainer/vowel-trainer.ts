import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { NarratorComponent } from '../../components/narrator/narrator';
/**
 * Generated class for the VowelTrainerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

enum ViewState {
  Audio,
  Video,
  Animation,
  Recording
}
@IonicPage()
@Component({
  selector: 'page-vowel-trainer',
  templateUrl: 'vowel-trainer.html'
})
export class VowelTrainerPage {

  static state: any = {
    video: 'video',
    audio: 'audio',
    animation: 'animation',
    recording: 'recording'
  };

  @ViewChild('narrator') narrator: NarratorComponent;
  public readonly ViewState = ViewState;
  private viewState: ViewState;
  public wordIndex: number;
  public talker: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appData: AppDataProvider) {

    this.viewState = ViewState.Recording;
    this.wordIndex = 0;
    this.talker = appData.talker;
    console.log(this.narrator);
  }


ngAfterViewInit() {

}
  changeViewState(viewState: ViewState) {
    this.viewState = viewState;
     this.narrator.play();
  }

  isViewState(viewState: ViewState) {
    if (this.viewState === viewState) {
      return "true"
    }
  }

formatWord() {
  let word = this.getWord();

  if (this.viewState === ViewState.Animation) {
    return word.highlight.replace(/([^<]*)<([a-z]+)>(.*)/,
      '<span class="lowlight">$1<span class="highlight">$2</span>$3</span>')
  } else {
    return word.display;
  }
}
  getWord() {
   let word: any = this.appData.keywords[this.appData.keywordList[this.wordIndex]];
   if (word === undefined) {
     console.error(`No entry for keyword ${this.appData.keywordList[this.wordIndex]}`);
   }
   return word;
  }

  getVideo() {
    let talker = this.talker;
    let word = this.appData.keywordList[this.wordIndex];
    return `assets/video/${talker}/${word}.mp4`
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VowelTrainerPage');
  }

  backButtonDisabled() {
    if (this.wordIndex === 0) {
      return "true";
    }
  }

  forwardButtonDisabled() {
    if (this.wordIndex === this.appData.keywordList.length - 1) {
      return "true";
    }
  }

  backWord() {
    if (this.wordIndex > 0) {
      this.wordIndex --;
    }
  }

  forwardWord() {
    if (this.wordIndex < this.appData.keywordList.length - 1) {
      this.wordIndex ++;
    }
  }

}
