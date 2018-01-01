import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';


import * as mdColors from 'material-colors';

import { SelectKeywordGroupPage } from '../select-keyword-group/select-keyword-group';
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  title = 'CALVin'
  constructor(public navCtrl: NavController, public navParams: NavParams, private _app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  ionViewDidEnter() {
    this._app.setTitle(this.title);
  }

  getBackgroundColor() {
    return mdColors && mdColors.yellow ? mdColors.yellow[500] : 'yellow';
  }

  onStart() {
    this.navCtrl.push(SelectKeywordGroupPage);
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
