import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';

@Component({
  selector: 'page-hvd-tab',
  templateUrl: 'hvd-tab.html',
})
export class HvdTab {

  hvdIndex: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists
  ) {
    this.hvdIndex = -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HvdTab');
  }

  cycleVowelGroup(direction: number) {
    this.hvdIndex = -1;
    if (!direction) {
      direction = 1;
    }
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroups.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroups.length - 1;
    }
  }

  getButtonsEnabled() {
    return this.hvdIndex >= 0 ? "" : "true";
  }

  changeHvd(i) {
    this.hvdIndex = i;

  }
}
