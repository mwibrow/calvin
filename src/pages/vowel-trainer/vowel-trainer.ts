import { Component, ViewChild, NgZone } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider, Word, Talker } from '../../providers/app-data/app-data';
// import { NarratorComponent } from '../../components/narrator/narrator';
 import { VocalTractAnimationComponent } from '../../components/vocal-tract-animation/vocal-tract-animation';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { KeywordComponent } from '../../components/keyword/keyword';

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
  @ViewChild(VocalTractAnimationComponent) vocalTractAnimation: VocalTractAnimationComponent;
  @ViewChild('keyword') keyword: KeywordComponent;
  @ViewChild('keywordVowel') keywordVowel: KeywordComponent;

  public readonly ViewState = ViewState;
  private viewState: ViewState;
  public wordIndex: number;
  public talker: Talker;
  public keywordExampleMap: any;
  public player: AudioPlayer;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private appData: AppDataProvider,
      private audio: AudioProvider,
      public ngZone: NgZone,
      public events: Events) {

    this.viewState = ViewState.Animation;
    this.wordIndex = 0;
    this.talker = appData.getTalker();
    this.keywordExampleMap = appData.keywordExampleMap;
    this.player = this.audio.player;
    console.log(appData)
    this.events.subscribe('svg:loaded', () => {
      console.log('Loaded')
      this.setUpAnimation();
    })

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
      this.setUpAnimation();
    }
  }

  setUpAnimation() {
    if (this.vocalTractAnimation.ready()) {
      this.vocalTractAnimation.setupVowelAnimation(this.getWord().description);
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

  getKeyword(highlightVowel: boolean = false): string {
    let word: Word = this.getWord();
    if (highlightVowel) {
      return word.highlight.replace(/([^<]*)<([a-z]+)>(.*)/, //'<span class="keyword-display">$1$2$3</span>');
      '<span class="keyword-display lowlight">$1</span><span class="keyword-display highlight">$2</span><span class="keyword-display lowlight">$3</span>')
    }
    return `<span class="keyword-display">${this.appData.keywordList[this.wordIndex]}</span>`;
  }

  getWord(): Word {
    let word: Word = this.appData.getKeyword();
    if (word === undefined) {
      console.error(`No entry for keyword ${this.appData.keywordList[this.wordIndex]}`);
    }
    return word;
  }

  getExampleWords() {
    let word = this.getWord();
    let examples = this.appData.keywordExampleMap[word.hvd];
    return examples;
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

  previousKeyword() {
    this.ngZone.run(() => {
      this.appData.previousKeyword();
      this.setWords();
    });
  }

  nextKeyword() {
    this.ngZone.run(() => {
      this.appData.nextKeyword();
      this.setWords();
    });
  }

  nextKeywordButtonDisabled() {
    if (this.appData.keywordIndex === this.appData.keywordList.length - 1) {
      return "true"
    }
  }

  previousKeywordButtonDisabled() {
    if (this.appData.keywordIndex === 0) {
      return "true"
    }
  }

  setWords() {
    let word = this.appData.getKeyword();
    this.keywordVowel.setUri(`assets/audio/mark/vowels/${word.hvd}.wav`);
    this.keyword.setUri(this.getUri(this.appData.keywordList[this.wordIndex]));
    console.log(word)
    this.setUpAnimation();

  }



  playExampleWord(word: string) {
    let talker = this.talker;
    let url: string = `assets/audio/${this.talker}/words/${word}.wav`;
    console.log(url);
    this.player.playUrl(url);
  }

  playWord(word: string, talker?: string) {
    talker = talker || this.talker.id;
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
