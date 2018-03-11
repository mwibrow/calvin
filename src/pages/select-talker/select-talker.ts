import { Component } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';
import { AppDataProvider, Talker } from '../../providers/app-data/app-data';
import { SelectKeywordGroupPage } from '../select-keyword-group/select-keyword-group';

import * as mdColors from 'material-colors';

@IonicPage()
@Component({
  selector: 'page-select-talker',
  templateUrl: 'select-talker.html',
})
export class SelectTalkerPage {

  constructor(
    public appData: AppDataProvider,
    public navCtrl: NavController,
    public appCtrl: App) {
  }

  getBackgroundColor() {
    return mdColors && mdColors.yellow ? mdColors.yellow[500] : 'yellow';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTalkerPage');
  }

  setTalker(talker: Talker) {
    this.appData.setTalker(talker);
  }

  goBack() {
    this.navCtrl.pop()
  }

  goForward() {
    this.navCtrl.push(SelectKeywordGroupPage)
  }

  isTalker(talker: Talker) {
    return this.appData.talker && this.appData.talker.id === talker.id;
  }

  getTalkers() {
    let talkers = this.appData.config.words.talkers.map(id => this.appData.talkers[id]);
    return talkers;
  }

}
