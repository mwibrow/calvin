import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppData } from '../../providers/app-data';
import { WordLists } from '../../providers/word-lists';

@Component({
  selector: 'page-keyword-tab',
  templateUrl: 'keyword-tab.html',
})
export class KeywordTab {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appData: AppData,
    public wordLists: WordLists
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeywordTab');
  }

  cycleVowelGroup(direction: number) {
    if (!direction) {
      direction = 1;
    }
    this.appData.vowelGroupIndex = (this.appData.vowelGroupIndex + direction) % this.wordLists.vowelGroups.length;
    if (this.appData.vowelGroupIndex < 0) {
      this.appData.vowelGroupIndex = this.wordLists.vowelGroups.length - 1;
    }
  }

}
