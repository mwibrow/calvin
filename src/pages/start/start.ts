import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as mdColors from 'material-colors';

import { SelectKeywordGroupPage } from '../select-keyword-group/select-keyword-group';
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  getBackgroundColor() {
    return mdColors && mdColors.yellow ? mdColors.yellow[500] : 'yellow';
  }

  onStart() {
    this.navCtrl.push(SelectKeywordGroupPage);
  }

}
