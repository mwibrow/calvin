import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
// import { NarratorComponent } from '../../components/narrator/narrator';
// import { VocalTractAnimationComponent } from '../../components/vocal-tract-animation/vocal-tract-animation';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { KeywordComponent } from '../../components/keyword/keyword';
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
  Examples
}
@IonicPage()
@Component({
  selector: 'page-vowel-trainer',
  templateUrl: 'vowel-trainer.html'
})
export class VowelTrainerPage {

  // @ViewChild('narrator') narrator: NarratorComponent;
  // @ViewChild(VocalTractAnimationComponent) vocalTractAnimation: VocalTractAnimationComponent;
  @ViewChild('keyword') keyword: KeywordComponent;
  @ViewChild('keywordVowel') keywordVowel: KeywordComponent;

  public readonly ViewState = ViewState;
  private viewState: ViewState;
  public wordIndex: number;
  public talker: string;
  public keywordExamples: any;
  public player: AudioPlayer;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private appData: AppDataProvider,
      private audio: AudioProvider,
      public ngZone: NgZone) {

    this.viewState = ViewState.Animation;
    this.wordIndex = 0;
    this.talker = appData.talker;
    this.keywordExamples = appData.keywordExamples;
    this.player = this.audio.player;

  }


  ngAfterViewInit() {
    this.player.initialise();
    this.setWords();

  }

  goHome() {
    this.audio.stop();
    this.navCtrl.pop();
  }

  changeViewState(viewState: ViewState) {
    this.viewState = viewState;
    //this.narrator.play();
    if (this.viewState === ViewState.Animation) {
      // this.vocalTractAnimation.setAnimation(this.getWord().vowel)
    }
  }

  isViewState(viewState: ViewState) {
    if (this.viewState === viewState) {
      return "true"
    }
  }

  formatWord(highlightVowel: boolean = false) {
    let word = this.getWord();

    if (this.viewState === ViewState.Animation || highlightVowel) {
      return word.highlight.replace(/([^<]*)<([a-z]+)>(.*)/, //'<span class="keyword-display">$1$2$3</span>');
       '<span class="keyword-display lowlight">$1</span><span class="keyword-display highlight">$2</span><span class="keyword-display lowlight">$3</span>')
    } else {
      return `<span class="keyword-display">${word.display}</span>`;
    }
  }

  getKeyword(): string {
    return `<span class="keyword-display">${this.appData.keywordList[this.wordIndex]}</span>`;
  }

  getWord() {
    let word: any = this.appData.keywords[this.appData.keywordList[this.wordIndex]];
    if (word === undefined) {
      console.error(`No entry for keyword ${this.appData.keywordList[this.wordIndex]}`);
    }
    return word;
  }

  ionViewDidLoad() {}

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
      this.ngZone.run(() => {
        this.wordIndex--;
        this.setWords();
      });
    }
  }

  setWords() {
    let word = this.getWord();
    this.keywordVowel.setUri(`assets/audio/mark/vowels/${word.vowel}.wav`);
    this.keyword.setUri(this.getUri(this.appData.keywordList[this.wordIndex]));
    console.log(word)
    //this.vocalTractAnimation.setupVowelAnimation(word.description)
  }

  forwardWord() {
    if (this.wordIndex < this.appData.keywordList.length - 1) {
      this.ngZone.run(() => {
        this.wordIndex++;
        this.setWords();
      });
    }
  }

  playExampleWord(word: string) {
    let talker = this.talker;
    let url: string = `assets/audio/${this.talker}/words/${word}.wav`;
    console.log(url);
    this.player.playUrl(url);
  }

  playWord(word: string, talker?: string) {
    talker = talker || this.talker;
    let url: string = `assets/audio/${talker}/words/${word}.wav`;
    this.player.playUrl(url);
  }

  playVowel(word) {
    this.playWord(`vowels/${word}`, 'mark');
  }

  getUri(word: string) {
    let uri: string = `assets/audio/${this.talker}/words/${word}.wav`;
    return uri;
  }

}
