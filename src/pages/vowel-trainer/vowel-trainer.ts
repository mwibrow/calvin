import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { NarratorComponent } from '../../components/narrator/narrator';
import { VocalTractAnimationComponent } from '../../components/vocal-tract-animation/vocal-tract-animation';
import { AudioProvider } from '../../providers/audio/audio';
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
  Recording,
  Examples,
}
@IonicPage()
@Component({
  selector: 'page-vowel-trainer',
  templateUrl: 'vowel-trainer.html',
  providers: [ AudioProvider ]
})
export class VowelTrainerPage {

  @ViewChild('narrator') narrator: NarratorComponent;
  @ViewChild(VocalTractAnimationComponent) vocalTractAnimation: VocalTractAnimationComponent;
  public readonly ViewState = ViewState;
  private viewState: ViewState;
  public wordIndex: number;
  public talker: string;
  public keywordExamples: any;
  public player: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appData: AppDataProvider,
    private audioProvider: AudioProvider) {

    this.viewState = ViewState.Examples;
    this.wordIndex = 0;
    this.talker = appData.talker;
    this.keywordExamples = appData.keywordExamples;
    this.player = this.audioProvider.getAudioPlayer();
    console.log(this.narrator);
  }


ngAfterViewInit() {
  this.player.initialise();
  console.log(this.vocalTractAnimation);
}
  changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    //this.narrator.play();
    if (this.viewState === ViewState.Animation) {
      this.vocalTractAnimation.setAnimation(this.getWord().vowel)
    }

  }

  isViewState(viewState: ViewState) {
    if (this.viewState === viewState) {
      return "true"
    }
  }

formatWord(highlightVowel: boolean=false) {
  let word = this.getWord();

  if (this.viewState === ViewState.Animation || highlightVowel) {
    return word.highlight.replace(/([^<]*)<([a-z]+)>(.*)/,
      '<div class="lowlight">$1</div><div class="highlight">$2</div><div class="lowlight">$3</div>')
  } else {
    return word.display;
  }
}

  getKeyword(): string {
    return this.appData.keywordList[this.wordIndex];
  }

  getWord() {
   let word: any = this.appData.keywords[this.appData.keywordList[this.wordIndex]];
   if (word === undefined) {
     console.error(`No entry for keyword ${this.appData.keywordList[this.wordIndex]}`);
   }
   return word;
  }

  // getVideo() {
  //   let talker = this.talker;
  //   let word = this.appData.keywordList[this.wordIndex];
  //   return `assets/video/${talker}/${word}.mp4`
  // }
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

  playExampleWord(word: string) {
    let talker = this.talker;
    let url: string = `assets/audio/${this.talker}/${word}.wav`;
    console.log(url);
    this.player.playUrl(url);
  }

  playWord(word: string, talker?: string) {
    talker = talker || this.talker;
    let url: string = `assets/audio/${talker}/${word}.wav`;
    this.player.playUrl(url);
  }

  playVowel(word) {
    this.playWord(`vowels/${word}`, 'mark');
  }

  getUri(word:string) {
    let uri: string = `assets/audio/${this.talker}/${word}.wav`;
    return uri;
  }

   getVowelUri(word:string) {
    let uri: string = `assets/audio/mark/vowels/${word}.wav`;
    return uri;
  }

}
