import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppDataProvider } from '../../providers/app-data/app-data';
import { AudioProvider, AudioPlayer } from '../../providers/audio/audio';
import { KeywordComponent } from '../../components/keyword/keyword';

enum ViewState {
  Image,
  Video,
  Examples
}

@IonicPage()
@Component({
  selector: 'page-keyword-trainer',
  templateUrl: 'keyword-trainer.html',
})
export class KeywordTrainerPage {


  public readonly ViewState = ViewState;
  public viewState: ViewState;
  public wordIndex: number;
  public player: AudioPlayer;
  public talker: string;
  public exampleList: Array<string>;

  @ViewChild('keyword') keyword: KeywordComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audio: AudioProvider,
    public appData: AppDataProvider,
    public ngZone: NgZone)  {
      this.viewState = ViewState.Image;
      this.wordIndex = 0;
      this.talker = 'emma';
      this.exampleList = appData.exampleList;
      this.player = this.audio.player;
      console.log(this.appData)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordTrainerPage');
  }

  ngAfterViewInit() {
    this.player.initialise();
    //this.setWords();
  }

  goHome() {
    this.audio.stop();
    this.navCtrl.pop();
  }

  changeViewState(viewState: ViewState) {
    this.viewState = viewState;
  }

  isViewState(viewState: ViewState) {
    if (this.viewState === viewState) {
      return "true"
    }
  }

  backButtonDisabled() {
    if (this.wordIndex === 0) {
      return "true";
    }
  }

  forwardButtonDisabled() {
    if (this.wordIndex >= this.exampleList.length - 1) {
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

  forwardWord() {
    if (this.wordIndex < this.exampleList.length - 1) {
      this.ngZone.run(() => {
        this.wordIndex++;
        this.setWords();
      });
    }
  }

  setWords() {
    let word = this.getWord();
    this.keyword.setUri(this.getAudio());
    console.log(word)
    //this.vocalTractAnimation.setupVowelAnimation(word.description)
  }

  getKeyword(): string {
    return `<span class="keyword-display">${this.getWord()}</span>`;
  }

  getWord() {
    return this.exampleList[this.wordIndex];
  }

  getAudio() {
    let uri: string = this.appData.getAudio(this.talker, this.getWord());
    console.log('Audio URI', uri)
    return uri;
  }

  getVideo() {
    let uri: string = this.appData.getVideo(this.talker, this.getWord());
    console.log('Video URI', uri)
    return uri;
  }

  getImage() {
    let uri: string = this.appData.getImage(this.getWord());
    console.log('Image URI', uri)
    return uri;
  }

}
