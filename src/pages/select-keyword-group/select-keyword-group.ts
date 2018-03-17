import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, WordTypes } from '../../providers/app-data/app-data';
import { SelectKeywordPage } from '../../pages/select-keyword/select-keyword';

@IonicPage()
@Component({
  selector: 'page-select-keyword-group',
  templateUrl: 'select-keyword-group.html',
})
export class SelectKeywordGroupPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppDataProvider) {

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

  getKeywordImageUri(keyword: string) {
    let uri: string = this.appData.getImageUri(keyword, WordTypes.Keywords);
    return uri;
  }

  goBack() {
    this.navCtrl.pop();
  }

}
