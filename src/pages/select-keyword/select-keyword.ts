import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, WordGroup, Word } from '../../providers/app-data/app-data';
import { VowelTrainerPage } from '../../pages/vowel-trainer/vowel-trainer';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {

  }

  ionViewDidLoad() {

  }

  getKeywordList() {
    return this.appData.getKeywordGroup().words;
  }

  getKeyword(keyword: string) {
    return this.appData.keywords[keyword];
  }

  setKeyword(keyword: string) {
    this.appData.keywordIndex = this.appData.keywordList.indexOf(keyword);
    this.navCtrl.push(VowelTrainerPage);
  }

  goBack() {
    this.navCtrl.pop();
  }
}
