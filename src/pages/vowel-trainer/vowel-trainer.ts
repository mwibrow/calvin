import { Component, ViewChild, NgZone } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider, Word, Talker, WordTypes } from '../../providers/app-data/app-data';
import { ExampleWordPage } from '../../pages/example-word/example-word';
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

  @ViewChild(VocalTractAnimationComponent) vocalTractAnimation: VocalTractAnimationComponent;
  @ViewChild('keyword') keyword: KeywordComponent;
  @ViewChild('keywordVowel') keywordVowel: KeywordComponent;

  public readonly ViewState = ViewState;
  private viewState: ViewState;
  public talker: Talker;
  public keywordExampleMap: any;
  public player: AudioPlayer;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private appData: AppDataProvider,
      private audio: AudioProvider,
      public ngZone: NgZone,
      public events: Events) {

    this.viewState = ViewState.Audio;

    this.talker = appData.getTalker();
    this.keywordExampleMap = appData.keywordExampleMap;
    this.player = this.audio.player;
    this.events.subscribe('svg:loaded', () => {
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
      if (this.viewState === ViewState.Animation) {
        this.setUpAnimation();
      }
    }
  }

  setUpAnimation() {
    if (this.vocalTractAnimation.ready()) {
      this.vocalTractAnimation.setUpVowelAnimation(this.getWord().description, this.getVowelUri());
    }
  }

  isViewState(viewState: ViewState) {
    if (this.viewState === viewState) {
      return "true"
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

  getExampleWordImageUri(word: string) {
    let uri: string = this.appData.getImageUri(word, WordTypes.ExampleWords);
    return uri;
  }

  getExampleWord(wordId: string) {
    return this.appData.exampleWords[wordId];
  }

  ionViewDidLoad() {}

  goBack() {
    this.navCtrl.pop();
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

  playExampleWord(word: string, index: number) {
    let uri = this.appData.getAudioUri(this.appData.getTalker().id, word, WordTypes.ExampleWords);
    this.player.playUrl(uri).then(() => {
      this.showExampleWord(index)
    }).catch(() => {});
  }

  getKeywordUri() {
    let uri = this.appData.getAudioUri(this.appData.talker.id, this.appData.getKeyword().id, WordTypes.Keywords);
    return uri;
  }

  getVowelUri() {
    let uri = this.appData.getAudioUri(this.appData.talker.id, this.appData.getKeyword().hvd, WordTypes.Vowels);
    return uri;
  }

  getKeywordImageUri() {
    let uri: string = this.appData.getImageUri(this.appData.getKeyword().id, WordTypes.Keywords);
    return uri;
  }

}
