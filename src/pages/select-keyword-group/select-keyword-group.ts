import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppDataProvider, WordGroup, Word } from '../../providers/app-data/app-data';
/**
 * Generated class for the SelectKeywordGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-keyword-group',
  templateUrl: 'select-keyword-group.html',
})
export class SelectKeywordGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public appData: AppDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectKeywordGroupPage');
  }

  getKeywordGroups() {
    return this.appData.keywordGroupList;
  }

  getKeywordGroup(keyword: string) {
    return this.appData.keywordGroups[keyword];
  }




}
