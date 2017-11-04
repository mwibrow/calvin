import { Component, ViewChild, NgZone } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider, Word, Talker, WordTypes } from '../../providers/app-data/app-data';
// import { NarratorComponent } from '../../components/narrator/narrator';
import { ExampleWordPage } from '../../pages/example-word/example-word';
import { VocalTractAnimationComponent } from '../../components/vocal-tract-animation/vocal-tract-animation';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { KeywordComponent } from '../../components/keyword/keyword';

import * as mdColors from 'material-colors';
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
  public talker: Talker;
  public keywordExampleMap: any;
  public player: AudioPlayer;

  public backgroundColor: string = mdColors.yellow[500];

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private appData: AppDataProvider,
      private audio: AudioProvider,
      public ngZone: NgZone,
      public events: Events) {

    this.viewState = ViewState.Animation;

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
    if (this.viewState !== viewState) {
      this.viewState = viewState;
      //this.narrator.play();
      if (this.viewState === ViewState.Animation) {
        this.setUpAnimation();
      }
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
    return `<span class="keyword-display">${word.display}</span>`;
  }

  getWord(): Word {
    let word: Word = this.appData.getKeyword();
    if (word === undefined) {
      console.error(`No entry for keyword ${word.id}`);
    }
    return word;
  }

  getExampleWords() {
    let word = this.getWord();
    let examples = this.appData.keywordExampleMap[word.hvd];
    return examples;
  }
  ionViewDidLoad() {}

  goBack() {
    this.navCtrl.pop();
  }

  backButtonDisabled() {

  }

  forwardButtonDisabled() {

  }


  nextKeywordButtonDisabled() {
    if (this.appData.keywordIndex === this.appData.keywordList.length - 1) {
      return "true";
    }
  }

  previousKeywordButtonDisabled() {
    if (this.appData.keywordIndex === 0) {
      return "true";
    }
  }

  showExampleWord(index: number) {
    this.appData.setExampleWordIndex(index);
    this.navCtrl.push(ExampleWordPage);
  }

  setWords() {
    this.keywordVowel.setUri(this.getVowelUri());
    this.keyword.setUri(this.getKeywordUri());
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

  getKeywordUri() {
    let uri = this.appData.getAudioUri(this.appData.config.keywords.defaultTalkerId, this.appData.getKeyword().id, WordTypes.Keywords);
    return uri;
  }

  getVowelUri() {
    let uri = this.appData.getAudioUri(this.appData.config.vowels.defaultTalkerId, this.appData.getKeyword().hvd, WordTypes.Vowels);
    return uri;
  }


  getKeywordImageUri() {
    let uri: string = this.appData.getImageUri(this.appData.getKeyword().id, WordTypes.Keywords);
    return uri;
  }

}
