import { Component } from '@angular/core';
import { App, IonicPage, ViewController, NavParams } from 'ionic-angular';
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
    public viewCtrl: ViewController,
    public appCtrl: App,
    public navParams: NavParams) {
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

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  continue() {
    this.viewCtrl.dismiss(true);
    this.appCtrl.getRootNav().push(SelectKeywordGroupPage);
  }

  isTalker(talker: Talker) {
    return this.appData.talker && this.appData.talker.id === talker.id;
  }

  getTalkers() {
    let talkers = this.appData.config.words.talkers.map(id => this.appData.talkers[id]);
    return talkers;
  }

}
