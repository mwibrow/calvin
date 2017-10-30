import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, WordGroup, Word } from '../../providers/app-data/app-data';
import { VowelTrainerPage } from '../../pages/vowel-trainer/vowel-trainer';
import { KeywordComponent } from '../../components/keyword/keyword'
import * as mdColors from 'material-colors';
/**
 * Generated class for the SelectKeywordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-keyword',
  templateUrl: 'select-keyword.html',
})
export class SelectKeywordPage {

  backgroundColor: string = mdColors.yellow[500];
  @ViewChildren('keywordComponentList') keywordComponentList: QueryList<KeywordComponent>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {

  }

  ionViewDidLoad() {
    this.keywordComponentList.toArray().map((keywordComponent) =>
      keywordComponent.siblings = this.keywordComponentList.toArray())

  }

  getBackgroundColor() {
    return this.backgroundColor;
  }
  getKeywordList() {
    return this.appData.getKeywordGroup().words;
  }

  getKeyword(keyword: string) {
    return this.appData.keywords[keyword];
  }

  setKeyword(keyword: string) {
    this.appData.keywordIndex = this.appData.keywordList.indexOf(keyword);
    //this.navCtrl.push(VowelTrainerPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goForward() {
    this.navCtrl.push(VowelTrainerPage);
  }

  canGoForward() {
    return this.keywordComponentList && this.keywordComponentList.some(keywordComponent => keywordComponent.selected)
  }

  getKeywordAudioUri(keyword: string) {
    let uri: string = this.appData.getAudio(null, keyword);
    return uri;
  }

}
