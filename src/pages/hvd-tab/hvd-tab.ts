import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';

@Component({
  selector: 'page-hvd-tab',
  templateUrl: 'hvd-tab.html',
})
export class HvdTab {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HvdTab');
  }

}
