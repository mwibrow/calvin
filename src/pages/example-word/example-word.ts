import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as mdColors from 'material-colors';

enum ViewState {
  Image,
  Video,
  Recording
}

import { AppDataProvider, Word, WordTypes } from '../../providers/app-data/app-data';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppDataProvider) {
      this.viewState = ViewState.Image;

  }

  clickShape() {
    console.log('CLICK-SHAPE')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExampleWordPage');
  }

  isViewState(viewState: ViewState) {
    console.log(viewState === this.viewState)
    return viewState === this.viewState;
  }

  setViewState(viewState: ViewState) {
    this.viewState = viewState;
    console.log(this.viewState)
  }

  getExampleWord(): string {
    let word: Word = this.getWord();
    console.log(word)
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
    console.log(talker, word)
    return this.appData.getAudio(talker.id, word.id, 'example');
  }

  getImageUri() {
    let uri: string = this.appData.getImage(this.appData.getExampleWord().id);
    console.log('Image URI', uri)
    return uri;
  }

  getVideoUri() {
    let talker = this.appData.getTalker();
    let word = this.appData.getExampleWord();
    let uri: string = this.appData.getVideo(talker.id, 'example_words', word.id);
    console.log('Video URI', uri)
    return uri;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
