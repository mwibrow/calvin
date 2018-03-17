import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as mdColors from 'material-colors';

enum ViewState {
  Image,
  Video,
  Recording
}

import { AppDataProvider, Word, WordTypes } from '../../providers/app-data/app-data';
import { VideoPlayerComponent } from '../../components/video-player/video-player';
/**
 * Generated class for the ExampleWordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-example-word',
  templateUrl: 'example-word.html',
})
export class ExampleWordPage {

  public readonly ViewState = ViewState;
  viewState: ViewState;
  imageColor: string = mdColors.lightGreen['500'];
  backgroundColor: string = mdColors.yellow['500'];
  @ViewChild('videoPlayerMain') videoPlayerMain: VideoPlayerComponent;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppDataProvider) {
      this.viewState = ViewState.Video;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExampleWordPage');
    console.log(this.videoPlayerMain)
    this.videoPlayerMain.fakeload()
  }

  isViewState(viewState: ViewState) {
    return viewState === this.viewState;
  }

  setViewState(viewState: ViewState) {
    this.viewState = viewState;
  }

  getExampleWord(): string {
    let word: Word = this.getWord();
    return `<span class="keyword-display">${word.display}</span>`;
  }

  getWord(): Word {
    let word: Word = this.appData.getExampleWord();
    if (word === undefined) {
      console.error(`No entry for keyword ${word.id}`);
    }
    return word;
  }

  getAudioUri(): string {
    let talker = this.appData.getTalker();
    let word = this.appData.getExampleWord();
    return this.appData.getAudioUri(talker.id, word.id, WordTypes.ExampleWords);
  }

  getImageUri() {
    let uri: string = this.appData.getImageUri(this.appData.getExampleWord().id, WordTypes.ExampleWords);
    return uri;
  }

  getVideoUri() {
    let talker = this.appData.getTalker();
    let word = this.appData.getExampleWord();
    let uri: string = this.appData.getVideoUri(talker.id, WordTypes.ExampleWords, word.id);
    return uri;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
