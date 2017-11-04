import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, WordGroup, Word } from '../../providers/app-data/app-data';
import { SelectKeywordPage } from '../../pages/select-keyword/select-keyword';

import * as mdColors from 'material-colors';

@IonicPage()
@Component({
  selector: 'page-select-keyword-group',
  templateUrl: 'select-keyword-group.html',
})
export class SelectKeywordGroupPage {

  backgroundColor: string = mdColors.yellow[500];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
    console.log(appData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectKeywordGroupPage');
  }

  getKeywordGroupList() {
    return this.appData.keywordGroupList;
  }

  getKeywordGroup(keyword: string) {
    return this.appData.keywordGroups[keyword];
  }

  setKeywordGroupIndex(index: number) {
    this.appData.setKeywordGroupIndex(index);
    this.navCtrl.push(SelectKeywordPage);
  }

  goHome() {
    this.navCtrl.pop();
  }

}
